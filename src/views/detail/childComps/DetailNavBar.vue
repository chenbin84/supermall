<template>
  <div>
      <nav-bar>
          <div slot="left">
              <img src="~assets/img/common/back.svg" alt="" class="back" @click="backClick">
          </div>
          <div slot="center" class="titles">
              <div :key="index" v-for="(item,index) in titles" 
              class="title-item" :class="{active: index=== currentIndex}"
              @click="titleClick(index)">
                   {{item}}
              </div>
          </div>
       </nav-bar>
  </div>
</template>

<script>
import  NavBar from 'components/common/navbar/NavBar'
export default {
  data() {
    return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
    }
  },
  components: {
      NavBar
  },
  methods: {
      titleClick(index) {
          this.currentIndex=index;
          this.$emit('titleClick',index)
      },
      backClick() {
          this.$router.back()
      }
  },
}
</script>

<style scoped >
    .titles {
        display: flex;
        font-size: 13px
    }
    .title-item {
        flex: 1
    }

    .active {
        color: var(--color-high-text)
    }
    .back {
        margin-top: 10px
    }
</style>
