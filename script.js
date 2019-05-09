var colorBackCard = "#a0a0ff";
var cardsState = [16];
var cardsEmoji = [16];
var emojis = ["angry-face","grinning-face","in-love-face","monkey-emoji",
                "moon-emoji","poop-emoji","screaming-face","sunglasses-face"];
var valueCards;
var nCards;
var nPlay = 0;
var nCorrect = 0;
var nWrong = 0;
var prevPlay;
var cardA;
var cardP;
for(var i = 0; i < 16; i++){
    cardsState[i] = 3;
}

// BUILDING

function init(nCards){
    this.nCards = nCards;
    createBoard(nCards);
}

function initGame(){
    var btn = document.getElementById("btn-init-"+nCards);
    btn.style.opacity = 0;
    btn.style.cursor = "default";
    for(var i = 0; i < 16; i++){
        cardsState[i] = 0;
    }
}

function createBoard(nCards){
    var game = document.getElementsByClassName("game-"+nCards)[0];
    var board = document.getElementsByClassName("board-"+nCards)[0];
    game.style.top = 0;
    generateCards(nCards, game, board);
}

function generateCards(nCards, game, board){
    valueCards = [nCards];
    valueCards = randomValue(nCards, valueCards);
    for(var i = 0; i < nCards; i++){
        var card = document.getElementsByClassName('card-'+nCards)[i];
        cardsEmoji[i] = valueCards[i];
        resizeCards(card, board, nCards);
    }
    console.log(valueCards);
    // showCards();
    // setTimeout(stopShowingCards, 1000);
}

function randomValue(nCards, valueCards){
    var value;
    for(var i = 0, count = 0; i < nCards;){
        value = Math.floor(Math.random() * nCards/2) + 0;
        for(var j = 0; j < i; j++){
            if(i>0){
                if(valueCards[j] == value){
                    count++;
                }
            }
        }
        if(count>1){
            value = Math.floor(Math.random() * nCards/2) + 0;
            count = 0;
        }else{
            valueCards[i] = value;
            i++;
        }
    }
    // console.log(valueCards, nCards);
    return valueCards;
}

function resizeCards(card, board, nCards){
    if(nCards == 8){
        card.style.height = "200px";
        card.style.width = "150px";
        board.style.width = "680px";
    
    }else if(nCards == 12){
        card.style.height = "150px";
        card.style.width = "100px";
        board.style.width = "480px";
    }else if(nCards == 16){
        card.style.height = "100px";
        card.style.width = "75px";
        board.style.width = "380px"
    }else{
        alert("Erro na geração de cartas!");
    }
}

function closeGame(){ 
    var game = document.getElementsByClassName("game-"+nCards)[0];
    game.style.top = "100%";
    removeBoard();
}

function removeBoard(){
    for(var i = 0; i < nCards; i++){
        var card = document.getElementsByClassName("card-"+nCards)[i];
        card.classList.remove("correctP");
        void card.offsetWidth;
        turnCard(i, true);
    }
    nPlay = 0;
    nCorrect = 0;
    nWrong = 0;
    for(var i = 0; i < 16; i++){
        cardsState[i] = 3;
    }
    var scoreboard = document.getElementById("scoreboard-"+nCards);
    scoreboard.style.bottom = "-150px";
    var win = document.getElementById("win-game-"+nCards);
    win.style.transform = "scale(0,0)";
    document.getElementById("btn-init-"+nCards).style.opacity = 1;
    document.getElementById("btn-init-"+nCards).style.cursor = "pointer";
}

// LOGICAL

function turnCard(n, reset){
    var card = document.getElementsByClassName("card-"+nCards)[n];    

    if(reset){
        card.style.background = colorBackCard;
        cardsState[n] = 0;
    }else{

        if(cardsState[n] == 0){
            setBackgroundCard(card, n);
            cardsState[n] = 1;

            if(nPlay %2 != 0 && nPlay > 0){
                checkPlay(n, prevPlay);
            }else if(nPlay %2 == 0){
                prevPlay = n;
            }else if(nPlay == 0){
                prevPlay = n;
            }

            nPlay++;
        }else if(cardsState[n] == 1 ){
            card.style.background = colorBackCard;
            cardsState[n] = 0;
            nPlay++;
        }
        
        if(nCorrect == nCards/2){
            finishGame();
        }
    }
}

function setBackgroundCard(c, n){
    c.style.background = "url('assets/emojis/"+emojis[valueCards[n]]+".png')";
    c.style.backgroundRepeat = "no-repeat";
    c.style.backgroundPosition = "center";
}

function checkPlay(actualPlay, prevPlay){
    cardA = document.getElementsByClassName("card-"+nCards)[actualPlay];
    cardP = document.getElementsByClassName("card-"+nCards)[prevPlay];
    if(valueCards[actualPlay] == valueCards[prevPlay]){
        // console.log("Certo!!!");
        setTimeout(correctPlay, 500);
        cardsState[actualPlay] = 2;
        cardsState[prevPlay] = 2;
        nCorrect++;
    }else{
        // console.log("Errado!");
        setBackgroundCard(cardA, actualPlay);
        setBackgroundCard(cardP, prevPlay);
        var time = setTimeout(wrongPlay, 250);
        cardsState[actualPlay] = 0;
        cardsState[prevPlay] = 0;
        nWrong++;
    }
}

// ANIMATIONS AND TRANSITIONS

function showScoreboard(){
    var scoreboard = document.getElementById("scoreboard-"+nCards);
    scoreboard.style.bottom = "30px";
    console.log(scoreboard.offsetHeight);
}

function showCards(){
    for(var i = 0; i < nCards; i++){
        var card = document.getElementsByClassName("card-"+nCards)[i];
        setBackgroundCard(card, i);
    }
}

function stopShowingCards(){
    for(var i = 0; i < nCards; i++){
        var card = document.getElementsByClassName("card-"+nCards)[i];
        card.style.background = colorBackCard;
    }
}

function correctPlay(){
    cardA.classList.add("correctP");
    cardP.classList.add("correctP")
}

function wrongPlay(){
    cardA.style.background = colorBackCard;
    cardP.style.background = colorBackCard;
    cardA.classList.remove("shakeW");
    cardP.classList.remove("shakeW");
    void cardA.offsetWidth;
    void cardP.offsetWidth;
    cardA.classList.add("shakeW");
    cardP.classList.add("shakeW");
}

function finishGame(){
    showScoreboard();
    var win = document.getElementById("win-game-"+nCards);
    win.style.transform = "scale(1,1)";
    var nPlayli = document.getElementById("nPlay-"+nCards);
    var nCorrectli = document.getElementById("nCorrect-"+nCards);
    var nWrongli = document.getElementById("nWrong-"+nCards);
    nPlayli.innerHTML = "<b style='color: black;'>Jogadas: </b>" + nPlay/2;
    nCorrectli.innerHTML = "<b style='color: green;'>Acertos: </b>" + nCorrect + "/" + nCards/2;
    nWrongli.innerHTML = "<b style='color: red;'>Erros: </b>" + nWrong;
    console.log(nPlayli);
    console.log("Jogadas: " + nPlay/2);
    console.log("Acertos: " + nCorrect);
    console.log("Erros: " + nWrong);
}



