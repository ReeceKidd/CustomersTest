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
            .post('/bulk-upload-users')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 1,
                name: "Christina McArdle"
            })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('Test for users with the same user_id being passed to the database', () => {
    it('It should fail as request contains user with the same user_id', (done) => {
        chai.request(server)
            .post('/bulk-upload-users')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 1,
                name: "Christina McArdle"
            })
            .end((err, res) => {
                res.should.have.status(500)
                done()
            })
    })
})

describe('Test for additional fields being passed to request', () => {
    it('It should fail as request contains additional field', (done) => {
        chai.request(server)
            .post('/bulk-upload-users')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 2,
                name: "Christina McArdle",
                additionalField: "Additional information"
            })
            .end((err, res) => {
                res.should.have.status(700)
                done()
            })
    })
})



describe('Tests that latitude can be passed as a string or number', () => {
    it('It should allow latitude as a number', (done) => {
        chai.request(server)
            .post('/bulk-upload-users')
            .send({
                latitude: 52.986375,
                longitude: "-6.043701",
                user_id: 3,
                name: "Christina McArdle"
            })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('Tests that longitude can be a string or number', () => {
    it('It should allow longitude as a number', (done) => {
        chai.request(server)
            .post('/bulk-upload-users')
            .send({
                latitude: "52.986375",
                longitude: -6.043701,
                user_id: 4,
                name: "Christina McArdle"
            })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('Tests that user_id is a number', () => {
    it('It should fail as user_id is a string', (done) => {
        chai.request(server)
            .post('/bulk-upload-users')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: "Thirteen",
                name: "Christina McArdle"
            })
            .end((err, res) => {
                res.should.have.status(600)
                done()
            })
    })
})

describe('Tests that the minimum length of name is two characters', () => {
    it('It should fail as name is equal to "A', (done) => {
        chai.request(server)
            .post('/bulk-upload-users')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 6,
                name: "A"
            })
            .end((err, res) => {
                res.should.have.status(600)
                done()
            })
    })
})

describe('Tests that name is not a blank string', () => {
    it('It should fail as name is equal to ""', (done) => {
        chai.request(server)
            .post('/bulk-upload-users')
            .send([{
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 7,
                name: ""
            }])
            .end((err, res) => {
                res.should.have.status(600)
                done()
            })
    })
})
 

