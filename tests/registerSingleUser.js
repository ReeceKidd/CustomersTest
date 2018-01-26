/*
The test data supplied in the following tests need to have different emails and usernames otherwise the tests fail.
*/
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var server = require('../src/app.js');
var User = require('../models/user.js');

var should = chai.should();
chai.use(chaiHttp);

//Empty the test database before starting
User.remove({}, function(err) { 
 })
 
describe('Test for valid registration', () => {
    
    it('It should successfully save user', (done) => {
        chai.request(server)
            .post('/register-single-user')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 12,
                name: "Christina McArdle"
            })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('Test for additional fields being passed to request', () => {
    it('It should fail as request contains additional field', (done) => {
        chai.request(server)
            .post('/register-single-user')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 12,
                name: "Christina McArdle",
                additionalField: "Additional information"
            })
            .end((err, res) => {
                res.should.have.status(700)
                done()
            })
    })
})

describe('Test for users with the same user_id being passed to the database', () => {
    it('It should fail as request contains user with the same user_id', (done) => {
        chai.request(server)
            .post('/register-single-user')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 12,
                name: "Christina McArdle"
            })
            .end((err, res) => {
                res.should.have.status(500)
                done()
            })
    })
})

//Do tests for each of the different validations that I have completed. 

