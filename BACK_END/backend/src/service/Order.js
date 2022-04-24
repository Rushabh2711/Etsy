const db = require('../database');;
const OrderModel = require('../Models/OrderModel');
const { v4: uuidv4 } = require("uuid");

class Order {

    static async createOrder(order) {
        // order.products = JSON.stringify(order.products)
        // const query = "INSERT INTO etsy.order(user_id, price, date, products) VALUES(?,?,?,?)";
        return new Promise( async (res, rej) => {
            // db.query(query, [order.user_id, order.price, order.date, JSON.stringify(order.products)] , async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     res(result);
            // })
            const newOrder = new OrderModel({
                ...order
            })
            try {
                var data = await newOrder.save();
                res(data);
            } catch (e) {
                rej(e)
            }
        })
    };

    static async getOrder(user_id) {
        // const query = "SELECT * FROM etsy.order WHERE user_id = ?";
        return new Promise( async (res, rej) => {
            // db.query(query, [user_id] , async (err, result) => {
            //     if(err) {
            //         rej(err);
            //     }
            //     console.log(result);
            //     res(result);
            // })
            try {
                const o1 = await OrderModel.find({ user_id });
                res(o1);
            } catch (e) {
                rej(e)
            }
        })
    }
}

module.exports = Order