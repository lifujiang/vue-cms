<template>
  <div class="imgDetailPage">
    <h1 class="img_tit">{{ detailList.title }}</h1>
    <div class="info">
      <span>发布时间: {{ detailList.date }}</span>
      <span>点击: {{ detailList.click }}次</span>
    </div>
    <hr>
      <vue-preview :slides="imgList"></vue-preview>
    <div class="img_content">{{ detailList.content }}</div>
    <newsComment :artid="id"></newsComment>    
  </div>
</template>

<script>
import newsComment from '../subcomponents/Comment.vue'
export default {
  data () {
    return {
      detailList: {},
      imgList: []
    }
  },
  created() {
    this.getImgDetail()
    this.getImgPreview()
  },
  props: ['id'], // 这里的作用是解耦属性
  components: {
    newsComment
  },
  methods: {
    // 获取除缩略图以外的主要内容
    getImgDetail () {
      this.$http.get('getImgDetail', { params: { id: this.id } }).then(res => {
        if (res.body.status === 0) {
          this.detailList = res.body.list
        } else {
          Toast('加载图片详情失败')
        }
      })
    },
    // 获取缩略图
    getImgPreview () {
      this.$http.get('getImgPreview', { params: { id: this.id } }).then(res => {
        if (res.body.status === 0) {
          this.imgList = res.body.list
          for (const item of this.imgList) {
            item.w = 640
            item.h = 480
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
  .imgDetailPage {
    padding: 0 4px;
    font-size: 13px;
    .img_tit {
      margin: 15px;
      color: #26a2ff;
      text-align: center;
      font-size: 17px;
    }
    .info {
      display: flex;
      justify-content: space-between;
      color: #aaa;
    }
    .img_content {
      margin-bottom: 10px;
      text-indent: 2em;
      clear: both;
    }
    // 这个是缩略图所在的容器的类和父元素, 可在 chrome的dev-tools 里查看
    .my-gallery {
      figure {
        width: 120px;
        display: flex;
        margin-bottom: 5px;
        justify-content: space-around;
        float: left;
      }
    }
  }
</style>