const express = require('express');
const Order = require('../service/Order');
// var kafka = require('../kafka/client');
const router = new express.Router();

router.post('/createOrder', async (req, res) => {
    try {
        await Order.createOrder(req.body.order);
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
    // var data = await Order.createOrder(req.body.order);
    // if(req.body.order.products.length == 2) {
    //     req.body.order.products[0].image = "https://etsy-bucket7.s3.us-east-2.amazonaws.com/9632587436922156.png";
    //     req.body.order.products[1].image = "https://etsy-bucket7.s3.us-east-2.amazonaws.com/1329654987452213.png";
    //     req.body.order._id = data._id
    // }
    // kafka.make_request('createOrder',req.body.order, function(err,results){
    //         console.log('in result');
    //         console.log(results);
    //         if (err){
    //             console.log("Inside err");
    //             res.status(400).send(err);
    //         }else{
    //             console.log("request successful");
    //             res.status(200).send();
    //             }
    //     });

});

router.post('/getOrder', async (req, res) => {
    try {
        const orders = await Order.getOrder(req.body.user_id);
        res.status(200).send(orders);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

module.exports = router;