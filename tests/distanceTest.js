/*
The values of these tests where computed using this tool: 
https://www.movable-type.co.uk/scripts/latlong.html
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
 
describe('Tests Christina McArdles distance', () => {
    it('Should return 41.77 as this is the KM distance from the dublin office', (done) => {
        chai.request(server)
            .post('/register-user')
            .send({
                latitude: "52.986375",
                longitude: "-6.043701",
                user_id: 64,
                name: "Christina McArdle"
            })
            .end((err, res) => {
                console.log(res.body.user)
                res.body.user.should.have.property('distanceFromDublinKM').eqls(41.77)
                done()
            })
    })
})

describe('Tests Stephen McArdles distance', () => {
    it('Should return 98.87 as this is the KM distance from the dublin office', (done) => {
        chai.request(server)
            .post('/register-user')
            .send({
                latitude: "53.038056",
                longitude: "-7.653889",
                user_id: 26,
                name: "Stephen McArdle"
            })
            .end((err, res) => {
                console.log(res.body.user)
                res.body.user.should.have.property('distanceFromDublinKM').eqls(98.87)
                done()
            })
    })
})

describe('Tests Lisa Ahearn distance', () => {
    it('Should return 41.77 as this is the KM distance from the dublin office', (done) => {
        chai.request(server)
            .post('/register-user')
            .send({
                latitude: "53.0033946",
                longitude: "-6.3877505",
                user_id: 39,
                name: "Lisa Ahearn"
            })
            .end((err, res) => {
                console.log(res.body.user)
                res.body.user.should.have.property('distanceFromDublinKM').eqls(38.36)
                done()
            })
    })
})



 

