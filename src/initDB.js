const fs = require('fs')
const path = require('path')
const SOCIAL_INFO = require('../config/BASE.json').SOCIAL_INFO

Object.keys(SOCIAL_INFO).forEach((key) => {
  const DB_PATH = `${__dirname}/../db/${SOCIAL_INFO[key].DB_NAME}`
  fs.writeFileSync(DB_PATH, '')
})

console.log('数据库初始化成功', Date())