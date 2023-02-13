/**
 * Abstraction layer between the application logic and the 
 * database management system for connection and disconnection.
 */

const { die } = require('../utilities')

var connection = null
var db = null
try {
    db = require(`./${process.env.DB_PROTOCOL}/support`)
}
catch (err) {
    console.error(
        `Unsupported database: DB_PROTOCOL=${process.env.DB_PROTOCOL}`
    )
    die(1)    
}

module.exports = {
    connect: () => {
        db.connect()
        connection = db.getConnectionObject()
    },
    disconnect: () => {
        db.disconnect()
    }
}
