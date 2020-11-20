<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" class="tab-control" v-show="isTabFixed"></tab-control>

<!--    :probe-type ='3' 有:表示传入3数字 没有：也可以传值但是是字符串'3'！！！！！！！！ -->

   <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
     <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
     <goods-list :goods="showGoods"></goods-list>
   </scroll>

<!--    .native 在我们需要监听一个组件的原生事件时, 必须给对应的事件加上.native修饰符, 才能进行监听.-->
    <back-top @click.native="backtopClick" v-show="isShow"></back-top>
  </div>

</template>

<script>
  //公共组件
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  //子组件
  import HomeSwiper from "./childComponent/HomeSwiper";
  import RecommendView from "./childComponent/RecommendView";
  import FeatureView from "./childComponent/FeatureView";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";

// network 网络
  import {getHomeMultidata,getHomeGoods} from "network/home";
  //防抖函数
  import {deboundce} from "common/utils";


  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },

    data(){
      return{
        banners:[],
        recommends:[],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType : 'pop',
        isShow : false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY :0,
      }
    },

    created() {
      //1 请求多个数据
      this.getHomeMultidata(),

        //2请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

      //在create里拿 $refs 和 document.querySelector 都是为空的 下面有时不为空是因为是回调的 但有时会为空 所以得把它放在mounted里！！！！
      // this.$bus.$on('itemImageLoad',()=>{
      //   this.$refs.scroll.refresh()
      // })
    },
    mounted() {
      // 1 图片加载的事件监听

      //this.$refs.scroll.refresh后面不能加（）因为传入的是函数本身 不是它的结果
      //这里refresh是局部变量 不会销毁 因为在下面的箭头函数里引用 是闭包 闭包对refresh有引用
      const refresh = deboundce(this.$refs.scroll.refresh,40)
      // 在 mounted里$refs是一定有值的 在create里不一定有
      // 组件创建完毕后监听事件总线 监听GoodsListItem中图片加载完成
      // 在main.js中通过原型 将$bus定义为vue实例 才可以发射/监听事件  注意 on前加$
      this.$bus.$on('itemImageLoad',()=>{
        refresh()
      })

    },

    //页面使用时 回到页面时 自动到上次浏览的位置
    activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
      //有时回到页面会不能滚 刷新一下
      this.$refs.scroll.refresh()
    },
    //离开页面时 记录离开时的位置
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },

    methods:{

        //事件监听相关方法
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0 :
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2 :
            this.currentType = 'sell';
            break
        }
        //两个tabControl 点击不同步 这里设置
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },

      // 网络请求的相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          //this.result = res; //把结果存储到data中 因为函数调用完后 定义的变量内存会被回收
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type){
        //动态获取页数 +1为了请求数据和请求时传参 并没有更新data里的page
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(
          res=>{
            // console.log(res);
           this.goods[type].list.push(...res.data.list);
           this.goods[type].page += 1; //更新data里的page 与上面同步 现在+1为了翻页
              this.$refs.scroll.finishPullUp() //通过refs到Scroll里调用finishPullUp()方法 加载一次后可以继续加载更多
          }
        )
      },

      //
      backtopClick(){
        this.$refs.scroll.scrollTo(0, 0,500)
      },
      contentScroll(position){
        //1 判断BackTop是否显示
       this.isShow =  (-position.y) > 1000;
       //2 决定tabControl是否吸顶 改变样式（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        //this.$refs.scroll.scroll.refresh() 解决better-scroll的BUG 由于图片加载慢 计算高度小于实际 出现划不动的情况 需要refresh方法使BS从新计算高度
      },
      swiperImageLoad(){
        // 2 获取tabControld的offsetTop
        //所有的组件都一个属性：$el 用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      }

    },
  }
</script>

<style scoped>
  #home{
    /*vh:viewport height 100vh:100%适口 适口高度*/
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /*使用position:  需要 left right top bottom 定位的！！！！！！！！*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

  .tab-control{
    position: relative;
    /*z-index只对position其效果*/
    z-index: 9;
  }
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  .content{
    /*height: fit-content;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
