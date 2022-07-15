

        (function($) { "use strict";

        //Switch dark/light
        
        $(".switch").on('click', function () {
            if ($("body").hasClass("light")) {
                $("body").removeClass("light");
                $(".switch").removeClass("switched");
            }
            else {
                $("body").addClass("light");
                $(".switch").addClass("switched");
            }
        });
            
        $(document).ready(function(){"use strict";
        
            //Scroll back to top
            
            var progressPath = document.querySelector('.progress-wrap path');
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            }
            updateProgress();
            $(window).scroll(updateProgress);	
            var offset = 50;
            var duration = 550;
            jQuery(window).on('scroll', function() {
                if (jQuery(this).scrollTop() > offset) {
                    jQuery('.progress-wrap').addClass('active-progress');
                } else {
                    jQuery('.progress-wrap').removeClass('active-progress');
                }
            });				
            jQuery('.progress-wrap').on('click', function(event) {
                event.preventDefault();
                jQuery('html, body').animate({scrollTop: 0}, duration);
                return false;
            })
            
            
        });
        
    })(jQuery);



/*!
    * Start Bootstrap - SB Admin v7.0.5 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2022 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()



$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});


/*****************************************/
/*****************************************/
/*****************************************/
/*****************************************/
/*****************************************/
/********* Card battle *******************/

const randomBetween = (a, b) => Math.trunc(Math.random() * b) + a;

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// const emojis = new Map();
// emojis.set('Fire', '🔥');
// emojis.set('Grass', '🍃');
// emojis.set('Water', '💦');
// emojis.set('Fairy', '🌟');
// emojis.set('Psychic', '👁‍🗨');
// emojis.set('Electric', '⚡');
// emojis.set('Fighting', '🥊');

const setWinner = function (playerCard, computerCard) {
  if (playerCard.atk === computerCard.def) {
  }
  // WINNING
  else if (playerCard.atk > computerCard.def) {
    console.log
    myScore++;
  }
  // LOSING
  else if (playerCard.atk < computerCard.def) {
    comScore++;
  }
};


const root = document.documentElement;
const rootVariables = getComputedStyle(root);

const playerCardsEls = document.querySelectorAll('.card--player');
const computerCardsEls = document.querySelectorAll('.card--computer');
const firstBattleCard = document.querySelectorAll('.card--battle')[0];
const secondBattleCard = document.querySelectorAll('.card--battle')[1];
const playerYugiohInfo = document.querySelector('.player-yugioh');
const computerYugiohInfo = document.querySelector('.computer-yugioh');
const winner = document.querySelector('.winner');
const result = document.querySelector('.result');
const playAgain = document.querySelector('.play-again');

const gameResult = document.querySelector('.game-over');



const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

var myScore = 0;
var comScore = 0;

const tops = [];
const topsComputer = [];

const length = 100;

const firstTop = 0;
const lastTop = -128;

const firstTopComputer = 0;
const lastTopComputer = 128.5;

const handLength = 5;
const indexesOfComputerCards = [0, 1, 2, 3, 4];

var imgUrls = [];
var YugiohNames = [];
var YugiohAtk = [];
var YugiohDef = [];

var Yugiohs = [];

let computerYugioh;
let randomIndex;
let YugiohsForComputer;

let zIndexForNextPlayedCards = 0;

let cardsPlayed = 0;

class Yugioh {
  constructor(src, name, atk, def) {
    this.src = src;
    this.name = name;
    this.atk = atk;
    this.def = def;
  }
}


const setUrlsForPlayerCards = function () {
  for (let i = 0; i < playerCardsEls.length; i++) {
    playerCardsEls[i].children[0].setAttribute("src", Yugiohs[i].src);
  }
};


const randomizeYugiohForComputer = function () {
  computerYugioh = YugiohsForComputer[YugiohsForComputer.length - 1];
  YugiohsForComputer.pop();
};

const defineTopsForAnimation = function (top, first, last) {
  const step = (first - last) / (length - 1);

  for (let i = 0; i < length; i++) {
    top[i] = `${first - step * i}%`;
  }
};

const setTop = function (card, player) {
  defineTopsForAnimation(tops, firstTop, lastTop);
  defineTopsForAnimation(topsComputer, firstTopComputer, lastTopComputer);

  let i = 0;
  let time = 5;

  let interval = setInterval(function () {
    card.style.top = player ? tops[i] : topsComputer[i];
    i++;
  }, time);

  setTimeout(function () {
    clearInterval(interval);
  }, length * time);
};

const moveCard = function (card, player) {
  const left = player ? '0' : '-32rem';
  card.style.left = left;

  if (!player) {
    card.children[0].src = computerYugioh.src;
  }

  card.style.pointerEvents = 'none';
  card.style.transform = `rotate(0deg)`;
  card.style.zIndex = zIndexForNextPlayedCards;
  zIndexForNextPlayedCards++;

  setTop(card, player);
};

const computerPlaysYugioh = function (src) {
  randomizeYugiohForComputer();
  moveCard(computerCardsEls[indexesOfComputerCards[indexesOfComputerCards.length - 1]], false);
  indexesOfComputerCards.pop();
};

