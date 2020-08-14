// pages/test/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendgrade: 0,
    rate:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app = getApp()
    var getgrade = app.globalData.grade
    this.setData({
      sendgrade:getgrade,
      rate:getgrade*100/4
    })
  },
  initialpage: function () {
    var app = getApp()
    app.globalData.grade -= app.globalData.grade
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  gotochoose:function(){
    var app = getApp()
    app.globalData.grade -= app.globalData.grade
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})