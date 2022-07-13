# Run by typing python3 main.py

# **IMPORTANT:** only collaborators on the project where you run
# this can access this web server!
"""
    Bonus points if you want to have internship at AI Camp
    1. How can we save what user built? And if we can save them, like allow them to publish, can we load the saved results back on the home page? 
    2. Can you add a button for each generated item at the frontend to just allow that item to be added to the story that the user is building? 
    3. What other features you'd like to develop to help AI write better with a user? 
    4. How to speed up the model run? Quantize the model? Using a GPU to run the model? 
"""

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
models_folder = "model/trained_model/"
DECK_CARD_LOCATION = "model/created_cards.txt"
#generating = False



# img link
# https%3A%2F%2Fi.imgur.com%2F4Uz2y6E.jpg
# %3A :
# %2F /
def gen_img(card):
    #
    link = urllib.parse.quote('https://cocalc10.ai-camp.dev/5b0ca11b-2446-481d-9c4f-3d441cc3baeb/raw/omni/app/test.png')
    print(link)
    if card is not None:
        url = 'https://www.cardmaker.net/cardmakers/yugioh/createcard.php?name=' + str(card['name']) + '&cardtype=Monster&subtype=normal&attribute='+ str(card['attribute']) +'&level='+ str(card['level']) + '&trapmagictype=None&rarity=Common&picture='+ str('https%3A%2F%2Fi.imgur.com%2F4Uz2y6E.jpg') + '&circulation=&set1=&set2=&type=' + str(card['race']) + '&carddescription=' + str(card['desc']) + '&atk='+str(card['attack']) + '&def='+str(card['defense']) + '&creator=Andrew&year=2022&serial=' + str(random.randint(10000000, 99999999))
        #print(url)
        return '<img src="' + url + '">'
    else:
        return ''

@app.route(f'{base_url}/')
def home():
    return render_template('index.html')

@app.route(f'{base_url}/cardgen')
def cardgen():
    if 'generated' not in session:
        return render_template('cardgen.html', ai_card="", save_button="")
    else:
        card_img = gen_img(session['generated'])
        session['saved'] = False;
        save_text = 'Save Card to Deck!'
        if session['saved']:
            save_text = 'Your Card is Saved!'
        return render_template('cardgen.html', ai_card=card_img, save_button='<form action=\"/5b0ca11b-2446-481d-9c4f-3d441cc3baeb/port/12345/save_card\" method="POST" id="sub-form" name="form-1"source="custom"><div style="text-align: center; font-size: 30px;"><button class="btn btn-primary" type="submit" value="Save To Deck">'+save_text+'</button></div><br></form>')

@app.route(f'{base_url}/generate_text', methods=["POST"])
def generate_text():
    prompt = request.form['prompt']
    which_model = request.form['model']
    model_str = str(which_model)
    print(str(prompt)+": "+str(which_model))
    card = None
    if model_str == "🌑":
        card = gen_card('DARK', prompt)
    elif model_str == "☀️":
        card = gen_card('LIGHT', prompt)
    elif model_str == "🔥":
        card = gen_card('FIRE', prompt)
    elif model_str == "💧":
        card = gen_card('WATER', prompt)
    elif model_str == "⛰️":
        card = gen_card('EARTH', prompt)
    else:
        card = gen_card('WIND', prompt)
    session['generated'] = card.get()

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
            'attribute': _attr
        }
        print(self.__str__())

    def get(self):
        return self.card
    def from_str(self, card_str):
        data = card_str.split("|")
        self.card = {
            'attack': int(data[0]),
            'defense': int(data[1]),
            'level': int(data[2]),
            'race': int(data[3]),
            'desc': int(data[4]),
            'name': int(data[5]),
            'attribute': int(data[6])
        }
def __str__(card):
    return str(card['attack'])+"|"+str(card['defense'])+"|"+str(card['level'])+"|"+card['race']+"|"+card['desc']+"|"+card['name']+"|"+card['attribute']


