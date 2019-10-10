// 正式申报
import { dataPost, dataGet, strGet, dataPut } from '../config/axios.js'
import {
  workTaskQueryMyWorkTasksURL,
  workTaskUpdateURL
} from '../config/api.js'




const workTaskQueryMyWorkTasks = (params) => {
  return dataGet(workTaskQueryMyWorkTasksURL, params)
}

const workTaskUpdate = (params) => {
  return dataPost(workTaskUpdateURL, params)
}
export {
  workTaskQueryMyWorkTasks,
  workTaskUpdate
}