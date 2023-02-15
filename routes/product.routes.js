const express = require('express');
const router = express.Router();



//import the user controller to handle our user routes
const productController = require(
    `../persistence/${process.env.DB_PROTOCOL}/controllers/product.controller`
)

//post route to create a user (user registration)
router.post("/", productController.createProduct)

//get route to return all users (requires auth)
router.get("/", productController.getProduct)

//get route to return a specific users (requires auth)
router.get("/:name", productController.getProduct)

//put route to update a user (requires auth)
router.put("/:name", productController.updateProduct)

//delete a user
router.delete("/:name", productController.deleteProduct)


module.exports = router;