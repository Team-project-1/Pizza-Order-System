const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pizza = require('../models/pizza');

const db = "mongodb://localhost:27017/pizza-ordering-app";

mongoose.connect(db, function(err){
  if(err){
      console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')      
  }
});

// API for adding Pizza Information

router.post('/addpizza', (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Pizza content can not be empty"
        });
    }
  let pizzaData = req.body
  let pizza = new Pizza(pizzaData)
  pizza.save((err) => {
    if (err) {
        return next(err);
    }
    res.send('Pizza Added successfully')
  })
})

// API for getting information of all types of pizzas available in the store

router.get('/allpizzas', function(req, res) {
    console.log('All pizzas info');
    Pizza.find()
    .then(pizzas => {
        res.send(pizzas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving pizzas info."
        })
    })
})

// API for getting information of particular pizza by id

router.get('pizza/:pizzaid', function(req, res) {
    Pizza.findById(req.params.pizzaId)
    .then(pizza => {
        if(!pizza) {
            return res.status(404).send({
                message: "Pizza not found with id " + req.params.pizzaId
            });            
        }
        res.send(pizza);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pizza not found with id " + req.params.pizzaId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving pizza with id " + req.params.pizzaId
        })
    })
})

// API for updating information of pizza

router.get('pizza/:pizzaid', function(req, res) {
    let pizzaData = req.body
    if(!req.body) {
        return res.status(400).send({
            message: "Pizza content can not be empty"
        });
    }

    // Find and update pizza info with the request body
    Pizza.findByIdAndUpdate(req.params.pizzaId, {
        pizzaData
    }, {new: true})
    .then(pizza => {
        if(!pizza) {
            return res.status(404).send({
                message: "Pizza not found with id " + req.params.pizzaId
            });
        }
        res.send(pizza);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pizza not found with id " + req.params.pizzaId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating pizza with id " + req.params.pizzaId
        })
    })
})

// Deleting pizza info with the specified pizzaId in the request
router.get('pizza/:pizzaid', function(req, res) {
    Pizza.findByIdAndRemove(req.params.pizzaId)
    .then(pizza => {
        if(!pizza) {
            return res.status(404).send({
                message: "Pizza not found with id " + req.params.pizzaId
            });
        }
        res.send({message: "Pizza info deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Pizza not found with id " + req.params.pizzaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete pizza with id " + req.params.pizzaId
        })
    })
})


module.exports = router;