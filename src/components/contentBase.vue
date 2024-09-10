<template>
    <div class="home">
      <!-- container bootstrap样式可以响应式调节内容区域大小 -->
      <div class="container">
        <div class="card">
          <div class="card-body">
            <!-- slot将引用组件内容对应的子元素渲染进去 -->
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    // 定义名字
    name: "contentBase",
}

</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>