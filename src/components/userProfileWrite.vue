<!-- 用户发帖 -->
<template>
  <div class="card edit-field">
   <div class="card-body">
       <label for="edit-post" class="form-label">写点什么吧</label>
       <!-- v-model绑定content -->
       <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
       <button @click="post_a_post" type="button" class="btn btn-outline-primary btn-sm" >发帖</button>
   </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
   name: 'userProfileWrite',
   // 传入context以便于传内容给父组件然后触发事件 需要使用props
   setup(props, context) {
       let content = ref('');
       const store = useStore();
       const post_a_post = () => {
           $.ajax({
               url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
               type: "POST",
               data: {
                   content: content.value,
               },
               headers: {
                   // 授权             Bearer后有空格
                   'Authorization': "Bearer " + store.state.user.access,
               },
               success(resp) {
                   if (resp.result === "success") {
                       // 如果成功就调用
                       context.emit("post_a_post", content.value);
                       // ref的值需要用value
                       content.value = "";
                   }
               }
           })

       }

       return {
           content,
           post_a_post,
       }
   }
}
</script>

<style scoped>
.edit-field {
   margin-top: 20px;
}

button {
   margin-top: 20px;
}
</style>