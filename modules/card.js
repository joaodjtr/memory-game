export function drawCard(){
    const cardFrontImg = document.createElement('img')
    cardFrontImg.src = 'https://images.pexels.com/photos/3014011/pexels-photo-3014011.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    const cardFront = document.createElement('div')
    cardFront.appendChild(cardFrontImg)
    cardFront.classList.add('card-front')
    const cardBack = document.createElement('div')
    cardBack.classList.add('card-back')
    const cardInner = document.createElement('div')
    cardInner.classList.add('card-inner')
    cardInner.appendChild(cardFront)
    cardInner.appendChild(cardBack)
    const card = document.createElement('div')
    card.classList.add('card')
    card.appendChild(cardInner)
    return card
}

export function flipCard(card){
    card.classList.contains('flip-card') ? card.classList.remove('flip-card') : card.classList.add('flip-card')
}