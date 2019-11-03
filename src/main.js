import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from './components/common/toast/index'
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

Vue.use(toast)
Vue.use(VueLazyload, {
        loading: require()
    })
    //解决移动端300毫秒延迟
Fastclick.attach(document.body)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')