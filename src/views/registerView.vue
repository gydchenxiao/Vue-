<template>
  <contentBase>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <!-- 绑定事件 -->
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <!-- v-model双向绑定 -->
            <input v-model="username" type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
          </div>
            <div class="error-message">{{ error_message }}</div>
            <button type="submit" class="btn btn-primary">注册</button>
        </form>
      </div>
    </div>
  </contentBase>
</template>

<script>
import contentBase from '@/components/contentBase.vue';
import router from '@/router';
import { ref } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
  name: 'registerView',
  components: {
      contentBase,
    // 在template会用到哪些组件就放入
  },
  setup() {
    // useStore获取全局
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let error_message = ref('');
    let password_confirm = ref('');

    const register = () => {
      error_message.value = "";
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/user/',
        type: "POST",
        data: {
          username: username.value,
          password: password.value,
          password_confirm: password_confirm.value,
        },
        success(resp) {
          if (resp.result === "success") {
            store.dispatch("login", {
              username: username.value,
              password: password.value,
              success() {
                // 成功的话跳转
                router.push({name: 'userlist'})
              },

              error() {
                // 失败的话 
                error_message.value = "系统异常";
              }, 
            });
          } else {
            error_message.value = resp.result;
          }
        }
      })
    };

    return {
      username, 
      password,
      error_message,
      register,
      password_confirm,
    }
  }
}
</script>

<style scoped>

button {
  width: 100%;
}

.error-message {
  color: red;
}
</style>