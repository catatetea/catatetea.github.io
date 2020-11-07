"use strict";

var Color;
(function (Color) {
    Color["Red"] = "#f00";
    Color["Black"] = "#000";
})(Color || (Color = {}));

var Deck = /** @class */ (function () {
    function Deck() {
        this.cardSuits = [
            {
                value: "♠",
                color: Color.Black,
            },
            {
                value: "♣",
                color: Color.Black,
            },
            {
                value: "♥",
                color: Color.Red,
            },
            {
                value: "♦",
                color: Color.Red,
            },
        ];
        
        this.cardValues = [
            {
                value: "6",
                rule: "Ничего"
            },
            {
                value: "7",
                rule: "Считаем (кроме семерок)"
            },
            {
                value: "8",
                rule: "Пей и выбирай с кем"
            },
            {
                value: "9",
                rule: "Действие перед тем как выпить"
            },
            {
                value: "10",
                rule: "Задавай вопросы на зло другим"
            },
            {
                value: "J",
                rule: "Категория"
            },
            {
                value: "Q",
                rule: "Реакция. Кто последний, тот пьет"
            },
            {
                value: "K",
                rule: "Выбирай кто пьет"
            },
            {
                value: "A",
                rule: "Пей сам"
            }
        ];
        this.deck = [];
        this.currentCardIndex = 0;
        this.initDeck();
    }
    Deck.prototype.initDeck = function () {
        var _this = this;
        this.deck = [];
        this.cardSuits.forEach(function (suit) {
            _this.cardValues.forEach(function (value) {
                _this.deck.push({
                    value: "" + value.value + suit.value,
                    rule: value.rule,
                    color: suit.color,
                });
            });
        });
        this.currentCardIndex = 0;
        this.shuffle();
    };
    Deck.prototype.shuffle = function () {
        var j, temp;
        for (var i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.deck[j];
            this.deck[j] = this.deck[i];
            this.deck[i] = temp;
        }
    };
    Deck.prototype.turnCard = function () {
        if (this.currentCardIndex < this.deck.length) {
            this.currentCardIndex += 1;
        }
    };
    Deck.prototype.getCurrentCard = function () {
        return this.deck[this.currentCardIndex];
    };
    return Deck;
}());

var card = document.querySelector('.card');
var back = document.querySelector('.back');
var marks = document.querySelectorAll('.js-mark');
var rule = document.querySelector('.js-rule');
var hideBack = 'back--hide';

var deck = new Deck();

console.log(deck.deck)

function renderSuit() {
    if (deck.getCurrentCard()) {
        if (!back.classList.contains(hideBack)) {
            back.classList.add(hideBack);
        }

        marks.forEach((mark) => {
            mark.innerHTML = deck.getCurrentCard().value;
        });
        card.style.color = deck.getCurrentCard().color;
        rule.innerHTML =  deck.getCurrentCard().rule;
    } else {
        if (back.classList.contains(hideBack)) {
            back.classList.remove(hideBack);
        }
        deck.initDeck();
    }
};

back.addEventListener('click', function() {
    renderSuit();
});

card.addEventListener('click', function() {
    deck.turnCard();
    renderSuit();
});
