/**
 * Implementation of database connection and disconnection logic
 * when the data store is a backing resource accessed via an API.
 */

const logger = require('morgan')
var connection = null

module.exports = {
    connect: () => {
        connection = process.env.DB_ENDPOINT
        console.log(`Accessing endpoint "${connection}" for the database backing service`)
    },
    getConnectionObject: () => {
        return connection
    },
    disconnect: () => {
        console.log(`Disconnected from ${connection}`)
        connection = null
    }
}    
