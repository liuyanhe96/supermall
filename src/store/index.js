import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex)

const state ={
  //数组的常用方法 pop()push() unshift() shiift() reverse() sort() concat()slice() splice()indexof()lastindexof()/map/filter/reduce/join
  cartlist:[]
}

const store = new Vuex.Store({

  state,
  //compon组件---->actions---->mutations---->state---->compon组件
  mutations,
  //actions不仅可以处理异步操作还可以处理繁杂操作为了不在mutations里处理这些操作方便跟踪
  actions,
  getters,
  modules: {

  }
});


export default store
