/*
 * @Author: hongyongbo
 * @Date: 2019-01-17 10:27:14
 * @LastEditors: hongyongbo
 * @LastEditTime: 2019-05-16 14:07:35
 * @Description: 实现对持久化数据访问
 * @Notice: 
 */

const util = require('../../util/index.js')

//定义库表结构 
const TTABLE_NAME = 'tb_task'
const F_ID = 'id'
const F_TITLE = 'title'
const F_DESC = 'remark'
const F_CTIME = 'ctime'
const F_UTIME = 'utime'
const F_STATUS = 'state'

//定义库表字段与模型属性的映射关系



//封装Task相关的数据库操作
class TaskDAL {
  constructor(conn) {
    this.conn = conn;
  }

  /**
   * @parmas: task {key:value}
   * @Description: 
   */
  insert(task) {
    return new Promise((reslove, reject) => {
      let ct = util.filterNull(task)
      ct.id = util.uuid()
      let fields = Object.keys(ct)
      let values = Object.values(ct)
      let sql = `INSERT INTO ${TTABLE_NAME}(${fields.join(',')}) VALUES(${'?'.repeat(values.length).replace(/(?<=\?)(?=\?)/g, ',')})`

      this.conn.query(sql, values, (error, results, fields) => {
        if (error)
          reject(error);
        else {
          reslove(ct.id)
        }
      })
    })
  }

  /**
   * @parmas: task {key:value}
   * @Description: 
   */
  select(task) {
    return new Promise((reslove, reject) => {
      let ct = Object.create(task)
      ct = util.filterNull(ct)
      let sql = `SELECT * FROM ${TTABLE_NAME} `
      let fields = Object.keys(ct)
      if (fields.length) {
        let values = Object.values(ct)
        let where = fields.join("=? AND ") + "=?"
        sql = sql + ' WHERE ' + where + 'ORDER BY ctime DESC';
        this.conn.query(sql, values, (error, results, fields) => {
          if (error)
            reject(error);
          else {
            reslove(results)
          }
        })
      }
      else {
        sql+= ' ORDER BY ctime DESC'
        this.conn.query(sql, (error, results, fields) => {
          if (error)
            reject(error);
          else {
            reslove(results)
          }
        })
      }
    })
  }

    /**
   * @parmas: filter {key:value}
   * @parmas: set {key:value}
   * @Description: 
   */
  update(filter,set) {
    return new Promise((reslove, reject) => {
      let _set = Object.create(set)
      _set = util.filterNull(_set)
      let setFields = Object.keys(_set)
      let setValues = Object.values(_set)

      let _filter = Object.create(filter)
      _filter = util.filterNull(_filter)
      let fiterFields = Object.keys(_filter)
      let filterValues = Object.values(_filter)

      let sql = `UPDATE ${TTABLE_NAME}`
      let setStr = setFields.join("=?, ") + "=?"
      let where = fiterFields.join("=? AND ") + "=?"
      sql = sql + ' SET ' + setStr +" WHERE "+ where;
      this.conn.query(sql,[...setValues,...filterValues] , (error, results, fields) => {
        if (error)
          reject(error);
        else {
          reslove()
        }
      })
    })

  }

  /**
   * @parmas: filter {key:value}
   * @Description: 
   */
  delete(filter) {
    return new Promise((reslove, reject) => {
      let fields = Object.keys(filter)
      let values = Object.values(filter)
      let sql = `DELETE FROM ${TTABLE_NAME} `
      let where = fields.join("=? AND ") + "=?"
      sql = sql + ' WHERE ' + where;
      this.conn.query(sql, values, (error, results, fields) => {
        if (error)
          reject(error);
        else {
          reslove()
        }
      })
    })
  }

  /**
   * @parmas: 
   * @Description: Task Obj->DAL
   */
  trans2Dal(task) {
    let dal = {};

    return dal;
  }

}

module.exports = TaskDAL