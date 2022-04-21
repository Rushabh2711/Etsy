const express = require('express');
const Order = require('../service/Order');
var kafka = require('../kafka/client');
const router = new express.Router();

router.post('/createOrder', async (req, res) => {
    // try {
    //     await Order.createOrder(req.body.order);
    //     res.status(200).send();
    // } catch (e) {
    //     console.log(e);
    //     res.status(400).send(e);
    // }

    kafka.make_request('createOrder',req.body.order, function(err,results){
            console.log('in result');
            console.log(results);
            if (err){
                console.log("Inside err");
                res.status(400).send(err);
            }else{
                console.log("request successful");
                res.status(200).send();
                }
        });

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