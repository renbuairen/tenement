<template>
  <div>
    <router-view></router-view>
    <van-tabbar active-color="#21b473" route>
      <van-tabbar-item icon="wap-home-o" to="/layout/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" to="/layout/list">找房</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" to="/layout/news"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" to="/layout/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
