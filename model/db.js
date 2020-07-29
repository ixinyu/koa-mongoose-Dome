// 模块化
// 连接数据库
const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI
mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('数据库连接成功')
})

module.exports = mongoose
