/**
 * Skeletal implementation of User controller for MySQL.
 */

const User = require("../models/user.model")

//build our controller that will have our CRUD and other methods for our users
const userController = {

    //method to get all users using async/await syntax
    getUsers: async function(req, res){
    },
    //method to create a new user
    createUser: async function(req, res){
    },
    //method to update a user
    updateUser: async function(req, res, next){
    },
    //method to get all users using async/await syntax
    getUser: async function(req, res){
    }
}

module.exports = userController;
