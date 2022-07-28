<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#888">
      <van-swipe-item v-for="item in list" :key="item.id"
        ><img
          :src="`http://liufusong.top:8080${item.imgSrc}`"
          alt=""
          class="img"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 搜索框 -->
    <div class="searchTop">
      <van-search class="search" v-model="value" placeholder="请输入小区或地址">
        <template #label>
          <div class="Location" @click="cityFn">{{ activeCity }} ▼</div>
        </template>
      </van-search>
      <van-icon name="location-o" color="#FFF" @click="mapFn" />
    </div>
    <!-- banner -->
    <van-grid>
      <van-grid-item>
        <img src="./img/entirer.png" alt="" />
        <div class="text">整租</div>
      </van-grid-item>
      <van-grid-item>
        <img src="./img/rent.png" alt="" />
        <div class="text">合租</div>
      </van-grid-item>
      <van-grid-item>
        <img src="./img/looking.png" alt="" @click="mapRentFn" />
        <div class="text">地图找房</div>
      </van-grid-item>
      <van-grid-item>
        <img src="./img/rent1.png" alt="" @click="toRentFn" />
        <div class="text">去出租</div>
      </van-grid-item>
    </van-grid>
    <!-- 租房小组 -->
    <div class="block">
      <van-cell-group :border="false">
        <van-cell title="租房小组" value="更多" />
      </van-cell-group>

      <van-grid
        direction="horizontal"
        :column-num="2"
        :clickable="true"
        gutter="10px"
      >
        <van-grid-item
          style="white-space: pre-line"
          v-for="(item, index) in areaList"
          :key="index"
          :icon="`http://liufusong.top:8080${item.imgSrc}`"
          :text="`${item.title} \n ${item.desc}`"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getPic, getRentPic } from '@/api/foto'
export default {
  data() {
    return {
      list: [],
      value: '',
      areaList: []
    }
  },
  async created() {
    const res = await getPic()
    this.list = res.data.body || []
    const resBottom = await getRentPic(this.activeCityId)
    this.areaList = resBottom.data.body || []
  },
  methods: {
    cityFn() {
      this.$router.push('/city')
    },
    mapFn() {
      this.$router.push('/mapRent')
    },
    mapRentFn() {
      this.$router.push('/mapRent')
    },
    toRentFn() {
      this.$router.push('/toRent')
    }
  },
  computed: {
    activeCity() {
      return this.$store.state.city
    },
    activeCityId() {
      return this.$store.state.cityId
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-swipe__indicator {
  width: 8px;
  height: 8px;
}

.img {
  width: 100%;
  height: 100%;
}

/deep/.van-search {
  width: 320px !important;
  height: 34px;
  margin-right: 6px;

  background-color: transparent;
}
/deep/.van-icon-search {
  border-left: 1px solid #e5e5e5;
  padding-left: 10px;
}
.searchTop {
  display: flex;
  align-items: center;
  position: absolute;
  left: 10px;
  top: 26px;
}
.van-search__content {
  background-color: #fff;
  border-radius: 4px;
}
.Location {
  margin-left: -10px;
}
.van-icon {
  font-size: 24px;
}
.van-grid-item__content {
  img {
    width: 60px;
    margin-top: -10px;
  }
}
.van-grid-item__content {
  padding: 0;
  .text {
    font-size: 14px;
    margin-top: 10px;
  }
}

.block {
  background-color: #f6f5f6;
  padding-bottom: 12px;
  .van-cell {
    font-weight: 700;
    background-color: #f6f5f6;
    .van-cell-group {
      background-color: transparent;
    }
  }
  /deep/.van-grid-item__content--clickable {
    border-radius: 6px;
  }
  /deep/.van-grid-item__content--center {
    justify-content: start;
  }
  /deep/.van-grid-item__icon {
    font-size: 50px;
  }
  /deep/.van-grid-item__text {
    font-size: 14px;
  }
  /deep/.van-grid-item__content {
    padding: 5px 10px;
  }
}
</style>
