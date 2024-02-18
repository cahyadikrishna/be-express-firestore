const { initializeApp } = require('firebase/app');
const config = require('./config.js');

const firebase = initializeApp(config.firebaseConfig);

module.exports = firebase;
