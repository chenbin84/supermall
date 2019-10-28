<template>
  <swiper>
        <swiper-item  v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </swiper-item>
      </swiper>
</template>

<script>
// import {getHomeMultidata} from 'network/home'
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  data() {
    return {

    }
  },
  props:{
      banners:Array,
      default() {
          return []
      }
  },
  components: {
      Swiper,
      SwiperItem
  }
}
</script>

<style scoped >

</style>
