// player.js
let util = require('../../utils/util.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "playType": "order",
    "isPlay": false,
    "isShowPlayList": false,
    "currentSong": null,
    "songList": null,
    "lyric": "",
    "lyric_txt": "",
    "animationData": {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.playMusic();
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

  playMusic: function () {
    this.setData({
      "currentSong": app.globalData.songData,
      "songList": app.globalData.songList,
      "isPlay": true
    });
    wx.playBackgroundAudio({
        dataUrl: this.data.currentSong.m4a,
        success: function(res) {
          console.log("播放...");
        },
        fail: function(res) {
          
        },
        complete: function(res) {
          
        }
    });

    // 显示歌词
    this.showLyric();

    this.animationFn();
  },

  pauseMusic: function () {
    wx.pauseBackgroundAudio();
    this.setData({
      "isPlay": false
    });
    console.log("暂停...");
  },

  prevMusic: function () {
    console.log("上一首");
  },

  nextMusic: function () {
    console.log("下一首");
  },

  /**
   * 切换歌曲播放类型的处理函数
   */
  changePlayType: function () {
    let type = this.data.playType;
    type === "order" ? type = "random" : type === "random" ? type = "loop" : type = "order"
    this.setData({
      "playType": type
    });
    console.log(this.data.playType);
  },

  /**
   * 切换播放状态的处理函数
   */
  togglePlayStatus: function () {
    this.data.isPlay ? this.pauseMusic() : this.playMusic();
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
   * 点击播放列表中的歌曲的处理函数
   * @param  {Obj} e 事件对象
   * @return {none}   无
   */
  playOtherMusic: function (e) {
    app.setGlobalData({
      "songData": e.currentTarget.dataset.data
    });
    this.playMusic();
  },

  /**
   * 隐藏播放列表的处理函数
   */
  hidePlayList: function () {
    this.setData({
      "isShowPlayList": false
    });
  },

  /**
   * 显示歌词的处理函数
   */
  showLyric: function () {
    let self = this;

    util.getLyric(self.data.currentSong.songid, function (res) {
      let lyric = res.showapi_res_body.lyric;
      let lyric_txt = res.showapi_res_body.lyric_txt;

      lyric_txt = lyric_txt.split(" ");

      let obj = {};
      let arr = [];
      console.log(lyric_txt);

      for (let i = 0; i < lyric_txt.length; i++) {
        if (!obj[lyric_txt[i]]) {
          obj[lyric_txt[i]] = true;
          arr.push(lyric_txt[i]);
        }
      }
      console.log(arr);

      self.setData({
        "lyric": arr
      });
    });
  },

  /**
   * 音乐播放是的动画效果
   * @return {none} 无
   */
  animationFn: function () {
    var animation = wx.createAnimation({
      duration: 10000,
      timingFunction: "linear"
    });

    this.animation = animation;

    animation.rotate(180).step();

    this.setData({
      "animationData": animation.export()
    });
  }
})

