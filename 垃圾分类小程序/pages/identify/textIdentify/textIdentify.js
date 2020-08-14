// pages/identify/textIdentify/textIdentify.js
var util = require("../../../utils/utils.js");
var app = getApp(); // 获取入口文件app的应用实例

var wayIndex = -1;
var school_area = '';
var grade = '';
// 当联想词数量较多，使列表高度超过340rpx，那设置style的height属性为340rpx，小于340rpx的不设置height，由联想词列表自身填充

var arrayHeight = 0;
Page({
  data: {
    inputValue: '',
    bindSource: [],
    hideScroll: true,
    newSource: [],
  },

  onLoad: function () {

  },
  //当输入文本时，触发Textinput事件
  Textinput: function (e) {
    var that = this;
    var prefix = e.detail.value
    //匹配的结果
    if (prefix != "") { //当输入文字时开始发送请求
      wx.request({
        url: util.TXAPI_BASE_URL + '/txapi/lajifenlei/', //文字识别垃圾分类接口
        data: {
          key: util.TXAPI_KEY, //apikey
          word: prefix
        },
        success: function (res) {
          if (res.data.code == 200) { //成功调用
            console.log(res); //控制台打印信息
            let newSource = res.data.newslist.concat(); //定义局部变量
            that.setData({
              hideScroll: false,
              bindSource: newSource,
              arrayHeight: newSource.length * 71
            })
          } else {
            console.error('错误码：' + res.data.code + '\n错误提示：' + res.data.msg + '\n') //异常处理
            wx.showModal({ //弹出错误提示框
              title: '垃圾分类文字识别',
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
            that.setData({
              hideScroll: true,
              bindSource: []
            })
          }
        }
      })
    }
  },
  query: function (e) {
    var that = this;
    var s = this.data.bindSource[e.target.id]
    that.setData({
      name: s.name,
      type: s.type,
      explain: s.explain,
      contain: s.contain,
      tip: s.tip,
      inputValue: s.name,
      hideScroll: true,
      bindSource: []
    })
  }
})
