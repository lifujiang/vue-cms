<template>
  <div class="imgDetailPage">
    <h1 class="img_tit">标题处</h1>
    <div class="info">
      <span>发布时间: 2019-3-14 20:07:27</span>
      <span>点击: 0次</span>
    </div>
    <hr>
    <div class="img_content" v-html="content"></div>
    <newsComment :artid="id"></newsComment>    
  </div>
</template>

<script>
import newsComment from '../subcomponents/Comment.vue'
const content = 'sadlkfjsl;dkjfkljsadf;jsad;kjfs;djakfdshkablfkhdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsakljfhdshfjsdabhlfkhsdlkfhsadlkjfhaklsjdgflksaffdgflkjgsdlk'
export default {
  data () {
    return {
      content
    }
  },
  created() {
    
  },
  props: ['id'], // 这里的作用是解耦属性,
  components: {
    newsComment
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
    }
  }
</style>