<template>
  <div v-if="houseInfo.community">
    <div class="navBar">
      <van-nav-bar
        :title="houseInfo.community"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="imgBox">
      <van-swipe :autoplay="3000" indicator-color="#888">
        <van-swipe-item v-for="(item, index) in houseInfo.houseImg" :key="index"
          ><img :src="`http://liufusong.top:8080${item}`" alt="" class="img" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="main">
      <p class="firstTitle">{{ houseInfo.title }}</p>
      <div class="title" style="margin-top: -8px">
        <van-tag
          v-for="(item, index) in houseInfo.tags"
          :key="index"
          type="primary"
          text-color="#39BECD"
          color="#E1F5F8"
          style="padding: 2px 5px; margin-right: 5px"
          >{{ item }}</van-tag
        >
      </div>
      <div class="priceInfo">
        <div class="mainBox">
          <div class="redText">
            <span>{{ houseInfo.price }}</span
            >/月
          </div>
          <div>租金</div>
        </div>
        <div class="mainBox">
          <div class="redText">
            <span>{{ houseInfo.roomType }}</span>
          </div>
          <div>房型</div>
        </div>
        <div class="mainBox">
          <div class="redText">
            <span>{{ houseInfo.size }}平米</span>
          </div>
          <div>面积</div>
        </div>
      </div>
      <div class="config">
        <div>装修:<span>精装</span></div>
        <div>
          朝向:<span>{{ oriented }}</span>
        </div>
        <div>
          楼层:<span>{{ houseInfo.floor }}</span>
        </div>
        <div>类型:<span>普通住宅</span></div>
      </div>
    </div>

    <div class="map">
      <div class="mapTitle">小区: 天山星城</div>
      <div class="mapId">
        <baidu-map
          class="map"
          :center="{
            lng: houseInfo.coord.longitude,
            lat: houseInfo.coord.latitude
          }"
          :zoom="16"
        >
          <bm-label
            :content="`<div>${houseInfo.community}</div>`"
            :position="{
              lng: houseInfo.coord.longitude,
              lat: houseInfo.coord.latitude
            }"
            :labelStyle="{
              color: '#fff',
              fontSize: '12px',
              background: '#EE5D5B',
              border: '2px solid hsla(0, 0%, 100%, 0.8)',
              height: '20px',
              padding: '0 10px',
              lineHeight: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }"
          />

          <!-- 三角 -->
          <bm-label
            :content="`<div></div>`"
            :position="{
              lng: houseInfo.coord.longitude,
              lat: houseInfo.coord.latitude
            }"
            :labelStyle="{
              width: '0',
              height: 0,
              backgroundColor: 'unset',
              padding: 'unset',
              borderTop: '9px solid #EE5D5B',
              borderBottom: '50px solid transparent',
              borderLeft: '0px solid transparent',
              borderRight: '12px solid transparent',
              position: 'absolute',
              transform: 'translate(12px, 20px)'
            }"
          />
        </baidu-map>
      </div>
    </div>

    <div class="houseConfig">
      <h4>房屋配套</h4>
      <van-grid square :column-num="5" :border="false">
        <van-grid-item
          v-if="houseInfo.supporting.includes('衣柜')"
          text="衣柜"
          @click="addName('衣柜')"
        >
          <template #icon>
            <i class="icnonfont icon-yigui"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('洗衣机')"
          text="洗衣机"
          @click="addName('洗衣机')"
        >
          <template #icon>
            <i class="iconfont icon-xiyiji"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('空调')"
          text="空调"
          @click="addName('空调')"
        >
          <template #icon>
            <i class="iconfont icon-kongdiao"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('天然气')"
          text="天然气"
          @click="addName('天然气')"
        >
          <template #icon>
            <i class="iconfont icon-meiqitianranqi"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('冰箱')"
          text="冰箱"
          @click="addName('冰箱')"
        >
          <template #icon>
            <i class="iconfont icon-fridge"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('暖气')"
          text="暖气"
          @click="addName('暖气')"
        >
          <template #icon>
            <i class="iconfont icon-nuanqi"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('电视')"
          text="电视"
          @click="addName('电视')"
        >
          <template #icon>
            <i class="iconfont icon-dianshiji"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('热水器')"
          text="热水器"
          @click="addName('热水器')"
        >
          <template #icon>
            <i class="iconfont icon-haofangtuo400iconfont2reshuiqi"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('宽带')"
          text="宽带"
          @click="addName('宽带')"
        >
          <template #icon>
            <i class="iconfont icon-wifi"></i>
          </template>
        </van-grid-item>
        <van-grid-item
          v-if="houseInfo.supporting.includes('沙发')"
          text="沙发"
          @click="addName('沙发')"
        >
          <template #icon>
            <i class="iconfont icon-shafa"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="houseDetails">
      <h4>房源概况</h4>
      <div class="sectionInfo">
        <van-image
          round
          width="52px"
          height="52px"
          src="http://liufusong.top:8080/img/avatar.png"
        />
        <div class="info">
          <p>王女士</p>
          <div class="infoIcon">
            <van-icon name="checked" style="margin-right: 6px" />已认证房主
          </div>
        </div>
        <div class="btnContact">发消息</div>
      </div>
      <div class="textCenter">
        1.周边配套齐全,地铁四号线陶然亭站,交通便利,公交
        云集,距离北京南站、西站都很近距离。2.小区规模大,
        配套全年,幼儿园,体育场,游泳馆,养老院,小学。3.
        人车分流,环境优美。4.精装两居室,居家生活方便,还
        有一个小书房,看房随时联系。
      </div>
    </div>

    <div class="likeInfo">
      <h4>猜你喜欢</h4>
      <div class="likeCard">
        <van-cell icon="http://liufusong.top:8080/img/message/1.png">
          <template #title>
            <p style="font-weight: 700">安贞西里3室1厅</p>
            <div class="huiText">72.32㎡/南北/低楼层</div>
            <van-tag
              text-color="#39BECD"
              color="#E1F5F8"
              type="primary"
              style="margin-right: 5px"
              >随时看房</van-tag
            >
            <div class="redText">4500元/月</div>
          </template>
        </van-cell>
        <van-cell icon="http://liufusong.top:8080/img/message/2.png">
          <template #title>
            <p style="font-weight: 700">天居园2室1厅</p>
            <div class="huiText">83㎡/南/高楼层</div>
            <van-tag
              text-color="#39BECD"
              color="#E1F5F8"
              type="primary"
              style="margin-right: 5px"
              >近地钱</van-tag
            >
            <div class="redText">7200元/月</div>
          </template>
        </van-cell>
        <van-cell icon="http://liufusong.top:8080/img/message/3.png">
          <template #title>
            <p style="font-weight: 700">角门甲4号院1室1厅</p>
            <div class="huiText">52㎡/西南/低楼层</div>
            <van-tag
              text-color="#39BECD"
              color="#E1F5F8"
              type="primary"
              style="margin-right: 5px"
              >集中供暖</van-tag
            >
            <div class="redText">4300元/月</div>
          </template>
        </van-cell>
      </div>
    </div>

    <div class="bottomBar">
      <van-button
        :loading="isloading"
        type="default"
        v-if="isFavorite"
        @click="removeFavorate"
      >
        <template #icon>
          <van-icon name="star" color="red" />
        </template>
        收藏
      </van-button>
      <van-button
        :loading="isloading"
        v-else
        icon="star-o"
        type="default"
        @click="addFavorate"
        >收藏</van-button
      >
      <van-button type="default">在线咨询</van-button>
      <van-button type="primary">电话预约</van-button>
    </div>
  </div>
