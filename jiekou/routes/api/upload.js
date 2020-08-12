const router = require('koa-router')();
const fs = require("fs");
const path=require("path");

//上传图片
router.post('/uploadImg', async(ctx)=>{
  const file  = ctx.request.files.file;   //获取上传列表
  // //创建可读流
  const reader = fs.createReadStream(file.path)

  // 指定图片路径文件名（即上传图片存储目录）
  let filePath = path.join(__dirname,'../../static/upload/images')+`/${file.name}`;

  // //创建可写流
  const upStream = fs.createWriteStream(filePath)

  // //可读流通过管道写入可写流
  reader.pipe(upStream)
  const data = {
    msg:'上传成功',
    data:`${ctx.origin}/upload/images/${file.name}`  //把main.js 中总处理的文件路径去掉
  }
  ctx.success(data)
})

module.exports = router.routes()