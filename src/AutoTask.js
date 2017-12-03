const EventEmitter = require('events').EventEmitter
const { aliveTest } = require('./aliveTest')
const { AUTO_TASK_CYCLE_TIME } = require('../config/BASE.json')
const event = new EventEmitter()
class AutoTask {
  constructor(WEIBO_LOGIN_INFO, Weibo) {
    this.STOP_FLAG = false
    this.WEIBO_LOGIN_INFO = WEIBO_LOGIN_INFO
    this.Weibo = Weibo
    this.Timer = void 0
    this.hasInstance = false
  }

  async doAction() {
    await aliveTest(this.WEIBO_LOGIN_INFO, this.Weibo)
    return
  }

  async doCycle(time, callback) {
    await this.doAction()
    return new Promise((resolve) => {
      const timer = setInterval(async () => {
        await this.doAction()
        this.hasInstance = true
        resolve(timer)
      }, time);
    })
  }

  async start () {
    if (this.hasInstance) return
    console.log('开启自动任务')
    this.hasInstance = true
    this.Timer = await this.doCycle(AUTO_TASK_CYCLE_TIME * 60 * 60 * 1000)
  }

  stop () {
    this.STOP_FLAG = true
    clearTimeout(this.Timer)
    this.hasInstance = false
    console.log('关闭自动任务', new Date())
  }

  restart() {
    this.stop()
    this.STOP_FLAG = false
    this.start()
  }
}

exports.AutoTask = AutoTask