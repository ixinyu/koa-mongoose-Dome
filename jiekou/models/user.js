const mongoose = require('mongoose')

//实例化数据模板
const UserSchema = mongoose.Schema({
  username: {
    type:String,
    require:true
  },
  password: {
    type:String,
    require:true
  },
  avatar:{
    type:String,
    default:''
  },
  date:{
    type:Date,
    default : Date.now
  }
})

// module.exports = mongoose.model('User', UserSchema, 'user')
module.exports = User = mongoose.model('users', UserSchema)