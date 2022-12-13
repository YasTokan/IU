const express = require('express');
const router = express.Router()
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const orderModel = require('../models/order')
const userModel = require('../models/user')
const productsModel = require('../models/product');
const { response } = require('../../app');
const auth = require("../auth/auth")

const userController = require('../controllers/user.controller')





router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/list",  userController.list)
router.delete("/:id", userController.deleteUser)


module.exports = router