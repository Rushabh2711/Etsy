const mysql = require('mysql');

var conn = mysql.createPool({
    host: "etsy-db.cmoyamrdrxkl.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "2711rush1997",
    port: 3306,
    database: "etsy"
})

module.exports = conn;