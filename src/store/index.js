import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import lodash from "lodash";
import _store from 'store2';
import modules from "./modules/index";

Vue.use(Vuex);
export default new Vuex.Store({
  modules,
  getters,
  mutations: {
    // 定义全局的清理方法
    RESET_ALL_STATE (state, payload = []) {

      if (payload instanceof Array === false) { // 验证传入的是一个数组
        return;
      }
      const initState = _store('initState'); // 取出初始值的缓存
      const _initState = payload.length ? lodash.omit(initState, payload) : initState; // 判断传入值有无数据，有数据剔除相对应的值
      lodash.extend(state, _initState);
    }
  },
  actions: {
    // 登出
    logOut ({ commit, state }) {
      return new Promise((resolve) => {
        commit('RESET_ALL_STATE');
        // 清理所有状态
        sessionStorage.clear();
        localStorage.clear();
        _store({ initState: state }); //缓存一个名为initState的初始状态
        resolve();
      });
    }
  },
  strict: process.env.NODE_ENV !== 'prod'
});
