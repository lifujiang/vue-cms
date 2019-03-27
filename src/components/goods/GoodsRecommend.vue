<template>
  <div class="goodsRCMDPage">
    <header>{{ RCMDList.title }}</header>
    <main v-html="RCMDList.content"></main>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      RCMDList: []
    }
  },
  created () {
    this.getGoodsRCMD()
  },
  methods: {
    getGoodsRCMD () {
      this.$http.get('getGoodsRCMD', { params: { id: this.id } }).then(res => {
        if (res.body.status === 0) {
          this.RCMDList = res.body.list
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
  .goodsRCMDPage {
    font-size: 18px;
    padding: 15px;
    header {
      text-align: center;
      font-size: 23px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    main {
      p {
        &:nth-of-type(1) {
          text-indent: 2em;
          padding: 15px 0;
        }
      }
      img {
        width: 100%;
      }
    }
  }
</style>
