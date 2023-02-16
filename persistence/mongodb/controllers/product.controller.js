
//Import our model so we can us it to interact with the realated data in MongoDB
const Product = require("../models/product.model")

//build our controller that will have our CRUD and other methods for our users
const productController = {
     
    //method to get all users using async/await syntax
    getProducts: async function(req, res){
            
        //create base query
        let query = {}

        //if firstName filter appears in query parameters then modify the query to do a fuzzy search
        if(req.query.productName){
            const regex = new RegExp(`.*${req.query.productName}.*$`, "i")
            query.productName = {'$regex':regex}
        }
        
        //if lastName filter appears in query parameters then modify the query to do a fuzzy search
        if(req.query.productType){
            const regex = new RegExp(`.*${req.query.productType}.*$`, "i")
            query.productType = {'$regex':regex}
        }

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            //use our model to find users that match a query.
            //{} is the current query which really mean find all the users
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let allProducts = await Product.find(query)
            
            //return all the users that we found in JSON format
            res.json(allProducts)
            
        } catch (error) {
            console.log("error getting all products: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },

        //method to create a new user
        createProduct: async function(req, res){

            try {
    
                //store user data sent through the request
                const productData = req.body;
    
                //pass the userData to the create method of the User model
                let newProduct = await Product.create(productData)
    
                //return the newly created user
                res.status(201).json(await Product.findById(newProduct._id))
                
            } catch (error) {
                //handle errors creating user
                console.log("failed to create product: " + error)
                res.status(400).json({
                    message: error.message,
                    statusCode: res.statusCode
                })
            }
        },

    //method to update a user
    updateProduct: async function(req, res, next){

        try {

            //get the (user email-> product name) from the request params
            const name = req.params.productName;

            //store user data sent through the request
            const newProductData = req.body;

            //try to find our user by the email provided in the request params
            const product = await Product.findOne({name: name})

            //update the user if we found a match and save or return a 404
            if(product){
                Object.assign(product, newProductData)
                await product.save()
            }else{
                res.status(404).send({message: "Product not found", statusCode: res.statusCode});
            }

            //respond with updated user
            res.json(await Product.findById(product._id))
            
        } catch (error) {
            console.log("failed to update product: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    },
    //method to get all users using async/await syntax
    getProduct: async function(req, res){

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {

            //get the email address of the user from the url parameters
            const name = req.params.productName;
            
            //use our model to find the user that match a query.
            //{email: some@email.com} is the current query which really mean find the user with that email
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let foundProduct = await Product.findOne({productName: name})

            //if we found the user, return that user otherwise return a 404
            if(foundProduct){
                res.json(foundProduct)
            }else{
                res.status(404).send({
                    status: res.statusCode,
                    message: "Product Not Found!"
                })
            }
            
        } catch (error) {
            console.log("error getting product: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find the user
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },

    deleteProduct: async function(req, res){

        try {

            //get the user email from the request params
            const name = req.params.productName;

            //store user data sent through the request
            const productData = req.body;

            //try to find our user by the email provided in the request params
            // const user = await User.findOne({email: email})
             let foundProductDelete = await Product.findOne({productName: name})
            //delete the user if we found a match and save or return a 404
            if(name){
                Object.assign(foundProductDelete, productData)
                await foundProductDelete.delete()
                
                //Object.assign(user, userdata)
                //user.deleteOne()
                //await user.deleteOne()
                
            }else{
                res.status(404).send({message: "Product not found", statusCode: res.statusCode});
            }

            //respond with updated user 
            res.status(200).send({message: "Product deleted", statusCode: res.statusCode});
            
        } catch (error) {
            console.log("failed to delete product: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    }

}

module.exports = productController;
