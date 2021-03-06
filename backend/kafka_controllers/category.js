const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require("../kafka/client");


router.get("/:userId",  passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.userId = req.params.userId;
    msg.path = "user_category";
    kafka.make_request('category',msg, function(err,results){
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

router.post("/add",  passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "add_category";
    kafka.make_request('category',msg, function(err,results){
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