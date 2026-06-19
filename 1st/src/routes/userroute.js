const express = require("express");
const {register,login, home} = require("../controlles/userControlles");
const route = express.Router();
const authMiddelware = require("../middelware/auth");

route.post('/register',register);
route.post('/login',login);
route.get('/home',authMiddelware,home);

module.exports = route;