const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
    toppings: String,
    price: Number
});

const Topping = mongose.model('Topping', toppingSchema);
module.export = router;