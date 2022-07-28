<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        @click="clickFn(item.houseCode)"
        :icon="`http://liufusong.top:8080${item.houseImg}`"
      >
        <template #title>
          <p style="font-weight: 700">{{ item.title }}</p>
          <div class="huiText">{{ item.desc }}</div>
          <van-tag
            type="primary"
            style="margin-right: 5px"
            v-for="(item1, index1) in item.tags"
            :key="index1"
            >{{ item1 }}</van-tag
          >
          <div class="redText">{{ item.price }}元/月</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickFn(houseCode) {
      this.$router.push({
        path: '/details',
        query: {
          houseCode: houseCode
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.van-cell {
  padding: 0.26667rem 0;

  .van-icon {
    width: 106px;
    height: 80px;
    margin-left: 10px;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .huiText {
    color: rgb(144, 138, 138);
    font-size: 12px;
  }
  .redText {
    color: red;
    font-weight: 700;
    font-size: 15px;
  }
}
</style>
