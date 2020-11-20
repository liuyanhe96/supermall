<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default : 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }

    },
    data(){
      return{
        scroll:null,
      }
    },
    mounted() {
      //1 创建BSsroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        mouseWheel:true
      })
      // this.scroll.scrollTo(0,0) 把这个方法封装到methods里
      // this.scroll.on('scroll',(position)=>{
      //
      // })
      // this.scroll.refresh()
      // this.scroll.on('refresh', () => {})

      //2 监听滚动的区域
     if(this.probeType===2||this.probeType===3){
       this.scroll.on('scroll',(position)=>{
         // console.log(position);
         this.$emit('scroll',position)
       })
     }

      //3监听上拉属性
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('1111111111');
          this.$emit('pullingUp')
        })
      }

    },
    methods:{
      scrollTo(x,y,time=500){
        // && 逻辑与 先判断第一个有没有值是否是正确的 要没有就不往后进行
        //主要是解决
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll &&  this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll?this.scroll.y:0
      }

    }

  }
</script>

<style scoped>

</style>


