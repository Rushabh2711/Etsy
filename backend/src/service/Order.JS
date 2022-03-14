const db = require('../database');
const { v4: uuidv4 } = require("uuid");

class Order {

    static async createOrder(order) {
        // order.products = JSON.stringify(order.products)
        const query = "INSERT INTO etsy.order(user_id, price, date, products) VALUES(?,?,?,?)";
        return new Promise((res, rej) => {
            db.query(query, [order.user_id, order.price, order.date, JSON.stringify(order.products)] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                res(result);
            })
        })
    };

    static async getOrder(user_id) {
        const query = "SELECT * FROM etsy.order WHERE user_id = ?";
        return new Promise((res, rej) => {
            db.query(query, [user_id] , async (err, result) => {
                if(err) {
                    rej(err);
                }
                console.log(result);
                res(result);
            })
        })
    }
}

module.exports = Order