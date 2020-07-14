// 在 Node.js 中从命令行接收输入
// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// readline.question(`你叫什么名字?`, name => {
//   console.log(`你好 ${name}!`)
//   readline.close()
// })

// const inquirer = require('inquirer')

// var questions = [
//   {
//     type: 'input',
//     name: 'name',
//     message: "hello,你叫什么名字?"
//   }
// ]

// inquirer.prompt(questions).then(answers => {
//   console.log(`hello ${answers['name']}!`)
// })

const fs = require('fs')

const content = 'Some content!'

fs.writeFile('/coboriel/joe/test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})


