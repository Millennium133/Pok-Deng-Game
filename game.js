const readlineSync = require('readline-sync');



function shuffling(decks) {
    let currentIndex = decks.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // console.log(decks);
        [decks[currentIndex], decks[randomIndex]] = [decks[randomIndex], decks[currentIndex]];
        // console.log(decks)
    }
    return decks;

}


// const a = shuffling ([1,2,3,4,5,6,7,8,9,10]);
function playing(){
    const bettingInput = readlineSync.question('Please put your bet\n');
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const decks = [];
    const players = [];
    const createDeck = () => {
        for (let suit of suits) {
            for (let rank of ranks) {
                decks.push({suit, rank});
            }
        }
        return decks;
    }
    const shuffledDeck = shuffling(createDeck());
    const player1Cards = shuffledDeck.slice(0, 2);
    const player2Cards = shuffledDeck.slice(2, 4);
    console.log(`You got ${player1Cards[0]['suits']}-${player1Cards[0]['ranks']}, ${player1Cards[1]['suits']}-${player1Cards[1]['ranks']}`)
    console.log(`The dealer got ${player2Cards[0]['suits']}-${player2Cards[0]['ranks']}, ${player2Cards[1]['suits']}-${player2Cards[1]['ranks']}`)

    const calculateCardValue = (cards) => {
        let sum = 0;
        ranksPerValue =  {"A":1, "2":2, "3":3,  "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":0, "J":0, "Q":0, "K":0};
        for (let card of cards) {
            sum += ranksPerValue[card['rank']]
        }
        sum %= 10 
        return sum
    }
    const player1CardsValue = calculateCardValue(player1Cards)
    const player2CardsValue = calculateCardValue(player2Cards) 
    console.log()
    if (player1CardsValue > player2CardsValue) {
        bettingCoin *= 2
        console.log(`You won!!!, received ${bettingInput} chips`)
    }else if (player1CardsValue < player2CardsValue) {
        bettingCoin = 0
        console.log(`You lose!!!, losed ${bettingInput} chips`)
    }


}
// playing();