<template>
  <div>
    <NavBar />
    <van-form ref="formName">
      <div class="formTop">
        <van-cell-group title="房源信息">
          <van-cell
            is-link
            :clickable="true"
            title="小区名称"
            :value="`${this.$store.state.community}`"
            :border="true"
            @click="toSearch"
          />
          <van-cell style="white-space: pre" title="租       金">
            <input
              name="rent"
              type="number"
              v-model="price"
              placeholder="请输入租金/月"
            /><span class="rightSpan">¥/月</span>
          </van-cell>
          <van-cell title="建筑面积">
            <input
              name="area"
              type="number"
              v-model="size"
              placeholder="请输入建筑面积"
            /><span class="rightSpan" style="margin-left: 60px">㎡</span>
          </van-cell>

          <!-- 户型 -->
          <van-field
            is-link
            style="white-space: pre"
            readonly
            clickable
            name="huxing"
            :value="huxing"
            label="户       型"
            placeholder="请选择"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="roomType"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <!-- 户型 -->

          <!-- 所在楼层 -->
          <van-field
            is-link
            style="white-space: pre"
            readonly
            clickable
            name="louceng"
            :value="louceng"
            label="所在楼层"
            placeholder="请选择"
            @click="showPicker1 = true"
          />
          <van-popup v-model="showPicker1" position="bottom">
            <van-picker
              show-toolbar
              :columns="floor"
              @confirm="onConfirm1"
              @cancel="showPicker1 = false"
            />
          </van-popup>
          <!-- 所在楼层 -->

          <!-- 朝向 -->
          <van-field
            is-link
            style="white-space: pre"
            readonly
            clickable
            name="chaoxiang"
            :value="chaoxiang"
            label="朝       向"
            placeholder="请选择"
            @click="showPicker2 = true"
          />
          <van-popup v-model="showPicker2" position="bottom">
            <van-picker
              show-toolbar
              :columns="oriented"
              @confirm="onConfirm2"
              @cancel="showPicker2 = false"
            />
          </van-popup>
          <!--  朝向 -->
        </van-cell-group>
      </div>
      <div class="formMiddle">
        <van-cell-group title="房屋标题">
          <input
            v-model="title"
            name="title"
            type="text"
            placeholder="请输入标题 (例如: 整租 小区名 2室 5000元)"
          />
        </van-cell-group>
      </div>

      <div class="formBottom">
        <van-cell-group title="房屋图像">
          <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            multiple
            upload-icon="plus"
          />
        </van-cell-group>
      </div>

      <div class="formConfig">
        <van-cell-group title="房屋配置">
          <van-grid square :column-num="5" :border="false" clickable>
            <van-grid-item
              text="衣柜"
              :class="{ myActive: list.includes('衣柜') }"
              @click="addName('衣柜')"
            >
              <template #icon>
                <i class="icnonfont icon-yigui"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              text="洗衣机"
              :class="{ myActive: list.includes('洗衣机') }"
              @click="addName('洗衣机')"
            >
              <template #icon>
                <i class="iconfont icon-xiyiji"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              text="空调"
              :class="{ myActive: list.includes('空调') }"
              @click="addName('空调')"
            >
              <template #icon>
                <i class="iconfont icon-kongdiao"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              text="天然气"
              :class="{ myActive: list.includes('天然气') }"
              @click="addName('天然气')"
            >
              <template #icon>
                <i class="iconfont icon-meiqitianranqi"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              text="冰箱"
              :class="{ myActive: list.includes('冰箱') }"
              @click="addName('冰箱')"
            >
              <template #icon>
                <i class="iconfont icon-fridge"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              text="暖气"
              :class="{ myActive: list.includes('暖气') }"
              @click="addName('暖气')"
            >
              <template #icon>
                <i class="iconfont icon-nuanqi"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              text="电视"
              :class="{ myActive: list.includes('电视') }"
              @click="addName('电视')"
            >
              <template #icon>
                <i class="iconfont icon-dianshiji"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              text="热水器"
              :class="{ myActive: list.includes('热水器') }"
              @click="addName('热水器')"
            >
              <template #icon>
                <i class="iconfont icon-haofangtuo400iconfont2reshuiqi"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              text="宽带"
              :class="{ myActive: list.includes('宽带') }"
              @click="addName('宽带')"
            >
              <template #icon>
                <i class="iconfont icon-wifi"></i>
              </template>
            </van-grid-item>
            <van-grid-item
              :class="{ myActive: list.includes('沙发') }"
              text="沙发"
              @click="addName('沙发')"
            >
              <template #icon>
                <i class="iconfont icon-shafa"></i>
              </template>
            </van-grid-item>
          </van-grid>
        </van-cell-group>
      </div>

      <div class="formDescribe">
        <van-cell-group title="房屋描述">
          <textarea
            v-model="description"
            name="describe"
            id=""
            cols="30"
            rows="10"
            placeholder="请输入房屋描述信息"
            style="font-size: 14px"
          ></textarea>
        </van-cell-group>
      </div>
      <div class="sub">
        <van-button type="default" @click="leftFn">取消</van-button>
        <van-button type="primary" @click="rightFn">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { addNeedElement, getImage, toHouse } from '@/api/house'
