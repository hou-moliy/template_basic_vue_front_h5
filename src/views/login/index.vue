<template>
  <div class="index_wrap">
    <p>登录页面</p>
    <button class="btn"
            @click="goHome">去首页</button>
    <button class="btn"
            v-debounce="handleLogin">防抖</button>
    <p v-copy="btnText">{{btnText}}</p>
    <button class="btn"
            v-longpress="handleLongPress">长按2秒展示</button>
    <button class="btn"
            v-longpress:1000="handleLongPress">长按1秒展示</button>
    <input type="text"
           v-model="note"
           placeholder="不能输入表情"
           v-emoji />
  </div>
</template>

<script>
export default {
  name: 'IndexView',
  components: {
  },
  data () {
    return {
      btnText: '点击按钮复制这句话',
      note: ''
    };
  },
  create () {

  },
  mounted () {
    this.$toast("登录页");
  },
  methods: {
    handleLogin () {
      console.log('登录');
    },
    handleLongPress () {
      this.$toast("长按展示");
    },
    goHome () {
      localStorage.setItem('Authorization', 'yyy');
      this.$router.push('/');
    }
  }
};
</script>
<style lang="scss" scoped>
.index_wrap {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  text-align: left;
  .btn {
    max-width: 150px;
  }
  .img {
    width: 100px;
    height: 100px;
  }
}
</style>
