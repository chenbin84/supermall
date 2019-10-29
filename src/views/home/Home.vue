<template>
    <div id="home">
          <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <scroll class="content" ref="scroll">
      
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" 
      @tabClick="tabClick" />
      <good-list :goods="showGoods"></good-list>
        </scroll>
        <back-top @click.native="backClick"></back-top>
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/HomeRecommentView'
import FeatureView  from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import{getHomeMultidata, getHomeGood} from "network/home"


  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
      BackTop
      
    },
    data() {
      return {
        banners:[],
        recommends:[],
      goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType:'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个数据
     this.getHomeMultidata()

     //请求商品数据
     this.getHomeGood('pop')
     this.getHomeGood('new')
     this.getHomeGood('sell')
   
      
    },
    methods: {
      //事件监听相关方法
      tabClick(index) {
        // console.log(index);
        switch(index) {
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
        }
        
      },
      backClick() {
        // console.log('backClick');
        this.$refs.scroll.scrollTo(0,0,500)
        
      },

      // 网络请求相关方法
      getHomeMultidata() {
         getHomeMultidata().then(res=>{
        console.log(res);
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
        
      })
      }, 
      getHomeGood(type) {
        const page = this.goods[type].page + 1
        getHomeGood(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
      })
      },

    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  /* 动态计算 */
  /* .content {
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 51px;
  } */
  .content {
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
