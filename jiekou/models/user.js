const mongoose = require('mongoose')

//实例化数据模板
const UserSchema = mongoose.Schema({
  username: {
    type:String,
    required:true,
  },
  password: {
    type:String,
    required:true,
  },
  avatar:{
    type:String,
    default:''
  },
  phone:{
    type:Number,
　　 match: /^\d{11}$/
　},
  date:{
    type:Date,
    default : Date.now
  }
})

// module.exports = mongoose.model('User', UserSchema, 'user')
module.exports = User = mongoose.model('users', UserSchema)