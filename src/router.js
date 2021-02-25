import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import Product from './views/Product'
import Blog from './views/Blog'
import About from './views/About'
Vue.use(VueRouter)

let router =new VueRouter({
    mode: 'hash',
    routes:[{
        path:'/',
        component:Home,
        name:'home',
        meta: {
            requireAuth: false,  
            keepAlive:true,
            title:"Konomi"
        } 
    },{
        path:'/Product',
        component:Product,
        name:'Product',
        meta: {
            requireAuth: false,  
            keepAlive:true,
            title:"Konomi-Product"
        } 
    },{
        path:'/Blog',
        component:Blog,
        name:'Blog',
        meta: {
            requireAuth: false,  
            keepAlive:true,
            title:"Blog"
        } 
    },{
        path:'/About',
        component:About,
        name:'About',
        meta: {
            requireAuth: false,  
            keepAlive:true,
            title:"About"
        } 
    }]
})
// 暴露
export default router