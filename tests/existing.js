/*

These tests are used to check that the check Email and check Username methods are working. 

Tests in this section.
 1) Tests to check for existing emails. 
 2) Tests to check that email that isn't registered is valid. 
 3) Tests to check for existing usernames. 
 4) Tests to check that username that isn't registered is valid.
*/
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

var newUser = {
    firstName: "Mic",
    lastName: "Robson",
    userName: "MicRobson",
    email: "microbson@gmail.com",
    age: 20,
    password: "12345678",
    confirmPassword: "12345678",
    language: "English",
    terms: true
}

console.log('Begining existing.js tests')

//Empty the test database before starting
User.remove({}, function(err) { 
 })

describe('Successfully add user for "existing.js" tests', () => {
    var newUser = {
        firstName: "Sarah",
        lastName: "Jones",
        userName: "SarahJones",
        email: "sarahjones@gmail.com",
        age: 20,
        password: "12345678",
        confirmPassword: "12345678",
        language: "English",
        terms: true
    }
    it('It should successfully save user', (done) => {
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})


// 1) Tests to check for existing emails. 
describe('Check for existing email', () => {
    var email = "sarahjones@gmail.com"
    it('It should fail because email already exists', (done) => {
        chai.request(server)
            .get('/check/email/' + email)
            .end((err, res) => {
                res.should.have.status(900)
                res.body.should.have.property('error').eql('Already exists in database.')
                done()
            })
    })
})

// 2) Tests to check that email that isn't registered is valid. 
describe('Check for existing email', () => {
    var email = "nottaken@gmail.com"
    it('It should fail because email already exists', (done) => {
        chai.request(server)
            .get('/check/email/' + email)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

// 3) Tests to check for existing usernames. 
describe('Check for existing username', () => {
    var username = "SarahJones"
    it('It should fail because username already exists', (done) => {
        chai.request(server)
            .get('/check/username/' + username)
            .end((err, res) => {
                res.should.have.status(900)
                res.body.should.have.property('error').eql('Already exists in database.')
                done()
            })
    })
})

// 4) Tests to check that username that isn't registered is valid. 
describe('Check for existing username', () => {
    var username = "available"
    it('It should fail because username already exists', (done) => {
        chai.request(server)
            .get('/check/username/' + username)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

//Empties the test database.
User.remove({}, function(err) { 
})