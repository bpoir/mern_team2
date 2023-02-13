/**
 * Global setup hook for mocha.
 * This runs before any test cases.
 */
const User = require(`../persistence/${process.env.DB_PROTOCOL}/models/user.model`)
const db = require('../persistence/data')

before(async () => {
    db.connect()
    await User.deleteMany({})
    db.disconnect()
})