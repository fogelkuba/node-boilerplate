const m = 53;
const a = 54;

// x[0] = o
// delete x[0]

const n = 1000;

/////////////////////////////////////////////////////////////////////////////////////


function rand () {
    const m = process.hrtime();
    let r = parseInt((Math.floor((((m[1] - m[0]) / 3)) * 27 / 11)));
    return r > 63 ? r : m * r
};

function shuffleDeck() {
    const c = rand();
    const deck = [0];

    for (let i = 1; i <= 52; i++ ) {
        //getCard
        const getCard = (a * (deck[i - 1]) + c) % m;
        deck.push(getCard)
    }
    deck.shift();
    return deck
};


function decodeCardValue(card) {
    let result = (card % 13);

    if (result <= 9) {
        return result + 1

    } else if (result >= 9 && result < 13) {
        return 10

    } else {
        return 11
    }
}

function playGame() {
    const newDeck = shuffleDeck();
    let result = 0;
    let i = 0;

    do {
        i = i + 1;
        result = result + newDeck[i];
    } while (result < 21);

    if (result === 21) {
        return {
            status: 'WINNER',
            cards: newDeck.slice(0, i).map(card => decodeCardValue(card))
        }
    } else {
        return {
            status: 'LOSER',
            cards: newDeck.slice(0, i).map(card => decodeCardValue(card))
        }
    }
}

// console.log(playGame());


const games = [];

for (let i = 0; i < 1000; i++) {
    games.push(playGame());
}

console.log(games);

