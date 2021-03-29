const { MongoClient } = require('mongodb');

const USER = 'juan';
const PASSWORD = 'mlRfgEwPIJrt5yRk';
const CLUSTER = 'cluster0.grtfp.mongodb.net';
const DATABASE = 'academy_juan';

// Connection URI
//const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.8f3jn.mongodb.net/academy_juan?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}/${DATABASE}?retryWrites=true&w=majority`;

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

module.exports = { client };