let deck = [];
let discardPile = [];
let pHand = [];
let cHand = [];
let suitList = ["club", "heart", "diamond", "spade"];
let faceList = ["jack", "queen", "king"];

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

deal(pHand);
deal(pHand);

deal(cHand);
deal(cHand);

console.log(pHand);
console.log(cHand);

console.log(checkScore(pHand));
console.log(checkScore(cHand));

console.log(pHand);