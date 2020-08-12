const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const port = process.env.PORT || 3000;

// require('heroku-self-ping').default("https://mariadikki.herokuapp.com/");
 
const app = express();
 
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/stock', function (req, res) {
    const URL_PATH = 'http://localhost:3000/json/';
    const url = URL_PATH + req.query.symbol + '.json';

    fetch(url)
    .then(response => response.json())
    .then((json) => {
        res.send(json);
    });
});
 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);