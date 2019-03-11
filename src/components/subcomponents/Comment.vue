<template>
  <div class="cmt">
    <h1 class="cmt_tit">发表评论</h1>
    <hr>
    <input type="text" class="cmt_user_name" v-model="cmt_name" placeholder="请输入用户名(最多12个字)" maxlength="12">
    <textarea class="cmt_content" maxlength="120" placeholder="请输入评论的内容(最多120个字)" v-model="cmt_content"></textarea>
    <mt-button type="primary" @click="postComment" size="large">发表评论</mt-button>
    <div class="cmt-container">
      <div class="cmt-box" v-for="(item, i) of commentList" :key="(item.i)">
        <div class="cmt-header">第{{ i+1 }}楼&nbsp;&nbsp;用户: {{ item.user_name }}&nbsp;&nbsp;发表时间: {{ item.add_time }}</div>
        <div class="cmt-cotent">{{ item.content }}</div>
      </div>
    </div>
    <mt-button id="loading" @click="getMoreCMT" type="danger" plain size="large" v-text="cmtloading"></mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import moment from 'moment'
export default {
  props: ['artid'],
  data () {
    return {
      commentList: [],
      id: this.artid,
      pageIndex: 1,
      cmtloading: '加载评论',
      cmt_content: '',
      cmt_name: ''
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    // 获取评论
    getComment () {
      this.$http.get('getComment', { params: { artid: this.id,  pageIndex: this.pageIndex} }).then((res) => {
        if (res.body.status === 0) {
          this.commentList = this.commentList.concat(res.body.list)
          if (res.body.list.length === 0) {
            Toast('到底了o(╯□╰)o')
            this.cmtloading = '评论已加载完毕'
            document.querySelector('#loading').setAttribute('disabled', 'disabled')
          }  
        } else {
          Toast('获取评论失败')
        }
      })
    },
    // 加载更多评论
    getMoreCMT () {
      this.pageIndex++
      this.getComment()
    },
    postComment () {
      if (this.cmt_content === '' || this.cmt_name === '') {
          Toast('评论或用户名不能为空')
          return 
      }
      this.$http.post('postComment', {
         cmt_name: this.cmt_name,
         cmt_content: this.cmt_content,
         artid: this.id
      }).then((res) => {
        if (res.body.status === 0) {
          this.commentList.unshift({
            add_time: moment().format('YYYY-M-D HH:mm:ss'),
            user_name: this.cmt_name,
            content: this.cmt_content
          })
          this.cmt_name = this.cmt_content = ''
        } else {
          Toast('发表评论失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
  .cmt {
    font-size: 13px;
    .cmt_tit {
      font-size: 18px;
    }
    .cmt_user_name {
      font-size: 14px;
      height: 36px;
    }
    .cmt_content {
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
