<template>
  <div>
    <van-nav-bar
      class="navBar"
      title="账号登录"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-form @submit="login">
      <van-field
        class="form"
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ pattern, message: '请填写正确账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写正确密码' }]"
      />
      <div style="margin: 16px">
        <van-button color="#21b97a" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
      <p class="text">还没有账号,去注册~</p>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      pattern: /^[a-zA-Z]\w{4,15}$/
    }
  },
  methods: {
    onClickLeft() {},
    async login() {
      const res = await login(this.username, this.password)
      this.$dialog({ message: `${res.data.description}` })
      if (res.data.body) {
        localStorage.setItem('token', `Bearer ${res.data.body.token}`)
      }
    }
  }
}
</script>

<style scoped lang="less">
.navBar {
  background-color: #21b97a;

  /deep/.van-nav-bar__title {
    color: #fff;
  }

  /deep/.van-icon-arrow-left {
    color: #fff;
  }
}
.form {
  margin-top: 20px;
}
.text {
  text-align: center;
  font-size: 15px;
  margin-top: 30px;
}
</style>
