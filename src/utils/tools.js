
/**
 * @param obj
 * 判断数据是否为空
 */
export function isNullOrEmpty (obj) {
  return (!obj || obj === 'null' || obj === 'undefined') && obj !== 0 && obj !== '0'
}

export function getURLParam (name) {
  let search = window.location.search
  if (search.indexOf('?') == 1) { return null }
  search = search.substr(1)
  search = search.split('&')
  let nameReset = name || ''
  let resule = null

  // 获取全部参数及其值
  search = search.map((item) => {
    let info = item.split('=')
    let obj = {}
    obj[info[0]] = decodeURI(info[1])
    return obj
  })

  // 如果传入一个参数名称，就匹配其值
  if (nameReset) {
    for (let i = 0; i < search.length; i++) {
      for (const key in search[i]) {
        if (key == nameReset) {
          resule = search[i][key]
        }
      }
    }
  } else {
    resule = search
  }
  // 返回结果
  return resule
}
