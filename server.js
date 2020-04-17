const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const users = require('./server/route/User/user');

const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use('/api', users);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/mean-app/index.html'));
});

const db = 'mongodb://localhost:27017/pizza-ordering-system';
mongoose.Promise = global.Promise;

//Connect to DB
mongoose.connect(
    db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
      console.log("Database is connected");
    }
  );

app.listen(port, function() {
    console.log('Server running on localhost:' + port)
})