const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Toppings = require('../models/topping');
const User = require('../models/user');

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


// API for adding Topping Information

router.post('/addtopping', verifyToken, (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Topping content can not be empty"
        });
    }
    if (req.user === "admin") {
    let toppingData = req.body
    let topping = new Toppings(toppingData)
    topping.save((err) => {
    if (err) { 
        return next(err);
    }
    res.send('Topping Added successfully')
  })
    } else {
        res.send("Only admin can add topping");
    }  
})

// -----------------------------------------------------------------------------

// API for getting information of all types of topping available in the store

router.get('/alltoppings', function(req, res) {
    console.log('All toppings info');
    Toppings.find()
    .then(toppings => {
        res.send(toppings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving toppings info."
        })
    })
})

// -----------------------------------------------------------------------------

// API for getting information of particular topping by id

router.get('/topping/:id', function(req, res) {
    console.log('Get request for info of particular topping');
    Toppings.findById(req.params.id)
    .exec(function(err, topping) {
        if(err) {
            console.log("Error retrieving topping info");
        } else {
            res.json(topping)
        }
    })
});

// -----------------------------------------------------------------------------

// API for updating information of topping

router.put('/topping/:id', verifyToken, function(req, res) {
    if (req.user === "admin") {
        console.log("Updating topping info");
        Toppings.findByIdAndUpdate(req.params.id, 
        {
            $set: {toppingName: req.body.toppingName, toppingPrice: req.body.toppingPrice}
        },
        {
            new: true
        },
        function(err, updatedTopping) {
            if(err) {
                console.log("Error updating topping info")
            } else {
                res.json(updatedTopping)
            }
        });
    } else {
        res.send("Only admin can update topping info");
    }      
});

// -----------------------------------------------------------------------------

// Deleting topping info with the specified toppingId in the request

router.delete('/topping/:id', verifyToken, function(req, res) {
    if (req.user === "admin") {
    console.log('Deleting topping info');
    Toppings.findByIdAndRemove(req.params.id, function(err, deletedTopping) {
        if(err) {
            res.send('Error deleting topping info')
        } else {
            res.json(deletedTopping)
        }
    });
} else {
    res.send("Only admin can delete topping info");
}  
});

// -----------------------------------------------------------------------------

module.exports = router; 