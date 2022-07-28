<template>
  <div class="box">
    <div class="pic">
      <img
        v-if="isLogin"
        :src="`http://liufusong.top:8080${userInfo.avatar}`"
        alt=""
      />
      <img v-else src="../profile/img/bg.png" alt="" />
      <div class="My_info__eOYeg">
        <div class="My_myIcon__3cKIV">
          <!-- 登录头像 -->
          <img src="../profile/img/touxaing.png" alt="" class="avatar" />
        </div>
        <!-- 登录中 -->
        <div v-if="isLogin" class="status">
          <p class="topText" style="margin-bottom: 4px">
            {{ userInfo.nickname }}
          </p>
          <van-button
            round
            type="info"
            size="mini"
            color="#21b97a"
            style="height: 20px; width: 50px"
            @click="outFn"
            >退出</van-button
          >
          <p class="text">编辑个人资料<van-icon name="play" /></p>
        </div>

        <!-- 非登录 -->
        <div v-else>
          <p class="topText">游客</p>
          <van-button
            type="info"
            size="small"
            color="#21b97a"
            style="border-radius: 4px; width: 70px; font-size: 14px"
            @click="clickFn"
            >去登录</van-button
          >
        </div>
      </div>
    </div>
    <div class="gridBox">
      <van-grid
        :column-num="3"
        :border="false"
        gutter="18px"
        icon-size="22px"
        :clickable="true"
      >
        <van-grid-item icon="star-o" text="我的收藏" @click="favorateFn" />
        <van-grid-item icon="wap-home-o" text="我的出租" @click="rentFn" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="debit-pay" text="成为房主" />
        <van-grid-item icon="manager-o" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </div>
    <div class="My_ad__1wZZj">
      <img src="./img/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    clickFn() {
      this.$router.push({
        path: '/login'
      })
    },
    favorateFn() {
      if (this.$store.state.token) {
        this.$router.push({
          path: '/favorate'
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    rentFn() {
      if (this.$store.state.token) {
        this.$router.push({
          path: '/rent'
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    async getUserInfo() {
      if (this.isLogin) {
        const { data } = await getUserInfo()
        if (data.status === 400) {
          this.$toast.fail('token过期，请重新登录')
          setTimeout(() => {
            this.$store.commit('setUser', '')
          }, 1000)
        } else {
          this.userInfo = data.body || {}
        }
      }
    },
    outFn() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确定退出？'
        })
        .then(() => {
          this.$store.commit('setUser', '')
        })
        .catch(() => {})
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.token
    }
  }
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.box {
  margin-bottom: 50px;
}
.pic {
  min-height: 300px;
  background-size: contain;
  position: relative;
  margin-bottom: 10px;
  img {
    width: 100%;
  }

  .My_info__eOYeg {
    position: absolute;
    background: #fff;
    width: 85%;
    height: 55%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;

    .My_myIcon__3cKIV {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;

      .avatar {
        width: 100%;
      }
    }

    .topText {
      margin-top: -16px;
      margin-bottom: 16px;
    }
  }
}

.My_ad__1wZZj {
  text-align: center;
  margin-top: 10px;
  padding: 0 18px;

  img {
    width: 100%;
  }
}

.status {
  .text {
    margin-top: 30px;
    font-size: 12px;
    color: #bdbdbd;
  }
}
</style>
