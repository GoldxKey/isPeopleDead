
const router = require('koa-router')()
const Weibo = require('nodeweibo')
const weiboConfig = require('../config/weiboConfig.json')
const { AutoTask } = require('../src/AutoTask')
const weiboUid = require('../config/BASE.json').SOCIAL_INFO.Weibo.uid

const TK = {}

router.get('/', async (ctx, next) => {
  if (!!ctx.query.code && !!Weibo.appKey) {

    const WEIBO_LOGIN_INFO = await new Promise((resolve, reject) => {
      Weibo.OAuth2.access_token({ code: ctx.query.code, grant_type: 'authorization_code'}, (data) => {
        resolve(data)
      })
    })

    WEIBO_LOGIN_INFO.error_code
    ? next()
    : (() => {
      // user lock
      if (WEIBO_LOGIN_INFO.uid !== weiboUid) {
        ctx.redirect('/error')
        return
      }
      const task = WEIBO_LOGIN_INFO.uid in TK
                  ? TK[WEIBO_LOGIN_INFO.uid]
                  : new AutoTask(WEIBO_LOGIN_INFO, Weibo)

      TK[WEIBO_LOGIN_INFO.uid] = task
      task.hasInstance ? null : task.start()
      ctx.body = {
        ...task.WEIBO_LOGIN_INFO,
        access_token: !!task.WEIBO_LOGIN_INFO.access_token ? '获取成功' : '获取失败'
      }
    })()
  }
  else next()
})

router.get('/', async (ctx, next) => {
  Weibo.init(weiboConfig)
  const path = 'https://api.weibo.com/oauth2/authorize' + Weibo.getGetURL()
  ctx.redirect(path)
})

router.get('/error', async (ctx, next) => {
  ctx.body = 'something error'
})

module.exports = router
