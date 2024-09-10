<!-- 用户信息 -->
<template>
  <div class="card">
      <div class="card-body">
          <div class="row">
              <div class="col-3 img-field">
                  <img class="img-thumbnail" :src="user.photo" alt="">
              </div>
              <div class="col-9">
                  <!-- 使用传递过来的信息{{  }} -->
                  <div class="username">{{ user.username }}</div>
                  <div class="fans">粉丝：{{ user.followerCount }}</div>
                  <!-- v-if 满足则显示 v-on: == @click="函数名" 绑定事件-->
                   <!-- 没关注显示 + 关注 -->
                  <button @click="follow" v-if="!user.is_followed && !is_me" type="button" class="btn btn-secondary btn-sm">+ 关注</button>
                  <!-- 已关注显示 取消关注 -->
                  <button @click="unfollow" v-if="user.is_followed && !is_me" type="button" class="btn btn-secondary btn-sm">取消关注</button>
              </div>
          </div>
      </div>
  </div>
</template>


<script>
import $ from "jquery";
import store from '@/store';
import { computed } from 'vue';
export default {
  name: 'userProfileInfo',
  // 接受父组件传递的信息
  props: {
    user: {
      // 属性是对象
      type: Object,
      // 设置为必填
      required: true,
    },
  },
  // 调用setup入口 传递props值进入 用来动态计算 context.emit传递给父组件
  setup(props, context) {
    // // computed 动态计算
    // let fullName = computed( () => props.user.lastName + ' ' + props.user.firstName );
    // 定义点击关注和取消关注的变化函数
    const follow = () => {
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
        type: "POST",
        data: {
          target_id: props.user.id,
        },
        headers: {
          // Authorication授权   Authorization身份验证          Bearer后有空格
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(resp) {
          // 触发父组件事件
          if (resp.result === "success") {
            context.emit("follow");
          }

        }
      });
    };

    const unfollow = () => {
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
        type: "POST",
        data: {
          target_id: props.user.id,
        },
        headers: {
          // Authorication授权   Authorization身份验证          Bearer后有空格
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(resp) {
          // 触发父组件事件
          if (resp.result === "success") {
            context.emit("unfollow");
          }

        }
      });

    }

    const is_me = computed(() => props.user.id === store.state.user.id);

    // 返回的值就可以直接使用了
    return {
      // fullName,
      follow,
      unfollow,
      is_me,
    }
  }
}
</script>

<style scoped>
.username {
  font-weight: bold;
}

.fans {
  font-size: 12px;
  color: gray;
}

button {
  padding: 2px 4px;
  font-size: 12px;
}

.img-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>