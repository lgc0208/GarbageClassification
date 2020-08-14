// pages/identify/imageIdentify/imageIdentify.js
var util = require("../../../utils/utils.js");
var app = getApp(); // 获取入口文件app的应用实例

Page({
  data: {
    rule: 1,
    items: [
      { name: 1, value: '模糊识别（成功率较高）', checked: 'ture' },
      { name: 0, value: '严格识别（精确度较高）' },
    ]
  },

  radioChange: function (e) //确定识别模式
  {
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value //保存数据到当前界面
      })
    }
    console.log(this.data.rule)
  },

  //确定图片来源，从相册中选择或者是拍照
  chooseImage: function () {
    wx.showActionSheet
      ({
        itemList: ['从相册中选择', '拍照'],
        itemColor: "#CED63A",
        success: (res) => {
          if (res.cancel) {
            return;
          }
          if (res.tapIndex == 0) {
            this.chooseWxImage('album')
          }
          else if (res.tapIndex == 1) {
            this.chooseWxImage('camera')
          }
        }
      })
  },



  //选择图片
  chooseWxImage: function (type) {

    var that = this
    wx.chooseImage
      ({
        count: 1,
        sizeType: ['compressed'], //由于API调用图片大小的限制，默认将图片压缩后再上传
        sourceType: [type], //根据用户选择确定调用相机或相册
        success: function (ress) {
          console.log(ress)
          if (ress.size > 1024 * 1024 * 3) //判断图片大小是否符合API调用标准
          {
            wx.showModal //返回错误信息
              ({
                title: '智能垃圾分类',
                content: '很抱歉，图片最大允许大小为3M，您当前的图片太大',
              })
            return false;
          }
          else {
            wx.getFileSystemManager().readFile //读取文件
              ({
                filePath: ress.tempFilePaths[0], //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                mode: that.data.rule, //根据用户需求选择识别模式
                success: res => //成功的回调
                {
                  // console.log('data:image/png;base64,' + res.data) //打印64位编码数据
                  wx.request
                    ({
                      url: util.TXAPI_BASE_URL + '/txapi/imglajifenlei/', //智能垃圾分类接口
                      method: 'POST',
                      header:
                      {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data:
                      {
                        key: util.TXAPI_KEY,
                        img: 'data:image/png;base64,' + res.data
                      },
                      success: function (res) {
                        if (res.data.code == 200) {
                          let temp_data = res.data.newslist;
                          var newSource = res.data.newslist;//.concat(temp_data)
                          that.setData
                            ({
                              img: ress.tempFilePaths[0],
                              size: (ress.size / (1024 * 1024)).toFixed(2),
                              bindSource: newSource
                            })
                        }
                        else {
                          console.error('错误码：' + res.data.code + '\n错误提示：' + res.data.msg + '\n接口详情：https://www.tianapi.com/apiview/101') //根据返回的错误码判断问题类型
                          wx.showModal
                            ({
                              title: '垃圾分类',
                              content: res.data.msg,
                              showCancel: false,
                              success: function (res) { }
                            })
                          that.setData
                            ({
                              hideScroll: true,
                              bindSource: []
                            })
                        }
                      }
                    })
                }
              })
          }
        }
      }
      )
  },



  /**
   * 选择 / 拍摄图片
   */
  addapimg: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (ress) {
        console.log(ress)
        if (ress.size > 1024 * 1024 * 3) {
          wx.showModal({
            title: '垃圾分类',
            content: '很抱歉，图片最大允许3M，当前为' + (ress.size / (1024 * 1024)).toFixed(2),
          })
          return false;
        } else {
          wx.getFileSystemManager().readFile({
            filePath: ress.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              console.log('data:image/png;base64,' + res.data)
              wx.request({
                url: util.TXAPI_BASE_URL + '/txapi/imglajifenlei/', //垃圾分类接口
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  key: util.TXAPI_KEY,
                  img: 'data:image/png;base64,' + res.data
                },
                success: function (res) {
                  if (res.data.code == 200) {
                    let temp_data = res.data.newslist;
                    var newSource = res.data.newslist.concat(temp_data)
                    that.setData({
                      img: ress.tempFilePaths[0],
                      size: (ress.size / (1024 * 1024)).toFixed(2),
                      bindSource: newSource
                    })
                  } else {
                    console.error('错误码：' + res.data.code + '\n错误提示：' + res.data.msg + '\n接口详情：https://www.tianapi.com/apiview/101')
                    wx.showModal({
                      title: '垃圾分类',
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
          })
        }
      }
    }
    )
  }

})