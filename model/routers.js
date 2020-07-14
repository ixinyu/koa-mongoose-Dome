const mongoose = require('./db.js')

var UserSchema = mongoose.Schema({
  parent_id: Number,
  url:String,
  icon_class:String,
  title:String,
  hiddren:{
    type:Boolean,
    default:false
  },
  roles:{
    type:Object,
    default:[]
  }
})

module.exports = mongoose.model('Routers', UserSchema, 'routers')