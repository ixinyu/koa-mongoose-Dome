const mongoose = require('./db.js')

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  headImg:{
    type:String,
    default:''
  }
})

module.exports = mongoose.model('User', UserSchema, 'user')