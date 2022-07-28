# import basics
import os
# import stuff for our web server
from flask import Flask, request, redirect, url_for, render_template, session
from utils import get_base_url
# import stuff for our models
from aitextgen import aitextgen
import random
from time import time
import urllib.parse
import json
# setup the webserver
# port may need to be changed if there are multiple flask servers running on same server
port = 12345
base_url = get_base_url(port)

# if the base url is not empty, then the server is running in development, and we need to specify the static folder so that the static files are served
if base_url == '/':
    app = Flask(__name__)
else:
    app = Flask(__name__, static_url_path=base_url + 'static')

app.secret_key = os.urandom(64)


# models_folder = "model/trained_model/"
models_folder = "model/trained_model_3000/"
DECK_CARD_LOCATION = "model/created_cards.json"
image_count = {}

# https%3A%2F%2Fi.imgur.com%2F4Uz2y6E.jpg
# %3A :
# %2F /
def gen_img(attr, race):
    if attr == None or race == None:
        print('Invalid Image.')
        return 'IMAGE'
    else:
        img_name = attr + race + '_' + str(random.randint(0, image_count[attr][race] - 1))
        link = 'https://raw.githubusercontent.com/Asonjay/AI-Camp-Repo/main/SC22-BatchB-stereo-cavemen/cropped_imgs/' + img_name + '.png'
        return link.replace(':', '%3A').replace('/', '%2F')


def gen_url(card):
    #link = gen_img(card['attribute'], card['race'])
    if card is not None:
        url = 'https://www.cardmaker.net/cardmakers/yugioh/createcard.php?name=' + str(card['name']) + '&cardtype=Monster&subtype=normal&attribute='+ str(card['attribute']) +'&level='+ str(card['level']) + '&trapmagictype=None&rarity=Common&picture='+ card['image'] + '&circulation=&set1=&set2=&type=' + str(card['race']) + '&carddescription=' + str(card['desc']) + '&atk='+str(card['attack']) + '&def='+str(card['defense']) + '&creator=Stereo-Cavemen&year=2022&serial=' + str(random.randint(10000000, 99999999))
        #print(url)
        return url
    else:
        return ''


@app.route(f'{base_url}/')
def home():
    return render_template('index.html')

@app.route(f'{base_url}/cardgen')
def cardgen():
    if 'generated' not in session:
        return render_template('cardgen.html', ai_card='<img src="https://www.cardmaker.net/cardmakers/yugioh/createcard.php?name=aNdReW%3F&cardtype=Xyz&subtype=normal&attribute=Divine&level=12&trapmagictype=None&rarity=Ultimate%20Rare&picture=https%3A%2F%2Fi.redd.it%2Fk4to8eganwo41.jpg&circulation=&set1=&set2=&type=Andrew&carddescription=My%20name%20is%20Andrew%20and%20I%20am%20a%20type%20of%20Yu-gi-oh.&atk=9999&def=9999&creator=&year=&serial=" width=350px height=510px')
    else:
        card_img = session['generated']['url']
        return render_template('cardgen.html', ai_card='<img src="' + card_img + '" width=350px height=510px>')


@app.route(f'{base_url}/Generate', methods=["POST"])
def generate():
    prompt = request.form['prompt']
    if prompt.replace(' ','') == '':
        session['generated'] = Card(0, 0, 0, 'Divine-Beast', 'N/A', 'Invalid Name!', 'DIVINE').get()
        return redirect(url_for('cardgen'))
    try:
        which_model = request.form['radio_attributes']
    except:
        session['generated'] = Card(0, 0, 0, 'Divine-Beast', 'N/A', 'Invalid Name!', 'DIVINE').get()
        return redirect(url_for('cardgen'))
    temp = float(request.form['temperature'])
    if temp == 0:
        temp = 0.01
    model_str = str(which_model)
    print(str(prompt)+": "+str(model_str)+ " : "+str(temp))
    card = gen_card(model_str, prompt, temp)
    session['generated'] = card.get()
    save(session['generated'])
    return redirect(url_for("cardgen"))


@app.route(f'{base_url}/cardbattle')
def cardbattle():
    return render_template('cardbattle.html')


