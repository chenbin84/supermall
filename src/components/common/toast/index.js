import Toast from './Toast'

const obj = {}
obj.install = function(Vue) {
    // console.log('执行了obj的install函数');
    // document.body.appendChild(Toast.$el)
    // Vue.prototype.$toast = Toast
    //创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    //new的方式，根据组件构造器，创建一个组件对象
    const toast = new toastContrustor()

    //手动挂载对象到某一个元素上
    toast.$mount(document.createElement('div'))

    //toast.$el对对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}
export default obj