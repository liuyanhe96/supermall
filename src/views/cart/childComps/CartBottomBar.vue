<template>
  <div class="cart-bottom">
    <div class="first">
      <check-button @click.native="clickbtn" class="checkbtn" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcbtn">
    去计算：{{checkLength}}
    </div>
  </div>
</template>

<script>

  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed:{
      ...mapGetters(["cartList"]),

      totalPrice(){
        // console.log(this.$store.state.cartlist);
        //如果合计时出现NaN 。是因为price值前面多了￥。可以去看下detail中的Goods类变量。是不是跟老师一样
        return '¥'+this.$store.state.cartlist.filter(item=>{
          return item.checked
        }).reduce((pre,item)=>{
          return pre + item.price*item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartlist.filter(item=>item.checked).length
      },
      isSelectAll(){
        if (this.cartList.length===0) return false;
        return !this.cartList.find(item=>!item.checked)
      }
    },
    methods:{
      clickbtn(){
        if(this.isSelectAll){
          //由全选到都不选
          this.cartList.forEach(item=>item.checked=false)
        }else {
          //由不全选/不选 到全选
          this.cartList.forEach(item => item.checked=true )
        }
      },
      calcbtn(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品')
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom{
    background-color: #eeeeee;
    height: 45px;
    width: 100%;
    position: fixed;
    bottom: 49px;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
  .first{
    /*flex: 1;*/
  }
  .checkbtn{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 6px;
  }
  .price{
    margin-left: 20px;
  }
  .calculate{
    height: 100%;
    width: 30%;
    background-color: #f13e3a;
    color: #fff;
    text-align: center;
    line-height: 45px;
  }

</style>
