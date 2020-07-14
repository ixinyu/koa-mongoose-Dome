const mongoose = require('./db.js')

var OrderSchema = mongoose.Schema({
  type:String,
  orderNumber:String,
  userName:String, 
  placeTime:String,
  desc:String,
  companyName:String
})

module.exports = mongoose.model('Order', OrderSchema, 'order')