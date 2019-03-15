<template>
  <ul class="mui-table-view">
    <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
      <router-link :to="'/newsdetail/' + item.id">
        <img class="mui-media-object mui-pull-left" :src="item.img">
        <div class="mui-media-body">
          <h1>{{ item.title }}</h1>
          <p class="mui-ellipsis">
            <span>发表时间: {{ item.date }}</span>
            <span>点击: {{ item.click }}次</span>
          </p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      newsList: []
    }
  },
  created () {
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.$http.get('getNewsList').then(res => {
        if(res.body.status == 0) {
          this.newsList = res.body.list
        } else {
          Toast('获取数据失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.mui-table-view{
  h1{
    font-size: 15px;
  }
  .mui-ellipsis{
    margin-top: 13px;
    font-size: 13px;
    color:royalblue;
    display: flex;
    justify-content: space-between;
  }
}
</style>