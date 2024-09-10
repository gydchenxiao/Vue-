<!-- 导航栏 -->
<template>
  <!-- 定义html样式 -->
  <!-- bootstrap去偷 -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <!-- 前端渲染 router-link :to{name:'router中的名称'}  params：{}可以传参数列表-->
      <router-link class="navbar-brand" :to="{ name: 'home' }">我的空间</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'userlist' }">好友列表</router-link>
          </li>
        </ul>
        <!-- $store.state.user.is_login获取全局变量 store=>index=>state=>user=>is_login -->
        <ul class="navbar-nav" v-if="!$store.state.user.is_login">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">登录</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">注册</router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <router-link class="nav-link" :to="{
              name: 'userprofile',
              params: { userId: $store.state.user.id },
            }">{{ $store.state.user.username }}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="cursor: pointer" @click="logout">退出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<!-- 定义代码内容 -->
<script>
import { useStore } from "vuex";

// 单一导出：export default 用于导出一个默认的值或绑定。每个模块只能有一个 export default。
// 不需要命名：不需要指定名称，可以导出任何类型的值（函数、对象、原始值等）。
// 导入时可以使用任意名称：在导入时可以使用任何名称，不需要使用 { ... } 语法。
export default {
  // 定义名字
  name: "navBar",

  setup() {
    const store = useStore();
    const logout = () => {
      // 调用mutations用这个
      store.commit("logout");
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>


.navbar .nav-link {
  color: skyblue;
}

.navbar .nav-link:hover {
  color: aqua;
  /* 悬停时的文字颜色 */
}

.custom-link {
  color: #ffffff;
  text-decoration: none;
  /* 去掉下划线 */
}
</style>