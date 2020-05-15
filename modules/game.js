"use strict"
import {fadeInGame, fadeOutGame, fadeInButton, fadeOutButton} from './transitions.js'
import {drawCard, flipCard} from './card.js'

let flipCardsOnStart = false
let gameStarted = false
let board
let cards = []
let numberCardsChoosed = 0

function startGame(){
    fadeOutButton(startButton)
    gameStarted = true
    
    if(flipCardsOnStart){
        for(let i = 0; i < numberCardsChoosed; i++){
            flipCard(cards[i])
            setTimeout(() => {  
                flipCard(cards[i])
            }, 750);
        }
    }

}

export function endGame(target){
    fadeOutGame(target)
    cards.forEach(card => board.removeChild(card))
    target.removeChild(board)

    cards = []
    board = null
    gameStarted = false
    numberCardsChoosed = 0
}

export function drawGame(numberCards, target){
    numberCardsChoosed = numberCards

    board = document.createElement('DIV')
    board.classList.add('board', `board-${numberCards}`)

    for(let i = 0; i < numberCards; i++){
        const card = drawCard(i, numberCards)
        card.addEventListener("click", () => {
            gameStarted ? flipCard(cards[i]) : {}
        })
        board.appendChild(card)
        cards.push(card)
    }

    target.appendChild(board)
    fadeInGame(target)
    fadeInButton(startButton)
}

const startButton = document.getElementById('start-button')
startButton.addEventListener('click', startGame)