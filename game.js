const readlineSync = require('readline-sync');

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const ranksPerValue =  {"A":1, "2":2, "3":3,  "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":0, "J":0, "Q":0, "K":0};

function createDeck() {
    deck = []
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({suit, rank});
        }
    }
    return deck;
}


function shuffleDeck(deck) {
    let currentIndex = deck.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
    return deck;
}

const calculateCardValue = (cards) => {
    return cards.reduce((acc, card) => acc + ranksPerValue[card.rank], 0) % 10;
}

function playRound(bettingCoin){

    const shuffledDeck = shuffleDeck(createDeck());
    const player1Cards = shuffledDeck.slice(0, 2);
    const player2Cards = shuffledDeck.slice(2, 4);

    console.log(`You got ${player1Cards[0].suit}-${player1Cards[0].rank}, ${player1Cards[1].suit}-${player1Cards[1].rank}`)
    console.log(`The dealer got ${player2Cards[0].suit}-${player2Cards[0].rank}, ${player2Cards[1].suit}-${player2Cards[1].rank}`)

    const player1CardsValue = calculateCardValue(player1Cards)
    const player2CardsValue = calculateCardValue(player2Cards) 
    // console.log(`Your card value is ${player1CardsValue}`)
    // console.log(`The dealer card value is ${player2CardsValue}`)
    if (player1CardsValue > player2CardsValue) {
        console.log(`You won!!!, received ${bettingCoin} chips`)
        return bettingCoin
    }else if (player1CardsValue < player2CardsValue) {
        console.log(`You lose!!!, lost ${bettingCoin} chips`)
        return -bettingCoin
    }else {
        console.log(`It's a tie!!!, received nothing`)
        return 0
    }
}
//Main game loop
function main() {
    let netChips = 0
    while (true) {
        const bettingCoin = parseInt(readlineSync.question('Please put your bet\n'));
        if (isNaN(bettingCoin) || bettingCoin <= 0) {
            console.log('Please put a valid bet')
            continue
        }

        const roundResult = playRound(bettingCoin);
        netChips += roundResult

        let playAgain = readlineSync.question('Wanna play more (Yes/No)?\n');
        while (playAgain.toLowerCase() !== 'yes' && playAgain.toLowerCase() !== 'no') {
            console.log('Please enter a valid input')
            playAgain = readlineSync.question('Wanna play more (Yes/No)?\n');
            continue
        }
        if (playAgain.toLowerCase() === 'no') {
            break
        }

        console.log()
    }

    if (netChips > 0) {
        console.log(`You got a total of ${netChips} chips.`)
    }else if (netChips < 0) {
        console.log(`You lose a total of ${Math.abs(netChips)} chips.`)
    }else {
        console.log(`You ended up with no chips.`)
    }

}
main();