</template>

<script>
import {
  getFavorateInfo,
  getFavorate,
  removeFavorate,
  addFavorate
} from '@/api/house'
export default {
  data() {
    return {
      houseInfo: {},
      isFavorite: false,
      isloading: false
    }
  },
  created() {
    this.getFavorateInfo()
    this.getFavorate()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getFavorateInfo() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        // loading时,禁止点击页面
        forbidClick: true
      })
      const { data } = await getFavorateInfo(this.$route.query.houseCode)
      this.$toast.clear()
      console.log(data)
      this.houseInfo = data.body
    },
    async getFavorate() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        // loading时,禁止点击页面
        forbidClick: true
      })
      const { data } = await getFavorate(this.$route.query.houseCode)
      this.$toast.clear()
      console.log(data)
      this.isFavorite = data.body.isFavorite
    },
    async removeFavorate() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        // loading时,禁止点击页面
        forbidClick: true
      })
      this.isloading = true
      await removeFavorate(this.$route.query.houseCode)
      this.$toast.clear()
      this.isFavorite = false
      this.isloading = false
    },
    async addFavorate() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        // loading时,禁止点击页面
        forbidClick: true
      })
      this.isloading = true
      await addFavorate(this.$route.query.houseCode)
      this.$toast.clear()
      this.isFavorite = true
      this.isloading = false
    }
  },
  computed: {
    oriented() {
      return this.houseInfo.oriented.join('/')
    }
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.navBar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
  /deep/.van-nav-bar {
    background-color: #21b97a;
  }

  /deep/.van-icon {
    color: aliceblue;
  }

  /deep/.van-nav-bar__title {
    color: aliceblue;
  }
}
.imgBox {
  /deep/.van-swipe__indicator {
    width: 8px;
    height: 8px;
  }

  .img {
    width: 100%;
    height: 100%;
  }
}
.main {
  padding: 15px;
  width: 100%;
  border-bottom: 12px solid #f6f5f6;

  .firstTitle {
    margin: 16px 0;
    font-size: 16px;
    color: #333;
  }

  .priceInfo {
    width: 100%;
    height: 84px;
    margin: 15px 0;
    padding: 15px 0;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    display: flex;

    .mainBox {
      flex: 1;
      text-align: center;

      div {
        font-size: 14px;
        color: #999;
        height: 50%;
        line-height: 26px;

        &.redText {
          color: red;
          font-size: 12px;

          > span {
            color: red;
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
    }
  }

  .config {
    font-size: 13px;
    color: #999;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 10px;

    div {
      width: 50%;
      height: 26px;
      line-height: 26px;

      > span {
        margin-left: 12px;
        color: black;
      }
    }
  }
}
.map {
  .mapTitle {
    font-size: 14px;
    margin: 0 12px;
    height: 44px;
    line-height: 44px;
  }

  .map {
    width: 100%;
    height: 146px;
  }
}
.houseConfig {
  padding: 0 10px;
  border-bottom: 12px solid #f6f6f6;

  h4 {
    font-size: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
    margin-bottom: 10px;
  }

  .van-cell-group__title {
    color: #000000;
    font-size: 15px;
  }
  .iconfont {
    font-size: 22px;
  }
  /deep/.van-grid-item__text {
    color: unset;
  }
  .myActive {
    color: #21b97a;
  }
}
.houseDetails {
  padding: 0 10px;
  border-bottom: 12px solid #f6f6f6;

  h4 {
    font-size: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
    margin-bottom: 10px;
  }
  .sectionInfo {
    display: flex;
    align-items: center;

    .info {
      font-size: 14px;
      margin-left: 12px;

      .infoIcon {
        margin-top: 6px;
        font-size: 12px;
        color: red;
      }
    }
    .btnContact {
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      width: 74px;
      height: 30px;
      color: #21b97a;
      border: 1px solid #21b97a;
      position: relative;
      right: -130px;
    }
  }
  .textCenter {
    font-size: 14px;
    padding: 10px 0;
  }
}
.likeInfo {
  padding: 0 10px 48px;

  h4 {
    font-size: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
    margin-bottom: 10px;
  }
  .likeCard {
    .van-cell {
      padding: 21px 0 0.26667rem;
      border-bottom: 1px solid #cecece;

      .van-icon {
        width: 106px;
        height: 80px;
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
  }
}
.bottomBar {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;

  button {
    width: 33.33%;

    .van-icon {
      bottom: 2px;
    }
  }
}
</style>
