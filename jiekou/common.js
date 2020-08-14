// 对密码进行 bcrypt 加密
const bcrypt = require('bcryptjs');
const config = require('./config/keys')
const createHash = require('create-hash')
const request = require('./utils/request')();
const xml = require('xml2js');
/* 微信支付整体流程：先调用统一下单接口，该接口会返回prepay_id，
然后再结合这个值生成前端支付所需的参数即可换起微信支付
----------
统一下单接口：需要涉及随机数，订单号，以及其他参数，根据这些参数生成预下单的sign值，再去调用统一下单接口
接口调用后，即可拿到prepay_id，通过prepay_id及其他参数，生成 paySign ，把这些参数返回给前端
*/ 

const tools = {
  enbcrypt(data){ //同步方式
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data, salt);
    return hash
  },
  createNoncestr(){ //生成随机数
    return Math.random().toString(36).substr(2, 15)
  },
  createTimeStamp(){ //生成时间戳
    return parseInt(new Date().getTime()/1000)+''
  },
  getTradeId(){ //生成交易订单号
    let date = new Date().getTime().toString();
    let text = ''
    let possible = '01234566789'
    for(let i=0;i<5;i++){
      text += possible.charAt(Math.floor(Math.random()*possible.length))
    }
    return date +text
  },
  raw(args){ //Object 转成json并排序
    let keys = Object.keys(args).sort();
    let obj = {}
    keys.forEach((key)=>{
      obj[key] = args[key]
    })

    //将对象转换为&分割的参数
    let val = ''
    for(let k in obj){
      val += '&'+k+'='+obj[k]
    }
    
    return val.substr(1)
  },
  async order(appid,attach,body,openid,total_fee,notify_url,ip){ //下单接口
    let nonce_str = this.createNoncestr()
    let out_trade_no = this.getTradeId()
    // console.log(nonce_str,out_trade_no)
    //支付前先获取支付签名
    let params = {
      appid,
      attach,
      body,
      mch_id:config.mch.mch_id,
      nonce_str,
      notify_url,
      openid,
      out_trade_no,
      spbill_create_ip:ip,
      total_fee,
      trade_type:'JSAPI'
    }
    let sign = this.getSign(params)
    params.sign = sign
    // console.log(params.sign)
    //通过参数和签名组合xml数据，用以调用统一下单接口
    const sendData = this.wxSendData(params)
    const url = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
    const resdata = await request.post(url,sendData)
    var payResult =''
    await xml.parseString(resdata,(err,res)=>{
      if(err){
        console.log(err)
      }else {
        let data = res.xml
        let prepay_id = data.prepay_id[0]
        // console.log(prepay_id)
        payResult = this.getPayParams(appid,prepay_id)
        // console.log(payResult)
      }
    })
    return payResult
  },
  wxSendData(params){ //统一下单接口 xml参数
    let data = `<xml>
            <appid>${params.appid}</appid>
            <attach>${params.attach}</attach>
            <body>${params.body}</body>
            <mch_id>${params.mch_id}</mch_id>
            <nonce_str>${params.nonce_str}</nonce_str>
            <notify_url>${params.notify_url}</notify_url>
            <openid>${params.openid}</openid>
            <out_trade_no>${params.out_trade_no}</out_trade_no>
            <spbill_create_ip>${params.spbill_create_ip}</spbill_create_ip>
            <total_fee>${params.total_fee}</total_fee>
            <trade_type>${params.trade_type}</trade_type>
            <sign>${params.sign}</sign>
        </xml>`
    return data
  },
  getSign(params){ //sign
    let string = this.raw(params) + '&key='+config.mch.key
    // console.log(string)
    let sign = createHash('md5').update(string).digest('hex')
    return sign.toUpperCase()
  },
  getPayParams(appid,prepay_id){
    //生成给前端的支付参数，唤醒微信支付
    //统一下单接口的appid是小写，这个地方appId是大写
    let params = {
      appId:appid,
      timeStamp:this.createTimeStamp(),
      nonceStr:this.createNoncestr(),
      package:'prepay_id='+prepay_id,
      signType:'MD5'
    }

    let paySign = this.getSign(params)
    params.paySign = paySign
    return params
  }
  
}

module.exports = tools;