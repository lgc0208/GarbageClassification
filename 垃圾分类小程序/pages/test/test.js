// pages/test/test.js
Page({
  onLoad: function (options) {

  },
  toFirstQuestion: function () {
    var app = getApp()
    app.globalData.grade -= app.globalData.grade
    wx.navigateTo({
      url: '/pages/test/questionFirst/questionFirst',
    })
  },
  toSecondQuestion: function () {
    var app = getApp()
    app.globalData.grade -= app.globalData.grade
    wx.navigateTo({
      url: '/pages/test/questionSecond/questionSecond',
    })
  },
})