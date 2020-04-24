const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  pizzaName: {
    type: String,
    required: [true, 'Please enter pizza name.']
  },
  pizzaSize: {
    type: [String],
    enum: ['small', 'medium','large'],
    default: 'small',
  },
  pizzaPrice: {
    type: Number,
    required: [true, 'Please mention pizza price.'],
  },
  pizzaImage: {
    type: String,
    required: [true, 'Please enter image url'],    
  }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;