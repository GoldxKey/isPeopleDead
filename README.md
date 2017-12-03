# 安装
预先安装好 [PhantomJs](http://phantomjs.org/)
`cd ./isPeopleDead && yarn install`

# 配置
config/BASE.json

· AUTO_TASK_CYCLE_TIME 循环检测周期，小时

· SOCIAL_INFO Douban/Zhihu index 对应社交站点用户主页

· MAX_JUJMENT_NUMBER 数据对比长度
· SOCIAL_INFO Weibo uid 微博uid

-----
config/weiboConfig.json

·appKey 微博开放平台appKey

·appSecret 微博开放平台appSecret

·redirectUrl Oauth授权地址

# 使用
启动 koa
`yarn run prd`

打开 http://host:2399/ 进行微博授权，授权成功后脚本自动运行