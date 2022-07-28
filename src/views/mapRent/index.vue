<template>
  <div>
    <NavBar />

    <baidu-map class="map" :center="city" :zoom="zoom">
      <div v-if="isLogin">
        <template v-if="num < 3">
          <bm-label
            @click="
              mapTwo(item.value, [item.coord.longitude, item.coord.latitude])
            "
            v-for="(item, index) in listFist"
            :key="index"
            :content="`<div>${item.label}</div><div>${item.count}套</div>`"
            :position="{
              lng: item.coord.longitude,
              lat: item.coord.latitude
            }"
            :labelStyle="{
              color: '#fff',
              fontSize: '12px',
              background: 'rgba(12, 181, 106, 0.9)',
              border: '2px solid hsla(0, 0%, 100%, 0.8)',
              borderRadius: '50%',
              height: '70px',
              width: '70px',
              lineHeight: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }"
          />
        </template>

        <template v-if="num >= 3">
          <div>
            <bm-label
              @click="listInfo(item.value)"
              v-for="(item, index) in listFist"
              :key="index"
              :content="`<div>${item.label}</div>&nbsp;&nbsp;<div>${item.count}套</div>`"
              :position="{
                lng: item.coord.longitude,
                lat: item.coord.latitude
              }"
              :labelStyle="{
                color: '#fff',
                fontSize: '12px',
                background: 'rgba(12, 181, 106, 0.9)',
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
              v-for="item in listFist"
              :key="item.value"
              :content="`<div></div>`"
              :position="{
                lng: item.coord.longitude,
                lat: item.coord.latitude
              }"
              :labelStyle="{
                width: '0',
                height: 0,
                backgroundColor: 'unset',
                padding: 'unset',
                borderTop: '7px solid #0CB56AE6',
                borderBottom: '0px solid transparent',
                borderLeft: '7px solid transparent',
                borderRight: '7px solid transparent',
                position: 'absolute',
                transform: 'translate(40px, 20px)'
              }"
            />
          </div>

          <!-- 弹出层 -->
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '40%' }"
          >
            <div class="title">
              <h4>房屋列表</h4>
              <div style="font-size: 13px" @click="clickFn">更多房源</div>
            </div>
            <Card :list="list" />
          </van-popup>
        </template>

        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      </div>
    </baidu-map>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getMapCity } from '@/api/area'
import { getHouseInfo } from '@/api/house'
import Card from '@/components/Card.vue'
export default {
  data() {
    return {
      listFist: [],
      zoom: 11,
      city: this.$store.state.city,
      isLogin: true,
      num: 1,
      show: false,
      list: []
    }
  },
  created() {
    this.getMapCity()
  },
  components: {
    NavBar,
    Card
  },
  methods: {
    async getMapCity() {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        // loading时,禁止点击页面
        forbidClick: true
      })

      try {
        const { data } = await getMapCity(this.$store.state.cityId)
        console.log(data)

        this.$toast.clear()

        this.listFist = data.body
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    },
    async mapTwo(mapTwo, Id) {
      this.num++
      this.isLogin = false

      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        // loading时,禁止点击页面
        forbidClick: true
      })

      try {
        const { data } = await getMapCity(mapTwo)
        console.log(data)

        this.$toast.clear()

        this.city = { lng: Id[0], lat: Id[1] }

        this.listFist = data.body
        this.isLogin = true

        if (this.zoom === 13) this.zoom += 3
        else this.zoom += 2
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    },
    async listInfo(houseInfo) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        // loading时,禁止点击页面
        forbidClick: true
      })

      const { data } = await getHouseInfo(houseInfo)
      this.$toast.clear()
      this.show = true
      this.list = data.body.list
      console.log(this.list)
    },
    clickFn() {
      this.$router.push('/list')
    }
  }
}
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 620px;
}
.title {
  background-color: #c0c0c2;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  h4 {
    font-size: 16px;
  }
}
</style>
