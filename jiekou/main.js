const Koa = require('koa');
const router = require('koa-router')();
const KoaBody = require('koa-body'); //koa文件上传
const mongoose = require('mongoose')
const path=require("path");
const static = require('koa-static');
const db = require('../config/keys').mongoURI
const json = require('koa-json');
const reponseBody = require('./utils/reponseBody')
const verifyToken = require('./utils/verifyToken')
const users = require('./routes/api/users')
const wxLogin = require('./routes/api/wxLogin')
const hotel = require('./routes/api/wxhotel')
const upload = require('./routes/api/upload')
const wxpay = require('./routes/api/wxpay')

//实例化
const app = new Koa();
app.use(static(path.join(__dirname)+'/static'));
app.use(KoaBody({
  multipart: true,
  formidable: {  //
        // uploadDir:  path.join(__dirname, `./static/upload/`), //设置上传缓存文件夹
        maxFileSize: 200*1024 * 1024, // 设置上传文件大小最大限制，默认2M
        multipart:true
  }
}))
app.use(json());
app.use(reponseBody())
app.use(verifyToken)





// require('../config/passport')(passport)

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
router.use('/api/login',wxLogin)
router.use('/api/hotel',hotel)
router.use('/api/upload',upload)
router.use('/api/wxpay',wxpay)


//启动路由
app.use(router.routes())  /* 启动路由*/
.use(router.allowedMethods())  /* 可配置和不配置，建议配置 */


const port = process.env.PORT||3000 // 在端口3000监听:
app.listen(port,()=>{
  console.log(`server port ${port}`)
});