export function
//防抖函数 防止频繁加载
deboundce(func,delay){
  //timer是局部变量 但不会销毁 是因为在function里被引用 是个闭包 闭包对外层的东西做了引用
  let timer  = null;
  // ...args是为了在调用refersh()时可以在（）里传入多个值
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

//时间格式化！！！！！ 重要
//时间戳转换成日期格式 yyyy-MM-DD 正则表达式
export function formatDate(date, fmt) {
  // 获取年份  * 表示可有可无，多了不限  + 表示至少一个，一个或者多个，多了不限。  y+:匹配一个或多个y 。y*:表示0个或者多个。y?:表示0个或者1个
  // 人为传入 例 yyyy-2019 yyy-019 yy-19 y-9
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 表示传入的yyyy或yy    RegExp:全局对象  先通过 +''变成字符串 在通过substr截取
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
//为了显示两位 例 08：06：04
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
// str=04 =>'0004'=>通过substr截取两位=>'04'
};
