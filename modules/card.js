const emojis = ["angryface","crazyface","cryingface","laughingface","love","loveface","monkey","moon","party","peace","poop","screamingface","sunglassesface","unicorn","watch","banana"]
let savedEmojis = []

export function drawCard(index, numberCards){
    if(index === 0) savedEmojis = randomizeEmojis(numberCards)
    
    const cardFrontImg = document.createElement('img')
    cardFrontImg.src = `assets/${savedEmojis[index]}.png`
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
    card.setAttribute("emoji", savedEmojis[index])
    card.classList.add('card')
    card.appendChild(cardInner)
    return card
}

export function flipCard(card){
    card.classList.contains('flip-card') ? card.classList.remove('flip-card') : card.classList.add('flip-card')
    return card
}

function randomizeEmojis(numberCards){
    let randomEmojis = Array(numberCards)
    let randomNumbers = []

    for(let i = 0; i < numberCards / 2; i++){
        let pass = false
        let number 
        do{
            pass = true
            number = randomInt(0, emojis.length - 1)
            for(let j = 0; j < randomNumbers.length; j++){
                if(number === randomNumbers[j] && i !== j){
                    pass = false
                    break
                }
            }
        }while(!pass)
        randomNumbers.push(number)
    }
    for(let i = 0; i < randomNumbers.length; i++){
        let number = randomNumbers[i]
        let position1
        let position2

        let pass1 = false
        do{
            position1 = randomInt(0, numberCards - 1)
            pass1 = true
            if(randomEmojis[position1]) pass1 = false
        }while(!pass1)
        randomEmojis[position1] = emojis[number]

        let pass2 = false
        do{
            position2 = randomInt(0, numberCards - 1)
            pass2 = true
            if(randomEmojis[position2]) pass2 = false
        }while(!pass2)
        randomEmojis[position2] = emojis[number]
    }

    return randomEmojis
}

function randomInt(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}