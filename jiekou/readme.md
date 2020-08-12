Node框架koa从入门到实战写接口
https://www.bilibili.com/video/BV15b411z7qj    （koa 路由单个文件使用，挺好）

完整的node + koa 接口项目


##Mongoose检验参数

required : 表示这个数据必须传入

max: 用于 Number 类型数据， 最大值

min: 用于 Number 类型数据， 最小值

enum:枚举类型， 要求数据必须满足枚举值 enum: ['0', '1', '2']

match:增加的数据必须符合 match（正则） 的规则

maxlength： 最大值

minlength： 最小值


##聚合管道： 

$project 修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。对应project()方法 

 $match 用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。对应match()。 

 $limit 用来限制MongoDB聚合管道返回的文档数。对应limit()方法 

 $skip 在聚合管道中跳过指定数量的文档，并返回余下的文档。对应skip()。 

 $unwind 将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。对应unwind()方法 

 $group 将集合中的文档分组，可用于统计结果。对应group()方法 

 $sort 将输入文档排序后输出。对应sort()方法 

 $geoNear 输出接近某一地理位置的有序文档。对应near()。 

$group表达式说明： 

 $sum  计算总和 

 $avg  计算平均值  

 $min  获取每一组集合中所有文档对应值得最小值 

 $max  获取每一组集合中所有文档对应值得最大值 

 $push  在结果文档中插入值到一个数组中 

 $addToSet  在结果文档中插入值到一个数组中，但不创建副本 

 $first  根据资源文档的排序获取第一个文档数据

 $last  根据资源文档的排序获取最后一个文档数据 