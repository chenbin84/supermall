import { ADD_COUNT, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        // let oldProduct = null;
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item
        //     }
        // }
        //查找数组之前是否有改商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //判断oldProduct
        if (oldProduct) {
            // oldProduct.count += 1
            context.commit(ADD_COUNT, oldProduct)
        } else {
            payload.count = 1
            context.commit(ADD_TO_CART, payload)
        }
        // state.cartList.push(payload)
    }
}