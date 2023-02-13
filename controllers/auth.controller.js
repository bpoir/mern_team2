const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Import our model so we can us it to interact with the related data in MongoDB
var User = require("../persistence/mongodb/models/user.model")

const authController = {

    login: async function(req, res){

        //using a try/catch since we are using async/await and want to catch any errors if the code in the try block fails
        try {
            const { email, password } = req.body;
            
            //use our model to find recipes that match a query.
            //{} is the current query which really mean find all the recipes
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code

            let user = await User.findOne({email: email}).select('+password')

            if ( user &&  (await bcrypt.compare(password, user.password)) ) {
                const payload = { email: user.email };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                      expiresIn: "24h"
                });
                res.json({
                  token,
                  email: user.email,
                  statusCode: res.statusCode
                });
            } else { 
// 01/01/01. Working out how to assert the json function is called using mocha/chai/sinon when the function calls are chained. 
// Workaround is to separate the calls to res.status and res.json. Not ideal.               
//                res.status(400).json({
                res.status(400)
                res.json({
                  statusCode: res.statusCode,
                  message: `No user found with email address ${email}`
                })
              }
          
        } catch (error) {
          //if any code in the try block fails, send the user a HTTP status of 400 and a message
            res.status(400)
            res.send("Something went wrong: " + error)
        }
    },
    logout: async function(req, res){
      await req.logout();
      res.status(204).send()
    }
    

}

module.exports = authController;
