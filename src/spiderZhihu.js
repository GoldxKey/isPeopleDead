const cheerio = require('cheerio')
const { getHtml, judgeUpdate } = require('./utils')
const SOCIAL_INFO = require('../config/BASE.json').SOCIAL_INFO
const MAX_JUJMENT_NUMBER = SOCIAL_INFO.Zhihu.MAX_JUJMENT_NUMBER

const baseParser = (list, $) => {
  if (!list) return ''
  let _result = ''
  $(list).each((i, item) => {
    if (MAX_JUJMENT_NUMBER > i)
      _result += `${$(item).attr('href')}\n`
  })
  return _result
}

const thoughtParser = (list, $) => {
  // 知乎想法
  if (!list) return ''
  let _result = ''
  $(list).each((i, item) => {
    if (MAX_JUJMENT_NUMBER > i)
      _result += `${$(item).text()}\n`
  })
  return _result
}

const parseHtml = async (html) => {
  const $ = cheerio.load(html)
  const items = $('#Profile-activities h2 a')
  const thoughts = $('.PinItem .RichContent .RichText')

  return baseParser(items, $) + thoughtParser(thoughts, $)
}

const isZhihuUpdate = async () => {
  const html = await getHtml(SOCIAL_INFO.Zhihu.index)
  return judgeUpdate(await parseHtml(html), 'Zhihu')
}

exports.isZhihuUpdate = isZhihuUpdate