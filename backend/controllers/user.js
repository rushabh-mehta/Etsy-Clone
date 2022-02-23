const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { User } = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:id", auth, async (req, res) => {
    const id = req.params.id;
    const user = {id};
    const response = {};
    try{
        const result = await User.getUserById(user);
        if(result && result.userFound && result.user){
            response.success = true;
            response.user = result.user;
            response.status = "200";
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "User not found";
            response.status = "400";
            res.status(400).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});

router.put("/:id", auth, async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const response = {};
    try{
        const updatedResult = await User.editUser(user);
        if(updatedResult && updatedResult.userEdited){
            const findResult = await User.getUserById(user);
            response.success = true;
            response.user = findResult.user;
            response.status = "200";
            res.status(200).send(response);
        }else{
            response.success = false;
            response.error = "User not found";
            response.status = "400";
            res.status(400).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});

module.exports = router;