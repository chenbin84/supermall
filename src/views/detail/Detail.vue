<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content" 
      ref="scroll" 
      :probe-type="3"
      @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
      </scroll>
       <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
      <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>

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
 import {Goods,getDetail,Shop,GoodsParam,getRecommend} from 'network/detail'
 import GoodsList from 'components/content/goods/GoodsList'
 import {debounce}  from 'common/utils'
 import DetailBottomBar from './childComps/DetailBittomBar'
 import BackTop from 'components/content/backTop/BackTop'

 


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
            commentInfo:{},
            recommends  :[],
            themeTopYs:[],
            getThemeTopy:null,
            currentIndex:0,
            isShowBackTop:false,
        }
    },
    methods: {
      imageLoad() {
         this.$refs.scroll.refresh()
         this.getThemeTopy()
      },
       titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      // this.$refs.scroll.scrollTo(0,this.themeTopYs[index],100)
      },
      contentScroll(position) {
        // console.log(position);
        //获取y值
        const positionY =-position.y

        //positionY和主题值进行对比
        let length =this.themeTopYs.length
        for(let i=0;i<this.themeTopYs.length-1;i++) {
          // if(positionY>this.themeTopYs[i] && positionY<this.themeTopYs[themeTopYs[i+1]]) {
          //   console.log(i);
            
          // }

          if(this.currentIndex!==i && i<length-1 && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1] )) {
            this.currentIndex =i;
            this.$refs.nav.currentIndex=this.currentIndex
          }
          // if(this.currentIndex!==i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1] ) ||
          //  (i===length -1 && positionY >=this.themeTopYs[i])) ) {
          //   //  console.log(i);
          //    this.currentIndex =i;
          //    this.$refs.nav.currentIndex=this.currentIndex
          // }
        }
        this.isShowBackTop=(-position.y) >1000
      },
       backClick() {
        // console.log('backClick');
        this.$refs.scroll.scrollTo(0,0,500)
        
      },
      addCart() {
        // console.log('---------');
        //获取购物车需要的信息
        const product= {};
        product.image=this.topImages[0];
        product.title=this.goodsInfo.title;
        product.desc =this.goodsInfo.desc;
        product.price=this.goodsInfo.newPrice;
        product.iid=this.iid

        //将商品加到购物车里面 vuex
        this.$store.cartList.push(product)
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
        //3.请求详情数据
        getRecommend().then(res=>{
          // console.log(res);
          this.recommends=res.data.list
          
        })

       
        this.getThemeTopy=debounce(()=>{
          this.themeTopYs=[]
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
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
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      
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
    height: calc(100% - 44px - 49px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
  }
</style>
