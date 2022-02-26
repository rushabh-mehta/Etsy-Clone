const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { Item } = require("../models/item");
const encrypt = require("../services/encrypt");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("shop/:shopId", auth, async (req, res) => {
    const response = {};
    const data = {};
    data.shopId = req.params.shopId;
    try{
        const items = await Item.getShopItems(data);
        response.items = items;
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

router.post("/add", auth, async (req, res) => {
    const response = {};
    const data = {};
    const item = req.body;
    try{
        const itemResult= await Item.addItem(item);
        response.item = itemResult;
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

router.post("/edit", auth, async (req, res) => {
    const response = {};
    const data = {};
    const item = req.body;
    try{
        const itemResult = await Item.editItem(item);
        response.item = itemResult;
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

router.post("/other", auth, async (req, res) => {
    const response = {};
    const data = {};
    const user = req.body;
    try{
        const itemsResult = await Item.getOtherItems(user);
        response.items = itemsResult;
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

router.post("/other/filter", auth, async (req, res) => {
    const response = {};
    const data = req.body;
    try{
        const itemsResult = await Item.getOtherFilteredItems(data);
        response.items = itemsResult;
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