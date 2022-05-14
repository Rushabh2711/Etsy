const express = require('express');
const User = require('../service/User');
// var kafka = require('../kafka/client');
const router = new express.Router();

router.post('/favorite', async (req, res) => {
    try {
        const fav_list = await User.findFavorite(req.body.user_id);
        // console.log(fav_list);
        res.status(200).send(fav_list);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/addFavorite', async (req, res) => {
    try {
        await User.addToFavorite(req.body.user_id, req.body.product_id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }

    // kafka.make_request('addToFav',req.body, function(err,results){
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
    //         res.status(200).send();
    //         }
    // });
});

router.post('/removeFavorite', async (req, res) => {
    try {
        await User.removeFavorite(req.body.user_id, req.body.product_id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/update', async (req, res) => {
    try {
        const user = await User.updateUser(req.body.user);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/findShop', async (req, res) => {
    try {
        const shop = await User.findShop(req.body.user_id);
        res.status(200).send(shop);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/checkShopAvailability', async (req, res) => {
    try {
        const shopId = await User.checkShopAvailability(req.body.shopName);
        res.status(200).send(shopId);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/getShopDetails', async (req, res) => {
    try {
        const shop = await User.getShopDetails(req.body.shop_id);
        res.status(200).send(shop);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/addShopDetails', async (req, res) => {
    try {
        const shop = await User.addShopDetails(req.body);
        res.status(200).send(shop);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.post('/upadteShopDetails', async (req, res) => {
    try {
        const shop = await User.upadteShopDetails(req.body);
        res.status(200).send(shop);
    } catch (e) {
        res.status(400).send(e);
    }
});





module.exports = router;