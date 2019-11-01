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
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad: {
        type: Boolean,
        default: false
      }

    },
    methods:{
        scrollTo(x,y,time=300) {
           this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp() {
             this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
            // console.log('------');
            
            this.scroll && this.scroll.refresh()
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0
        }
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        //1.创建滚动区域
        this.scroll=new BScroll(this.$refs.aaa,{
            click:true,
            probeType:this.probeType,
            pullUpLoad: this.pullUpLoad
        });

        //2.监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            // console.log(position);
            this.$emit('scroll',position)
            
        })
        console.log(this.scroll);
        this.scroll.refresh();
        
      //3.监听上拉事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
            //监听滚动到底部
            console.log('滚动到底部');
            
                this.$emit('pullingUp')
            })
      }
    
    
    },}
</script>

<style scoped >

</style>
