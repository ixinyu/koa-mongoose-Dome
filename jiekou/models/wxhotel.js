const mongoose = require('mongoose')

//实例化数据模板
const HotelsSchema = mongoose.Schema({
  auth:{
    type:String,
    enum: ['0', '1']   // 设置字符串的可选值, 0未认证，1已认证
  },
  main_picture: {
    type:Array,
    default:[]
  },
  hotel_name: {
    type:String,
    default:''
  },
  hotel_address:{
    type:String,
    default:''
  },
  distance:{
    type:String,
    default:''
  },
  phone:{
    type:Number,
  },
  lng:{
    type:String,
    default:'120.12979'
  },
  lat:{
    type:String,
    default:'30.25949'
  }
})

module.exports = wxHotels = mongoose.model('wxHotels', HotelsSchema)