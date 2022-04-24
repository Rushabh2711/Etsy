const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../service/User');
// var kafka = require('../kafka/client');
const router = new express.Router();
const secret = "CMPE273ETSY";

router.post('/login', async (req, res) => {
    try {
        const user = await User.findUser(req.body.username);
        if(user.password !== req.body.password) {
            res.status(400).send("Password is not correct")
            return;
        }
        const payload = { _id : user._id, username: user.username };
            const token = await jwt.sign(payload, secret, {
                    expiresIn: 1008000,
            });
            res.setHeader('token', "JWT " + token);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/getUserData', async (req, res) => {
    try {
        const user = await User.findUserData(req.body.userid);
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
    // ------------------------------------------------------------------------------
    // kafka.make_request('register',req.body, function(err,results){
    //     console.log('in result');
    //     console.log(results);
    //     if (err){
    //         console.log("Inside err");
    //         res.json({
    //             status:"error",
    //             msg:"System Error, Try Again."
    //         })
    //     }else{
    //         console.log("Inside else");
    //         res.status(200).send(results);
    //         }
        
    // });
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