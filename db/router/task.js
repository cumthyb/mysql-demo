/*
 * @Author: hongyongbo
 * @Date: 2019-01-17 10:27:14
 * @LastEditors: hongyongbo
 * @LastEditTime: 2019-01-17 17:32:19
 * @Description: Task相关路由
 * @Notice: 
 */


const { Task } = require("../dao/index.js")

function taskRouter(dbConn) {

  /**
   * @parmas: 
   * @Description: post  
   */
  const addTask = async (ctx, next) => {
    const { title, remark } = ctx.request.body;
    const task = new Task(title, remark, new Date(), new Date(), false);
    await Task.addTask(dbConn, task).then(res => {
      ctx.body = {
        code: 1,
        message: 'success',
      }
    }).catch(err => {
      console.log(err)
      ctx.body = {
        code: -1,
        message: 'fail',
        error: err
      }
    })
  }

  /**
   * @parmas: 
   * @Description: get
   */
  const deleteTask = async (ctx, next) => {
    const id = ctx.query.id
    await Task.deleteTaskById(dbConn, { id }).then(res => {
      ctx.body = {
        code: 1,
        message: 'success',
        data: res
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: 'fail',
        error: err
      }
    })
  }

  /**
   * @parmas: 
   * @Description: 
   */
  const finishTask = async (ctx, next) => {
    const { where } = ctx.request.body
    const set = { state: true, utime: new Date() }
    await Task.modifyTask(dbConn, where, set).then(res => {
      ctx.body = {
        code: 1,
        message: 'success',
        data: res
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: 'fail',
        error: err
      }
    })
  }

  /**
   * @parmas: 
   * @Description: 
   */
  const unFinishTask = async (ctx, next) => {
    const { where } = ctx.request.body
    const set = { state: false, utime: new Date() }
    await Task.modifyTask(dbConn, where, set).then(res => {
      ctx.body = {
        code: 1,
        message: 'success',
        data: res
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: 'fail',
        error: err
      }
    })
  }

  /**
   * @parmas: 
   * @Description: 
   */
  const updateTaskContent = async (ctx, next) => {
    const { where, set } = ctx.request.body
    await Task.modifyTask(dbConn, where, { ...set, utime: new Date() }).then(res => {
      ctx.body = {
        code: 1,
        message: 'success',
        data: res
      }
    }).catch(err => {
      ctx.body = {
        code: -1,
        message: 'fail',
        error: err
      }
    })
  }

  /**
   * @parmas: 
   * @Description: 
   */
  const getTask = async (ctx, next) => {
    const params = ctx.request.body;
    await Task.selectTask(dbConn, params).then(res => {
      ctx.body = {
        code: 1,
        message: 'success',
        data: res
      }
    }).catch(err => {
      console.log(err)
      ctx.body = {
        code: -1,
        message: 'fail',
        error: err
      }
    })
  }

  return { addTask, deleteTask, finishTask, unFinishTask, updateTaskContent, getTask }

}

module.exports = taskRouter