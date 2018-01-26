process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var server = require('../src/app.js');
var Customer = require('../models/Customer.js');

var should = chai.should();
chai.use(chaiHttp);

//Empty the test database before starting
Customer.remove({}, function(err) { 
 })

/*
Tests: 
// Test for valid registration
// Test for Customers with the same Customer_id being passed to the database
// Test for additional fields being passed to request
// Tests that Customer_id is a number
// Tests that the minimum length of name is two characters
// Tests that name is not a blank string
*/
 
describe('Test for valid registration', () => {
    
    it('It should successfully save Customer', (done) => {
        chai.request(server)
            .post('/register-Customer')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                Customer_id: 1,
                name: "Christina McArdle"
            })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

describe('Test for Customers with the same Customer_id being passed to the database', () => {
    it('It should fail as request contains Customer with the same Customer_id', (done) => {
        chai.request(server)
            .post('/register-Customer')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                Customer_id: 1,
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
            .post('/register-Customer')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                Customer_id: 2,
                name: "Christina McArdle",
                additionalField: "Additional information"
            })
            .end((err, res) => {
                res.should.have.status(700)
                done()
            })
    })
})

describe('Tests that Customer_id is a number', () => {
    it('It should fail as Customer_id is a string', (done) => {
        chai.request(server)
            .post('/register-Customer')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                Customer_id: "Thirteen",
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
            .post('/register-Customer')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                Customer_id: 6,
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
            .post('/register-Customer')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                Customer_id: 7,
                name: ""
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
            .post('/register-Customer')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                Customer_id: 7,
                name: ""
            })
            .end((err, res) => {
                res.should.have.status(600)
                done()
            })
    })
})

describe('Tests that latitiude cannot excede 90', () => {
    it('It should fail as latitude is greater than 90', (done) => {
        chai.request(server)
            .post('/register-Customer')
            .send({
                latitude: "100.986375",
                longitude: "-6.043701",
                Customer_id: 7,
                name: ""
            })
            .end((err, res) => {
                res.should.have.status(600)
                done()
            })
    })
})

describe('Tests that latitiude is not less than -90', () => {
    it('It should fail as latitude is less than -90', (done) => {
        chai.request(server)
            .post('/register-Customer')
            .send({
                latitude: "-100.986375",
                longitude: "-6.043701",
                Customer_id: 7,
                name: ""
            })
            .end((err, res) => {
                res.should.have.status(600)
                done()
            })
    })
})

describe('Tests that longitude is not greater than 180', () => {
    it('It should fail as longitude is greater than 180', (done) => {
        chai.request(server)
            .post('/register-Customer')
            .send({
                latitude: "-10.986375",
                longitude: "200.043701",
                Customer_id: 7,
                name: ""
            })
            .end((err, res) => {
                res.should.have.status(600)
                done()
            })
    })
})

describe('Tests that longitude is not less than -180', () => {
    it('It should fail as longitude is less than -180', (done) => {
        chai.request(server)
            .post('/register-Customer')
            .send({
                latitude: "-54.986375",
                longitude: "-190.043701",
                Customer_id: 7,
                name: ""
            })
            .end((err, res) => {
                res.should.have.status(600)
                done()
            })
    })
})


 

