<template>
  <contentBase>
      <div class="card" v-for="user in users" v-bind:key="user.id" @click="open_user_profile(user.id)">
        <div class="card-body">
          <div class="row">
            <div class="col-1 img-field">
              <!-- 加上：后面会识别为变量而不是字符串 -->
              <img class="img-thumbnail" :src="user.photo" alt="">
            </div>
            <div class="col-11">
              <div class="username">{{ user.username }}</div>
              <div class="follower-count">{{ user.followerCount }}</div>
            </div>
          </div>
        </div>
      </div>
  </contentBase>
</template>

<script>
import contentBase from '@/components/contentBase.vue';
import router from '@/router';
import $ from 'jquery';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'userListView',
  components: {
      contentBase,
    // 在template会用到哪些组件就放入
  },
  setup() {
    let users = ref([]);
    const store = useStore();

    $.ajax ({
      url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type: "get",
      // 获取返回结果
      success: function (resp) {
        users.value = resp;
      }
    });

    // 辅助函数 传入userId
    const open_user_profile = userId => {
      if (store.state.user.is_login) {
        router.push({
          name: 'userprofile',
          params: {
            // 传入参数
            userId: userId
          }
        })
      } else {
        // 未登入的话
        router.push({
          name: "login"
        });
      }
    }

    return {
      users, open_user_profile
    }
  }
}
</script>

<style scoped>

.username {
  font-weight: bold;
  height: 50%;
}

.follower-count {
  font-size: 12px;
  color:grey;
  height: 50%;
}

.card {
  margin-bottom: 20px;
  /* 变鼠标 */
  cursor: pointer;
}

.card:hover {
  transition: 300ms;
  box-shadow: 2px 2px 10px;
}

.img-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
