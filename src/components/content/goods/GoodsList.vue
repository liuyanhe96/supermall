<template>
<div class="goods" >
<goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
</div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props:{
      goods:{
      type:Array,
      default(){
        return{}  //[] {} 是根据type来定的！！！！！！！
         }
    }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
  /*/包裹 flex-wrap 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。*/
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>
