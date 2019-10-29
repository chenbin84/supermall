<template>
  <div class="wrapper" ref="aaa">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    methods:{
        scrollTo(x,y,time=300) {
            this.scroll.scrollTo(x,y,time)
        }
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        this.scroll=new BScroll(this.$refs.aaa,{
            click:true
        });
    },}
</script>

<style scoped >

</style>
