<template>
  <div>
    <router-view></router-view>

    <van-tabbar active-color="#21b473" route>
      <van-tabbar-item icon="wap-home-o" to="/ ">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/list">找房</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" to="/news">资讯</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
