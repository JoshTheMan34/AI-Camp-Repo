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

// Yu-Gi-Oh Cards on Homepage //

/*

  using 
    - an animated gif of sparkles.
    - an animated gradient as a holo effect.
    - color-dodge mix blend mode
  
*/
var x;
var $cards = $(".card");
var $style = $(".hover");

$cards
  .on("mousemove touchmove", function(e) { 
    // normalise touch/mouse
    var pos = [e.offsetX,e.offsetY];
    e.preventDefault();
    if ( e.type === "touchmove" ) {
      pos = [ e.touches[0].clientX, e.touches[0].clientY ];
    }
    var $card = $(this);
    // math for mouse position
    var l = pos[0];
    var t = pos[1];
    var h = $card.height();
    var w = $card.width();
    var px = Math.abs(Math.floor(100 / w * l)-100);
    var py = Math.abs(Math.floor(100 / h * t)-100);
    var pa = (50-px)+(50-py);
    // math for gradient / background positions
    var lp = (50+(px - 50)/1.5);
    var tp = (50+(py - 50)/1.5);
    var px_spark = (50+(px - 50)/7);
    var py_spark = (50+(py - 50)/7);
    var p_opc = 20+(Math.abs(pa)*1.5);
    var ty = ((tp - 50)/2) * -1;
    var tx = ((lp - 50)/1.5) * .5;
    // css to apply for active card
    var grad_pos = `background-position: ${lp}% ${tp}%;`
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
    var opc = `opacity: ${p_opc/100};`
    var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
    // need to use a <style> tag for psuedo elements
    var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `
    // set / apply css class and style
    $cards.removeClass("active");
    $card.removeClass("animated");
    $card.attr( "style", tf );
    $style.html(style);
    if ( e.type === "touchmove" ) {
      return false; 
    }
    clearTimeout(x);
  }).on("mouseout touchend touchcancel", function() {
    // remove css, apply custom animation on end
    var $card = $(this);
    $style.html("");
    $card.removeAttr("style");
    x = setTimeout(function() {
      $card.addClass("animated");
    },2500);
  });




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



// Deck de cartas
let cardCharmander = {
    imagem: "https://lh3.googleusercontent.com/proxy/Ql2TynGXUp7TwvvRuGz-tM_fvVlbSdx5j9xCgLtezGd1BML9_6VW-TVEhGT9sluH_-pfnvjbZtDfHsQhEdjIAyBkW12SFIGJe7U3IFVZKvCUUw",
    nome: "charmander",
    atributos:{
        tipo: "fogo",
        ataque: 1600,
        defesa: 500
    }
}
let cardSquirtle = {
    imagem: "http://static.pokemonpets.com/images/monsters-images-800-800/7-Squirtle.png",
    nome: "Squirtle",
    atributos:{
        tipo: "Agua",
        ataque: 1500,
        defesa: 700
    }
}
let cardBulbasaur = {
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    nome: "Bulbasaur",
    atributos:{
        tipo: "folha",
        ataque: 1700,
        defesa: 400
    }
}
let cardPikachu = {
    imagem: "dhttps://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    nome: "Pikachu",
    atributos:{
        tipo: "Eletrico",
        ataque: 1800,
        defesa: 550
    }
}
let cardEevee = {
    imagem: "e",
    nome: "Eevee",
    atributos:{
        tipo: "normal",
        ataque: 1500,
        defesa: 500
    }
}

var cartaJogador;
var cartaBot;
var deck = [cardCharmander, cardBulbasaur, cardEevee, cardSquirtle, cardPikachu]

document.getElementById('bBatalhar').hidden = true
document.getElementById('bResetar').hidden = true
document.getElementById('jogador').hidden = true
document.getElementById('bot').hidden = true

function distribuirCartas(){
    let nCartaBot = Math.floor(Math.random() * 5)
    cartaBot = deck[nCartaBot]
    console.log(`${nCartaBot} OK`)

    let nCartaJogador = Math.floor(Math.random() * 5)
    while (nCartaBot == nCartaJogador){
        nCartaJogador =  Math.floor(Math.random() * 5)
    }
    cartaJogador = deck[nCartaJogador]
    console.log(`${nCartaJogador} OK`)

    // Botões e atributos
    document.getElementById('bDistribuirCartas').disabled = true
    document.getElementById('bBatalhar').disabled = false
    document.getElementById('bBatalhar').hidden = false
    document.getElementById('bResetar').hidden = false
    document.getElementById('jogador').hidden = false

    tAtributo.innerHTML = "Escolha o atributo para batalhar!"
    escolha()
    valorEscolha()
    exibirCartaJogador()

    console.log(cartaJogador)
}
function escolha(){
    let opcoes = document.getElementById('atributos')
    let opcoesTela = ""
    for (var atributo in cartaJogador.atributos){
        opcoesTela += `<input type="radio" name="atributo" id="opcoes" value="${atributo}"/>${atributo}`
        opcoes.innerHTML = opcoesTela
    }
    console.log(`OK escolha`)
}
function valorEscolha(){
    let radioAtributo = document.getElementsByName('atributo')
    for(i = 0; i < radioAtributo.length; i++){
        if(radioAtributo[i].checked){
            return radioAtributo[i].value
        }
    }
    console.log('Ok valor escolha')
}
function exibirCartaJogador(){
    imgCard.innerHTML = `<img src="${cartaJogador.imagem}">`
}
/*function exibirCartaBot(){
    jogador.innerHTML = cartaBot.nome
    jogador.innerHTML = `<img src="cartaBot.imagem"/>`
    atributosExibirCarta.innerHTML = cartaBot.tipo
    atributosExibirCarta.innerHTML = cartaBot.ataque
    atributosExibirCarta.innerHTML = cartaBot.defesa
    console.log('Exibir ok')
}*/

function batalhar(){
    let atributoBatalha = valorEscolha()
    if(cartaJogador.atributos[atributoBatalha] > cartaBot.atributos[atributoBatalha]){
        console.log('voce venceu')
    } else if(cartaJogador.atributos[atributoBatalha] < cartaBot.atributos[atributoBatalha]){
        console.log('voce perder')
    } else{
        console.log('voce empatou')
    }

    document.getElementById('bBatalhar').disabled = true
    document.getElementById('bResetar').disabled = false
}

function resetar(){
    atributos.innerHTML = ""
    document.getElementById('bDistribuirCartas').disabled = false
    document.getElementById('bResetar').disabled = true
    document.getElementById('bBatalhar').hidden = true
    document.getElementById('bResetar').hidden = true
    document.getElementById('jogador').hidden = true
    tAtributo.innerHTML = ""
}