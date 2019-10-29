<template>
<div class="wrapper" ref="aaa">
 <ul class="content">
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
    <li>分类列表</li>
  </ul>
</div>
 

</template>

<script>
import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data() {
      return {
        scoll:null
      }
    },
    ctrate() {
    //  this.scoll=  new BScroll(this.$refs.aaa,{

    //   })
    },
    mounted() {
      // console.log(document.querySelector('/wrapper'));
      
      this.scoll= new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
      })
      this.scoll.on('scroll',(position)=>{
        // console.log(position );
        
      })
      this.scoll.on('pullingUp',()=>{
        console.log('下拉加载更多');
        
      })
    },
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: pink;
    overflow: hidden;
    /* 会卡顿 */
    /* overflow-y: scroll */
  }
</style>
