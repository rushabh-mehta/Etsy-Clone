const express = require("express");
const router = express.Router();
const passport = require('passport');

router.post("/get/:userId", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.userId = req.params.userId;
    msg.skip = req.body.skip;
    msg.limit = req.body.limit;
    msg.path = "get_user_orders";
    kafka.make_request('order',msg, function(err,results){
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

router.post("/place", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "place_order";
    kafka.make_request('order',msg, function(err,results){
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