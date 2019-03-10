<template>
  <div class="cmt">
    <h1>发表评论</h1>
    <hr>
    <textarea maxlength="120" placeholder="请输入评论的内容(最多120个字)"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-container">
      <div class="cmt-box" v-for="(item, i) of commentList" :key="item.id">
        <div class="cmt-header">第{{ i+1 }}楼&nbsp;&nbsp;用户: {{ item.user_name }}&nbsp;&nbsp;发表时间: {{ item.add_time }}</div>
        <div class="cmt-cotent">{{ item.content }}</div>
      </div>
    </div>
    <mt-button id="loading" @click="getMoreCMT" type="danger" plain size="large" v-text="cmtloading"></mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  props: ['artid'],
  data () {
    return {
      commentList: [],
      id: this.artid,
      pageIndex: 1,
      cmtloading: '加载评论'
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    getComment () {
      this.$http.get('getComment', { params: { artid: this.id,  pageIndex: this.pageIndex} }).then((res) => {
        if (res.body.status === 0) {
          this.commentList = this.commentList.concat(res.body.list)
          if (res.body.list.length === 0) {
            Toast('到底了o(╯□╰)o')
            this.cmtloading = '已加载完毕'
            document.querySelector('#loading').setAttribute('disabled', 'disabled')
          }  
        } else {
          Toast('获取评论失败')
        }
      })
    },
    getMoreCMT () {
      this.pageIndex++
      this.getComment()
    }
  }
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
      padding: 5px 0;
      .cmt-box {
        .cmt-header {
          background: #e5e5e5;
          line-height: 30px;
        }
        .cmt-cotent {
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }

  }
</style>
