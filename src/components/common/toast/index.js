import Toast from "./Toast";

const obj={}
//就是把toast注册成为一个全局的组件，这个组件在vue的原型上面，跟之前的vue-router  store一样的原理
//vue.use会从这里调用install函数
//install默认传过来一个参数Vue
obj.install = function (Vue) {
  //这里的1-4步是为了把元素挂载到我们页面内，取代我们前面重复到每个页面import,components,templeate挂载了

  //1 创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2 new的方式 根据组件构造器 可以创建出来一个组件对象
  const toast = new toastConstructor()
  //3 将组件对象 手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4 toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
