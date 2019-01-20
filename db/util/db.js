/*
 * @Author: hongyongbo
 * @Date: 2019-01-17 10:27:14
 * @LastEditors: hongyongbo
 * @LastEditTime: 2019-01-18 23:09:15
 * @Description: mysql 数据库操作
 * @Notice: 
 */


const dbConf = require('../conf/db.conf')
const mysql = require('mysql');

const pool = mysql.createPool(dbConf);
pool.connectionLimit = 10;
pool.waitForConnections = true;
pool.queueLimit = 0;

// wait_timeout 作怪：不活动的连接超过 wait_timeout 时间后，mysql 会主动把它释放掉，而且默认值是 8 小时！

/**
 * @parmas: 
 * @Description: 数据库连接promise
 */
function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("数据库连接失败");
        reject(err)
      } else {
        resolve(conn);
      }
    });
  });
}

module.exports = getConnection


