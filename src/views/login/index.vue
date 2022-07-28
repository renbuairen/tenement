<template>
  <div>
    <van-nav-bar
      class="navBar"
      title="账号登录"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-form @submit="subLogin">
      <van-field
        class="form"
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[
          { required: true, message: '请填写账号' },
          { pattern: /^[a-zA-Z]\w{4,15}$/, message: '请填写正确账号' }
        ]"
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
      password: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async subLogin() {
      this.$toast.loading({
        message: '加载中...',
        // loading时,禁止点击页面
        forbidClick: true
      })

      try {
        const res = await login(this.username, this.password)
        const status = res.data.status
        const description = res.data.description
        console.log(res)

        if (res.data.body) {
          // 本地存储token
          localStorage.setItem('token', res.data.body.token)

          // vuex存储token
          this.$store.commit('setUser', res.data.body.token)
        }
        // 提示
        if (status === 200) {
          this.$toast.success(description)
          this.$router.push('/profile')
        } else if (status === 400 || status === 401 || status === 404) {
          this.$toast.fail(description)
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('响应超时，请重试')
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
