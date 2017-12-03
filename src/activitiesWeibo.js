const { judgeUpdate } = require('./utils')

const getWeibos = (para, Weibo) => {
  return new Promise((resolve, reject) => {
    Weibo.Statuses.user_timeline_ids(para, (data) => {
      resolve(data.ids ? {
        ids: data.statuses,
        total_number: data.total_number
      } : void 0)
    })
  })
}

const getComments = (para, Weibo) => {
  return new Promise((resolve, reject) => {
    Weibo.Comments.by_me(para, (data) => {
      resolve(data.comments && data.comments.map(item => item.id))
    })
  })
}

const getFriends = (para, Weibo) => {
  return new Promise((resolve, reject) => {
    Weibo.Friendships.friends_ids(para, (data) => {
      resolve(data.ids ? {
        ids: data.ids,
        total_number: data.total_number
      } : void 0)
    })
  })
}

const getFavorites = (para, Weibo) => {
  return new Promise((resolve, reject) => {
    Weibo.Favorites.ids(para, (data) => {
      resolve(data.favorites && data.favorites.map(item => item.status))
    })
  })
}

const getWeiboData = async (para, Weibo) => {
  let _result = ''

  const comments = await getComments(para, Weibo)
  const friends = await getFriends(para, Weibo)
  const favorites = await getFavorites(para, Weibo)
  const weibos = await getWeibos(para, Weibo)
  WeiboDatas = {
    comments,
    friends,
    favorites,
    weibos
  }
  Object.keys(WeiboDatas).forEach((item) => {
    if (!!WeiboDatas[item])
      _result += `${JSON.stringify(WeiboDatas[item])}\n`
  })
  return _result
}

exports.isWeiboUpdate = async (WEIBO_LOGIN_INFO, Weibo) => {
  const para = {
    "source": Weibo.appKey.appKey,
    "access_token": WEIBO_LOGIN_INFO.access_token
  }


  return judgeUpdate(await getWeiboData(para, Weibo), 'Weibo')
}
