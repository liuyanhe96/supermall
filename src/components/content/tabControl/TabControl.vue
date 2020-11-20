<template>
  <div class="tab-control">
<!--    当只是文字不同时 没有必要稿插槽！！！！！！！！-->
    <div v-for="(item,index) in titles" class="tab-control-item" :class="{active : index === currentIndex}" @click="itemclick(index)">
      <span>{{item}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles:{
        type:Array,
        default(){
          return{
          }
        }
      }
    },
    data(){
      return{
        currentIndex: 0
      }
    },
    methods:{
      itemclick(index){
        this.currentIndex = index
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control-item span{
    padding: 5px;
  }
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }

</style>