def read():
    try:
        with open(DECK_CARD_LOCATION, "r") as txt_file:
            out = ''
            for s in txt_file.readlines():
                out+=s
            return out
    except:
        return ''

def save(card):
    t = int(time())
    data = read()
    while str(t) in data:
        t+=1 #This is to prevent cards with duplicate IDs
    if not str(data) == '':
        data = str(data) + '<{'
    card_file = str(data)+str(t)+'}>'+__str__(card)
    with open(DECK_CARD_LOCATION, 'w') as file:
        file.write(card_file)
    session['saved'] = True
        #Example Card List:
#         1657642313}>1400|600|4|Spellcaster|DESCRIPTION|BANANA|LIGHT<{1657644732}>2200|1800|6|Plant|DESCRIPTION|ORANGE|FIRE
#         '<{' is the separator for between each card.
#         '}>' is the separator between the timestamp and the card

@app.route(f'{base_url}/save_card/', methods=['POST'])
def save_card():
    if 'saved' not in session:
        session['saved'] = False
    if not session['saved']:
        save(session['generated'])
    return redirect(url_for("cardgen"))

def gen_card(attr, inp):
    #print("Creating the card with input '"+str(inp)+"' with attribute '"+str(attr)+"'")
    name = fix_capitalization(inp)  #Turns 'DARK' -> 'Dark' and 'dark' -> 'Dark'

    ai = aitextgen(model_folder=models_folder + attr + "/", to_gpu=False)
    monster_data = ai.generate(n=1, prompt="<" + str(inp) + ">~", temperature=1, return_as_list=True)[0]
    data_list = monster_data.split("~")
    monster_stats = data_list[2].split("|")
    print(monster_stats)
    monster_attack = monster_stats[0][monster_stats[0].find(":") + 1:].split(".")[0]
    monster_defense = monster_stats[1][monster_stats[1].find(":") + 1:].split(".")[0]
    monster_level = monster_stats[2][monster_stats[2].find(":") + 1:].split(".")[0]
    monster_race = monster_stats[3][monster_stats[3].find(":") + 1:]
    monster_desc = data_list[1].replace('"', '%22').replace(' ', '%20')

    monster_name = data_list[0][1:-1]
    monster_type = attr

    card = Card(monster_attack, monster_defense, monster_level, monster_race, monster_desc, monster_name, monster_type)
    return card


# STUFF BACKEND NEEDS (Good job)
# 1. Make a thing that saves the users chosen cards to a file (so they can make a deck)
# 2. Reading the CSV input data and then display it
# 3. Make a card class
# 
#ATK:1000.0|DEF:1800.0|LEVEL:1.0|RACE:Machine

# @app.route(f'{base_url}', methods=['POST'])
# def home_post():
#     return redirect(url_for('results'))

# @app.route(f'{base_url}/results/')
# def results():
#     if 'data' in session:
#         data = session['data']
#         return render_template('Write-your-story-with-AI.html', generated=data)
#     else:
#         return render_template('Write-your-story-with-AI.html', generated=None)

# @app.route(f'{base_url}/generate_text/', methods=["POST"])
# def generate_text():
#     """
#     view function that will return json response for generated text.
#     """
#     prompt = request.form['prompt']
#     if prompt is not None:
#         generated = ai.generate(
#             n=1,
#             batch_size=3,
#             prompt=str(prompt),
#             max_length=300,
#             temperature=0.9,
#             return_as_list=True
#         )
#     session['data'] = generated[0]
#     return redirect(url_for('results'))

# # define additional routes here
# # for example:
# # @app.route(f'{base_url}/team_members')
# # def team_members():
# #     return render_template('team_members.html') # would need to actually make this page

if __name__ == '__main__':
    # IMPORTANT: change url to the site where you are editing this file.
    website_url = 'cocalc10.ai-camp.dev'

    print(f'Try to open\n\n    https://{website_url}' + base_url + '\n\n')
    app.run(host='0.0.0.0', port=port, debug=True)
