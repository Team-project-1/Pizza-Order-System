const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizza');

// API for adding Pizza Information

router.post('/addpizza', (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "Pizza content can not be empty"
        });
    }
    if (req.body.role === "admin") {
        let pizzaData = req.body
  let pizza = new Pizza(pizzaData)
  pizza.save((err) => {
    if (err) {
        return next(err);
    }
    res.send('Pizza Added successfully')
  })
    } else {
        res.send("Only admin can create pizza");
    }  
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

router.get('/pizza/:id', function(req, res) {
    console.log('get request for a single pizza');
    Pizza.findById(req.params.id)
    .exec(function(err, pizza) {
        if(err) {
            console.log("Error retrieving pizza");
        } else {
            res.json(pizza)
        }
    })
});

// API for updating information of pizza

router.put('/pizza/:id', function(req, res) {
    if (req.body.role === "admin") {
        console.log("Update a pizza");
    Pizza.findByIdAndUpdate(req.params.id, 
        {
            $set: {pizzaName: req.body.pizzaName, pizzaSize: req.body.pizzaSize, pizzaPrice: req.body.pizzaPrice}
        },
        {
            new: true
        },
        function(err, updatedPizza) {
            if(err) {
                console.log("Error updating pizza")
            } else {
                res.json(updatedPizza)
            }
        });
    } else {
        res.send("Only admin can create pizza");
    }      
});

// Deleting pizza info with the specified pizzaId in the request

router.delete('/pizza/:id', function(req, res) {
    if (req.body.role === "admin") {
    console.log('Deleting a pizza');
    Pizza.findByIdAndRemove(req.params.id, function(err, deletedPizza) {
        if(err) {
            res.send('Error deleting pizza')
        } else {
            res.json(deletedPizza)
        }
    });
} else {
    res.send("Only admin can create pizza");
}  
});


module.exports = router;