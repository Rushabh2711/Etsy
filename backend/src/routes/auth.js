const express = require('express');
const User = require('../service/User');
const router = new express.Router();

router.post('/login', async (req, res) => {
    try {
        const user = await User.findUser(req.body.username);
        if(user.password !== req.body.password) {
            res.status(400).send("Password is not correct")
            return;
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = await User.registerUser(req.body);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/countries', async (req, res) => {
    try {
        const countries = await User.getCountries(req.body);
        res.status(200).send(countries);
    } catch (e) {
        res.status(400).send(e);
    }
});





module.exports = router;