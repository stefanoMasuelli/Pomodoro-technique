'use strict';

const inquirer = require('inquirer');
const Pomodoro = require('./Tomato.js');

const questions = [
  {
    name: 'total',
    message: 'Ore di lavoro totali?',
    default : 1.667,
  },
  {
    name: 'tomato',
    message: 'Durata di un pomodoro?',
    default : 25,
  },
  {
    name: 'shortPause',
    message: 'Durata della pausa breve?',
    default : 5,
  },
  {
    name: 'longPause',
    message: 'Durata della pausa lunga?',
    default : 30,
  },
  {
    name: 'cycle',
    message: 'Numero cicli?',
    default : 4,
  },
];


inquirer
  .prompt( questions )
  .then(answers => {

    const total = parseFloat(answers.total) ;
    const tomato = parseInt(answers.tomato);
    const shortPause = parseInt(answers.shortPause);
    const longPause = parseInt(answers.longPause);
    const cycle = parseInt(answers.cycle);

    const pomodoro = new Pomodoro( total,tomato,shortPause,longPause,cycle );
    
    pomodoro.startTomato(); 
})







//togliere start work,
//usare ore,
//gestire remaining time a 0 o ultimo pomodoro con t = remaining time
