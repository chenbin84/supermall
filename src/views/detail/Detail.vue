<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" />
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
       <detail-param-info :param-info="paramInfo"/>
       <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      </scroll>

  </div>
</template>

<script>
 import DetailNavBar from './childComps/DetailNavBar'
 import DetailSwiper from './childComps/DetailSwiper'
 import DetailBaseInfo from './childComps/DetailBaseInfo'
 import DetailShopInfo from './childComps/DetailShopInfo'
 import Scroll from 'components/common/scroll/Scroll'
 import DetailGoodsInfo from './childComps/DetailGoodsInfo'
 import DetailParamInfo from './childComps/DetailParamInfo'
 import DetailCommentInfo from './childComps/DetailCommentInfo'
 import {Goods,getDetail,Shop,GoodsParam} from 'network/detail'


 


export default {  
  name:'Detail',
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo: {},
            commentInfo:{}
        }
    },
    methods: {
      imageLoad() {
         this.$refs.scroll.refresh()
      }
    },
    created() {
      //保存存入的iid
        this.iid=this.$route.params.iid
        //根据iid请求详情数据
        getDetail(this.iid).then(res=>{
          console.log(res);
          // this.res=res
          const data= res.result;
          //获取图片
          this.topImages =res.result.itemInfo.topImages;
          // console.log(this.topImages);
          // 2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          //3.创建店铺信息对象
          this.shop=new Shop(data.shopInfo)
          //4.获取商品详细信息
          this.detailInfo=data.detailInfo

           // 5.获取参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          //6.取出评论信息
          if(data.rate.cRate !==0) {
            this.commentInfo =data.rate.list[0]
          }
           
        })
    },
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      // paramInfo,
      DetailParamInfo,
      DetailCommentInfo
  }
}
</script>

<style scoped >
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
.content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
  }
</style>