const setInfoAboutWinner = function (myYugioh, computerYugioh) {
  result.textContent = `🗡️:${myYugioh.atk} 🆚 🛡️${computerYugioh.def}`;
  if (comScore === myScore) {
    winner.textContent = "It's a draw!";
  } else if (myScore > comScore) {
    winner.textContent = 'You win!';
  } else {
    winner.textContent = 'You lose!';
  }
  if (cardsPlayed === handLength) {
    playAgain.textContent = "Click to Play Again!"
  }
  
};

const setInfoAboutBattle = function (myYugioh, computerYugioh) {
  playerYugiohInfo.textContent = myYugioh.name;
  computerYugiohInfo.textContent = computerYugioh.name;

//   playerYugiohInfo.textContent += emojis.get(myYugioh.type);
//   computerYugiohInfo.textContent += emojis.get(computerYugioh.type);
};

const setInfo = function (myYugioh, computerYugioh, youWin) {
  setInfoAboutBattle(myYugioh, computerYugioh);
  setInfoAboutWinner(myYugioh, computerYugioh, youWin);
};

const increaseScore = function () {
  console.log(myScore)
  score0.textContent = comScore;
  score1.textContent = myScore;
};

const fight = function (myYugioh) {
//   console.log(myYugioh)
//   console.log(computerYugioh)
  
  setWinner(myYugioh, computerYugioh);
  
  setTimeout(setInfo, 500, myYugioh, computerYugioh);

  increaseScore();
};

/****************
 * Game Mechanism
 ****************/
const checkIfGameEnded = function () {
  setTimeout(function () {
    if (cardsPlayed === handLength) {
      if (myScore > comScore) {
        gameResult.textContent = '🏆You won!🏆';
        document.body.style.backgroundColor = '#dbfdc0';
      } else if (comScore > myScore) {
        gameResult.textContent = '😢You lost!😢';
        document.body.style.backgroundColor = '#faa2a2';
      } else {
        gameResult.textContent = "🤝It's a draw!🤝";
        document.body.style.backgroundColor = '#c2c2c2';
      }
      
    }
  }, 2000);
};

const playYugioh = function (card) {
  const src = Yugiohs[card.id].src;
  const YugiohName = Yugiohs[card.id].name;
  const YugiohAtk = Yugiohs[card.id].atk;
  const YugiohDef = Yugiohs[card.id].def;

  const myYugioh = new Yugioh(src, YugiohName, YugiohAtk, YugiohDef);

  moveCard(card, true); // true - move player's card
  computerPlaysYugioh(src);
  fight(myYugioh);

  cardsPlayed++;
  checkIfGameEnded();
};

const addEventListenersToPlayerCards = function () {
  playerCardsEls.forEach(card => {
    card.addEventListener('click', function () {
      playYugioh(this);
    });
  });
};

/********************** DEFINE ********************/
const defineYugiohs = function () {
  // Loading card info
  //defineImgUrlsAndNames();

//   for (let i = 0; i < YugiohNames.length; i++) {
//     Yugiohs.push(new Yugioh(imgUrls[i], YugiohNames[i], YugiohAtk[i], YugiohDef[i]));
//   }
   fetch('./return_json')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            imgUrls.length = 0;
            YugiohNames.length = 0;
            YugiohAtk.length = 0;
            YugiohDef.length = 0;
            Yugiohs.length = 0;
            for (const timestamp in data) {
                //console.log(data[timestamp]);
                imgUrls.push(data[timestamp]['url']);
                YugiohNames.push(data[timestamp]['name']);
                YugiohAtk.push(data[timestamp]['attack']);
                YugiohDef.push(data[timestamp]['defense']);
                Yugiohs.push(new Yugioh(data[timestamp]['url'], data[timestamp]['name'], data[timestamp]['attack'], data[timestamp]['defense']));
            }
            //console.log(Yugiohs);

            shuffleArray(indexesOfComputerCards);

            shuffleArray(Yugiohs);

            YugiohsForComputer = [...Yugiohs];

            shuffleArray(YugiohsForComputer);

            setUrlsForPlayerCards();

            addEventListenersToPlayerCards();
        }
    );
};

defineYugiohs();

/*****************************************/
/*****************************************/
/*****************************************/
/*****************************************/
/*****************************************/

// Yu-Gi-Oh Cards on Homepage //
gsap.registerPlugin(ScrollTrigger);
const pageContainer = document.querySelector(".container1");

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
el: pageContainer,
smooth: true
});

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
scrollTop(value) {
    return arguments.length
    ? scroller.scrollTo(value, 0, 0)
    : scroller.scroll.instance.scroll.y;
},
getBoundingClientRect() {
    return {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight
    };
},
pinType: pageContainer.style.transform ? "transform" : "fixed"
});

////////////////////////////////////
////////////////////////////////////
window.addEventListener("load", function () {
let pinBoxes = document.querySelectorAll(".pin-wrap > *");
let pinWrap = document.querySelector(".pin-wrap");
let pinWrapWidth = pinWrap.offsetWidth;
let horizontalScrollLength = pinWrapWidth - window.innerWidth;

// Pinning and horizontal scrolling

gsap.to(".pin-wrap", {
    scrollTrigger: {
    scroller: pageContainer, //locomotive-scroll
    scrub: true,
    trigger: "#sectionPin",
    pin: true,
    // anticipatePin: 1,
    start: "top top",
    end: pinWrapWidth
    },
    x: -horizontalScrollLength,
    ease: "none"
});

ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

ScrollTrigger.refresh();
});

