// 对密码进行 bcrypt 加密
const bcrypt = require('bcryptjs');

function Encryption(data) { //异步
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(data, salt, (err, hash) => {
        if (err) reject(err)
          resolve(hash)
        })
      })
  })
}

const tools = {
  enbcrypt(data){ //同步方式
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data, salt);
    return hash
  }
}

module.exports = tools;

// module.exports = {
//   Encryption:Encryption,
// } 