<template>
    <div class="cartPage">
        <div v-for="item of goodsList" :key="item.id">
            <van-card
            :price="item.sale_price"
            :title="item.title"
            :thumb="item.src"
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
      // 以下事件均通过 vuex 的 commit 方法设置 state
      // '+' 按钮
      plus (count) {
        this.$store.commit('addGoodsCount', { count })
      },
      // '-' 按钮
      minus (count) {
        this.$store.commit('minusGoodsCount', { count })
      },
      // 手动输入数值
      change (count) {
        this.$store.commit('changeGoodsCount')
      },
      // 删除按钮
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
    // 自定义商品卡片
    .van-card {
      margin: 5px;
      box-shadow: 2px 2px 4px #ccc;
      // 商品卡片内容, 该元素需手动调整高度
      .van-card__header {
        height: 130px;
        // 商品卡片图片
        .van-card__thumb {
          height: 100%;
        }
        // 商品卡片内容
        .van-card__content {
          height: 100%;
          // 内容标题
          .van-card__title {
            font-size: 16px;
            margin: 0 10px;
            padding: 20px 0;
            margin-bottom: 37px;
          }
          // 内容按钮
          .van-card__bottom {
            font-size: 15px;
            margin: 0 10px;
          }
        }
      }
    }
    /* 垃圾组件库导致自定义类权重不够高, 需使用id选择器, 以后换组件库时需要修改 */
    #stepper {
      position: absolute;
      right: 5px;
      bottom: 30px;
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
