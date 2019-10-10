// 项目申报
import {dataPost,dataGet,strGet,dataPut} from '../config/axios.js'
import {
  accountPersonnelcheckUserUrl,//登录
  accountPersonnelgetCaptchaUtilsUrl,
  accountPersonnellogoutUrl,
  accountPersonnelhasLoginUrl
} from '../config/api.js'
const accountPersonnelcheckUser = (params)=>{
  return dataGet(accountPersonnelcheckUserUrl,params)
}
const accountPersonnelgetCaptchaUtils = (params)=>{
  return dataGet(accountPersonnelgetCaptchaUtilsUrl,params)
}
const accountPersonnellogout = (params)=>{
  return dataGet(accountPersonnellogoutUrl,params)
}
const accountPersonnelhasLogin = (params)=>{
  return dataGet(accountPersonnelhasLoginUrl,params)
}
export {
  accountPersonnelcheckUser,
  accountPersonnelgetCaptchaUtils,
  accountPersonnellogout,
  accountPersonnelhasLogin
}