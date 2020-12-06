//复用代码在这里写 将代码混入到data和mounted里通过mixin:[itemListenerMixin]  视频P201查看
//P204 讲的将newRefresh单独放到data里赋值null 原因：function里创建函数（使用防抖）再调用 防抖不起作用 函数有自己的作用域 每次都会调用新的 地址不同
import {deboundce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  components:{

  },
  methods:{

  },
  data(){
    return{
      itemImgListener:null,
      newRefresh:null,
    }
  },
  mounted(){
     this.newRefresh = deboundce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () =>{
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
};


export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return{
      isShow : false,
    }
  },
  methods: {
    backtopClick(){
      this.$refs.scroll.scrollTo(0, 0,500)
    },
  },

}
