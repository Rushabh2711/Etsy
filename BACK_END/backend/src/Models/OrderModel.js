const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {type: String},
    price: {type: String},
    date: {type: Date},
    products: [],
},
{
    versionKey: false
})

const OrderModel = mongoose.model('order', orderSchema);
module.exports = OrderModel;