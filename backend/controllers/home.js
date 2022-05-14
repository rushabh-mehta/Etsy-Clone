const express = require("express");
const jwt = require("jsonwebtoken");
const config =  require('config');
const { User } = require("../services/user");
const encrypt = require("../services/encrypt");
const router = express.Router();
const passport = require('passport');

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("Home Page");
    res.send(200);
});


module.exports = router;