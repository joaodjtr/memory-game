"use strict"

import {fadeIn, fadeOut} from './helper.js'

let board
let cards = []

export function drawGame(numberCards, target){

    board = document.createElement('DIV')
    board.classList.add('board', `board-${numberCards}`)
    target.appendChild(board)

    for(let i = 0; i < numberCards; i++){
        let card = document.createElement('DIV')
        card.classList.add('card')
        board.appendChild(card)
        cards.push(card)
    }

    fadeIn(target)
}

export function endGame(target){
    fadeOut(target)

    cards.forEach(card => board.removeChild(card))
    target.removeChild(board)

    cards = []
    board = null
}