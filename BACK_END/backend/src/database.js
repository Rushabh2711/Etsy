// const mysql = require('mysql');

// var conn = mysql.createPool({
//     host: "etsy-db.cmoyamrdrxkl.us-east-1.rds.amazonaws.com",
//     user: "admin",
//     password: "2711rush1997",
//     port: 3306,
//     database: "etsy"
// })

// module.exports = conn;

// ------------------------mongo-----------------------
const mongoose = require("mongoose");

const url =  "mongodb+srv://rushabh:2711rush1997@cluster0.jks4l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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