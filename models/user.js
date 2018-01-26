var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const User = new Schema(
  {
    latitude: Number,
    longitude: Number, 
    user_id: Number,
    name: String,
    collection: 'users'
  }
)

module.exports = mongoose.model('User', User)
