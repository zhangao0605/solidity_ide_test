import { ruleOfLowerCase, ruleOfUpperCase, ruleOfAlphabets, ruleOfURL, ruleOfPhoneNumber, ruleOfEmail, regOfSpecial } from './rules'
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  return ruleOfLowerCase.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  return ruleOfUpperCase.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  return ruleOfAlphabets.test(str)
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  return ruleOfURL.test(url)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  return ruleOfEmail.test(email)
}

/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
export function validPhoneNumber(phone) {
  return ruleOfPhoneNumber.test(phone)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 校验用户设置密码
 * 密码长度为8-15，必须包含数字、字母、特殊符号其中的两种
 * @param password
 * @returns {boolean}
 */
export function validPassword(password) {
  if (!password || !isString(password) || password.length < 8 || password.length > 15) {
    return false
  }
  let typeNumber = 0
  if (/\d+/.test(password)) {
    typeNumber++
  }
  if (/[A-Za-z]+/.test(password)) {
    typeNumber++
  }
  if (regOfSpecial.test(password)) {
    typeNumber++
  }
  return typeNumber >= 2
}