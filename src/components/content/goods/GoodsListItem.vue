<template>
<div class="goods-item" @click="itemClick">
  <img :src="showImage" alt="" @load="imageLoad">
  <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
  </div>
</div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return[]
        }
      }
    },
    computed:{
      showImage(){
        // console.log(this.goodsItem.image);
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imageLoad(){
        //在home页面发送事件
        if(this.$route.path.indexOf('/home')){
          //事件总线 $bus
          // 在main.js中通过原型 将$bus定义为vue实例 才可以发射监听事件
          this.$bus.$emit('itemImageLoad')
        }else if(this.$route.path.indexOf('/detail')){
          this.$bus.$emit('detailItemImageLoad')
        }
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)

      }

    }
  }
</script>

<style scoped>
  .goods-item{
    position: relative;
    width: 48%;
    padding-bottom: 40px;
  }
  .goods-item img{
    width: 100%;
    border-radius: 3px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
