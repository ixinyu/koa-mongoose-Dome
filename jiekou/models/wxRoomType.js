const mongoose = require('mongoose')

//实例化数据模板
const RoomTypeSchema = mongoose.Schema({
  room_type_name:{
    type:String,
    required:true
  },
  original_price:{
    type:Number
  },
  current_price:{
    type:Number
  },
  hotel_id:{
    type:String,
    required:true
  },
  bed_size:{
    type:String,
    default:'1.8*2m'
  },
  area:{
    type:String,
    default:'16~20'
  },
  bed_type:{
    type:String,
    default:'大床'
  }
})

module.exports = wxRoomType = mongoose.model('wxRoomType', RoomTypeSchema)