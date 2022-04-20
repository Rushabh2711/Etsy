const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    user_id: {type: String},
    image: {type: String},
    name: {type: String},
},
{
    versionKey: false
})

const ShopModel = mongoose.model('shop', shopSchema);
module.exports = ShopModel;