// player.js
let num = 1;

let util = require('../../utils/util.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "playType": "random",
    "isPlay": false,
    "isShowPlayList": false,
    "currentSong": null,
    "songList": null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.songData);
    this.setData({
      "currentSong": app.globalData.songData,
      "songList": app.globalData.songList
    });
    wx.playBackgroundAudio({
        dataUrl: this.data.currentSong.m4a,
        title: '',
        coverImgUrl: '',
        success: function(res) {
          console.log("成功");
        },
        fail: function(res) {
          
        },
        complete: function(res) {
          
        }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 切换歌曲播放类型的处理函数
   */
  changePlayType: function () {
    
    num++;
    if (num>3) {
      num=1;
    }

    if (num==1) {
      this.setData({
        "playType": "random"
      });
    }
    if (num==2) {
      this.setData({
        "playType": "loop"
      });
    }
    if (num==3) {
      this.setData({
        "playType": "one"
      });
    }
    console.log(num);
  },

  /**
   * 切换播放状态的处理函数
   */
  togglePlayStatus: function () {
    let self = this;
    this.setData({
      "isPlay": !self.isPlay
    });
  },

  /**
   * 显示播放列表的处理函数
   */
  showPlayList: function () {
    this.setData({
      "isShowPlayList": true
    });
  },

  /**
   * 隐藏播放列表的处理函数
   */
  hidePlayList: function () {
    this.setData({
      "isShowPlayList": false
    });
  }
})

