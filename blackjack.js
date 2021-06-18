const newGame = document.getElementById('newGame');
const stayButton = document.getElementById('stay');
const hitButton  = document.getElementById('hit');
const playHand = document.getElementById('playHand');
const compHand = document.getElementById('compHand');
const wins = document.getElementById('wins');
const losses = document.getElementById('losses');
const ties = document.getElementById('ties');

const deck = [];
const discardPile = [];
const pHand = [];
const cHand = [];
const suitList = ["club", "heart", "diamond", "spade"];
const faceList = ["jack", "queen", "king"];
let win = 0;
let loss = 0;
let tie = 0;
let gameRunning = false;
let playerTurn = false;

newGame.addEventListener('click', e =>
{
    if(gameRunning == false)
    {
        playHand.innerHTML = "";
        compHand.innerHTML = "";
        startGame();

    }
})

stayButton.addEventListener('click', e =>
{
    playerTurn = false;
    compTurn();
})

hitButton.addEventListener('click', e =>
{
    if(playerTurn == true)
    {
        deal(pHand);
        console.log(pHand);
    }
})

for(let i = 0; i < 4; i++)
{
    for(let j = 2; j <= 10; j++)
    {
        deck.push({value: j, face: j, suit: suitList[i]})
    }

    for(let j = 0; j < 3; j++)
    {
        deck.push({value: 10, face: faceList[j], suit: suitList[i]})
    }

    deck.push({value: 11, face: "ace", suit: suitList[i]})
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function deal(hand){
    if (deal.length < 10)
    {
        refillDeck();
    }
    hand.push(deck.pop())
    if (hand === cHand)
    {
        let temp = document.createElement('div');
        temp.innerText = cHand[cHand.length - 1].face;
        temp.classList.add('card');
        compHand.append(temp);
    }
    else
    {
        let temp = document.createElement('div');
        temp.innerText = pHand[pHand.length - 1].face;
        temp.classList.add('card');
        playHand.append(temp);
    }
    if(checkScore(pHand) > 21)
    { 
        playerTurn = false;
        endGame();
       
    }
    else if (checkScore(hand) === 21)
    {
        playerTurn = false;
        endGame();
    }
}

function discard(){
    while (cHand.length > 0)
    {
        discardPile.push(cHand.pop());
    }
    while (pHand.length > 0)
    {
        discardPile.push(pHand.pop());
    }
}

function refillDeck()
{
    while (discardPile.length > 0)
    {
        deck.push(discardPile.pop());
    }
    shuffle(deck);
}

function checkScore(hand) {
    let total = 0;
    for(let i = 0; i < hand.length; i++)
    {
        total += hand[i].value;
    }
    return total;
}

function compTurn() {
    while(checkScore(cHand) < 17)
    {
        deal(cHand);
    }

    endGame();
}

function compareScore()
{
    if (checkScore(cHand) === checkScore(pHand))
    {
        ties.innerText++;;
        gameRunning = false;
    }
    else if (checkScore(cHand) > checkScore(pHand))
    {
        losses.innerText++;;
        gameRunning = false;
    }
    else
    {
        wins.innerText++;
        gameRunning = false;
    }
}

function endGame(){
    if(checkScore(pHand) > 21){
        losses.innerText++;;
        gameRunning = false;
    }
    else if (checkScore(cHand) > 21){
        wins.innerText++;
        gameRunning = false;
    }
    else 
    {
        compareScore();
    }
}

function startGame()
{
    if(gameRunning == false)
    {
        gameRunning = true;
        discard();
        refillDeck();
    
        deal(pHand);
        deal(cHand);
        deal(pHand);
        console.log(pHand)
        console.log(cHand)
        if(gameRunning = true)
        {
            deal(cHand);
            playerTurn = true;
            console.log(pHand)
            console.log(cHand)
        }
    }

}