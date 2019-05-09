import { request } from './request'

export default {
  // 处理错误信息
  error (err) {
    console.log('API 请求失败, 错误信息: ')
    console.log(err)
  },
  // 轮播图
  lunbo () {
    return request({
      url: 'lunbo'
    })
  },
  // 新闻详情
  newsDetail (params) {
    return request({
      url: 'getNewsDetail',
      params
    })
  },
  // 新闻列表
  newsList () {
    return request({
      url: 'getNewsList'
    })
  },
  // 获取评论
  comment (params) {
    return request({
      url: 'getComment',
      params
    })
  },
  // 提交评论
  postComment (params) {
    return request({
      method: 'Post',
      url: 'postComment',
      params
    })
  },
  // 获取图片信息(除缩略图)
  imgDetail (params) {
    return request({
      url: 'getImgDetail',
      params
    })
  },
  // 获取缩略图
  imgPreview (params) {
    return request({
      url: 'getImgPreview',
      params
    })
  },
  // 获取图片类型列表
  imgCate () {
    return request({
      url: 'getImgCate'
    })
  },
  // 获取图片内容类别
  ImgList (params) {
    return request({
      url: 'getImgList',
      params
    })
  },
  // 获取商品轮播图
  goodsSwiper (params) {
    return request({
      url: 'getGoodsSwiper',
      params
    })
  },
  // 获取商品信息
  goodsDetail (params) {
    return request({
      url: 'getGoodsDetail',
      params
    })
  },
  // 获取商品列表
  goodsList (params) {
    return request({
      url: 'getGoodsList',
      params
    })
  },
  // 获取商品介绍
  goodsRCMD (params) {
    return request({
      url: 'getGoodsRCMD',
      params
    })
  }
}
