const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Topping = require('../models/topping');

const db = "mongodb://localhost:27017/pizza-ordering-app";

mongoose.connect(db, function(err) {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
});

// API for adding Topping Information

router.post('/addtopping', (req, res) => {

    let toppingData = req.body
    let topping = new Topping(toppingData)
    topping.save((err) => {
        if (err) {
            return next(err);
        }
        res.send('Topping Added successfully')
    })
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

router.get('topping/:toppingid', function(req, res) {
    Topping.findById(req.params.toppingId)
        .then(topping => {
            if (!topping) {
                return res.status(404).send({
                    message: "Topping not found with id " + req.params.toppingId
                });
            }
            res.send(topping);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Topping not found with id " + req.params.toppingId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving topping with id " + req.params.toppingId
            })
        })
})

// API for updating information of topping

router.get('topping/:toppingid', function(req, res) {
    let toppingData = req.body
    if (!req.body) {
        return res.status(400).send({
            message: "Topping content can not be empty"
        });
    }

    // Find and update topping info with the request body
    Topping.findByIdAndUpdate(req.params.toppingId, {
            toppingData
        }, { new: true })
        .then(topping => {
            if (!topping) {
                return res.status(404).send({
                    message: "Topping not found with id " + req.params.toppingId
                });
            }
            res.send(topping);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Topping not found with id " + req.params.toppingId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating topping with id " + req.params.toppingId
            })
        })
})

// Deleting topping info with the specified toppingId in the request
router.get('topping/:toppingid', function(req, res) {
    Topping.findByIdAndRemove(req.params.toppingId)
        .then(topping => {
            if (!topping) {
                return res.status(404).send({
                    message: "Topping not found with id " + req.params.toppingId
                });
            }
            res.send({ message: "Topping info deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Topping not found with id " + req.params.toppingId
                });
            }
            return res.status(500).send({
                message: "Could not delete topping with id " + req.params.toppingId
            })
        })
})


module.exports = router;