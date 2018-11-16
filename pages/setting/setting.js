// 函数库
var Utils = require("../../utils/util.js");
const app = getApp()

// pages/setUp/setUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userInfo: {},

    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  quitFn:function(){
 
      wx.switchTab({
        url: '../../pages/ToSetting/ToSetting'
      })
    
  },

  dishLish() {
    wx.request({
      url: 'http://www.lywmy.cn:8081/dishmanagement',
      method: 'POST',
      header: { "content-type": 'application/json' },
      data: {
        "head": {
          "appVerNo": "1.0.0",
          "functionNo": "dishList"
        },
        "param": {
        }
      },
      dataType: 'json',
      responseType: 'text',
      success(res) {
        console.log(res);
        let subjects = res.data.subjects;
        wx: wx.hideToast()
      },
      fail(res) { console.log(res) },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // getStorag: function () { // 获取本地存储信息
  //   var data = wx.getStorageSync("login");
  //   return {
  //     sdk: data.sdk,
  //     uid: data.uid
  //   }
  // },
  // quitFn: function () {    // 退出登陆
  //   Utils.removeStorage("Reset");
  //   var res = this.getStorag();
  //   Utils.requestFn({
  //     url: '/index.php/loginOut?server=1',
  //     method: "POST",
  //     data: {
  //       sdk: res.sdk,
  //       uid: res.uid
  //     },
  //     success: function (res) {
  //       if (res.data.status) {
  //         wx.reLaunch({
  //           url: '/pages/login/login'
  //         })
  //         Utils.removeStorage("login");

  //       } else {
  //         Utils.reLaunch(res.data.message, "/pages/login/login");
  //         Utils.removeStorage("login");
  //       }
  //       return false;
  //     }
  //   })
  // }

})