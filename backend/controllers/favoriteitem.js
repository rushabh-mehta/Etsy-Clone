const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { FavoriteItem } = require("../services/favoriteitem.js");
const encrypt = require("../services/encrypt");
const router = express.Router();
const passport = require('passport');

router.post("/add", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "add_favorite_item";
    kafka.make_request('favoriteitem',msg, function(err,results){
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

router.post("/remove", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "remove_favorite_item";
    kafka.make_request('favoriteitem',msg, function(err,results){
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

router.get("/:userId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.userId = req.params.userId;
    msg.path = "get_user_favorite_item";
    kafka.make_request('favoriteitem',msg, function(err,results){
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

router.post("/filter", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "get_user_filtered_favorite_item";
    kafka.make_request('favoriteitem',msg, function(err,results){
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