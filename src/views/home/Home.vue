<template>
    <div id="home">
          <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
           <tab-control  :titles="['流行','新款','精选']" 
      @tabClick="tabClick"  ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
        <scroll class="content" ref="scroll" 
        :probe-type="3"
        @scroll="contentScroll"
       :pull-up-load="true"
        @pullingUp="loadMore">
      
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control  :titles="['流行','新款','精选']" 
      @tabClick="tabClick"  ref="tabControl2" :class="{fixed:isTabFixed}"/>
      <good-list :goods="showGoods"></good-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import {debounce} from 'common/utils'

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
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      // console.log('activeted');
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
      
    },
    deactivated() {
      // console.log('deactiveted');
      this.saveY=this.$refs.scroll.getScrollY()
      
    },
    created() {
      //请求多个数据
     this.getHomeMultidata()

     //请求商品数据
     this.getHomeGood('pop')
     this.getHomeGood('new')
     this.getHomeGood('sell')
   
     
    },
    mounted(){
      //监听item中图片加载完成
      //防抖
      const refresh =debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('itemImageLoad',()=>{
        // console.log('666');
        refresh()
        
      })
      //获取tabControl的offsetTop
      //赋值
      //所以组件都有一个属性$el,用于获取组件中的元素
    //  this.tabOffsetTop =this.$refs.tabControl.$el.offsetTop
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
            break
        }
        //点击保持一致
        this.$refs.tabcontrol1.currentIndex=index
        this.$refs.tabcontrol2.currentIndex=index
        
      },
      backClick() {
        // console.log('backClick');
        this.$refs.scroll.scrollTo(0,0,500)
        
      },
      contentScroll(position) {
        // console.log(position);
        //判断backTop是否显示
        this.isShowBackTop=(-position.y) >1000
        //决定tabControl是否吸顶（fixed)
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
     loadMore() {
      //  console.log('666');
      
        this.getHomeGood(this.currentType)
      },
      //获取距离顶部的值
      swiperImageLoad() {
        this.tabOffsetTop =this.$refs.tabControl2.$el.offsetTop
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

          //完成下拉更多
          this.$refs.scroll.finishPullUp()
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
  /* .tab-control {
    position: relative;
    z-index: 9;
  } */
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
