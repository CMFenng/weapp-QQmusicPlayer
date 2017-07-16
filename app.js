//app.js
App({
  onLaunch: function() {
    
  },

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