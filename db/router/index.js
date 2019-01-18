/*
 * @Author: hongyongbo
 * @Date: 2019-01-17 10:27:14
 * @LastEditors: hongyongbo
 * @LastEditTime: 2019-01-17 17:43:47
 * @Description: 路由注册,接口分发
 * @Notice: 
 */


const Router =require("koa-router") 
const taskRouter=require('./task.js')

function createRouter(db) {
  const router = new Router({
    prefix: "/api"
  });

  const task=taskRouter(db)
  router.post("/task/add", task.addTask);
  router.get("/task/delete", task.deleteTask);
  router.post("/task/finish", task.finishTask);
  router.post("/task/unFinish", task.unFinishTask);
  router.post("/task/modifyContent", task.updateTaskContent);
  router.post("/task/getTask", task.getTask);
  
  return router;
}

module.exports= createRouter;
