import { createStore } from 'vuex'
// 全局对象
// 引入ModuleUser
import ModuleUser from './user.js'

export default createStore({
  state: {
    // 存数据
  },
  getters: {
    // 存计算获取的数据
  },
  mutations: {
    // 对state修改的操作 （什么.什么的修改）
  },
  actions: {
    // 定义更新操作 （完整的修改） 但是不能直接改要用mutations
  },
  modules: {
    // state进行分割
    user: ModuleUser,

  }
})