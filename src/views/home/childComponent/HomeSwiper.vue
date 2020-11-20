<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type : Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        //使用isLoad变量进行状态记录
        isLoad:false
      }
    },
    components:{
      SwiperItem,
      Swiper
    },
    methods:{
      imageLoad(){
        // isLoad的判断是为了只发送一次事件 否则会发四次
        if(!this.isLoad){
          this.$emit('swiperImageLoad');
          this.isLoad = true
        }
      }
    },
  }
</script>

<style scoped>

</style>
