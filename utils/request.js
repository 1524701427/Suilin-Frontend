const DEFAULT_BASE_URL = 'http://127.0.0.1:8080/api'

function getBaseUrl() {
  return uni.getStorageSync('suilin_api_base_url') || DEFAULT_BASE_URL
}

function getToken() {
  return uni.getStorageSync('suilin_token') || ''
}

export function setApiBaseUrl(url) {
  if (url) uni.setStorageSync('suilin_api_base_url', url.replace(/\/$/, ''))
}

export function request(options) {
  return new Promise((resolve, reject) => {
    const token = getToken()
    const header = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.header || {})
    }

    uni.request({
      url: /^https?:\/\//.test(options.url) ? options.url : getBaseUrl() + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header,
      success: (res) => {
        if (res.statusCode === 401) {
          uni.removeStorageSync('suilin_token')
          uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
          reject(new Error('UNAUTHORIZED'))
          return
        }
        if (res.statusCode < 200 || res.statusCode >= 300) {
          const message = res.data?.message || `请求失败(${res.statusCode})`
          uni.showToast({ title: message, icon: 'none' })
          reject(new Error(message))
          return
        }
        const body = res.data
        if (body && typeof body.code !== 'undefined') {
          if (body.code !== 0) {
            const message = body.message || '请求失败'
            uni.showToast({ title: message, icon: 'none' })
            reject(new Error(message))
            return
          }
          resolve(body.data)
          return
        }
        resolve(body)
      },
      fail: (err) => {
        uni.showToast({ title: '无法连接服务器', icon: 'none' })
        reject(err)
      }
    })
  })
}
