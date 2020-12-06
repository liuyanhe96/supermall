import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default {
  //mutations唯一的目的就是修改state中的状态 和 做一些跟踪！！！项目大时可以做调试
  //mutations中的每一个方法尽可能完成的事情比较单一一点 只做一件事情 。两个操作一个方法，跟踪不确定性
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    //选中与不选中一定在对象模型里记录！！！！！！不要直接改isChecked属性 要由模型决定isChecked是true/false 所以通过修改模型来改变界面
    payload.checked = true;
    state.cartlist.push(payload)
  }
}
