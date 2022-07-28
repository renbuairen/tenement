<template>
  <div>
    <!-- 搜索框 -->
    <div class="searchTop">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <van-search disabled class="search" placeholder="请输入小区或地址">
            <template #label>
              <div class="Location" @click="cityFn">{{ activeCity }} ▼</div>
            </template>
          </van-search>
        </template>
        <template #right>
          <van-icon name="location-o" color="#FFF" @click="mapFn" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 筛选栏 -->
    <div class="filter">
      <van-dropdown-menu active-color="#21b97a">
        <van-dropdown-item
          title="区域"
          ref="showToggle"
          :title-class="{ activeColor: total }"
        >
          <template>
            <van-picker
              :loading="loading"
              value-key="label"
              show-toolbar
              :columns="columns"
              toolbar-position="bottom"
              @confirm="onConfirm"
              @cancel="onCancel"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item
          title="方式"
          ref="showToggle1"
          :title-class="{ activeColor: total1 }"
        >
          <template>
            <van-picker
              :loading="loading"
              value-key="label"
              show-toolbar
              :columns="columns1"
              toolbar-position="bottom"
              @confirm="onConfirm1"
              @cancel="onCancel"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item
          title="租金"
          ref="showToggle2"
          :title-class="{ activeColor: total2 }"
        >
          <template>
            <van-picker
              :loading="loading"
              value-key="label"
              show-toolbar
              :columns="columns2"
              toolbar-position="bottom"
              @confirm="onConfirm2"
              @cancel="onCancel"
            />
          </template>
        </van-dropdown-item>
        <van-dropdown-item
          title="筛选"
          @open="show = true"
          :title-class="{ activeColor: total3 }"
        />
      </van-dropdown-menu>

      <!-- 弹出框 -->
      <van-popup
        v-model="show"
        position="right"
        :style="{ height: '100%', width: '80%' }"
      >
        <div class="bigBox" v-if="listFilter.floor">
          <p>户型</p>
          <div class="type">
            <div
              :class="{ green: activeList.includes(item.value) }"
              class="smallBox"
              v-for="item in listFilter.roomType"
              :key="item.value"
              type="default"
              @click="addActive(item.value)"
            >
              {{ item.label }}
            </div>
          </div>
          <p>朝向</p>
          <div class="towards">
            <div
              :class="{ green: activeList.includes(item.value) }"
              class="smallBox"
              v-for="item in listFilter.oriented"
              :key="item.value"
              type="default"
              @click="addActive(item.value)"
            >
              {{ item.label }}
            </div>
          </div>
          <p>楼层</p>
          <div class="floor">
            <div
              :class="{ green: activeList.includes(item.value) }"
              class="smallBox"
              v-for="item in listFilter.floor"
              :key="item.value"
              type="default"
              @click="addActive(item.value)"
            >
              {{ item.label }}
            </div>
          </div>
          <p>房屋亮点</p>
          <div class="Highlights">
            <div
              :class="{ green: activeList.includes(item.value) }"
              class="smallBox"
              v-for="item in listFilter.characteristic"
              :key="item.value"
              type="default"
              @click="addActive(item.value)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="btn" v-if="listFilter.floor">
          <van-button type="default" @click="activeList = []">清除</van-button>
          <van-button type="primary" @click="moreFn">确定</van-button>
        </div>
      </van-popup>
    </div>
    <div style="margin-bottom: 50px">
      <van-list
        @load="loadNextPage"
        offset="400"
        v-model="isLoading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了,请重新加载!"
        ><Card :list="list" />
        <div v-if="list.length === 0" style="text-align: center">
          没有房源啊
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getFilterInfo, getInfoHouse } from '@/api/house'
import Card from '@/components/Card.vue'
export default {
  name: 'List',
  components: {
    Card
  },
  data() {
    return {
      loading: false,
      listFilter: {},
      columns: [],
      columns1: [],
      columns2: [],
      show: false,
      activeList: [],
      list: [],
      isLoading: false,
      finished: false,
      error: false,
      start: 1,
      end: 20,
      area: '',
      subway: '',
      rentType: null,
      price: null,
      more: '',
      total: false,
      total1: false,
      total2: false,
      total3: false
    }
  },
  created() {
    this.getFilterInfo()
    this.getInfoHouse()
  },
  computed: {
    activeCity() {
      return this.$store.state.city
    }
  },
  methods: {
    cityFn() {
      this.$router.push('/city')
    },
    mapFn() {
      this.$router.push('/mapRent')
    },
    onClickLeft() {
      this.$router.push('/')
    },
    async getFilterInfo() {
      this.loading = true
      const { data } = await getFilterInfo(this.$store.state.cityId)
      this.listFilter = data.body

      this.columns.push(data.body.area, data.body.subway)
      this.columns[0].children[0].children = [{ label: '' }]
      this.columns[1].children[0].children = [{ label: '' }]

      this.columns1 = this.listFilter.rentType
      this.columns2 = this.listFilter.price
      this.loading = false
    },
    onConfirm(value, index) {
      this.total = true

      console.log(this.columns)
      console.log(value, index)
      this.$refs.showToggle.toggle(false)

      if (index[0] === 0) {
        this.area = this.columns[0].children[index[1]].children[index[2]].value
        this.subway = ''
        this.start = 1
        this.end = 20
        this.getInfoHouse()
      } else {
        this.subway =
          this.columns[1].children[index[1]].children[index[2]].value
        this.area = ''
        this.start = 1
        this.end = 20
        this.getInfoHouse()
      }
    },
    onConfirm1(value, index) {
      this.total1 = true

      console.log(value, index)
      this.$refs.showToggle1.toggle(false)

      this.rentType = this.columns1[index].value
      this.start = 1
      this.end = 20
      this.getInfoHouse()
    },
    onConfirm2(value, index) {
      this.total2 = true
      console.log(value, index)
      this.$refs.showToggle2.toggle(false)

      this.price = this.columns2[index].value
      this.start = 1
      this.end = 20
      this.getInfoHouse()
    },
    moreFn() {
      this.total3 = true
      this.show = false

      this.more = this.activeList.join(',')
      this.start = 1
      this.end = 20
      this.getInfoHouse()
    },
    onCancel() {
      this.$refs.showToggle.toggle(false)
      this.$refs.showToggle1.toggle(false)
      this.$refs.showToggle2.toggle(false)
    },
    addActive(val) {
      if (this.activeList.includes(val)) {
        const index = this.activeList.findIndex((ele) => {
          return ele === val
        })
        this.activeList.splice(index, 1)
      } else {
        this.activeList.push(val)
      }
    },
    async getInfoHouse() {
      const { data } = await getInfoHouse(
        this.start,
        this.end,
        this.$store.state.cityId,
        this.area,
        this.subway,
        this.rentType,
        this.price,
        this.more
      )
      console.log(data)
      this.list = data.body.list

      if (this.list.length % 20 !== 0 && this !== 0) {
        this.finished = true
      }
    },
    async loadNextPage() {
      try {
        if (this.list.length % 20 !== 0) {
          this.start = 1
          this.end = 20
          this.finished = true
          return
        }
        this.start += 20
        this.end += 20
        const { data } = await getInfoHouse(
          this.start,
          this.end,
          this.$store.state.cityId,
          this.area,
          this.subway,
          this.rentType,
          this.price,
          this.more
        )
        this.list.push(...data.body.list)
        this.isLoading = false
      } catch (error) {
        this.error = true
        this.isLoading = false
      }
    }
  }
}
</script>

