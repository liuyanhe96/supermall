//main.js 是启动文件

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast' //默认导入这个文件夹里的index文件
import FastClick from 'fastclick'


//使用原型 vue实例可以作为事件总线！！
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

//安装toast插件 vue.use本质上调用toast里的install
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  toast,
  router,
  store,
  render: h => h(App)
}).$mount('#app')




//js异步编程 单线程 + 事件队列
//事件循环 event loop  只要是settimeout里的东西 都会被加入到下一次事件循环的尾部执行

// console.log('aaaa');
//
// setTimeout(()=>{
//   console.log('bbbbbbbbb');
// },)
//
// console.log('cccccccccc');

// aaaa->ccccccccc->bbbbbbbbb
