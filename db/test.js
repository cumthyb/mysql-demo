/*
 * @Author: hongyongbo
 * @Date: 2019-01-17 10:27:14
 * @LastEditors: hongyongbo
 * @LastEditTime: 2019-01-17 17:51:18
 * @Description: 数据库测试文件
 * @Notice: 
 */


const Mock = require('mockjs')
const { Task } = require("./dao/index.js")
const { getConnection } = require("./util/index.js")

getConnection().then(conn => {
  if (conn.state === 'disconnected') {
    console.log('连接失败')
    debug_mysql(conn)
    return
  }
  else {
    let title = Mock.mock('@ctitle(5, 10)')
    let remark = Mock.mock('@csentence()')
    let ctime = Mock.mock('@datetime()')
    let state = Mock.mock({
      "status|1-2": true
    }).status

    
    var task = new Task(title, remark, ctime, ctime, state)
    Task.addTask(conn, task)

    var task = new Task()
    task.state = false
    Task.selectTask(conn, task).then(res => {
      console.log(res)
    })

  }
}).catch(err => {
  console.log('连接失败: ', err)
})