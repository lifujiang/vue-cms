<template>
  <div class="goodsListPage">
    <div class="goodsbox" v-for="item in goodsList" :key="item.id">
      <img :src="item.src" alt="">
      <h1 class="goodstitle">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="new">&yen; {{ item.sale_price }}</span>
          <span class="old">&yen; {{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <mt-button id="gdsloading" @click="getMoreGds" type="danger" plain size="large" v-text="gdsloading"></mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      pageIndex: 1,
      goodsList: [],
      gdsloading: '加载商品'
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.$http.get('getGoodsList', { params: { pageIndex: this.pageIndex } }).then(res => {
        if (res.body.status === 0) {
          this.goodsList = this.goodsList.concat(res.body.list)
          if (res.body.list.length === 0) {
            Toast('到底了o(╯□╰)o')
            this.gdsloading = '商品已加载完毕'
            document.querySelector('#gdsloading').setAttribute('disabled', 'disabled')
          }
        } else {
          Toast('加载商品列表失败')
        }
      })
    },
    getMoreGds () {
      this.pageIndex++
      this.getGoodsList()

    }
  }
}
</script>

<style lang="scss" scope>
  .goodsListPage {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    padding-top: 0;
    font-size: 15px;
    .goodsbox {
      width: 172px;
      box-shadow: 0 0 9px #aaa;
      margin-top: 10px;
      img {
        display: block;
        height: 210px;
      }
      .goodstitle {
        font-weight: bold;
        padding: 5px;
        padding-right: 10px;
        padding-left: 2px;
      }
      .info {
        background: #eee;
        .price {
          padding-top: 10px;
          .new {
            font-size: 18px;
            color: red;
            margin-right: 15px;
            margin-left: 10px;
          }
          .old {
            font-size: 12px;
            text-decoration: line-through;
          }
        }
        .sell {
          display: flex;
          justify-content: space-between;
          padding: 10px 5px; 
          font-size: 14px;
        }
      }
    }
  }
</style>
