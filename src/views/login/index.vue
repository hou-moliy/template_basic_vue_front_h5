<template>
  <div class="index_wrap">
    <p>登录页面</p>
    <button class="btn"
            v-login="hanldeLogin">需要判断登录</button>
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
    <img class="img"
         v-lazyLoad="`https://223.70.157.133/resource/ftMsgH5/index_bg.png`" />

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
    hanldeLogin () {
      console.log('登录成功');
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
