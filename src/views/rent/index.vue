<template>
  <div>
    <NavBar />
    <Card :list="list" />
    <div v-if="list.length === 0" style="text-align: center">没有数据啊</div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Card from '@/components/Card.vue'
import { getToRentList } from '@/api/user'
export default {
  data() {
    return {
      list: []
    }
  },
  components: {
    NavBar,
    Card
  },
  created() {
    this.getToRentList()
  },
  methods: {
    async getToRentList() {
      this.$toast.loading({
        message: '加载中...',
        // loading时,禁止点击页面
        forbidClick: true,
        duration: 0
      })

      try {
        const { data } = await getToRentList()
        if (data.status === 400) {
          this.$toast.fail('token过期，请重新登录')
          setTimeout(() => {
            this.$router.push('/profile')
          }, 1000)
        } else {
          this.list = data.body || []
          this.$toast.clear()
        }
      } catch (error) {
        this.$toast.fail('响应超时，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
