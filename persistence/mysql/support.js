const logger = require('morgan')
const mysql = require('mysql2')
const { die } = require('../../utilities')
var connection = null

module.exports = {
    connect: (endpoint, timeoutMS) => {
        connection = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME
        })
        connection.connect(function(err) {
          if (err) throw err          

          console.log(`Connected to URI "mysql://${process.env.DB_USER}:********@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}"`)
        })
    },
    getConnectionObject: () => {
        return connection
    },
    disconnect: () => {
        connection.end(function(err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Disconnected from MySQL');
          });
    }
}
