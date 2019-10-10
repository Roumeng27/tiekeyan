// 正式申报
import { dataPost, dataGet, strGet, dataPut, dataDelete } from '../config/axios.js'
import {
    formalDeclarationUrl, // 新增正式申报主题
    officialDeclarationcloseURl, //关闭主题
    declarePersonSelectUrl, // 项目成员—-展示详情
    declarePersonUpdateUrl, // 项目成员—-更新操作
    declarePersonInsertUrl, // 项目成员—-展示详情
    declarationListUrl, //申报信息列表
    personnelDetailUrl, // 项目成员--弹框查询详情
    declareTaskListUrl, // 课题分解 展示列表
    declareTaskInsertUrl, // 课题分解 —课题新增
    declareTaskDeleteUrl, // 课题分解 —-课题列表中删除某个课题
    declareTaskSaveUrl, // // 课题分解 —课题新增批量

    declareAddDeclareURL, //正式申报基本信息添加
    declareeSlectInformationByIdURL, //查看正式申报基本信息
    declareeUpdateByIdURL, //修改正式申报基本信息
    personnelSelectlistURl, //选择人员列表接口
    companySelectlistURl, //全局部门查询
    declareAddUnitInformationURL, //正式申报单位信息添加
    declareUpdateUnitInformationURL, //申报单位--正式申报单位信息更新
    declareSelectUnitInformationURL, //申报单位--正式申报单位信息查看
    declareSubmitUrl, //正式申报--申报发布
    declareApproveSubmitUrl, //正式申报--审批后提交
    declareRankUpdateURL, //更新排名
    declareRankSelectURL, //排名回显
    institutionalSectorlistDepartmentsURL, // 依照 code集合 查询部门列表
    institutionalSectorlistCompanysURL, // 依照 code集合 查询单位列表
    personnellistPersonnelBoURL, //依照 codes 查询人员信息
    workTaskUpdateURL, // 修改工作任务信息
    workTaskQueryWorkTasksURL, // 查询工作任务列表
    workDeleteURL, // 级联删除工作信息
    workCreateURL, //  创建工作信息接口
    workTaskDeleteURL, // 级联删除工作任务信息
    workTaskGetWorkTaskInfoURL, // 获取工作任务详情
    workTaskCreateURL, // 创建工作任务接口
    permissionQueryPermissonURL, // 查询登陆账号的工作任务权限接口
    queryWorkInfoURL, // 查询工作信息
    queryAdminPermissonUrl, // 查询登陆账号是否有admin权限接口
    chapterCommentFindChapterCommentByChapterIdURL, // 查看章节评论
    pageofficeSelectTemplateChapterListURL, //章节列表
    getChapterJsonUrl, // 章节管理-查询列表
    chapterCommentInsertCommentURL, // 发表评论
    declareApprovalApproveURL, //正式申报通过
    declareApprovalFailURL, //正式申报不通过
    PreDeclareApprovalHangupURL, //正式申报不通过
    pageofficeGetChapterJsonURL, // 章节管理-查询列表
    pageofficeLockChapterURL, //上锁
    pageofficeUnlockChapterURL, //解锁
    declareApprovalBatchApproveURL, //批量通过
    declareApprovalBatchFailURL, //批量不通过
    declareDetailListURl, //审批详情
    declareRankInsertURL, //排名
    selectListFromDeclareURL, // 任务负责人的人员选择
    templateListDataUrl, //文档模板列表
    permissionQueryDocPermissonURL,
    pageofficeChapterDetialURL,
    topicSelectTopicListPageURL,
    declareAddDeclareAttachmentURL,
    declareSelectListDeclareAttachmentURL

} from '../config/api.js'

const addformalDeclarationInfo = (params) => {
    return dataPost(formalDeclarationUrl, params)
}
const officialDeclarationclose = (params) => {
    return dataPost(officialDeclarationcloseURl, params)
}
const declarePersonSelect = (params) => {
    return strGet(declarePersonSelectUrl, params)
}
const declarePersonUpdate = (params) => {
    return dataPost(declarePersonUpdateUrl, params)
}
const declarePersonInsert = (params) => {
    return dataPost(declarePersonInsertUrl, params)
}
const personnelDetail = (params) => {
    return dataPost(personnelDetailUrl, params)
}
const declareTaskList = (params) => {
    return strGet(declareTaskListUrl, params)
}
const declareTaskInsert = (params) => {
    return dataPost(declareTaskInsertUrl, params)
}
const declareTaskDelete = (params) => {
    return strGet(declareTaskDeleteUrl, params)
}
const declareTaskSave = (params) => {
    return dataPost(declareTaskSaveUrl, params)
}

//申报信息列表
const getDeclarlistopic = (params) => {
    return dataPost(declarationListUrl, params)
}


const pageofficeGetChapterJson = (params) => {
    return dataPost(pageofficeGetChapterJsonURL, params)
}
const pageofficeLockChapter = (params) => {
    return dataPost(pageofficeLockChapterURL, params)
}
const pageofficeUnlockChapter = (params) => {
    return dataPost(pageofficeUnlockChapterURL, params)
}
const declareApprovalBatchApprove = (params) => {
    return dataPost(declareApprovalBatchApproveURL, params)
}
const declareApprovalBatchFail = (params) => {
    return dataPost(declareApprovalBatchFailURL, params)
}
const declareDetailList = (params) => {
    return strGet(declareDetailListURl, params)
}

const declareAddDeclare = (params) => {
    return dataPost(declareAddDeclareURL, params)
}
const declareeSlectInformationById = (params) => {
    return dataPost(declareeSlectInformationByIdURL, params)
}
const declareeUpdateById = (params) => {
    return dataPost(declareeUpdateByIdURL, params)
}
const personnelSelectlist = (params) => {
    return dataPost(personnelSelectlistURl, params)
}
const companySelectlist = (params) => {
    return dataPost(companySelectlistURl, params)
}

