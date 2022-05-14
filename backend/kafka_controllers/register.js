const express = require("express");
const kafka = require("../kafka/client");


const router = express.Router();

router.post("/", async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "register";
    kafka.make_request('register',msg, function(err,results){
        if (err){
            console.log(err);
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