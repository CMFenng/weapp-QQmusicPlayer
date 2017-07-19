//app.js
App({
  onLaunch: function() {
    
  },

  /**
   * 设置全局数据
   * @param {Object} obj 包裹数据的对象
   */
  setGlobalData: function (obj) {
  	for (let key in obj) {
  		this.globalData[key] = obj[key];
  	}
  },

  // 全局数据
  globalData: {
    // 当前播放歌曲信息
    songData: null,
    // 播放列表
    songList: null
  }
})