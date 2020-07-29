const Koa = require('koa');
const router = require('koa-router')();
const KoaBody = require('koa-body'); //koa文件上传
const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI
const users = require('./routes/api/users')
const passport = require('koa-passport')
var json = require('koa-json');

//实例化
const app = new Koa();
app.use(KoaBody({
  multipart: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(json());

require('../config/passport')(passport)

//连接数据库
mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('数据库连接成功')
})


//配置路由地址 
// api/users 开头的地址都会进入users 路由
router.use('/api/users',users) 

//启动路由
app.use(router.routes())  /* 启动路由*/
.use(router.allowedMethods())  /* 可配置和不配置，建议配置 */


const port = process.env.PORT||3000 // 在端口3000监听:
app.listen(port,()=>{
  console.log(`server port ${port}`)
});