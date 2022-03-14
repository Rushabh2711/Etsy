const express = require('express');
const Product = require('../service/Product');
const Order = require('../service/Order');
const router = new express.Router();

router.post('/createOrder', async (req, res) => {
    try {
        await Order.createOrder(req.body.order);
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
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