<template>
  <div class="container">
      <!-- <router-link to="/cart">
        <el-badge :value="cartTotal"></el-badge>
        <i class="el-icon el-icon-shopping-cart-1"></i>
      </router-link> -->
      <keep-alive>
        <router-view v-if="this.$router.history.current.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!this.$router.history.current.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import Vue from 'vue';
import {mapGetters} from 'vuex'
export default {
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters({
      cartTotal:'cartTotal'
    }),
    user(){
        //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
        let obj=this.$store.state.user
        for (var key in obj) {
            return false;
        }
        return true;
    }
  },
  created(){
  console.log(this.$router.history.current.meta.keepAlive)
  },
  methods:{
    loginOut(){
      this.$store.commit('loginOut',0)
    }
  }
}
</script>

<style>
  *{
    box-sizing: border-box;font-weight: normal;
  }
  html,body,.container{
    height:100%;
  }
</style>
