<template>
  <div id="header">
    <div :class="navActive==1?'header-white header':navActive==2?'header-transparent header':'header'">
      <div class="w1200">
        <img @click="toPage('/')" v-if="navActive==0" src="../assets/logo.png" alt="">
        <img @click="toPage('/')" v-else src="../assets/logo-blue.png" alt="">
        <i v-if="openMenu" @click="isOpenMenu()" class="el-icon-close menu_icon"></i>
        <i v-else @click="isOpenMenu()" class="el-icon-menu menu_icon"></i>
        <ul id="menu">
          <li @click="toPdf()">WhitePaper</li>
          <li :class="pathIndex==1?'active':''" @click="toPage('Product')">Product</li>
          <li @click="toBlog()">Blog</li>
          <li :class="pathIndex==2?'active':''" @click="toPage('About')">About</li>
        </ul>
      </div>
    </div>

    <transition name="el-zoom-in-top">
				<div class="mobile_menu transition-box" v-if="openMenu">
					<el-menu
						default-active="2"
						class="el-menu-vertical-demo"
						text-color="#fff"
						@select="selectMenu"
						active-text-color="#fff">
						<el-menu-item index="1" @click="toPdf()">
							<span slot="title">WhitePaper <i class="el-icon-arrow-right"></i></span>
						</el-menu-item>
						<el-menu-item index="2" @click="toPage('Product')">
							<span slot="title">Product<i class="el-icon-arrow-right"></i></span>
						</el-menu-item>
						<el-menu-item index="3" @click="toBlog()">
							<span slot="title">Blog<i class="el-icon-arrow-right"></i></span>
						</el-menu-item>
						<el-menu-item index="4" @click="toPage('About')">
							<span slot="title">About<i class="el-icon-arrow-right"></i></span>
						</el-menu-item>
					</el-menu>
				</div>
			</transition>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['navActive','pathIndex'],
  data() {
    return {
      openMenu:false,
    };
  },
  watch: {},
  computed: {
   
  },
  methods: {
    toPage(path){
      document.getElementById("header").scrollIntoView();
      this.$router.push(path)
    },
    toBlog(){
      window.location.href="https://medium.com/konomi"
    },
    toPdf(){
      window.location.href="https://www.konomi.network/pdf/KonomiWhitepaper_Final-2.pdf"
    },
    isOpenMenu(){
      if(this.openMenu){
        this.openMenu=false
      }else{
        this.openMenu=true
      }
    },
    selectMenu(){
      this.openMenu=false
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>
<style>
</style>