const express = require("express");
const kafka = require("../kafka/client");

const router = express.Router();

router.post("/", async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "login";
    kafka.make_request('login',msg, function(err,results){
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