<template>
    <div class="cartPage">
      <!-- 复选框组的 checked 状态保存在 result 数组里 -->
      <van-checkbox-group v-model="result" class="cards">
        <van-checkbox v-for="item of goodsList" :name="item.id" :key="item.id">
          <!-- 这里的商品卡片是包含在复选框内的, 所以需要阻止默认冒泡 -->
          <van-card
          @click="stopMaoPao"
          :price="item.sale_price"
          :title="item.title"
          :thumb="item.src"
          >
          <!-- 垃圾组件库导致自定义类权重不够高, 需使用id选择器, 以后换组件库时需要修改 -->
          <div class="stepper" slot="footer">
              <van-stepper
              v-model="item.count"
              min=1
              :max="item.stock_quantity"
              integer
              @change="change(item)"
              />
              <van-button @click="del(item)" class="del" size="normal">删除</van-button>
          </div>
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
          result: []
        }
    },
    computed: {
        goodsList () {
          return this.$store.state.goods
        }
    },
    methods: {
      // 以下事件均通过 vuex 的 commit 方法设置 state
      // 改变数值的 mutation
      change (obj) {
        this.$store.commit('changeGoodsCount', obj)
      },
      // 删除按钮
      del (item) {
        this.$store.commit('removeGoods', item)
      },
      // 阻止卡片冒泡
      stopMaoPao(e) {
        e.stopPropagation()
      }
    }
}
</script>

<style lang="less" >
  .cartPage {
    position: relative;
    width: 100%;
    // --------------复选框组
    .cards {
      // 宽度设为小于100%并偏移, 使其形成"卡片"
      transform: translateX(2%);
      width: 96%;
      // --------------复选框
      .van-checkbox {
        // 每一张商品卡片被包含在一个复选框内, 所以需要设置复选框为卡片的样子
        margin: 20px 0;
        box-shadow: 2px 2px 5px #ccc;
        background-color:#fafafa;
        display: block;
        // 设置复选框图标偏移
        .van-checkbox__icon {
          transform: translateX(10px);
        }
        // -----------商品卡片
        .van-card {
          // 默认卡片左右内边距太大
          padding: 5px 10px;
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
                font-size: 14px;
                padding: 10px;
                margin-bottom: 10px;
              }
              // 价格
              .van-card__bottom {
                font-size: 13px;
                padding: 0 10px;
              }
            }
          }
        }
        .stepper {
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
    }
  }
</style>
