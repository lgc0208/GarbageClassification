
var TXAPI_BASE_URL = "";  //接口域名
var TXAPI_KEY = "";  //apikey

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  TXAPI_BASE_URL: TXAPI_BASE_URL,
  TXAPI_KEY: TXAPI_KEY,
  formatTime: formatTime
}
