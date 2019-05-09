import axios from 'axios'
import QS from 'qs'

// 全局设置
axios.defaults.baseURL = 'http://localhost:3030/'

// 对外接口
export function request ({ method = 'Get', url, params }) {
  if (method === 'Get') {
    return get(url, params)
  } else if (method === 'Post') {
    return post(url, params)
  }
}

// 封装 get 方法
function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 封装 post 方法
function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      // 处理其他的请求状态(暂时使用 reject 处理)
      return Promise.reject(response)
    }
  },
  error => {
    // 请求失败
    return Promise.reject(error.response)
  }
)
