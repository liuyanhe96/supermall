<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
<!--  //  :probe-type="3" 有：才可以传Number类否则传的是String-->
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommendList" ref="recommend"></goods-list>
  </scroll>
  <!--    .native 在我们需要监听一个组件的原生事件时, 必须给对应的事件加上.native修饰符, 才能进行监听.-->
  <back-top @click.native="backtopClick" v-show="isShow"></back-top>

  <detail-bottom-bar @addToCart="addToCart"/>
  <toast />
</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import GoodsList from "components/content/goods/GoodsList";

  import Scroll from "components/common/scroll/Scroll";

  //网络请求
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {deboundce} from "../../common/utils";
  import {backTopMixin} from "common/mixin";
  import {mapActions} from 'vuex'
  import Toast from "../../components/common/toast/Toast";

  export default {
    name: "Detail",
    mixins:[backTopMixin],
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        //获取到每个组件距离顶部的值，存储到数据中，点击的时候 拿出对应索引的值
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,

      }
    },

    components:{
      Toast,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,

      Scroll,

      getDetail,
      Goods,
      Shop

    },
    created() {
      //1 保存传入的ID
      this.iid = this.$route.params.iid
      //2 根据ID请求详情数据
      getDetail(this.iid).then(res=>{
        console.log(res);
        //2.1获取顶部的图片轮播数据
        const data = res.result;
        console.log(data);
        this.topImages = data.itemInfo.topImages;
        //2.2获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        //2.3获取商家信息
        this.shop = new Shop(data.shopInfo,);
        //2.4保存商品的详情数据
        this.detailInfo = data.detailInfo;
        //2.5获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //2.6
        if(data.rate.list){
          this.commentInfo = data.rate.list[0]
        }
      })
      //3
      getRecommend().then(res=>{
        this.recommendList = res.data.list
        // console.log(res.data.list);
      });

      //4 给getthemeTopY赋值
      this.getThemeTopY=deboundce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      },500)

      //第一次获取 ，值不对
      //原因： this.$refs.param.$el 压根没有渲染
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      // created是不会进行dom渲染的，如果想拿到数据的话使用nextTick() 这个函数等template渲染完后回调一次 但
      // this.$nextTick(()=>{
        //2 第二次获取第二次获取，值不对 原因：图片没有计算在内
        //这个方法有bug 根据最新数据，对应的DOM是已经被渲染出来了
        //但是图片依然是没有加载完 目前获取到的offsetTop是不包含图片的
        //offsetTop值不对都是因为图片的问题
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // })
    },
    methods:{
      ...mapActions(["addCart"]),

      imageLoad(){
        this.$refs.scroll.refresh()

        //详情里的图片加载完后回调！！！！！！
         this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        //1 获取y值
        let length = this.themeTopYs.length
        const positionY = -position.y
        //2 positionY与themeTopYs进行对比
        // for(let i in this.themeTopYs) {}  这里i是String类型 需要parseInt/i*1转换

        //2.1
        // for (let i = 0; i < length; i++) {
        //   //currentIndex 防止多次打印
        //   if(this.currentIndex !== i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||
        //     (i === length-1 &&positionY>=this.themeTopYs[i]))){
        //     this.currentIndex=i;
        //     // console.log(this.currentIndex);
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }

        //2.2新方法 在数组最后push Number.MAX_VALUE
        for (let i = 0; i <length-1 ; i++) {
          if(this.currentIndex!==i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //1 判断BackTop是否显示  这里不能抽到mixin里 生命周期函数可以抽到时候自动合并 但是methods不会合并会覆盖！！！ 可以再写个新函数 在这里调用下
        this.isShow =  (-position.y) > 1000;
      },
      addToCart(){
        //1 获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid


        //2添加到购物车成功   dispath可以接收返回Promise 如果在vuex里做了操作然后用Promise可以让外面知道做了什么操作
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })
        this.addCart(product).then(res=>{
          this.$toast.show(res)
        })
      }
    },

    mounted() {
      // 1 图片加载的事件监听
      //this.$refs.scroll.refresh后面不能加（）因为传入的是函数本身 不是它的结果
      //这里refresh是局部变量 不会销毁 因为在下面的箭头函数里引用 是闭包 闭包对refresh有引用
      const refresh = deboundce(this.$refs.scroll.refresh,40)
      // 在 mounted里$refs是一定有值的 在create里不一定有
      // 组件创建完毕后监听事件总线 监听GoodsListItem中图片加载完成
      // 在main.js中通过原型 将$bus定义为vue实例 才可以发射/监听事件  注意 on前加$
      this.$bus.$on('detailItemImageLoad',()=>{
        refresh()
      })

    },
    updated() {
      //获取导航按钮位置
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // }
  }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    /*给父元素适口高度 为了下面content*/
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px)

  }
  .detail-nav{
    /*一般优先使用相对定位 因为可以保持原先位置*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>
