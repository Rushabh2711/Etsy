const express = require('express');
const User = require('../service/User');
const router = new express.Router();

router.post('/favorite', async (req, res) => {
    try {
        const fav_list = await User.findFavorite(req.body.user_id);
        console.log(fav_list);
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



module.exports = router;