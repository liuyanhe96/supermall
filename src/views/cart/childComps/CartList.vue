<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info = 'item'/>
  </scroll>

</div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'
  import CartListItem from "./cartListItem";
  export default {
    name: "CartList",
    components: {
      CartListItem,
      Scroll,
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      //进入购物车页面从新计算ScrollHeight 否则刚进入不能滚动
      this.$refs.scroll.refresh()
    },
    methods:{

    }
  }
</script>

<style scoped>
  .cart-list{
    /*height: calc(100% - 44px - 49px);*/
    height: 100vh;
  }
  .content{
    /*height: 100%;*/
    height: calc(100% - 44px - 49px - 45px);
    overflow: hidden;
  }

</style>
