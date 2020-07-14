// 模块化
// 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/mongodome', { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('数据库连接成功')
})

module.exports = mongoose
