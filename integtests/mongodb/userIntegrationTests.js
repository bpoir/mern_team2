const mongoose = require('mongoose')
const request = require('supertest')
const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect 
const db = require('../../persistence/data')

const User = require('../../persistence/mongodb/models/user.model')
const app = require('../../app.js')
const agent = request.agent(app)
const auth = require('../../controllers/auth.controller')
const { die } = require('../../utilities')

describe('User CRUD operations', () => {
    before(() => {
        db.connect()
    })
    after(() => {
        db.disconnect()
    })

    describe('Create new user', () => {

        it('Creates user document when all input fields are valid', (done) => {
            testUserDocument = {
                "firstName": "Alfred",
                "lastName": "Neuman",
                "email": "alfred.e.neuman@mad.mag",
                "password": "password1"
            }

            agent.post('/api/users')
                .send(testUserDocument)
                .expect(201) 
                .end((err, res) => {
                    if ( err ) {
                        console.log(`GOT ERR: ${err}`)
                    }
                    expect(res.body).to.have.property('_id')
                })

            done()
        })    

        it('Does not save the new user information when the email address is invalid', (done) => {
            testUserDocument = {
                "firstName": "Marie",
                "lastName": "Curie",
                "email": "not.a.valid.email.address",
                "password": "password1"
            }

            agent.post('/api/users')
                .send(testUserDocument)
                .expect(400) 
                .end((err, res) => {
                    if ( err ) {
                        console.log(`GOT ERR: ${err}`)
                    }
                    expect(res.body.message).to.equal('User validation failed: email: Invalid E-mail Address')
                })

            done()
        })    

        it('Returns an authentication token when the user logs in', (done) => {
            User.create({
                "firstName": "Alfred",
                "lastName": "Neuman",
                "email": "alfred.e.neuman@mad.mag",
                "password": "password1"
            }).then(() => {

                let loginDoc = {
                    "email": "alfred.e.neuman@mad.mag",
                    "password": "password1"    
                }

                agent.post('/auth/login')
                    .send(loginDoc)
                    .expect(200) 
                    .end((err, res) => {
                        if ( err ) {
                            console.log(`GOT ERR: ${err}`)
                        }
                        expect(res.body).to.have.property('token')
                        console.log(`The generated token is: ${res.body.token}`)
                    })

            }) // then

            done()    
        })    

    })


})
