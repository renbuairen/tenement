<template>
  <div>
    <div class="pic">
      <div class="My_info__eOYeg">
        <div class="My_myIcon__3cKIV">
          <img src="../profile/img/touxaing.png" alt="" class="avatar" />
        </div>
        <div class="status">
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
        clickable="true"
      >
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
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
export default {
  methods: {
    clickFn() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.pic {
  min-height: 300px;
  background: url('../profile/img/bg.png') no-repeat;
  background-size: contain;
  position: relative;
  margin-bottom: 10px;

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
</style>
