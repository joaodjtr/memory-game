"use strict"
import {fadeIn, fadeOut} from './helper.js'
import {drawCard, flipCard} from './card.js'

let board
let cards = []

export function drawGame(numberCards, target){
    board = document.createElement('DIV')
    board.classList.add('board', `board-${numberCards}`)

    for(let i = 0; i < numberCards; i++){
        const card = drawCard(i)
        card.addEventListener("click", () => flipCard(cards[i]))
        board.appendChild(card)
        cards.push(card)
    }

    target.appendChild(board)
    fadeIn(target)
}

export function endGame(target){
    fadeOut(target)

    cards.forEach(card => board.removeChild(card))
    target.removeChild(board)

    cards = []
    board = null
}