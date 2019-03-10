// 引入 mockjs
import Mock from 'mockjs'

// 定义随机函数
const Random = Mock.Random

// 拓展随机数据

Random.extend({
  // 随机名字的图片封装
  img (size, name, color = this.color()) {
    name = name + this.increment()
    return this.image(size, color, name)
  }
  // 新闻列表标题
  // newstitle ()
})

// 轮播图假数据
Mock.mock('/api/lunbo', {
  'status': 0,
  'list|3-6': [{
    'id|+1': 1,
    'img': '@img(900x500, lunbo)'
  }]
})

// 新闻列表假数据
Mock.mock('/api/newslist', {
  'status': 0,
  'message|25': [{
    'id|+1': 1,
    'title': '@ctitle(2,4)',
    'img': '@img(200x150, newstitle)'
  }]
})
