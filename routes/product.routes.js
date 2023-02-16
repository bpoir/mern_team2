const express = require('express');
const router = express.Router();



//import the user controller to handle our user routes
const productController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/product.controller`
)

//post route to create a user (user registration)
router.post("/", productController.createProduct)

//get route to return all users (requires auth)
router.get("/", productController.getProducts)

//get route to return a specific users (requires auth)
router.get("/:productName", productController.getProduct)

//put route to update a user (requires auth)
router.put("/:productName", productController.updateProduct)

//delete a user
router.delete("/:productName", productController.deleteProduct)


module.exports = router;