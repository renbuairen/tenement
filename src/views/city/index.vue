<template>
  <div>
    <NavBar />
    <van-index-bar
      v-if="city.length !== 0"
      :index-list="indexList"
      :sticky="false"
    >
      <van-index-anchor index=" "></van-index-anchor>
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell :title="activeCity" />
      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        @click="clickFn([item.label, item.value])"
        :clickable="true"
        v-for="(item, index) in hotCity"
        :key="index"
        :title="item.label"
      />

      <div v-for="item in short" :key="item">
        <van-index-anchor :index="item">{{ item }}</van-index-anchor>
        <div v-for="(item1, index1) in city" :key="index1">
          <van-cell
            :clickable="true"
            v-if="item1.short === item"
            :title="item1.label"
            @click="clickFn([item1.label, item1.value])"
          />
        </div>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getHotCity, getAllCity } from '@/api/area'
export default {
  name: 'city',
  data() {
    return {
      hotCity: [],
      city: [],
      short: [],
      indexList: []
    }
  },
  components: {
    NavBar
  },
  created() {
    this.getHotCity()
    this.getAllCity()
  },
  methods: {
    async getHotCity() {
      const { data } = await getHotCity()
      this.hotCity = data.body || []
    },
    async getAllCity() {
      try {
        const { data } = await getAllCity(1)
        const short = []

        const citys = data.body || []
        citys.forEach((ele) => {
          ele.short = ele.short[0].toUpperCase()
          short.push(ele.short)
        })
        const temp = new Set(short.sort())
        this.short = [...temp]
        this.indexList.push('#', '热', ...this.short)

        this.city = citys
      } catch (error) {
        console.log(error)
        this.$toast.fail('响应超时，请重试')
      }
    },
    clickFn(city) {
      localStorage.setItem('city', JSON.stringify(city))
      this.$store.commit('setCity', city)
      this.$router.back()
    }
  },
  computed: {
    activeCity() {
      return this.$store.state.city
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-index-anchor {
  color: #999;
}
/deep/.van-index-bar__index {
  margin-top: 10px;
  margin-right: 6px;
  font-size: 15px;
  padding: unset;
  padding: 1px;
}
/deep/.van-index-bar__index--active {
  border-radius: 50%;
  background-color: #21b97a;
  color: unset;
}
</style>
