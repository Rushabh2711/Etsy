const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    shop_id: {type: String}, 
    category: {type: String}, 
    count: {type: Number}, 
    name: {type: String},
    image: {type: String}, 
    description: {type: String}, 
    price: {type: String}, 
    sell_count: {type: Number}
},
{
    versionKey: false
})

const ProductModel = mongoose.model('product', productSchema);
module.exports = ProductModel;