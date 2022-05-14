const express = require("express");
const router = express.Router();
const passport = require('passport');
const kafka = require("../kafka/client");

router.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = {};
    msg.path = "country";
    kafka.make_request('country',msg, function(err,results){
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