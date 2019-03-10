<template>
  <div class="cmt">
    <h1>发表评论</h1>
    <hr>
    <textarea maxlength="120" placeholder="请输入评论的内容(最多120个字)"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-container">
      <div class="cmt-box">
        <div class="cmt-header">第1楼&nbsp;&nbsp;用户: 匿名用户&nbsp;&nbsp;发表时间: 2012-12-12 12:12:12</div>
        <div class="cmt-cotent">阿斯利康到家了萨卡积分</div>
      </div>
      <div class="cmt-box">
        <div class="cmt-header">第1楼&nbsp;&nbsp;用户: 匿名用户&nbsp;&nbsp;发表时间: 2012-12-12 12:12:12</div>
        <div class="cmt-cotent">阿斯利康到家了萨卡积分</div>
      </div>
      <div class="cmt-box">
        <div class="cmt-header">第1楼&nbsp;&nbsp;用户: 匿名用户&nbsp;&nbsp;发表时间: 2012-12-12 12:12:12</div>
        <div class="cmt-cotent">阿斯利康到家了萨卡积分</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scope>
  .cmt {
    font-size: 13px;
    h1 {
      font-size: 18px;
    }
    textarea {
      font-size: 14px;
      height: 90px;
      margin-bottom: 0;
    }
    .cmt-container {
      .cmt-box {
        .cmt-header {
          background: #e5e5e5;
          line-height: 30px;
        }
        .cmt-cotent {
          line-height: 35px;
        }
      }
    }

  }
</style>
