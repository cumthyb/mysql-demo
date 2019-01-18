/*
 * @Author: hongyongbo
 * @Date: 2019-01-17 17:17:25
 * @LastEditors: hongyongbo
 * @LastEditTime: 2019-01-17 17:24:27
 * @Description: 通用工具方法
 * @Notice: 
 */

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      if (o[key].trim()) {
        o[key] = o[key].trim()
      }
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'boolean') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'date') {
      o[key] = filterNull(o[key])
    }

  }
  return o
}

const UUID = require('uuid')
/**
 * @parmas: 
 * @Description: 输出唯一字符串
 */
function uuid(params) {
  return UUID.v4()
}

module.exports={filterNull,uuid}