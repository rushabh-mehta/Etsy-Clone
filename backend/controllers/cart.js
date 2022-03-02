const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { Cart } = require("../models/cart");
const encrypt = require("../services/encrypt");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/add", auth, async (req, res) => {
    const response = {};
    const data = {};
    const item = req.body;
    try{
        const addItem = await Cart.addItem(item);
        response.addedItem = addItem;
        response.success = true;
        response.status = "200";
        return res.status(200).send(response);
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});

module.exports = router;