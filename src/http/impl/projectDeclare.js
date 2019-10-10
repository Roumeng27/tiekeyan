// 项目申报
import { dataPost, dataGet, strGet, dataPut } from '../config/axios.js'
import {
    // 预申报
    addtopicUrl, // 新增主题
    companyTreeUrl, //公司树
    updatetopicUrl, // 修改主题
    releasetopicUrl, // 发布主题
    closetopicUrl, // 关闭主题
    logicDeletetopicUrl, // 删除主题
    getTopicInfotopicUrl, //根据主题id获取主题详情
    getTopicListPagetopicUrl, //主题列表
    getTopicDetailstopicUrl, //主题详情
    informationListUrl, // 申报信息列表
    addbasicinfoUrl, // 新增项目基本信息
    submitpreDeclareUrl, //申报信息完成
    searchbasicinfoUrl, // 查看项目基本信息详情
    editbasicinfoUrl, // 修改项目基本信息详情
    detailbasicinfoUrl, // 决策审批 审批详情
    approvebasicinfoUrl, // 决策审批 批量操作 审批通过
    notapprovebasicinfoUrl, // 决策审批 批量操作 审批不通过
    approvePreDeclareApprovalURL, //审批通过
    failPreDeclareApprovalURL, //审批不通过
    addPreDeclareApprovalURL, //审批排名
    hangupPreDeclareApprovalURL, //审批挂起
    submitPreDeclareApprovalUrl, //审批通过提交
    getreviewmettingUrl, // 评审会议列表
    insertReviewmeetingUrl, // 添加评审会议
    searchReviewmeetingUrl, // 查看评审会议详情
    editReviewmeetingUrl, // 修改评审会议详情
    departmentTreeUrl, //部门树
    personnelByDepartmentUrl, //人员树
    personnelByCompanyUrl, //机构人员

} from '../config/api.js'
// 预申报
// 模拟登录
// const test = ()=>{
//   return dataGet('/user/test')
// }
const addtopic = (params) => {
    return dataPost(addtopicUrl, params)
}
const companyTree = (params) => {
    return dataGet(companyTreeUrl, params)
}
const departmentTree = (params) => {
    return dataGet(departmentTreeUrl, params)
}
const personnelByCompany = (params) => {
    return dataGet(personnelByCompanyUrl, params)
}
const personnelByDepartment = (params) => {
    return dataGet(personnelByDepartmentUrl, params)
}
const updatetopic = (params) => {
    return dataPut(updatetopicUrl, params)
}
const releasetopic = (params) => {
    return dataPost(releasetopicUrl, params)
}
const closetopic = (params) => {
    return dataPost(closetopicUrl, params)
}
const logicDeletetopic = (params) => {
    return dataPost(logicDeletetopicUrl, params)
}
const getTopicInfotopic = (params) => {
    return dataGet(getTopicInfotopicUrl, params)
}
const getTopicListPagetopic = (params) => {
    return dataPost(getTopicListPagetopicUrl, params)
}
const getTopicDetailstopic = (params) => {
        return strGet(getTopicDetailstopicUrl, params)
    }
    //申报信息列表
const getInfolistopic = (params) => {
        return dataPost(informationListUrl, params)
    }
    // 新增项目基本信息
const addBasicinfotopic = (params) => {
        return dataPost(addbasicinfoUrl, params)
    }
    // 查看项目基本信息详情
const searchBasicinfotopic = (params) => {
        return strGet(searchbasicinfoUrl, params)
    }
    // 修改项目基本信息详情
const editBasicinfotopic = (params) => {
        return dataPost(editbasicinfoUrl, params)
    }
    // 决策审批 审批详情
const detailBasicinfotopic = (params) => {
        return strGet(detailbasicinfoUrl, params)
    }
    // 决策审批 批量操作 审批通过
const approvedBasicinfotopic = (params) => {
        return dataPost(approvebasicinfoUrl, params)
    }
    // 决策审批 批量操作 审批不通过
const notApprovedBasicinfotopic = (params) => {
    return dataPost(notapprovebasicinfoUrl, params)
}
const submitpreDeclare = (params) => {
    return dataPost(submitpreDeclareUrl, params)
}
const approvePreDeclareApproval = (params) => {
    return dataPost(approvePreDeclareApprovalURL, params)
}
const failPreDeclareApproval = (params) => {
    return dataPost(failPreDeclareApprovalURL, params)
}
const addPreDeclareApproval = (params) => {
    return dataPost(addPreDeclareApprovalURL, params)
}
const hangupPreDeclareApproval = (params) => {
    return dataPost(hangupPreDeclareApprovalURL, params)
}
const submitPreDeclareApproval = (params) => {
        return dataPost(submitPreDeclareApprovalUrl, params)
    }
    // 评审会议列表
const getreviewMettingInfo = (params) => {
    return dataPost(getreviewmettingUrl, params)
}

// 添加评审会议
const addReviewmeetingInfo = (params) => {
    return dataPost(insertReviewmeetingUrl, params)
}

// 查看评审会议列表详情
const searchReviewmeetingInfo = (params) => {
        return strGet(searchReviewmeetingUrl, params)
    }
    // 修改评审会议列表详情
const editReviewmeetingInfo = (params) => {
    return dataPost(editReviewmeetingUrl, params)
}

export {
    addtopic,
    companyTree,
    updatetopic,
    personnelByCompany,
    personnelByDepartment,
    departmentTree,
    releasetopic,
    closetopic,
    logicDeletetopic,
    test,
    getTopicInfotopic,
    getTopicListPagetopic,
    getTopicDetailstopic,
    getInfolistopic,
    addBasicinfotopic,
    searchBasicinfotopic,
    editBasicinfotopic,
    detailBasicinfotopic,
    approvedBasicinfotopic,
    notApprovedBasicinfotopic,
    submitBasicinfotopic,
    submitpreDeclare,
    approvePreDeclareApproval,
    failPreDeclareApproval,
    addPreDeclareApproval,
    hangupPreDeclareApproval,
    submitPreDeclareApproval,
    getreviewMettingInfo,
    addReviewmeetingInfo,
    searchReviewmeetingInfo,
    editReviewmeetingInfo
}