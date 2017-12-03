const { isWeiboUpdate } = require('./activitiesWeibo')
const { isZhihuUpdate } = require('./spiderZhihu')
const { isDoubanUpdate } =require('./spiderDouban')
exports.aliveTest = async (WEIBO_LOGIN_INFO, Weibo) => {
  console.log('生存检测', Date())
  if (! await isZhihuUpdate() & ! await isDoubanUpdate() & ! await isWeiboUpdate(WEIBO_LOGIN_INFO, Weibo))
    console.error('这小子死了', Date())
  else
    console.log('这小子还没死', Date())
}