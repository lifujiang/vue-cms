<template>
  <div class="newsDetailPage">
    <h1 class="newsDetail_tit">{{ newsDetail.title }}</h1>
    <h2 class="newsDetail_subtit">--{{ newsDetail.subtitle }}</h2>
    <p class="newsDetail_info">
      <span>发布时间: {{ newsDetail.date }}</span>
      <span>点击: {{ newsDetail.click }}次</span>
    </p>
    <hr />
    <div class="newsDetail_content">{{ newsDetail.content }}</div>
    <newsComment :artid="id"></newsComment>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import newsComment from '../subcomponents/Comment.vue'
export default {
  data () {
    return {
      newsDetail: {}
    }
  },
  props: ['id'], // 这里的作用是解耦属性
  created () {
    this.getNewsDetail()
  },
  methods: {
    getNewsDetail () {
      this.$http.get('getNewsDetail', { params: { id: this.id } }).then(res => {
        if (res.body.status === 0) {
          this.newsDetail = res.body.list
        } else {
          Toast('图片加载失败')
        }
      })
    }
  },
  components: {
    newsComment
  }
}
</script>

<style lang="scss" scope>
  .newsDetailPage {
    padding: 0 4px;
    font-size: 13px;
    .newsDetail_tit {
      text-align: center;
      margin: 15px;
      font-size: 18px;
    }
    .newsDetail_info {
      clear: both;
      display: flex;
      justify-content: space-between;
      color: royalblue;
    }
    .newsDetail_subtit {
      margin-bottom: 15px;
      float: right;
      font-size: 16px;
    }
    .newsDetail_content {
      margin: 15px;
    }
  }
</style>
