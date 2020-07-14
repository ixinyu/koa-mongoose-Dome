const mongoose = require('./db.js')

var UserSchema = mongoose.Schema({
  time: {
    type:String,
    default:new Date().toLocaleTimeString()
  },
  busName:{
    type:String,
    default:'公司'+new Date().toLocaleTimeString()
  }
})

module.exports = mongoose.model('List', UserSchema, 'list')