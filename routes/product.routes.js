const express = require('express');
const router = express.Router();



//import the user controller to handle our user routes
const productController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/user.controller`
)

//post route to create a user (user registration)
router.post("/", productController.createProduct)