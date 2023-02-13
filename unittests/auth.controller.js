/**
 * Sample unit test for a controller that interacts with a Mongoose model.
 * Exercises the logic of a function without a real database connection.
 */

const mocha = require('mocha')        // test runner
const chai = require('chai')          // assertion library
const expect = chai.expect            // 'expect' assertion style
const sinon = require('sinon')        // mocking library

// The function to be tested lives in this component
const controller = require('../controllers/auth.controller')

// This is a dependency of the code under test
// We will stub the function that calls the database
const userModel = require('../persistence/mongodb/models/user.model')

describe('POST /auth/login', () => {
    describe('login fails when user is not found', () => {

        // Stub the request object with test values
        const req = {
            body: {
                email: 'junk@nowhere.foo',
                password: 'password'
            }
        }

        // Stub the response object with spies for the functions we want to check
        const res = {
            send: sinon.spy(),
            json: sinon.spy(),
            status: sinon.stub()
        }

        // Replace the User.findOne function with our stub to cause return value 'null'.
        // The code under test uses the form: findOne({...}).select('...') 
        // The following stub definition handles the chained function calls.
        const findOneStub = sinon.stub(userModel, 'findOne').returns({
            select: sinon.stub().returns(null)
        })
        sinon.replace(userModel, 'findOne', findOneStub)

        beforeEach(() => {
        })
        it('returns status 400', async function () {

            // Call the login function with the stubbed findOne function//
            await controller.login(req, res)

            // Verify the status function was called with the expected value
            //expect(res.status.calledWith(400)).to.be.true

            expect(res.status.calledOnce).to.be.true
            expect(res.status.args[0][0]).to.equal(400)
        })
        it('sets the expected message in the response object', async function () {

            // Call the login function with the stubbed findOne function
            await controller.login(req, res)

            // Verify the json function was called with the expected value
            expect(res.json.calledWith({
                statusCode: res.statusCode,
                message: 'No user found with email address junk@nowhere.foo'
            }))

        })
    })
})
