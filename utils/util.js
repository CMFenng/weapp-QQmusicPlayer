function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 根据歌名、人名查询歌曲
// https://route.showapi.com/213-1?showapi_appid=42393&showapi_sign=52736a370baa408aad3457585e63e5b5&keyword=冯提莫

// 根据歌曲 id 查询歌词
// https://route.showapi.com/213-2?showapi_appid=42393&showapi_sign=52736a370baa408aad3457585e63e5b5&musicid=203101747

const appid = "42393";
const secret = "52736a370baa408aad3457585e63e5b5";
let searchSongUrl = "https://route.showapi.com/213-1";
let searchLyricUrl = "https://route.showapi.com/213-2";

/**
 * 根据歌名、人名查询歌曲
 * @param  {String}   keyword    人名或歌名
 * @param  {String}   page       页数。每页最多只返回20条记录。
 * @param  {Function} callbackFn 回调函数
 * @return {none}                无
 * 数据格式见：https://www.showapi.com/api/lookPoint/213/1
 */
function getSearchMusic(keyword, page, callbackFn) {
  wx.request({
    //必需
    url: searchSongUrl,
    data: {
      showapi_appid: appid,
      showapi_sign: secret,
      keyword: keyword,
      page: page
    },
    header: {
        'Content-Type': 'application/json'
    },
    success: function(res) {
      callbackFn(res);
      // console.log(res);
    },
    fail: function(res) {
      
    },
    complete: function(res) {
      
    }
  })
}

/**
 * 根据歌曲 id 查询歌词
 * @param  {String}   musicid    歌曲id
 * @param  {Function} callbackFn 回调函数
 * @return {none}                无
 * 数据格式见：https://www.showapi.com/api/lookPoint/213/2
 */
function getLyric(musicid, callbackFn) {
  wx.request({
    //必需
    url: searchLyricUrl,
    data: {
      showapi_appid: appid,
      showapi_sign: secret,
      musicid: musicid
    },
    header: {
        'Content-Type': 'application/json'
    },
    success: function(res) {
      callbackFn(res);
    },
    fail: function(res) {
      
    },
    complete: function(res) {
      
    }
  })
}


module.exports = {
  formatTime: formatTime,
  getSearchMusic: getSearchMusic,
  getLyric: getLyric
}
