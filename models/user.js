var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.models = {}
mongoose.modelSchemas = {}

const User = new Schema(
  {
      latitude: Number,
      longitude: Number, 
      user_id: {
        type: Number,
        unique: true
      },
      name: String
  },
  {
    collection: 'users'
  }   
  )

module.exports = mongoose.model('User', User)
