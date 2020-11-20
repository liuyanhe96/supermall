<template>
  <div class="detail-swiper">
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages" >
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>

</template>

<script>
  //轮播图组件
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem,
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
