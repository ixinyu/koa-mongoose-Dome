const router = require('koa-router')();
// const request = require('../../utils/request')();
// const qs = require('querystring');
const Hotel = require('../../models/wxhotel')
const RoomType = require('../../models/wxRoomType')
const Room = require('../../models/wxRoom')

const mongoose = require('mongoose')

//添加酒店
router.post('/addHotel',async ctx=>{
  const data = ctx.request.body
  data.main_picture = data.main_picture.split(',')
  // console.log(data.main_picture)
  const result = await Hotel.find({
    hotel_name : data.hotel_name
  })
  if(!result.length){ 
    const newUser = new Hotel(data)

    await newUser.save().then(user=>{
      ctx.body = user
      ctx.body = {
        code:0,
        msg:'添加成功'
        // data:user
      }
    }).catch((err)=>{
      console.log(err)
    })
  }else { //用户已存在
    ctx.body = {
      code:-1,
      msg:'该酒店名称已被占用'
    }
  }
})

//酒店列表
router.get('/hotelList',async ctx=>{
    // console.log(ctx.query)
    const result = await Hotel.find()
    // console.log(result)
    if(!result.length){ 
      ctx.body = {
        code:0,
        msg:'success',
        list:[]
      }
    }else {
      ctx.body = {
        code:0,
        msg:'success',
        list:result
      }
    }
})

// 酒店详情
router.get('/hotelDetail',async ctx=>{
  // console.log(ctx.query)
  const result = await Hotel.find({
    _id:ctx.query._id
  })
  // console.log(result)
  if(!result.length){ 
    ctx.fail('暂无酒店信息')
  }else {
    const data = {
      data:result[0]
    }
    ctx.success(data)
  }
})

//添加房型
router.post('/addRoomType',async ctx=>{
  // console.log(ctx.request.body)
  const data = ctx.request.body
  const result = await RoomType.find({
    hotel_id:data.hotel_id,
    room_type_name : data.room_type_name
  })
  // console.log(result)
  if(!result.length){ 
    const newRoomType = new RoomType(data)
    await newRoomType.save().then(user=>{
      const data = {
        msg:'添加成功',
        data:user
      }
      ctx.success(data)
    }).catch((err)=>{
      ctx.fail(err._message)
    })
  }else { //用户已存在
    ctx.fail('该房型已添加')
  }
})

//添加单个房间
router.post('/addRoom',async ctx=>{
  console.log(ctx.request.body)
  const data = ctx.request.body
  const result = await Room.find({
    hotel_id:data.hotel_id,
    room_sn : data.room_sn
  })
  if(!result.length){ 
    data.room_type_id = mongoose.Types.ObjectId(data.room_type_id)
    const newRoom = new Room(data)
    await newRoom.save().then(user=>{
      const data = {
        msg:'添加成功',
        data:user
      }
      ctx.success(data)
    }).catch((err)=>{
      ctx.fail(err._message)
    })
    await RoomType.updateOne({_id: data.room_type_id},{$inc: { roomNum: 1 }}) //roomNum增加1
  }else { //用户已存在
    ctx.fail('该房间已被添加')
  }
})

//批量添加房间
router.post('/addRoomMore',async ctx=>{
  const data = ctx.request.body
  let arr = data.room_sn.split(',')
  let item = []
  let obj = {}
  arr.forEach(ele => {
    obj = {
      hotel_id:data.hotel_id,
      room_sn : ele,
      room_type_id : data.room_type_id
    }
    item.push(obj)
  })
  // 存在一个问题，如果已被添加过的还是会再次添加
  const res = await Room.insertMany(item)
  if(!res.length){
    ctx.fail('添加失败')
  }else {
    const data = {
      msg:'添加成功',
      data:res
    }
    ctx.success(data)
  }
  
})

//房间列表
router.get('/roomList',async ctx=>{
  console.log(ctx.query)
  const result = await RoomType.find({'hotel_id': ctx.query.hotel_id})

  //联合查询查的房间
//   const result = await Room.aggregate([ // 聚合管道关联查询
//     {
//       $match: {'hotel_id': ctx.query.hotel_id} //查询条件
//     },
//     {
//       $lookup:
//       {
//        from: 'wxroomtypes', // 关联表的名称
//        localField: 'room_type_id', //该表关联字段
//        foreignField: '_id', //关联表的字段
//        as: 'rooms'  // 查找的内容复制给x (items) //得到的结果是数组
//       }
//     },
//     { $unwind: "$rooms" },//数据打散 $unwind方法会将数组解开，每条包含数组中的一个值。
//   //  {
//   //     $project://指定查询字段的关键词
//   //     {
//   //       rooms: {
//   //         $mergeObjects:"$rooms"
//   //       }
//   //     }
//   //  },
//  ])
//  console.log(result)
  if(!result.length){ 
    const data = {
      msg:'success',
      data:[]
    }
    ctx.success(data)
  }else {
    const data = {
      msg:'success',
      data:result
    }
    ctx.success(data)
  }
})

module.exports = router.routes()