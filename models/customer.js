var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.models = {}
mongoose.modelSchemas = {}

const Customer = new Schema(
  {
      latitude: Number,
      longitude: Number, 
      Customer_id: {
        type: Number,
        unique: true
      },
      name: String,
      distanceFromDublinKM: Number
  },
  {
    collection: 'Customers'
  }   
  )

module.exports = mongoose.model('Customer', Customer)
