const express = require('express');
const User = require('../service/User');
const Product = require('../service/Product');
const router = new express.Router();

router.post('/products', async (req, res) => {
    try {
        const products = await Product.getProduct();
        res.status(200).send(products);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/addProduct', async (req, res) => {
    try {
        await Product.addProduct(req.body.product);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/updateProducts', async (req, res) => {
    try {
        await Product.updateProduct(req.body.product);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/addCategory', async (req, res) => {
    try {
        const category = await Product.addCategory(req.body.category, req.body.user_id);
        res.status(200).send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/getCategory', async (req, res) => {
    try {
        const category = await Product.getCategory(req.body.user_id);
        res.status(200).send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});



module.exports = router;