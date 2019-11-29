import moment from 'moment'
// import CryptoJS from "crypto-js"
import BigNumber from "bignumber.js"
import Iban from 'web3-eth-iban'
export default {
    install(Vue, opt) {
      Vue.prototype.tableHeaderColor = function ({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background-color:#ffffff ;color: #333;font-weight: 600;font-size: 15px;height:58px;'
        }
      }
      Vue.prototype.timestampToTime = function (timestamp) {
        let time = ''
        if (timestamp == '' || timestamp == null || timestamp == undefined) {
          time = ''
        } else {
          time = moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
        }
        return time
      }
      Vue.prototype.timestampToTime_1 = function (timestamp) {
        let time = ''
        if (timestamp == '' || timestamp == null || timestamp == undefined) {
          time = ''
        } else {
          time = moment(timestamp * 1000).format('YYYY-MM-DD')
        }
        return time
      }
    //   Vue.prototype.passwordEncryption = function (e) {
    //     let cipherText = CryptoJS.HmacSHA1(e, '87krsC!IPF@OBRPEOh#Uat9C').toString(CryptoJS.enc.Hex);
    //     return cipherText;
  
    //   }
      Vue.prototype.scientificCounting = function (e) {
        let num = 0
        if (e == 0 || e == '' || e == null || e == undefined || e == NaN) {
          num = 0
        } else {
          num = new BigNumber(`${e}`).div("1e+18").toString(10);
          // if(num.indexOf('.') !== -1 && num.split('.')[1].length > 6){
          //   num = parseFloat(num).toFixed(6)
          // }
        }
        return num
      }
      Vue.prototype.to_32_decimal = function (e) {
        let ban = Iban.toIban(e);
        return ban
      }
      Vue.prototype.to_16_decimal = function (e) {
        let ban = Iban.toAddress(e);
        return ban
      }
  
    }
  
  }