@app.route(f'{base_url}/howitworks')
def howitworks():
    return render_template('howitworks.html')


@app.route(f'{base_url}/teams')
def teams():
    return render_template('teams.html')


def fix_capitalization(str):
    return str[0].upper() + str[1:].lower()


class Card:
    def __init__(self, _atk, _def, _lvl, _race, _desc, _name, _attr):
        self.card = {
            'attack': _atk,
            'defense': _def,
            'level': _lvl,
            'race': _race,
            'desc': _desc,
            'name': _name,
            'attribute': _attr,
            'image': '',
            'url': ''
        }
        self.card['image'] = gen_img(self.card['attribute'], self.card['race'])
        self.card['url'] = gen_url(self.card)
        #print(self.__str__())

    def get(self):
        return self.card

    def from_str(self, card_str):
        data = ''
        if '}>' in card_str:
            data = card_str[card_str.find('}>')+2:].split("|")
        else:
            data = card_str.split("|")
        print(data)
        self.card = {
            'attack': int(data[0]),
            'defense': int(data[1]),
            'level': int(data[2]),
            'race': str(data[3]),
            'desc': str(data[4]),
            'name': str(data[5]),
            'attribute': str(data[6]),
            'image': str(data[7]),
            'url': ''
        }


def save(card):
    url_json = {}
    if os.path.isfile(DECK_CARD_LOCATION):
        with open('./model/created_cards.json', 'r') as f:
            url_json = json.load(f)
    t = int(time())
    while str(t) in url_json:
        t+=1

    url_json[str(t)] = card

    with open(DECK_CARD_LOCATION, 'w') as out:
        json.dump(url_json, out)


def gen_card(attr, inp, temp):
    #print("Creating the card with input '"+str(inp)+"' with attribute '"+str(attr)+"'")
    name = fix_capitalization(inp)  #Turns 'DARK' -> 'Dark' and 'dark' -> 'Dark'

    ai = aitextgen(model_folder=models_folder + attr + "/", to_gpu=False)
    monster_data = ai.generate(n=1, prompt="<" + str(inp) + ">~", temperature=temp, return_as_list=True)[0]
    data_list = monster_data.split("~")
    monster_stats = data_list[2].split("|")
    default_races = {
        'DARK': 'Warrior',
        'EARTH': 'Beast',
        'FIRE': 'Dinosaur',
        'LIGHT': 'Fairy',
        'WATER': 'Aqua',
        'WIND': 'Dragon'
    }
    #print(monster_stats)
    try: monster_attack = monster_stats[0][monster_stats[0].find(":") + 1:].split(".")[0]
    except: monster_attack = 0
    try: monster_defense = monster_stats[1][monster_stats[1].find(":") + 1:].split(".")[0]
    except: monster_defense = 0
    try: monster_level = monster_stats[2][monster_stats[2].find(":") + 1:].split(".")[0]
    except: monster_level = 1
    try: monster_race = monster_stats[3][monster_stats[3].find(":") + 1:]
    except: monster_race = default_races[attr.upper()]
    try: monster_desc = data_list[1].replace('"', '%22').replace(' ', '%20')
    except: monster_desc = 'This card has broken for some reason...'
    try: monster_name = data_list[0][1:-1]
    except: monster_name = 'Broken Card'
    monster_type = attr

    card = Card(monster_attack, monster_defense, monster_level, monster_race, monster_desc, monster_name, monster_type)
    return card


@app.route(f'{base_url}/return_json')
def return_json():
    with open('./model/created_cards.json', 'r') as f:
        json_obj =  json.load(f)
        for __, obj in json_obj.items():
            obj['url'] = obj['url'].replace('%3A', ':').replace('%2F', '/')
    return json_obj


if __name__ == '__main__':
    with open('./img_process/img_count.json', 'r') as f:
        image_count = json.load(f)
    
    # IMPORTANT: change url to the site where you are editing this file.
    website_url = 'cocalc10.ai-camp.dev'

    print(f'Try to open\n\n    https://{website_url}' + base_url + '\n\n')
    app.run(host='0.0.0.0', port=port, debug=True)
