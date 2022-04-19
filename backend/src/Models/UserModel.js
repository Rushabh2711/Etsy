const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    image: {type: String},
    about: {type: String},
    dob: {type: Date},
    address: {type: String},
    country: {type: String},
    gender: {type: String},
    phoneno: {type: String},
    favorite: [{type: String}]
},
{
    versionKey: false
})

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;