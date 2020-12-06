<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar/>
  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  export default {
    name: "Cart",
    components: {
      CartBottomBar,
      CartList,
      NavBar,


    },
    computed:{
      //要想改名的话就写对象，反之写数组
      //这个最大的作用还不是方便管理，而是减少了一次计算属性的计算
      ...mapGetters({
        length:"cartLength",
        list:'cartList'
      })
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
