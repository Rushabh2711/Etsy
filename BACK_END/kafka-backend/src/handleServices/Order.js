const Order = require('../service/Order');

async function handle_request(msg, callback){
   
    console.log("Inside kafka backend");
    console.log(msg);
    try{
        // var result = await Order.createOrder(msg);
        callback(null, msg);
    } catch (e) {
        console.log(e);
        callback(e, null);
    }
    console.log("after callback");
};

exports.handle_request = handle_request;