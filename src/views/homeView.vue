<template>
  <!-- 引入组件 -->
  <contentBase>
    心里依然有些伤感，唉，有些自卑，以后更勇敢一点。
  </contentBase>
</template>

<script>
import contentBase from '@/components/contentBase.vue';

// 引用组件

export default {
  name: 'homeView',
  components: {
    // 在template会用到哪些组件就放入
    contentBase
  }
}
</script>

<style scoped>

</style>
