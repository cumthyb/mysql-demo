/*
 * @Author: hongyongbo
 * @Date: 2019-01-17 12:08:22
 * @LastEditors: hongyongbo
 * @LastEditTime: 2019-01-17 17:33:43
 * @Description: 定义Task实体类
 * @Notice: 
 */


const TaskDAL=require('./dal.js')

class Task {
  constructor(title, remark,ctime,utime,state) {
    this.title = title;
    this.remark = remark;
    this.ctime = ctime;
    this.utime = utime;
    this.state = state;
  }

  static addTask(conn,task) {
    var dal=new TaskDAL(conn)
    return dal.insert(task)
  }

  static selectTask(conn,task) {
    var dal=new TaskDAL(conn)
    return dal.select(task)
  }

  static modifyTask(conn,where,set) {
    var dal=new TaskDAL(conn)
    return dal.update(where,set)
  }

  static deleteTaskById(conn,task) {
    var dal=new TaskDAL(conn)
    return dal.delete(task)
  }

}


module.exports=Task