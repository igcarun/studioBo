var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");

const jwtSecret = 'fbb903c9e9c1e81350e08699eac961a4e61eb314c19251ebf62f043bbd3ff0f4de560d';

var client = require('../client');
const { login, maxAge } = require('../middleware');

/* GET home page. */
router.post('/', async function(req, res, next) {
    const database = client.db('studio');
    const user = database.collection('user');
    const value = req.body;
    const cursor1 = await user.findOne(value);
    console.log('cookies :: %j', req.cookies);
    if (cursor1) {
        const token = login(value);
        res.setHeader("Content-Type", "application/json"); 
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000});
        res.send({token, message: 'login successfully'});
    }
    else res.send('Login failed, Please check username or password');
});

/* GET home page. */
router.get('/', async function(req, res, next) {
    const database = client.db('studio');
    const user = database.collection('user');
    const cursor1 = await user.find({});

    await cursor1.forEach(element => {
        console.log(element);
    });
  res.render('login', { title: 'Login' });
});

module.exports = router;
