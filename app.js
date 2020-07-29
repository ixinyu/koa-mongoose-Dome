const Koa = require('koa');
const path=require("path");
const fs=require("fs");
const router = require('koa-router')();
// var bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys.js');
const KoaBody = require('koa-body'); //koa文件上传
const static = require('koa-static');
const UserModel = require('./model/user.js')
const ListModel = require('./model/list.js')
const OrderModel = require('./model/order.js')


//实例化
const app = new Koa();
app.use(KoaBody({
  multipart: true,
  // formidable: {  //
  //     uploadDir:  path.join(__dirname, `./static/upload/`), //设置上传缓存文件夹
  //     maxFileSize: 200*1024 * 1024 // 设置上传文件大小最大限制，默认2M
  // },
}))
// app.use(bodyParser());

//静态资源服务，指定对外提供访问的根目录
app.use(static(path.join(__dirname)+'/static'));

router.post('/login',async(ctx,doc)=>{
  // console.log(ctx.request.body)
  //获取post 参数 ctx.request.body
  //获取get参数 ctx.query
  //ctx.params  获取动态路由的传值

  var u = new UserModel(ctx.request.body)
  console.log(ctx.request.body)
  // 查询用户是否存在
  const userResult = await UserModel.find(ctx.request.body);
  if (userResult.length) {
    const token = jwt.sign(ctx.request.body, keys.secretOrkey, { 
      expiresIn: 3600 // token到期时间设置
    });
    // let decoded = jwt.decode(ctx.query.token, keys.secretOrkey);  //解析token
    return ctx.body = {
      code:0,
      msg:"success",
      data:{
        token:token
      }
    }
  }else {
    return ctx.body = { code: -1, msg: '用户不存在' }
  }

})

router.post('/addList',async(ctx,doc)=>{
  var u = new ListModel(ctx.request.body)
  const result =await u.save()
  if(result){
    ctx.body = {
      code:0,
      msg:"success",
      data:null
    }
  }

})

router.post('/editList',async(ctx,doc)=>{
  // console.log(ctx.request.body);
  var result = await ListModel.updateOne({
    _id:ctx.request.body._id
  },{
    busName:ctx.request.body.busName
  });
  if(result.ok ==1){
    ctx.body = {
      code:0,
      msg:"success",
      data:null
    }
  }
})

router.get('/list',async(ctx,doc)=>{
  const listResult = await ListModel.find({});
  ctx.body = {
    code:0,
    msg:"success",
    data:{
      list:listResult
    }
  }
})

//上传单个文件
router.post('/upload', async(ctx)=>{
  // console.log(ctx.request.files)
  const file  = ctx.request.files.file;   //获取上传列表
  // //创建可读流
  const reader = fs.createReadStream(file.path)

  // 指定图片路径文件名（即上传图片存储目录）
  let filePath = path.join(__dirname,'/static/upload/')+`/${file.name}`;

  // //创建可写流
  const upStream = fs.createWriteStream(filePath)

  // //可读流通过管道写入可写流
  reader.pipe(upStream)
   
  // console.log(file.name, upStream.path) // 打印上传文件在服器上存储的相对路径

  const result = await UserModel.updateOne({  //简单测试下
    _id:'5ef03c64bec5e04314a16413'
  },{
    headImg:`${ctx.origin}/upload/${file.name}`
  })
  ctx.body = {
    code:0,
    msg:"success",
    data:`${ctx.origin}/upload/${file.name}`
  }
})

//上传多个文件
router.post('/uploadMany', async(ctx)=>{
  const files =  Array.isArray(ctx.request.files.file) ? ctx.request.files.file : [ctx.request.files.file]; // 获取上传文件
  // console.log(files);

  for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, './static/upload/') + `/${file.name}`;
    
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

  }
 
  ctx.body = {
    code:0,
    msg:"success",
    data:null
  }
})

router.post('/addOrder',async(ctx)=>{
  // console.log(ctx.request.body)
  let order = new OrderModel(ctx.request.body)
  const result = await order.save()

  if(result){
    ctx.body = {
      code:0,
      msg:"success",
      data:null
    }
  }
})



//启动路由
app.use(router.routes())  /* 启动路由*/
.use(router.allowedMethods())  /* 可配置和不配置，建议配置 */

const port = process.env.PORT||3000

// 在端口3000监听:
app.listen(port,()=>{
  console.log(`server port ${port}`)
});