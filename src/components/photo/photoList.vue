<template>
<div class="photoListPage">
  <div slot="content" class="scroll-wrapper">
    <cube-scroll
      ref="scroll"
      :data="cate_items"
      direction="horizontal"
      class="horizontal-scroll-nav-wrap">
      <ul class="nav-wrapper">
        <li v-for="item in cate_items" @click="highLight(item.cateid)" :class="['nav-item', item.cateid === navIndex ? 'nav-item-active' : '']" :key="item.cateid">{{ item.title }}</li>
      </ul>
    </cube-scroll>
  </div>
  <ul class="img_list">
  <li v-for="item in img_items" :key="item.id" @click="routerHandler(item.id)">
    <img v-lazy="item.img">
    <div class="zhaiyao">
      <div class="zhaiyao_title">{{ item.title }}</div>
      <div class="zhaiyao_content">{{ item.zhaiyao }}</div>
    </div>
  </li>
</ul>
</div>

</template>

<script>
export default {
  data() {
    return {
      cate_items: [],
      img_items: [],
      navIndex: 0
    }
  },
  created () {
    this.getImgCate ()
  },
  mounted () { // 将获取列表放入挂载后, 以保证能立即获取数据
    this.getImgList()
  },
  methods: {
    // 通过路由的方式使得当前导航高亮
    highLight (index) {
      this.navIndex = index
      this.getImgList()
    },
    // 获取图片类型列表数据
    getImgCate () {
      this.$api.imgCate()
      .then(res => {
        if (res.data.status === 0) {
          this.cate_items = res.data.list
          this.cate_items.unshift({cateid: 0, title: '全部'})
        } else {
          Toast('获取图片类型失败')
        }
      })
      .catch(err => {
        this.$api.error(err)
      })
    },
    // 获取图片内容类别数据
    getImgList () {
      this.$api.imgList({
        cateid: this.navIndex
      })
      .then(res => {
        if (res.data.status === 0) {
          this.img_items = res.data.list
        } else {
          Toast('获取图片失败')
        }
      })
      .catch(err => {
        this.$api.error(err)
      })
    },
    routerHandler (id) {
      this.$router.push({ path: `/photodetail/${id}`})
    }
  }
}
</script>

<style lang="scss" scope>
.photoListPage {
  .scroll-wrapper {
  .horizontal-scroll-nav-wrap {
      .cube-scroll-content {
        display: inline-block;
      }
      .nav-wrapper {
        margin: 5px;
        display: inline-block;
        white-space: nowrap;
        line-height: 35px;
        padding: 0 5px;
      }
      .nav-item-active {
        color: red;
      }
      .nav-item {
        display: inline-block;
        padding: 0 20px;
      }
    }
  }
  .img_list {
    padding: 10px;
    padding-bottom: 0;
    li {
      box-shadow: 0 0 8px #888;
      margin-bottom: 10px;
      text-align: center;
      background-color: #ccc;
      position: relative;
      img {
        width: 100%;
        display: block;
      }
      img[lazy=loading] {
        width: 40px;
        height: 200px;
        margin: auto;
      }
      .zhaiyao {
        width: 100%;
        max-height: 85px;
        color: #fff;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: left;
        .zhaiyao_title {
          font-size: 15px;
        }
        .zhaiyao_content {
          font-size: 14px;
        }
      }
    }
    .img_zhaiyao {

    }
  }
}
</style>
