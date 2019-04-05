<template>
    <div class="cartPage">
        <div v-for="item of goodsList" :key="item.id">
            <van-card
            tag="标签"
            price="2.00"
            desc="描述信息"  
            title="商品标题"
            :thumb="item.src"
            origin-price="10.00"
            >
            
            <!-- 垃圾组件库导致自定义类权重不够高, 需使用id选择器, 以后换组件库时需要修改 -->
            <div id="stepper" slot="footer">
                <van-stepper
                v-model="item.count"
                :max="item.stock_quantity"
                integer
                @plus="plus(item.count)"
                @minus="minus(item.count)"
                @change="change"
                />
                <van-button @click="del(item)" class="del" size="normal">删除</van-button>
            </div>
            </van-card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    computed: {
        goodsList () {
          return this.$store.state.goods
        }
    },
    methods: {
      plus (count) {
        this.$store.commit('addGoodsCount', { count })
      },
      minus (count) {
        this.$store.commit('minusGoodsCount', { count })
      },
      change (count) {
        this.$store.commit('changeGoodsCount')
      },
      del (item) {
        this.$store.commit('removeGoods', item)
      }
    }
}
</script>

<style lang="less" >
  .cartPage {
    position: relative;
    width: 100%;
    .van-card {
      .van-card__header {
        height: 130px;
        .van-card__thumb {
          height: 100%;
        }
        .van-card__content {
          height: 100%;
          .van-card__title {
            font-size: 15px;
            margin: 5px;
          }
          .van-card__desc {
            font-size: 14px;
            margin: 5px;
          }
          .van-card__bottom {
            font-size: 14px;
            margin: 0 5px;
          }
        }
      }
    }
    /* 垃圾组件库导致自定义类权重不够高, 需使用id选择器, 以后换组件库时需要修改 */
    #stepper {
      position: absolute;
      right: 0;
      bottom: 10px;
      span { line-height: 30px; }
      .van-stepper {
        // 增步器输入框, 此时被 mui 框架样式污染只能自定义样式
        // 在使用 vant 框架代替其他框架后记得修改!!!!!!!!!!!!!!!!
        display: inline-block;
        .van-stepper__input {
          width: 45px;
          height: 35px;
          padding: 0;
          margin: 0;
          border-radius: 0;
          border-left: 0;
          border-right: 0;
          font-size: 18px;
        }
        // 增步器按钮, 同上
        .van-stepper__minus, .van-stepper__plus {
          border: 1px solid rgba(0,0,0,.2);
          margin: 0;
          padding: 0;
          width: 32px;
          height: 37px;
        }
      }
      .del {
        height: 37px;
        line-height: 37px;
      }
    }
  }
</style>
