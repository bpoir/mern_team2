/**
 * Global teardown hook for mocha.
 * This runs after all tests have finished.
 */
const { die } = require('../utilities')

after(async () => {
    die(0)
})
