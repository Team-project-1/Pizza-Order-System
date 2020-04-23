const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Topping = require('../models/topping');

const db = "mongodb://localhost:27017/pizza-ordering-app";

mongoose.connect(db, function(err){
  if(err){
      console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')      
  }
});

// API for adding Topping Information

router.post('/addtopping', (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Topping content can not be empty"
        });
    }
    if (req.body.role === "admin") {
    let toppingData = req.body
    let topping = new Topping(toppingData)
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

// API for getting information of all types of topping available in the store

router.get('/alltoppings', function(req, res) {
    console.log('All toppings info');
    Topping.find()
    .then(toppings => {
        res.send(toppings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving toppings info."
        })
    })
})

// API for getting information of particular topping by id

router.get('/topping/:id', function(req, res) {
    console.log('Get request for info of particular topping');
    Topping.findById(req.params.id)
    .exec(function(err, topping) {
        if(err) {
            console.log("Error retrieving topping info");
        } else {
            res.json(topping)
        }
    })
});

// API for updating information of topping

router.put('/topping/:id', function(req, res) {
    if (req.body.role === "admin") {
        console.log("Updating topping info");
        Topping.findByIdAndUpdate(req.params.id, 
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

// Deleting topping info with the specified toppingId in the request

router.delete('/topping/:id', function(req, res) {
    if (req.body.role === "admin") {
    console.log('Deleting topping info');
    Topping.findByIdAndRemove(req.params.id, function(err, deletedTopping) {
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


module.exports = router; 