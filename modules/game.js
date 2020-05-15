"use strict"
import {fadeInGame, fadeOutGame, fadeInButton, fadeOutButton} from './transitions.js'
import {drawCard, flipCard} from './card.js'

let flipCardsOnStart = false
let gameStarted = false
let board
let cards = []
let numberCardsChoosed = 0
let activeCards = [null, null]
let misses = 0
let founds = 0

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
    const winBox = document.getElementsByClassName('win-box')[0]
    winBox.classList.remove('game-finished')
    fadeOutGame(target)
    cards.forEach(card => board.removeChild(card))
    target.removeChild(board)

    resetVariables()
}

function resetVariables(){
    cards = []
    board = null
    gameStarted = false
    numberCardsChoosed = 0
    activeCards = [null, null]
    misses = 0
    founds = 0
}

export function drawGame(numberCards, target){
    numberCardsChoosed = numberCards

    board = document.createElement('DIV')
    board.classList.add('board', `board-${numberCards}`)

    for(let i = 0; i < numberCards; i++){
        const card = drawCard(i, numberCards)
        card.addEventListener("click", () => gameStarted ? cardClick(card) : {})
        board.appendChild(card)
        cards.push(card)
    }

    target.appendChild(board)
    fadeInGame(target)
    fadeInButton(startButton)

    const winBox = document.getElementsByClassName('win-box')[0]
    winBox.classList.remove('game-finished')
}

function cardClick(card){
    if(card.classList.contains('card-found') || activeCards[0] === card || activeCards[1] === card) return false
    flipCard(card)


    if( activeCards[0] && !activeCards[1] || !activeCards[0] && activeCards[1]){
        if(activeCards[0] && activeCards[0] !== card){
            activeCards[1] = card
        }else if(activeCards[1] && activeCards[1] !== card){
            activeCards[0] = card
        }
    }

    else if(!activeCards[0] && !activeCards[1]){
        activeCards[0] = card
    }

    checkGame()   
}

function checkGame(){
    if(activeCards[0] && activeCards[1] && activeCards[0].getAttribute('emoji') === activeCards[1].getAttribute('emoji') && activeCards[0] !== activeCards[1])
    {
        activeCards[0].classList.add('card-found')
        activeCards[1].classList.add('card-found')
        activeCards = [null, null]
        founds++
    }
    else if(activeCards[0] && activeCards[1]){
        const [card1, card2] = activeCards
        activeCards = [null, null]
        misses++
        setTimeout(() => {
            flipCard(card1)
            flipCard(card2)
        }, 1000)
    }

    if(founds === numberCardsChoosed / 2){
        gameWin()
    }
}

function gameWin(){
    console.log('You win')
    console.log({wrongs: misses, founds})

    const elFounds = document.getElementsByClassName('win-box__founds')[0]
    elFounds.append(`${founds}/${founds}`)
    const elMisses = document.getElementsByClassName('win-box__misses')[0]
    elMisses.append(`${misses}`)

    const winBox = document.getElementsByClassName('win-box')[0]
    winBox.classList.add('game-finished')

    const button = document.getElementsByClassName('win-box__reset-game')[0]
    button.value = numberCardsChoosed
}

const startButton = document.getElementById('start-button')
startButton.addEventListener('click', startGame)