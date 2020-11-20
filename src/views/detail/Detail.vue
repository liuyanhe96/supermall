<template>
<div id="detail">
  <detail-nav-bar class="detail-nav"></detail-nav-bar>
  <scroll class="content" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :param-info="paramInfo"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
  </scroll>
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

  import Scroll from "components/common/scroll/Scroll";

  //网络请求
  import {getDetail,Goods,Shop,GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo: {},
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,

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
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    },
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
