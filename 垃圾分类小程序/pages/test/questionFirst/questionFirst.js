// pages/test/questionFirst/questionFirst.js
Page({
  data: {
    buttonClicked: false
  },
  /** buttonClicked: function (self) { 
     self.setData({ buttonClicked: true 
     }) 
      setTimeout(function() {self.setData({ buttonClicked: false })}, 500)
          },
 
   click: function (e) { 
     util.buttonClicked(this); 
     var id = e.currentTarget.dataset.id; 
     var app = getApp()
     var getgrade = app.globalData.grade
     app.globalData.grade += 1
     wx.navigateTo({ 
       url: '../detail/detail?id=' + id 
     }) 
   },*/

  addOne: function () {

    var app = getApp()
    var getgrade = app.globalData.grade
    app.globalData.grade += 1

  },
  toTestPage: function () {
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },
  toResultPage: function () {
    wx.navigateTo({
      url: '/pages/test/result/result',
    })
  },

  submitFunc: function (e) {
    this.setData({
      show_input: e.detail.value.input_word
    })
  }
})