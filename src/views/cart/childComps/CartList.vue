<template>
  <div class="cart-list">
     <scroll class="content" ref="scroll">
        <!-- <li v-for="item in cartList">{{item}}</li> -->
        <cart-list-item :key="index" v-for="(item,index) in cartList"
        :item-info="item"/>
     </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'
export default {
  data() {
    return {
 
    }
  },
  components: {
     Scroll,
     CartListItem
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    // console.log('-----');
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
   
  }
  .content {
   height: 100%;
  overflow: hidden;
  }
</style>
