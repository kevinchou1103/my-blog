export function getPlaySong(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
export function getSongDetail(id) {
  return `http://123.207.32.32:9001/song/detail?ids=${id}`;
}
export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`;
}
export function formatDate(time, fmt) {
  let date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};