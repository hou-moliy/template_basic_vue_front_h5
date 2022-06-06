<template>
  <div class="index_wrap">
    首页
    <button class="btn"
            v-login
            @click="hanldeLogin">需要判断登录</button>
    <p></p>
    <button class="btn"
            @click="removeToken">清除登录信息</button>
  </div>
</template>

<script>

export default {
  name: 'IndexView',
  components: {
  },
  create () {
  },
  methods: {
    hanldeLogin () {
      console.log('登录成功');
    },
    removeToken () {
      localStorage.removeItem('Authorization');
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  max-width: 150px;
}
</style>
