const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
    toppingName:{
        type: String,
        required: [true, 'Please enter topping name.']
      },
    toppingPrice: {
        type: Number,
        required: [true, 'Please mention topping price.'],
      },
});

const Toppings = mongoose.model('Topping', toppingSchema);
module.exports = Toppings;
