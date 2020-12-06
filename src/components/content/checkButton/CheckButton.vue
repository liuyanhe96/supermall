<template>
  <div class="check-button" :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  //选中与不选中一定在对象模型里记录！！！！！！不要直接改isChecked属性 要由模型决定isChecked是true/false 所以通过修改模型来改变界面
  //界面显示根据模型 所有商品添加到VUEX里 在vuex这里修改

  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default : false
      }
    }
  }
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 2px solid #a3a3a5;
  /*cursor: pointer;*/
}
  .active{
    background-color: pink;
    border-color: pink;

  }
</style>
