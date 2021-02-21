import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Product from './views/Product'
import blog from './views/blog'
import about from './views/about'
Vue.use(VueRouter)

let router =new VueRouter({
    mode: 'hash',
    routes:[{
        path:'/',
        component:Home,
        name:'home',
        meta: {
            requireAuth: false,  
            keepAlive:false,
            title:"Konomi"
        } 
    },{
        path:'/Product',
        component:Product,
        name:'Product',
        meta: {
            requireAuth: false,  
            keepAlive:false,
            title:"Konomi-Product"
        } 
    },{
        path:'/blog',
        component:blog,
        name:'blog',
        meta: {
            requireAuth: false,  
            keepAlive:false,
            title:"blog"
        } 
    },{
        path:'/about',
        component:about,
        name:'about',
        meta: {
            requireAuth: about,  
            keepAlive:about,
            title:"about"
        } 
    }]
})
// 暴露
export default router