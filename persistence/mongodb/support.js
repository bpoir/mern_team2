const logger = require('morgan')
const mongoose = require('mongoose')
const { die } = require('../../utilities')

module.exports = {
    connect: () => {
        mongoose.set('strictQuery', true)
        const options = {
            "serverSelectionTimeoutMS": process.env.DB_CONN_TIMEOUT_MS || 3000
        }
        const endpoint = `${process.env.DB_PROTOCOL}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        mongoose.connect(endpoint, options)
            .then(() => {
                console.log(`Connected to URI ${endpoint}`)
                connection = mongoose.connection
            }).catch((err) => {
                console.error(`Problem connecting to URI "${endpoint}"\n${err}`)
                die(1)
            })
    },
    getConnectionObject: () => {
        return mongoose.connection
    },
    disconnect: () => {
        mongoose.disconnect
        console.log('Disconnected from MongoDB')
    }
}
