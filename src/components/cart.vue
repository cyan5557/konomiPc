<template>
  <table border="1">
      <tr>
        <td>商品</td>
        <td>单价</td>
        <td>价格</td>
        <td>总量</td>
        <td>操作</td>
      </tr>
      <tr v-for="(c,index) in cart" :key="index">
        <td>{{c.title}}</td>
        <td>{{c.price}}</td>
        <td>{{c.price * c.count}}</td>
        <td>{{c.count}}</td>
        <td>
            <button @click="add(index)">+</button>
            <button @click="reduce(index)">-</button>
        </td>
      </tr>
      <p>总价{{total}}元</p>
    </table>
</template>


<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {

    };
  },
  watch: {},
  computed: {
    ...mapState({
      cart:state=>state.cart
    }),
    total(){
        return this.cart.reduce((sum,v)=>{
            return sum+v.price*v.count
        },0)
    }
  },
  methods: {
    add(i){
      this.$store.commit('cartAdd',i)
      // this.$emit('add',{index:i})
    },
    reduce(i){
      this.$store.commit('cartReduce',i)
      // this.$emit('reduce',{index:i})
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
</style>