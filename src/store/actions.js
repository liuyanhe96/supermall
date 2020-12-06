import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default {
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      //payload添加新的商品
      //1查找之前数组中是否含有该商品!!!
      // let oldproduct = null;
      // for(let item of state.cartlist){
      //   if(item.iid === payload.iid){
      //     oldproduct = item
      //   }
      // }
      //2find 查找为true时 返回item 比上面简便
      let oldproduct = context.state.cartlist.find(item=>item.iid===payload.iid)

      //判断oldproduct
      if(oldproduct){
        context.commit(ADD_COUNTER,oldproduct);
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1;
        // state.cartlist.push(payload)
        context.commit(ADD_TO_CART,payload);
        resolve('添加了新的商品')
      }
    })
  }
}
