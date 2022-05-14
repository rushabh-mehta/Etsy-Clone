const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require("../kafka/client");


router.post("/add", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "add_item";
    kafka.make_request('cart',msg, function(err,results){
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

router.post("/delete", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "delete_item";
    kafka.make_request('cart',msg, function(err,results){
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

router.get("/get/:userId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.userId = req.params.userId;;
    msg.path = "get_cart";
    kafka.make_request('cart',msg, function(err,results){
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

router.post("/item/quantity", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "update_item_quantity";
    kafka.make_request('cart',msg, function(err,results){
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

router.post("/item/gift", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "update_item_gift";
    kafka.make_request('cart',msg, function(err,results){
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



module.exports = router;