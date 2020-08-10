const mongoose = require('mongoose')

//实例化数据模板
const UserSchema = mongoose.Schema({
  nickName: {
    type:String,
    default:''
  },
  gender: {
    type:String,
    default:''
  },
  avatarUrl:{
    type:String,
    default:''
  },
  date:{
    type:Date,
    default : Date.now
  }
})

module.exports = wxUser = mongoose.model('wxUsers', UserSchema)