export default {
  data() {
    return {
      fileList: [],
      huxing: '',
      louceng: '',
      chaoxiang: '',
      roomType: ['一室', '二室', '三室', '四室', '四室+'],
      floor: ['高楼层', '中楼层', '低楼层'],
      oriented: ['东', '西', '南', '北', '东南', '东北', '西南', '西北'],
      showPicker: false,
      showPicker1: false,
      showPicker2: false,
      price: '',
      size: '',
      title: '',
      description: '',
      list: [],
      allList: [],
      endImg: [],
      isTo: false
    }
  },
  components: {
    NavBar
  },
  async created() {
    const { data } = await addNeedElement()
    this.allList = data.body || []
  },
  methods: {
    toSearch() {
      this.$router.push('/search')
    },
    onConfirm(value) {
      this.huxing = value
      this.showPicker = false
    },
    onConfirm1(value) {
      this.louceng = value
      this.showPicker1 = false
    },
    onConfirm2(value) {
      this.chaoxiang = value
      this.showPicker2 = false
    },
    addName(val) {
      if (this.list.indexOf(val) === -1) {
        this.list.push(val)
      } else {
        const index = this.list.indexOf(val)
        this.list.splice(index, 1)
      }
    },
    leftFn() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '放弃发布房源？',
          confirmButtonText: '继续编辑', // then
          confirmButtonColor: '#108ee9',
          cancelButtonText: '放弃' // catch
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          this.$router.push({ path: '/' })
        })
    },
    async rightFn() {
      if (
        !this.list.length ||
        !this.huxing.trim() ||
        !this.louceng.trim() ||
        !this.chaoxiang.trim() ||
        !this.price.trim() ||
        !this.size.trim() ||
        !this.description.trim() ||
        !this.title.trim() ||
        !this.endImg.length ||
        !this.$store.state.community
      ) {
        return this.$toast.fail('数据不完整，请填写完整')
      }

      // 户型
      const index = this.allList.roomType.findIndex((item) => {
        return item.label === this.huxing
      })
      const huxing = this.allList.roomType[index]?.value

      // 楼层
      const index1 = this.allList.floor.findIndex((item) => {
        return item.label === this.louceng
      })
      const louceng = this.allList.floor[index1]?.value

      // 朝向
      const index2 = this.allList.oriented.findIndex((item) => {
        return item.label === this.chaoxiang
      })
      const chaoxiang = this.allList.oriented[index2]?.value

      // 家具
      const jiadian = this.list.join('|')

      // 图片处理
      const imgIp = this.endImg.join('|')

      try {
        // 发起请求
        const { data } = await toHouse(
          jiadian,
          huxing,
          louceng,
          chaoxiang,
          this.price,
          this.size,
          this.description,
          this.$store.state.communityId,
          imgIp,
          this.title
        )
        if (data.status === 200) {
          this.$dialog
            .confirm({
              title: '提示',
              message: '房源发布成功!',
              confirmButtonText: '继续发布', // then
              confirmButtonColor: '#108ee9',
              cancelButtonText: '去查看' // catch
            })
            .then(() => {
              // on confirm
              this.list = []
              this.huxing = ''
              this.louceng = ''
              this.chaoxiang = ''
              this.price = ''
              this.size = ''
              this.description = ''
              this.title = ''
              this.endImg = []
              this.fileList = []
              this.endImg = []
              this.$store.commit('clearCommunity', '')
            })
            .catch(() => {
              // on cancel
              this.$store.commit('clearCommunity', '')
              this.$router.push('/list')
            })
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('发布失败，请重试')
      }
    },
    async afterRead(file) {
      const params = new FormData()
      params.append('file', file.file)

      const { data } = await getImage(params)
      console.log(data)
      this.endImg.push(data.body[0])
    }
  }
}
</script>

<style scoped lang="less">
.formTop {
  .van-cell-group__title {
    color: #21b97a;
    font-size: 15px;
  }
  input {
    border: none;
    margin-left: 30px;
    &::placeholder {
      color: #c1af99;
    }
  }
  .van-cell__title {
    flex: unset;
  }
  .rightSpan {
    margin-left: 50px;
  }
  /deep/.van-field__control {
    text-align: right;
    /deep/&::placeholder {
      text-align: right;
    }
  }
}
.formMiddle {
  .van-cell-group__title {
    color: #000000;
    font-size: 15px;
  }
  input {
    width: 345px;
    border: none;
    font-size: 14px;
    margin-left: 14px;
    &::placeholder {
      color: #bab0a5;
    }
  }
}
.formBottom {
  .van-cell-group__title {
    color: #000000;
    font-size: 15px;
  }
  /deep/.van-uploader__upload {
    background-color: unset;
    border: 1px solid #eee;
    margin: 6px;
  }
}
.formConfig {
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
.formDescribe {
  width: 100%;
  border-top: 20px solid #eee;
  border-bottom: 70px solid #eee;
  .van-cell-group__title {
    color: #000000;
    font-size: 15px;
  }
  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 146px;
    border: none;
    padding: 10px 15px;
    &::placeholder {
      color: #bab0a5;
    }
  }
}
.sub {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  button {
    flex: 1;
  }
}
</style>
