const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { Item } = require("../services/item");
const encrypt = require("../services/encrypt");
const router = express.Router();
const passport = require('passport');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFileStream } = require('../services/s3');

router.get("shop/:shopId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.shopId = req.params.shopId;
    msg.path = "get_shop_items";
    kafka.make_request('item',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
   
});

router.get('/display-picture/:key', (req, res) => {
  const key = req.params.key;
  if(key!=="null" && key!=="undefined"){
    const readStream = getFileStream(key);
    readStream.pipe(res);
  }else{
      res.send("");
  }
});

router.get("/:itemId/:userId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.itemId = req.params.itemId;
    msg.userId = req.params.userId;
    msg.path = "get_item";
    kafka.make_request('item',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
});

router.post("/add", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "add_item";
    kafka.make_request('item',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
});

router.post("/edit", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "edit_item";
    kafka.make_request('item',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
    
});

router.post("/other", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "other_item";
    kafka.make_request('item',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
});

router.post("/other/filter", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "other_item_filter";
    kafka.make_request('item',msg, function(err,results){
        if (err){
            console.log("kafka error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            res.status(results.status).send(results);
        }
    });
});


router.post("/display-picture/upload", passport.authenticate('jwt', { session: false }), upload.single("image"),async (req, res) => {
    const file = req.file;
    const response = {};
    try{
        const result = await uploadFile(file);
        result.itemId = req.body.itemId;
        const itemUpdate = await Item.updateDisplayPicture(result);
        response.success = true;
        response.status = "200";
        response.imageKey = result.key;
        res.status(200).send(response);
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});


module.exports = router;