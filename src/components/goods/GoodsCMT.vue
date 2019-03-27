<template>
  <div class="goodsCMTPage">
    <comment :artid="id"></comment>
  </div>
</template>

<script>
import comment from '../subcomponents/Comment.vue'
export default {
  props: ['id'],
  data () {
    return {
      
    }
  },
  methods: {

  },
  components: {
    comment
  }
}
</script>

<style lang="scss" scope>
  .goodsCMTPage {
    padding: 10px 5px;
  }
</style>
