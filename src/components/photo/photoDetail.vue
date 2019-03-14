<template>
  <div class="imgDetailPage">
    <h1 class="img_tit">标题处</h1>
    <div class="info">
      <span class="img_date">发布时间: 2019-3-14 20:07:27</span>
      <span class="img_click">点击: 0次</span>
    </div>
    <div class="img_content">
      图片内容区
    </div>
    <newsComment :artid="id"></newsComment>    
  </div>
</template>

<script>
import newsComment from '../subcomponents/Comment.vue'
export default {
  data () {
    return {

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
  
</style>