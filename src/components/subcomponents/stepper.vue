<template>
  <div class="stepper">
    <span>购买数量 :&nbsp;</span>
    <van-stepper 
    v-model="value"
    :max="goodsDetailList.stock_quantity"
    integer
    />
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  
</style>
