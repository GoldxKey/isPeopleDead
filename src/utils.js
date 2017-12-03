const phantom = require('phantom')
const SOCIAL_INFO = require('../config/BASE.json').SOCIAL_INFO
const path = require('path')
const fs = require('fs')

exports.getHtml = async (url) => {
  const instance = await phantom.create()
  const page = await instance.createPage()
  await page.on('onResourceRequested', (requestData) => {
    // console.info('Requesting', requestData.url, new Date())
  })
  const status = await page.open(url)
  const content = await page.property('content')
  await instance.exit()
  return content
}

exports.judgeUpdate = async (data, type) => {
  const socialType = SOCIAL_INFO[type]
  const DB_PATH = `${__dirname}/../db/${socialType.DB_NAME}`
  const preData = fs.readFileSync(DB_PATH, 'utf-8')
  if (preData !== data) {
    // 数据有更新
    console.log(`${socialType.name}有更新\n${Date()}\n${data}\n `)
    fs.writeFileSync(DB_PATH, data)
    return true
  }
  else {
    // 数据未更新
    console.log(`${socialType.name}未更新${Date()}`)
    return false
  }
}