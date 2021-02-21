import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store =new Vuex.Store({
    state:{
        user:JSON.parse(localStorage.getItem('user'))||[],
    },
    mutations:{
        isLogin(state,info){
            state.user=info
        },
        loginOut(state){
            state.user={}
        },
    },
    getters:{
        cartTotal:state=>{
            let sum=0
            state.cart.forEach(v=>{
                sum+=v.count
            })
            return sum
        }
    }
})
store.subscribe((mutation,state)=>{
    localStorage.setItem('user',JSON.stringify(state.user))
})
export default store