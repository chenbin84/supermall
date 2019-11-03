<template>
<div class="bottom-bar">
    <div class="check-content">
        <check-button  :is-checked="isSelectAll" 
        class="check-button" @click.native="checkClick"/>
        <span>全选</span>
    </div>
    <div class="totalPrice">合计{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">
    总计 ({{checkLength}})
    </div>
</div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
data() {
return {

}
},    
methods:{
    checkClick() {
        console.log('------');
        if(this.isSelectAll) {
            this.cartList.forEach(item=>item.checked=false)
        }else {
            this.cartList.forEach(item=>item.checked=true)
        }
        // this.cartList.forEach(item=>item.checked=!this.isSelectAll)
    },
    calcClick() {
        if(!this.isSelectAll) {
            this.$toast.show('请选择购买商品')
        }
    }
},
computed:{
    ...mapGetters(['cartList']),
    totalPrice() {
        return '$'+ this.$store.state.cartList.filter(item=>{
            return item.checked
        }).reduce((preValue,item)=>{
            // console.log(item.price);
            let price =item.price.slice(1)
            // console.log(price);
            
            return preValue+item.count*price
        },0)
    },
    checkLength() {
        return this.$store.state.cartList.filter(item=>item.checked).length
    },
    isSelectAll() {
    //   return !(this.cartList.filter(item=>!item.checked).length)
    if(this.cartList.length===0) return false
    return !this.cartList.find(item=>!item.checked)
    }
    
},
components: {
    CheckButton
}
}
</script>

<style scoped >
.bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    bottom: 40px;
    line-height: 40px;
    display: flex
}
.check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    /* width: 40px; */
}
.check-button {
    width: 20px;
    height: 20px; 
    line-height: 20px;
    margin-right: 5px;
    
}
.totalPrice {
    margin-left: 30px;
    flex:1
}
.calculate {
    width: 90px;
    background-color: red;
    color: #fff
}
</style>
