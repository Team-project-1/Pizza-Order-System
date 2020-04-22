const mongoose = require('mongoose');

//create order schema acording to requirment
const orderSchema = new mongoose.Schema({ 

    qty: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    order_amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    delivery_address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:'Pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },

},
{
    timestamps: true
});


module.exports = mongoose.model('order',orderSchema)