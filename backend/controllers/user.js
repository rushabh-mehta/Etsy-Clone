const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { User } = require("../services/user");
const passport = require('passport');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFileStream } = require('../services/s3');

router.get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.id = req.params.id;
    msg.path = "get_user";
    kafka.make_request('user',msg, function(err,results){
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

router.put("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.id = req.params.id;
    msg.user = req.body;
    msg.path = "edit_user";
    kafka.make_request('user',msg, function(err,results){
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

router.post("/currency/update", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const msg = {};
    msg.body = req.body;
    msg.path = "currency_update";
    kafka.make_request('user',msg, function(err,results){
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

router.get('/profile-picture/:key', (req, res) => {
  const key = req.params.key;
  if(key!=="null" && key!=="undefined"){
    const readStream = getFileStream(key);
    readStream.pipe(res);
  }else{
      res.send("");
  }
});

router.post("/profile-picture/upload", passport.authenticate('jwt', { session: false }), upload.single("image"),async (req, res) => {
    const file = req.file;
    const response = {};
    try{
        const result = await uploadFile(file);
        result.userId = req.body.userId;
        const userUpdate = await User.updateProfilePicture(result);
        response.success = true;
        response.status = 200;
        response.imageKey = result.key;
        res.status(200).send(response);
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});

module.exports = router;