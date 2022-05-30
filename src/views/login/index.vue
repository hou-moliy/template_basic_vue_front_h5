<template>
  <div class="index_wrap">
    登录
    <button v-debounce="handleLogin">登录</button>
  </div>
</template>

<script>
export default {
  name: 'IndexView',
  components: {
  },
  create () {

  },
  mounted () {
    this.$toast("登录页");
  },
  methods: {
    handleLogin () {
      console.log('登录');
    }
  }
};
</script>
<style lang="scss" scoped>
.index_wrap {
  font-size: 25px;
}
</style>