<style scpoed lang="less">
.activeColor {
  color: #21b97a;
}
.searchTop {
  .van-search {
    width: 275px;
    height: 34px;
    padding: unset;
    background-color: transparent;

    .van-icon {
      font-size: 18px;
      color: #9c9fa1;
      border-left: 1px solid #9c9fa1;
      padding-left: 15px;
      margin-left: 5px;
    }
  }
  /deep/.van-icon-search {
    border-left: 1px solid #e5e5e5;
    padding-left: 10px;
  }
  .van-cell {
    font-size: 13px;
  }
  .van-search__content {
    border-radius: 5px;
  }
  .van-nav-bar {
    .van-nav-bar__left {
      padding: 0 10px;
      .van-icon {
        color: rgb(255, 255, 255);
        font-size: 20px;
      }
    }
    .van-nav-bar__title {
      max-width: 73%;
    }
    .van-nav-bar__content {
      background-color: #21b97a;
      height: 50px;
    }
    .van-icon {
      color: #9c9fa1;
    }
  }

  .Location {
    margin-left: -10px;
  }
  .van-icon {
    font-size: 25px;
  }
}
.filter {
  .van-dropdown-menu__title {
    font-size: 17px;
  }
  .van-picker__confirm {
    color: #fff;
    flex: 4;
    background-color: #21b97a;
  }
  .van-picker__cancel {
    color: #21b97a;
    flex: 2;
    background-color: #fff;
  }
  .change {
    color: red;
  }

  .bigBox {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    padding: 20px 15px;
    p {
      margin: 0;
      padding: 0;
      font-size: 15px;
      color: #333;
      padding: 16px 0;
      border-top: 1px solid #e5e5e5;
      margin-top: 10px;

      &:first-child {
        border-top: unset;
      }
    }
    .type,
    .towards,
    .floor,
    .Highlights {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 40px;
    }

    .smallBox {
      font-size: 12px;
      color: #888;
      width: 70px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #ddd;
      text-align: center;
      line-height: 30px;
      display: flex;
      justify-content: center;
      margin: 10px;
    }
  }
  .btn {
    position: sticky;
    bottom: -1px;

    display: flex;

    button {
      height: 50px;
      font-size: 18px;

      &:first-child {
        flex: 2;
        color: #21b97a;
      }

      &:last-child {
        flex: 4;
      }
    }
  }
}
.green {
  color: #21b97a !important;
  background-color: #defaef;
  border: 1px solid #21b97a !important;
}
</style>
