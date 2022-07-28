<template>
  <div>
    <div class="search">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入小区或地址"
        background="#f6f5f6"
        @input="onInput"
        @cancel="onCancel"
      />
    </div>

    <div class="cellList">
      <van-cell
        @click="clickFn([item.communityName, item.community])"
        :clickable="true"
        v-for="(item, index) in communityList"
        :key="index"
        :title="item.communityName"
      />
    </div>
  </div>
</template>

<script>
import { getCommunity } from '@/api/house'
export default {
  data() {
    return {
      value: '',
      communityList: []
    }
  },
  methods: {
    onCancel() {
      this.$router.push('/toRent')
    },
    async onInput(val) {
      const { data } = await getCommunity(val, this.$store.state.cityId)
      console.log(data)
      this.communityList = data.body
    },
    clickFn(community) {
      this.$store.commit('setCommunity', community)
      this.$router.push('/toRent')
    }
  }
}
</script>

<style scoped lang="less">
.search {
  .van-search__content {
    padding: unset;
  }
  .van-search--show-action {
    height: 44px;
    padding: 10px 10px;
  }
  /deep/.van-field__control[type='search'] {
    background-color: #fff;
  }
}
</style>
