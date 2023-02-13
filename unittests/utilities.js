/**
 * Sample unit test for a simple function that does not interact with any
 * controllers, models, or the server or database.
 */
const { average } = require('../utilities')

const mocha = require('mocha')        // test runner
const chai = require('chai')          // assertion library
const expect = chai.expect            // 'expect' assertion style

describe('Simple unit test case', () => {
    it('calculates the average of a list of numerical values', () => {
        expect(average([4, 5, 9, 13])).to.equal(7.75)
    })
})