const declareAddUnitInformation = (params) => {
    return dataPost(declareAddUnitInformationURL, params)
}
const declareUpdateUnitInformation = (params) => {
    return dataPost(declareUpdateUnitInformationURL, params)
}
const declareSelectUnitInformation = (params) => {
    return dataPost(declareSelectUnitInformationURL, params)
}
const declareSubmit = (params) => {
    return dataPost(declareSubmitUrl, params)
}
const declareApproveSubmit = (params) => {
    return dataPost(declareApproveSubmitUrl, params)
}
const declareRankInsert = (params) => {
    return dataPost(declareRankInsertURL, params)
}
const declareRankUpdate = (params) => {
    return dataPost(declareRankUpdateURL, params)
}
const declareRankSelect = (params) => {
    return dataPost(declareRankSelectURL, params)
}
const institutionalSectorlistDepartments = (params) => {
    return dataPost(institutionalSectorlistDepartmentsURL, params)
}
const institutionalSectorlistCompanys = (params) => {
    return dataPost(institutionalSectorlistCompanysURL, params)
}
const personnellistPersonnelBo = (params) => {
    return dataPost(personnellistPersonnelBoURL, params)
}

const chapterCommentFindChapterCommentByChapterId = (params) => {
    return dataGet(chapterCommentFindChapterCommentByChapterIdURL, params)
}
const chapterCommentInsertComment = (params) => {
    return dataPost(chapterCommentInsertCommentURL, params)
}


const workTaskUpdate = (params) => {
    return dataPost(workTaskUpdateURL, params)
}
const workTaskQueryWorkTasks = (params) => {
    return dataGet(workTaskQueryWorkTasksURL, params)
}
const workDelete = (params) => {
    return dataPost(workDeleteURL, params)
}
const pageofficeSelectTemplateChapterList = (params) => {
    return dataPost(pageofficeSelectTemplateChapterListURL, params)
}
const getChapterJson = (params) => {
    return dataPost(getChapterJsonUrl, params)
}

const workCreate = (params) => {
    return dataPost(workCreateURL, params)
}
const workTaskDelete = (params) => {
    return dataGet(workTaskDeleteURL, params)
}
const workTaskGetWorkTaskInfo = (params) => {
    return dataGet(workTaskGetWorkTaskInfoURL, params)
}
const workTaskCreate = (params) => {
    return dataPost(workTaskCreateURL, params)
}
const permissionQueryPermisson = (params) => {
    return dataGet(permissionQueryPermissonURL, params)
}
const queryWorkInfo = (params) => {
    return dataGet(queryWorkInfoURL, params)
}
const queryAdminPermisson = (params) => {
    return dataGet(queryAdminPermissonUrl, params)
}

const declareApprovalApprove = (params) => {
    return dataPost(declareApprovalApproveURL, params)
}
const declareApprovalFail = (params) => {
    return dataPost(declareApprovalFailURL, params)
}
const PreDeclareApprovalHangup = (params) => {
    return dataPost(PreDeclareApprovalHangupURL, params)
}
const templateListData = (params) => {
    return dataPost(templateListDataUrl, params)
}
const selectListFromDeclare = (params) => {
    return dataPost(selectListFromDeclareURL, params)
}

const permissionQueryDocPermisson = (params) => {
    return dataGet(permissionQueryDocPermissonURL, params)
  }
  const pageofficeChapterDetial = (params) => {
    return dataPost(pageofficeChapterDetialURL, params)
  }
  const topicSelectTopicListPage = (params) => {
    return dataPost(topicSelectTopicListPageURL, params)
  }
  const declareAddDeclareAttachment = (params) => {
    return dataPost(declareAddDeclareAttachmentURL, params)
  }
  const declareSelectListDeclareAttachment = (params) => {
    return dataPost(declareSelectListDeclareAttachmentURL, params)
  }
export {
    addformalDeclarationInfo,
    officialDeclarationclose,
    declarePersonSelect,
    declarePersonUpdate,
    declarePersonInsert,
    getDeclarlistopic,
    personnelDetail,
    declareTaskList,
    declareTaskInsert,
    declareTaskDelete,
    declareTaskSave,
    declareAddDeclare,
    declareeSlectInformationById,
    declareeUpdateById,
    personnelSelectlist,
    companySelectlist,
    declareAddUnitInformation,
    declareUpdateUnitInformation,
    declareSelectUnitInformation,
    declareSubmit,
    declareApproveSubmit,
    declareRankUpdate,
    declareRankSelect,
    institutionalSectorlistDepartments,
    institutionalSectorlistCompanys,
    personnellistPersonnelBo,
    workTaskUpdate,
    workTaskQueryWorkTasks,
    workDelete,
    workCreate,
    workTaskDelete,
    workTaskGetWorkTaskInfo,
    workTaskCreate,
    permissionQueryPermisson,
    queryWorkInfo,
    queryAdminPermisson,
    declareApprovalApprove,
    declareApprovalFail,
    chapterCommentFindChapterCommentByChapterId,
    chapterCommentInsertComment,
    pageofficeSelectTemplateChapterList,
    PreDeclareApprovalHangup,
    templateListData,
    getChapterJson,
    pageofficeGetChapterJson,
    pageofficeLockChapter,
    pageofficeUnlockChapter,
    declareApprovalBatchApprove,
    declareApprovalBatchFail,
    declareDetailList,
    declareRankInsert,
    selectListFromDeclare,
    permissionQueryDocPermisson,
  pageofficeChapterDetial,
  topicSelectTopicListPage,
  declareSelectListDeclareAttachment,
  declareAddDeclareAttachment
}