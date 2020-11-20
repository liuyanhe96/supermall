<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    /*swiper 轮播图中的图片高度大时，会显示不全*/
    height: 100%;

    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
