// const mysql = require('mysql');

// var conn = mysql.createPool({
//     host: "",
//     user: "",
//     password: "",
//     port: 3306,
//     database: "etsy"
// })

// module.exports = conn;

// ------------------------mongo-----------------------
const mongoose = require("mongoose");

const url =  "";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // poolSize: 500,
    // bufferMaxEntries: 0
}
mongoose.connect(url, options, (err, res) => {
    if(err) {
        console.log(err);
        console.log("Mongo Faiied");
    }
    else {
        console.log("Mongo Connected");
    }
})
