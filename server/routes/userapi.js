const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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
      console.log(err.errmsg)
      res.send(err.errmsg)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'Pizza-Ordering-Systems-SecretKey')
      res.status(200).send({token})
    }
  })
})
// ------------------------------------------------------------------------

// API FOR LOGIN

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({name: userData.name}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid name')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id, role: user.role}
        let token = jwt.sign(payload, "Pizza-Ordering-Systems-SecretKey")
        console.log(token)
        res.status(200).send({token, user})
      }
    }
  })
})
// --------------------------------------------------------------

// API FOR DELETING USER 

router.delete('/user/:id', verifyToken, function(req, res) {
  if (req.user === "admin") {
  console.log('Deleting a user');
  User.findByIdAndRemove(req.params.id, function(err, deletedUser) {    
      if(err) {
          res.send('Error deleting user')
      } else {
          res.json(deletedUser)
      }
  });
} else {
  res.send("Only admin can delete user");
}  
});

// -------------------------------------------------------------- 

// MIDDLEWARE TO VERIFY TOKEN 

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
  const user = User.findOne({ _id: payload.subject, 'tokens.token': token, 'role': payload.role })
  req.userId = payload.subject  
  req.user = payload.role
  next()
}

// -----------------------------------------------------------------------------

module.exports = router;