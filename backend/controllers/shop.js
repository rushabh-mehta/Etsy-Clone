const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { Shop } = require("../services/shop");
const { Item } = require("../services/item");
const encrypt = require("../services/encrypt");
const router = express.Router();
const passport = require('passport');


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFileStream } = require('../services/s3');


router.get("/user/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.userId = req.params.id;
    msg.path = "get_user_shop";
    kafka.make_request('shop',msg, function(err,results){
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

router.post("/name", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.shopName = req.body.shopName;
    msg.path = "verify_shop_name";
    kafka.make_request('shop',msg, function(err,results){
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

router.post("/create", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.shopName = req.body.shopName;
    msg.user = req.body.user;
    msg.path = "create_shop";
    kafka.make_request('shop',msg, function(err,results){
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

router.post("/home/", async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "shop_home";
    kafka.make_request('shop',msg, function(err,results){
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

router.post("/display-picture/upload", passport.authenticate('jwt', { session: false }), upload.single("image"),async (req, res) => {
    const file = req.file;
    const response = {};
    try{
        const result = await uploadFile(file);
        result.shopId = req.body.shopId;
        const userUpdate = await Shop.updateDisplayPicture(result);
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