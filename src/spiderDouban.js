const cheerio = require('cheerio')
const { getHtml, judgeUpdate } = require('./utils')
const SOCIAL_INFO = require('../config/BASE.json').SOCIAL_INFO
const MAX_JUJMENT_NUMBER = SOCIAL_INFO.Douban.MAX_JUJMENT_NUMBER

const baseParser = (list, $) => {
  if (!list) return ''
  let _result = ''
  $('a img', list).each((i, item) => {
    if (MAX_JUJMENT_NUMBER > i)
      _result += `${$(item).attr('alt')}\n`
  })
  return _result
}

const parseHtml = async (html) => {
  const $ = cheerio.load(html)

  const movie = $('#movie .obssin')
  const book = $('#book .obssin')
  const minisite = $('#minisite .minisite-list__wide ')
  const readingBooks = 0 in book ? book[0] : void 0
  const wantBooks = 1 in book ? book[1] : void 0
  const wantMovies = 0 in movie ? movie[0] : void 0
  const sawMovies = 1 in movie ? movie[1] : void 0

  return 'minisite:\n' + baseParser(minisite, $) + 'wantbook:\n' + baseParser(wantBooks, $) + 'readingbook:\n' + baseParser(readingBooks, $) + 'wantMovie:\n' + baseParser(wantMovies, $) + 'sawmovie:\n' + baseParser(sawMovies, $)
}

const isDoubanUpdate = async () => {
  const html = await getHtml(SOCIAL_INFO.Douban.index)

  return judgeUpdate(await parseHtml(html), 'Douban')
}

exports.isDoubanUpdate = isDoubanUpdate