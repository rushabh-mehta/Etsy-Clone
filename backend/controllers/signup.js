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
    const {username:name,useremail:email, userpassword: password} = req.body;
    const userRegObj = {name,email,password};
    const response = {};
    try{
        const exists = await User.checkExists(userRegObj);
        console.log("exists"+JSON.stringify(exists));
        if(exists && exists.userFound){
            response.success = false;
            response.error = "User already exists";
            response.status = "400";
            return res.status(400).send(response);
        }

        const encryptedPassword = await encrypt.cryptPassword(password);
        userRegObj.password = encryptedPassword;
        userRegObj.id = uuidv4();
        const result = await User.addUser(userRegObj);
        
        delete userRegObj.password;
        // Create token
        const token = jwt.sign(
            userRegObj,
            config.get("jwtPrivateKey"),
            {
                expiresIn: "2h",
            }
        );
        userRegObj.token = token;
        response.user = userRegObj;
        response.success = true;
        response.status = "200";
        response.result = result;
        return res.status(200).send(response);
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});


module.exports = router;