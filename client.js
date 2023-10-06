const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://designerstudio:designerstudio@cluster0.fwu1tlc.mongodb.net/";

const client = new MongoClient(uri);

module.exports = client;
