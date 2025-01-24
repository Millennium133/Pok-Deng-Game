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

function playingPokdeng(bettingCoin){
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const decks = [];
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

    console.log(`You got ${player1Cards[0]['suit']}-${player1Cards[0]['rank']}, ${player1Cards[1]['suit']}-${player1Cards[1]['rank']}`)
    console.log(`The dealer got ${player2Cards[0]['suit']}-${player2Cards[0]['rank']}, ${player2Cards[1]['suit']}-${player2Cards[1]['rank']}`)

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
    if (player1CardsValue > player2CardsValue) {
        console.log(`You won!!!, received ${bettingCoin} chips`)
    }else if (player1CardsValue < player2CardsValue) {
        bettingCoin = -bettingCoin
        console.log(`You lose!!!, losed ${bettingCoin} chips`)
    }else {
        bettingCoin = 0
        console.log(`You Tie!!!, received nothing`)

    }
    return bettingCoin
}

function main() {
    let net_chip = 0
    while (true) {
        const bettingCoin = readlineSync.question('Please put your bet\n');
        const money = playingPokdeng(bettingCoin);
        net_chip += parseInt(money)
        const playAgain = readlineSync.question('Wanna play more (Yes/No)?\n');
        console.log()
        if (playAgain === 'No') {
            break
        }
    }
    if (net_chip > 0) {
        console.log(`You got total ${net_chip} chips`)
    }else if (net_chip < 0) {
        net_chip = Math.abs(net_chip)
        console.log(`You lose total ${net_chip} chips`)
    }else {
        console.log(`You got nothing`)
    }

}
main()