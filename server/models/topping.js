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

const Topping = mongose.model('Topping', toppingSchema);
module.export = router;