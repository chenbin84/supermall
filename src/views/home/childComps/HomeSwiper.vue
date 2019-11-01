<template>
  <swiper>
        <swiper-item  v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
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
      isLoad:false
    }
  },
  methods: {
    imageLoad() {
      // this.$emit('swiperImageLoad')
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad=true
      }
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
