const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const API_PORT = 4000;
const app = express();
app.use(cors());
app.use(express.static(__dirname))
const router = require('./routes')

// this is our MongoDB database
const dbRoute = 'mongodb://localhost:27017/test-task'

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw({
    type: 'image/png',
    limit: '10mb'
  }));

app.use('/api', router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));