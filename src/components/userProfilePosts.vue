<!-- 用户所发帖子 -->
<template>
    <div class="card">
        <div class="card-body">
        <!-- {{  }} 为取值 -->
            <!-- v-for 循环 这里是取出posts里面的所有值-->
             <!-- v-for循环的对象都需要绑定key属性保证唯一 (post, index)就会同时返回下标index-->
             <div v-for="post in posts.posts" v-bind:key="post.id">
                <div class="card single-post">
                    <div class="card-body">
                        {{ post.content }}
                        <button @click="delete_a_post(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm">删除</button>
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';
 
export default {
    props: {
        user: {
            // 属性是对象
            type: Object,
            // 设置为必填
            required: true,
        },
        posts: {
            type: Object,
            required: true,
        },
    },

    name: 'userProfilePosts',

    setup(props, context) {
        const store = useStore();
        let is_me = computed(() => store.state.user.id === props.user.id);

        const delete_a_post = post_id => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
                type: "DELETE",
                data: {
                    post_id: post_id,
                },
                headers: {
                    // 授权             Bearer后有空格
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        // 如果成功就调用
                        context.emit('delete_a_post', post_id);
                    }
                }
            });
        }

        return {
            is_me, delete_a_post
        }
    }
}
</script>

<style scoped>
.single-post {
    margin-bottom: 10px;
}

button {
    float: right;
}
</style>