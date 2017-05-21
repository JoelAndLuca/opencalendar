const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://techUser1:Z=BHT/jEpOLtA()>E-nu<a*q=jcqJVq}@cluster0-shard-00-00-eatwn.mongodb.net:27017,cluster0-shard-00-01-eatwn.mongodb.net:27017,cluster0-shard-00-02-eatwn.mongodb.net:27017/opencalendar?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
mongoose.Promise = global.Promise;

// CORS fix
var allowCrossdomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossdomain);
app.use('/api', routes);
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(422).send({error: err.message});
});

var port = process.env.port || 4000;
app.listen(port, function(req, res) {
    console.log("Listening on port " + port);
});