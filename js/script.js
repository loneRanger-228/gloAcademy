"use strict";

const h1 = document.getElementsByTagName('h1')[0];
const handlerBtn = document.getElementsByClassName('handler_btn');
const screenBtn = document.querySelector('.screen-btn');
const classPercent = document.querySelectorAll('.other-items.percent');
const classNumber = document.querySelectorAll('.other-items.number');
const inputRange = document.querySelector('.rollback input[type="range"]');
const span = document.querySelector('.rollback span.range-value');
const totalInputCollection = document.getElementsByClassName('total-input');
const totalInput1 = totalInputCollection[0];
const totalInput2 = totalInputCollection[1];
const totalInput3 = totalInputCollection[2];
const totalInput4 = totalInputCollection[3];
const totalInput5 = totalInputCollection[4];
let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true ,
    rollback: 25,
    fullPrice: 0,
    servicePercentPrice:'',
    allServicePrices: 0,
    services: {},

    start: function() {
        this.asking();
        this.addPrices();
        this.getFullPrice();
        this.getServicePercentPrice();
        this.getTitle();

        this.logger();
    },
    
    isString: function(str) {
        return str != '' && isNaN(+str);
    },

    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    asking: function() {

        do {
            this.title = prompt('Как называется Ваш проект?', "Калькулятор вёрстки").trim();
        } while (!this.isString(this.title));

        for (let i = 0; i < 2; i++) {

            let name;
            let price = 0;

            do {
                name = prompt('Какие типы экранов нужно разработать?', "Простые, сложные").trim();
            } while (!this.isString(name));
            
            do {
                price = prompt('Сколько будет стоить данная работа?', '1200');
            } while (!this.isNumber(price));

            this.screens.push({id: i, name: name, price: price});
        };

        for (let i = 0; i < 2; i++) {

            let name;
            let price = 0;

            do {
                name = prompt('Какой дополнительный тип услуги нужен?', 'таймер').trim();
            } while (!this.isString(name));

            do {
                price = prompt("Сколько это будет стоить?", '600');
            } while (!this.isNumber(price));
            
            this.services[`${name}_${i}`] = +price;
        }
    
        this.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrices: function() {

        this.screenPrice = this.screens.reduce(function(sum, item) {
            return sum += +item.price;
        }, 0 );   

        for (let key in this.services) {
            this.allServicePrices += this.services[key];
        }

    },

    getRollbackMessage: function (price) {

        switch (true) {
            case price >= 30000 :
                console.log('Даем скидку в 10%');
                break;
            case price >= 15000 && price < 30000 :
                console.log('Даем скидку в 5%');
                break;
            case price < 15000 && price > 0 :
                console.log('Скидка не предусмотрена');
                break; 
            case price < 15000 && price >= 0 :
                console.log('Скидка не предусмотрена');
                break; 
            case price < 0 :
                console.log('Что то пошло не так');
                break; 
        }
    },

    getFullPrice: function () {
        this.fullPrice = +this.screenPrice + this.allServicePrices;
    },

    getTitle: function() {
        this.title = this.title.trim()[0].toUpperCase() + this.title.trim().substr(1).toLowerCase();
    },

    getServicePercentPrice: function() {
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
    },

    logger: function() {

        this.getRollbackMessage(this.fullPrice);
        console.log(`Сумма за вычетом процента: ${this.servicePercentPrice}`);
        console.log(`Стоимость вёрстки экранов - ${this.screenPrice} рублей.
             Стоимость разработки сайта - ${this.fullPrice} рублей.`);  
    },

};


appData.start();