
## AcWing [Web应用课](https://www.acwing.com/activity/content/introduction/1150/)

vue框架的结构概述：
views:写各种页面
router:初始状态下有两个路由，/,about
components:存储组件
main.js入口，整个组件挂载到app元素上
注：后端渲染与前端渲染：
后端渲染：每打开一个页面，服务器发送请求并且返回回来
前端渲染；只有在第一次打开（无论是什么页面），服务器将所有元素返回，同时打包在js文件中，当打开第二个或第三个等页面后，用返回的js文件直接将新页面渲染出来

vue的基本概念
1.vue的文件组成部分
html js css  template  <script> <style scoped>
<br />

2.vue的特点
(1).将所有东西全部放在一起，同一个页面会包含所有东西
css可以加scope特性：添加此特性，每个选择器在返回给前端的时候会有一个随机值，每个组件的随机值是不一样的，这样不同组件之间的css选择器就不会影响到
(2).组件化框架
一个页面可能会有不同的部分，每一个部分都可以用一个单独的组件来实现
引入方式：输入如下代码:
<HelloWrold msg=" "/>

vue提供了一种机制vuex
vuex类似于redux，维护一个state，当两个组件想要交互，只需要向全局数据进行交互即可
由于登录信息在不同组件之间都需要你使用，因此将登录信息存在vuex中
vuex位于store文件夹的index.js文件中，其中有几项，在此介绍如下：
state:存储所有数据
getter:当向获取state里面内容时，且需要计算才能获取(不能改)
action:定义对state的各种操作
在action里面是不能直接对state进行修改的
mutations:所有对state进行直接修改的操作一定要在mutations执行，但是在vue里，限制不能执行异步操作
modules:为了对state进行分割，当state中内容过多，实现分割，方便阅读
若提取访问user的用户名，可用
```
const store = new Vuex.Store({
  state: {
    // 存放数据
  },
  getters: {
    // state的计算属性
  },
  mutations: {
    // 更改state中状态的逻辑，同步操作
  },
  actions: {
    // 提交mutation，异步操作
  },
  modules: {
    a: moduleA,
    b: moduleB,
  }
});
```
使用JWT验证，有两个返回值：
refresh:获取新令牌，post方法在http body，更加安全
access:令牌JWT，直接获取认证
在user.js写下登录的action,是一个ajax
当外部要去调用文件中action的某个名字，需要用到dispatch

获取用户名，以实现JWT验证
在access中获取user_id,解码出来，运用jwt_decode进行装包，导入包的方式如下:
<br />

import jwt_decode from 'jwt-decode'

获取用户名之后
获取到用户名之后，需要将信息更新到state里面，action不能直接更新，需要在mutations下更新，当mutations创建完，用context.commit调用，access由于每5min过期，因此需要定期刷新。
成功后，跳转到首页（在LoginView中）
LoginView部分代码最终如下:

```
<ContentBase>
  <div class="row justify-content-md-center">
    <div class="col-3">
      <form @submit.prevent="login">
  <div class="mb-3">
    <label for="username" class="form-label">用户名</label>
    <input v-model="username" type="text" class="form-control" id="username">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">密码</label>
    <input v-model="password" type="password" class="form-control" id="password">
  </div>
  <div class="error-message">{{error_message}}</div>
  <button type="submit" class="btn btn-primary">登录</button>
</form>
    </div>
  </div>

</ContentBase>

</template>

<script>

import ContentBase from '../components/ContentBase';
import { ref} from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';


export default {
  name: 'LoginView',
  components: {
    ContentBase,
  },
  setup(){

    const store=useStore();
    let username=ref('');
    let password=ref('');
    let error_message=ref('');
    const login =()=>{
      error_message.value="";
      //console.log(username.value,password.value);
      store.dispatch("login",{
        username:username.value,
        password:password.value,
        success(){
          //console.log("success");
          router.push({name:'userlist'});
        },error(){
          //console.log("failed");
          error_message.value="用户名或密码错误";
        }
      });
    };
    
    return{
      username,
      password,
      error_message,
      login,
    }
  }
}
</script>
```

jquery中使用ajax
$.ajax() 方法：

$.ajax()可以通过发送HTTP请求加载远程数据，是jQuery最底层的Ajax实现，具有很高的灵活性

语法：$.ajax([settings]);
url 发送请求的地址
type 请求方式（post或get）
data 发送到服务器的数据
dataType 预期服务器返回的数据类型，类型可以是XML,HTML,JSON,Text
success 请求成功后调用的函数

举个例子
获取某个用户的信息
地址：https://app165.acapp.acwing.com.cn/myspace/getinfo/ 这个就是写到url里的
方法：GET 也就是type里的参数
是否验证jwt：是 如果是“否”就略过，如果是“是”就需要加下面Header那个花括号里的内容
输入参数：user_id：用户的ID 对应data部分
返回结果：该用户的信息

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
