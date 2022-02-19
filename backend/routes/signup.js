const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
    const {username:name,useremail:email, userpassword: password} = req.body;
    const userRegObj = {name,email,password};
    const response = {};
    try{
        const exists = await User.checkIfExists(userRegObj);
        if(exists){
            response.success = false;
            response.error = "User already exists";
            response.status = "400";
            return res.status(400).send(response);
        }
        const result = await User.addUser(userRegObj);
        response.success = true;
        response.status = "200";
        response.result = result;
        return res.status(200).send(response);
    }catch(e){
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = "500";
        res.status(500).send(response);
    }
});


module.exports = router;