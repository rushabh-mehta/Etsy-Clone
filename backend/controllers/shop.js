const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { Shop } = require("../models/shop");
const { Item } = require("../models/item");
const encrypt = require("../services/encrypt");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/user/:id", auth, async (req, res) => {
    const response = {};
    const data = {};
    data.userId = req.params.id;
    try{
        const result = await Shop.getUserShop(data);
        if(result && result.shopFound && result.shop){
            response.shop = result.shop;
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = "200";
            return res.status(200).send(response);
        }else{
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = "200";
            return res.status(200).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});

router.post("/name", auth, async (req, res) => {
    const response = {};
    const data = {};
    data.shopName = req.body.shopName;
    try{
        const result = await Shop.checkNameAvailable(data);
        if(result && result.shopFound && result.shop){
            response.shop = result.shop;
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = "200";
            return res.status(200).send(response);
        }else{
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = "200";
            return res.status(200).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});

router.post("/create", auth, async (req, res) => {
    const response = {};
    const data = {};
    data.shopName = req.body.shopName;
    data.user = req.body.user;
    try{
        const result = await Shop.createShop(data);
        if(result && result.shopCreated && result.shop){
            response.shop = result.shop;
            response.shopCreated = result.shopCreated;
            response.success = true;
            response.status = "200";
            return res.status(200).send(response);
        }else{
            response.shopCreated = result.shopCreated;
            response.success = true;
            response.status = "200";
            return res.status(200).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});

router.get("/:userId", auth, async (req, res) => {
    const response = {};
    const data = {};
    data.userId = req.params.userId;
    try{
        const result = await Shop.getShopByUser(data);
        const itemData = {};
        itemData.shopId = result.shop.id;
        const itemResult = await Item.getShopItems(itemData);
        if(result && result.shopFound && result.shop){
            response.shop = result.shop;
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = "200";
            console.log(itemResult);
            response.shopItems = itemResult;
            return res.status(200).send(response);
        }else{
            response.shopFound = result.shopFound;
            response.success = true;
            response.status = "200";
            return res.status(200).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});



module.exports = router;