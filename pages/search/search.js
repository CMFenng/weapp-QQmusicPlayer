// search.js

let util = require('../../utils/util.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "inputValue": "",         // 输入的关键字
    "searchSongList": [],     // 返回数据的歌曲列表
    "isSongListEmpty": true,  // 判断 searchSongList 是否为空，默认为空（true）
    "searchPageNum": 1,       // 加载的第几页，默认第一页
    "isLoading": false,       // 是否“正在加载更多”，默认隐藏
    "isLoadComplete": false   // 是否“加载完成”，默认隐藏
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
   * 获取输入框的 value 值
   * @param  {Object} e 事件对象
   * @return {none}     无
   */
  getIptValue: function (e) {
    console.log(e.detail.value);
    if (e.detail.value) {
      this.setData({
        "inputValue": e.detail.value
      });
    } else {
      this.clearIptValue();
    }
  },

  /**
   * 清空输入框的值
   * @return {none} 无
   */
  clearIptValue: function () {
    this.setData({
      "inputValue": "",
      "searchSongList": [],
      "isSongListEmpty": true,
      "isLoading": false,
      "isLoadComplete": false,
      "searchPageNum": 1
    });
  },

  /**
   * 根据关键字搜索
   * @return {none} 无
   */
  keywordSearchFn: function () {
    if (!this.data.inputValue) {
      wx.showToast({
        title: "请输入搜索内容",
        duration: 1500
      });
      return;
    }
    this.handleSearchData();
  },

  scrolltolower: function () {
    let self = this;
    if (self.data.isLoading && !self.data.isLoadComplete) {
      self.setData({
        "searchPageNum": self.data.searchPageNum+1,
        "isLoading": false
      });
      self.handleSearchData();
    }
  },

  playMusic: function (e) {
    let self = this;
    let songData = e.currentTarget.dataset.data;

    app.setGlobalData({
      "songData": songData,
      // 此处暂时将搜索结果放到播放列表
      "songList": self.data.searchSongList
    });
    wx.navigateTo({
      url: '../player/player'
    })
  },

  handleSearchData: function () {
    let self = this;
    let keyword = self.data.inputValue;
    let pageNum = self.data.searchPageNum;

    // 请求数据
    util.getSearchMusic(keyword, pageNum, function (res) {
      let resultList = res.showapi_res_body.pagebean.contentlist;
      let resultLen = res.showapi_res_body.pagebean.contentlist.length;
      if (resultLen != 0) {
        let songList = [];
        self.data.isSongListEmpty ? songList = resultList : songList = self.data.searchSongList.concat(resultList);
        self.setData({
          "searchSongList": songList,
          "isSongListEmpty": false,
          "isLoading": true
        });
      } else {
        self.setData({
          "isLoadComplete": true
        });
      }
    })
  }
})