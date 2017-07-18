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
    songData: null,
    songList: null
  }
})