<template>
<swiper :options="swiperOption" ref="mySwiper">
<swiper-slide>I'm Slide 1</swiper-slide>
<swiper-slide>I'm Slide 2</swiper-slide>
<swiper-slide>I'm Slide 3</swiper-slide>
<swiper-slide>I'm Slide 4</swiper-slide>
<swiper-slide>I'm Slide 5</swiper-slide>
<swiper-slide>I'm Slide 6</swiper-slide>
<swiper-slide>I'm Slide 7</swiper-slide>
<div class="swiper-pagination"  slot="pagination"></div>
</swiper>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        // setWrapperSize: true,
        mousewheel: true,
        autoHeight: true,
        height: window.innerHeight,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style>
    .swiper-container {
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
    }
</style>