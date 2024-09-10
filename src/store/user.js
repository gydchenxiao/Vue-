import $ from "jquery";
import { jwtDecode } from "jwt-decode";

const ModuleUser = {
    state: {
        // 存数据
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        // 令牌
        access: "",
        // 刷新令牌
        refresh: "",
        // 是否登入
        is_login: false,
      },
      getters: {
        // 存计算获取的数据
      },
      mutations: {
        // 对state修改的操作 （什么.什么的修改） 
        // state固定 user自己设置
        updateUser(state, user) {
        state.id = user.id;
        state.username = user.username;
        state.photo = user.photo;
        state.followerCount = user.followerCount;
        state.access = user.access;
        state.refresh = user.refresh;
        state.is_login = user.is_login;
        },
        updateAccess(state, access) {
        state.access = access;
        },
        logout(state) {
            state.id= "",
            state.username= "",
            state.photo= "",
            state.followerCount= 0,
            // 令牌
            state.access= "",
            // 刷新令牌
            state.refresh= "",
            // 是否登入
            state.is_login= false;
        },
    },
      actions: {
        // 定义更新操作 （完整的修改）

        // 登入
        // 字典对象可以这样简写 一般login: () => {}
            // 参数context传写api 传递api data参数

        login(context, data) {
            $.ajax({
                // 获取Json Web Token（JWT）
                url: 'https://app165.acapp.acwing.com.cn/api/token/',
                type: 'POST',
                data: {
                    username: data.username,
                    password: data.password,
                },
                // 回调函数
                success(resp) {
                    // 解析 接受用户输入信息
                    const {access, refresh} = resp;
                    // 解码用户传入的信息 用户id在access中
                    const access_obj = jwtDecode(access);
                    // 每隔五分钟获取一次 令牌
                    setInterval(() => {
                        $.ajax({
                            // 刷新jwt令牌
                            url: 'https://app165.acapp.acwing.com.cn/api/token/refresh/',
                            type: 'POST',
                            data: {
                                refresh,
                            },
                            success(resp) {
                                context.commit("updateAccess", resp.access)
                            }
                        })
                        // 每隔4.5分访问一次
                    }, 4.5 * 60 * 1000)
                    // 获取用户信息
                    $.ajax({
                        url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
                        type: 'GET',
                        data: {
                            // 接受解析出来的用户id
                            user_id: access_obj.user_id,
                        },
                        // jwt验证
                        headers: {
                            // 授权             Bearer后有空格
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            // 成功的话传递给mutations mutations进行更新
                            context.commit("updateUser", {
                                // 结构resp
                                ...resp,
                                // 补充传递
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            // 调用回调函数
                            data.success();
                        },
                    })
                },
                error() {
                    data.error(); 
                }
            });
        }
      },
      modules: {
        // state进行分割
      }
};

export default ModuleUser; 