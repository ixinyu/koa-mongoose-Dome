const router = require('koa-router')();
const bcrypt = require('bcryptjs');
//引入 User model
const User = require('../../models/user')
const tools = require('../../common')
const jwt = require('jsonwebtoken')
const keys = require('../../../config/keys')
const passport = require("koa-passport");

/**
 * @route GET/POST api/users/test
 * @desc 测试接口
 * @access 公开
 */
router.get('/test',async ctx=>{
  ctx.status = 200
  ctx.body = {
    msg:'users works ...'
  }
})

/**
 * @route GET/POST api/users/register
 * @desc 注册接口
 * @access 公开
 */
router.post('/register',async ctx=>{
  // console.log(ctx.request.body)
  const data = ctx.request.body
  const result = await User.find({
    username : data.username
  })
  if(!result.length){ 
    const newUser = new User({
      username: data.username,
      password: tools.enbcrypt(data.password) //密文
    })

    await newUser.save().then(user=>{
      ctx.body = user
    }).catch((err)=>{
      console.log(err)
    })
  }else { //用户已存在
    ctx.status = 200
    ctx.body = {
      msg:'该用户名已被占用'
    }
  }
  
})

/**
 * @route GET/POST api/users/login
 * @desc 登录接口
 * @access 公开
 */
router.post('/login',async ctx=>{
  const data = ctx.request.body
  const result = await User.find({ //返回的是数组
    username : data.username
  })
  if(!result.length){
    ctx.status = 200;
    ctx.body = {
      msg:'用户不存在'
    }
  }else{
    //查到后 验证密码
    const pwd = await bcrypt.compareSync(data.password, result[0].password); // true
    
    if(pwd){
      //返回token
      let payload = {id:result[0].id,username:result[0].username,avatar:result[0].avatar}
      const token = jwt.sign(payload,keys.secretOrkey,{expiresIn:3600})
      ctx.status = 200;
      ctx.body = {
        msg:'登录成功',
        token:'Bearer '+token
      }
    }else{
      ctx.status = 200;
      ctx.body = {
        msg:'用户名或密码错误'
      }
    }
  }
  
})

/**
 * @route GET/POST api/users/useInfo
 * @desc 用户信息接口
 * @access 私密
 */
router.get('/useInfo',
  passport.authenticate('jwt', { session: false }),
  async ctx=>{
    // console.log(ctx.state.user)
    const {avatar,username,date}= ctx.state.user
    ctx.body = {
      avatar,
      username,
      date
    }
  }
)



module.exports = router.routes()