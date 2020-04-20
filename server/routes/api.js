const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const db = 'mongodb+srv://amit230:Ajay230@database-rglvf.mongodb.net/test?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;

//Connect to DB
mongoose.connect(
    db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
    () => {
      console.log("Database is connected");
    }
  );

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'Pizza-Ordering-Systems-SecretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

// router.get('/events', (req,res) => {
//   let events = [
//     {
//       "_id": "1",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "2",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "3",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "4",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "5",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "6",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     }
//   ]
//   res.json(events)
// })

// API FOR DIFFERENT TYPES OF PIZZAS

router.get('/pizza', verifyToken, (req, res) => {
  let pizza = [
    {
      "_id": "1",
      "name": "Margherita",
      "size": "small",
      "price": "75"
    },
    {
      "_id": "2",
      "name": "Fresh Veggie",
      "size": "small",
      "price": "130"
    },
    {
      "_id": "3",
      "name": "Country Special",
      "size": "small",
      "price": "150"
    },
    {
      "_id": "4",
      "name": "Farmhouse",
      "size": "small",
      "price": "175"
    },
    {
      "_id": "5",
      "name": "Mexican Green Wave",
      "size": "small",
      "price": "190"
    },
    {
      "_id": "6",
      "name": "Barbeque Chicken",
      "size": "small",
      "price": "210"
    },
    {
      "_id": "7",
      "name": "Chicken Mexicana",
      "size": "small",
      "price": "225"
    },
    {
      "_id": "8",
      "name": "Margherita",
      "size": "medium",
      "price": "180"
    },
    {
      "_id": "9",
      "name": "Fresh Veggie",
      "size": "medium",
      "price": "265"
    },
    {
      "_id": "10",
      "name": "Country Special",
      "size": "medium",
      "price": "280"
    },
    {
      "_id": "11",
      "name": "Farmhouse",
      "size": "medium",
      "price": "325"
    },
    {
      "_id": "12",
      "name": "Mexican Green Wave",
      "size": "medium",
      "price": "350"
    },
    {
      "_id": "13",
      "name": "Barbeque Chicken",
      "size": "medium",
      "price": "370"
    },
    {
      "_id": "14",
      "name": "Chicken Mexicana",
      "size": "medium",
      "price": "390"
    },
    {
      "_id": "15",
      "name": "Margherita",
      "size": "large",
      "price": "330"
    },
    {
      "_id": "16",
      "name": "Fresh Veggie",
      "size": "large",
      "price": "425"
    },
    {
      "_id": "17",
      "name": "Country Special",
      "size": "large",
      "price": "450"
    },
    {
      "_id": "18",
      "name": "Farmhouse",
      "size": "large",
      "price": "490"
    },
    {
      "_id": "19",
      "name": "Mexican Green Wave",
      "size": "large",
      "price": "520"
    },
    {
      "_id": "20",
      "name": "Barbeque Chicken",
      "size": "large",
      "price": "525"
    },
    {
      "_id": "21",
      "name": "Chicken Mexicana",
      "size": "large",
      "price": "540"
    }
  ]
  res.json(pizza)
})
// ----------------------------------------------------

// API FOR RETREIVING USERS

router.get('/users', function(req, res) {
  console.log('get request for all users');
  User.find({})
  .exec(function(err, users) {
      if(err) {
          console.log("Error retrieving users");
      } else {
          res.json(users)
      }
  })
});
// ------------------------------------------------------------

// API FOR RETRIEVING SINGLE USER 

router.get('/user/:id', function(req, res) {
  console.log('get request for a single user');
  User.findById(req.params.id)
  .exec(function(err, user) {
      if(err) {
          console.log("Error retrieving user");
      } else {
          res.json(user)
      }
  })
});
// --------------------------------------------------------------

// API FOR REGISTRATION

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'Pizza-Ordering-Systems-SecretKey')
      res.status(200).send({token})
    }
  })
})
// ------------------------------------------------------

// API FOR LOGIN

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({username: userData.username}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid username')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'Pizza-Ordering-Systems-SecretKey')
        res.status(200).send({token})
      }
    }
  })
})
// --------------------------------------------------------------

module.exports = router;