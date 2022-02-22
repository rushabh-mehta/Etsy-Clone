const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { 
  v4: uuidv4,
} = require('uuid');
const { User } = require("../models/user");
const encrypt = require("../services/encrypt");

const router = express.Router();

router.post("/", async (req, res) => {
    const {name,email,password} = req.body;
    const userObj = {name,email,password};
    const response = {};
    try{
        const exists = await User.checkExists(userObj);
        if(exists && exists.userFound){
            const passwordMatch = await encrypt.comparePassword(userObj.password, exists.user.password);
            if(passwordMatch){
                delete userObj.password;
                const token = jwt.sign(
                    userObj,
                    config.get("jwtPrivateKey"),
                    {
                        expiresIn: "2h",
                    }
                );
                userObj.token = token;
                response.user = userObj;
                response.success = true;
                response.status = "200";
                return res.status(200).send(response);
            }else{
                response.success = false;
                response.status = "400";
                response.error = "Invalid credentials";
                return res.status(400).send(response);
            }
        }else{
            response.success = false;
            response.status = "400";
            response.error = "Invalid credentials";
            return res.status(200).send(response);  
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(200).send(response);
    }
});


module.exports = router;