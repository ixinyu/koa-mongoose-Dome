koa 结合 mongoose 编写的接口dome

 // order表关联order_item
 OrderModel.aggregate([ // 聚合管道关联查询
   {
     $lookup:
     {
      from: 'order_item', // 关联表的名称
      localField: 'order_id', //该表关联字段
      foreignField: 'order_id', //关联表的字段
      as: 'items'  // 查找的内容复制给x (items)
    }
  },
  {
    $match: {'all_price': {$gte: 160}} //查询条件
  }
], (err, doc) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(JSON.stringify(doc))
})

mongodb 数据库的导出导入
导出
mongodump -h dbhost -d dbname -o dbdirectory
eg:  mongodump -h 127.0.0.1 -d user -o C:\Users\coboriel\Desktop\moon
                   ip          导出的表     导出的地址
导入
mongorestore -h dbhost -d dbname <path>
eg: mongorestore -h 127.0.0.1 -d userdome C:\Users\coboriel\Desktop\moon\user
                      ip         表名        需要导入的地址