import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)

//创建Store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        addCart(state, payload)
    }
})

//挂载到Vue实例中
export default store