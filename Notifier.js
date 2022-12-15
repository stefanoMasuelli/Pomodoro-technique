'use strict';

const notifier = require('node-notifier');


function notify( msg ) {
    notifier.notify(
      {
        title: 'tomato technique',
        message: msg,
        icon: './tomato.jpg',
        sound: true, 
        timeout : 5,
      }
    );
}

module.exports = notify;
