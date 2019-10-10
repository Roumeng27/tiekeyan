// ------------------项目申报-------------------
// ----------------------------预申报---------------------------------
// /bo/project/topic/add
// 新增主题
export const addtopicUrl = '/project/topic/add';
//公司树
export const companyTreeUrl = '/user/organizationTree/companyTree';
// 部门树
export const departmentTreeUrl = '/user/organizationTree/departmentTree';
//人员树
export const personnelByDepartmentUrl = '/user/organizationTree/personnelByDepartment';
// 机构人员
export const personnelByCompanyUrl = '/user/organizationTree/personnelByCompany';
//修改主题
export const updatetopicUrl = '/project/topic/update';
//发布主题
export const releasetopicUrl = '/project/topic/release';
//关闭主题
export const closetopicUrl = '/project/topic/close';
//删除主题
export const logicDeletetopicUrl = '/project/topic/logicDelete';
// 根据主题id查找主题信息
export const getTopicInfotopicUrl = '/project/topic/getTopicInfo';
// 主题列表****
export const getTopicListPagetopicUrl = '/project/topic/getTopicListPage';
//主题详情
export const getTopicDetailstopicUrl = '/project/topic/getTopicDetails';
// 项目申报信息完成
export const submitpreDeclareUrl = '/project/preDeclare/submit';
// 审批通过
export const approvePreDeclareApprovalURL = '/project/PreDeclareApproval/approve';
// 审批不通过
export const failPreDeclareApprovalURL = '/project/PreDeclareApproval/fail';
// 审批挂起
export const hangupPreDeclareApprovalURL = '/project/PreDeclareApproval/hangup';
// 审批排名
export const addPreDeclareApprovalURL = '/project/PreDeclareRank/add';

// 审批通过提交
export const submitPreDeclareApprovalUrl = '/project/PreDeclareApproval/submit';
// 申报信息
export const informationListUrl = '/project/preDeclare/list';
// 新增项目基本信息
export const addbasicinfoUrl = '/project/preDeclare/add';
// 查看项目基本信息详情
export const searchbasicinfoUrl = '/project/preDeclare/selectById';
// 修改项目基本信息详情
export const editbasicinfoUrl = '/project/preDeclare/update';
// 决策审批 审批详情
export const detailbasicinfoUrl = '/project/preDeclare/detailList';
// 决策审批 批量操作 审批通过
export const approvebasicinfoUrl = '/project/PreDeclareApproval/batchApprove';
// 决策审批 批量操作 审批不通过
export const notapprovebasicinfoUrl = '/project/PreDeclareApproval/batchFail';
// 评审会议列表
export const getreviewmettingUrl = '/component/projcetAssess/findByPage';
// 添加评审会议
export const insertReviewmeetingUrl = '/component/projcetAssess/insert';
// 查找评审会议详情
export const searchReviewmeetingUrl = '/component/projcetAssess/showSinglePage';
// 修改评审会议详情
export const editReviewmeetingUrl = '/component/projcetAssess/changePage';

//--------------------------------------正式申报------------------------------
// 新增正式申报主题
export const formalDeclarationUrl = '/project/topic/addTopicDeclare';
// 申报信息列表
export const declarationListUrl = '/project/declare/selectList ';
// 关闭主题
export const officialDeclarationcloseURl = '/project/topic/officialDeclarationclose';
//----------------创建申报----------------
//------------项目信息------------
//全局人员查询
export const personnelSelectlistURl = '/user/personnel/selectlist';
//全局部门查询
export const companySelectlistURl = '/user/company/selectlist';
//基本信息--正式申报基本信息添加
export const declareAddDeclareURL = '/project/declare/addDeclare';
//基本信息--正式申报基本信息查看
export const declareeSlectInformationByIdURL = '/project/declare/selectInformationById';
//基本信息--正式申报基本信息修改
export const declareeUpdateByIdURL = '/project/declare/updateById';

//申报单位--正式申报单位信息添加
export const declareAddUnitInformationURL = '/project/declare/addUnitInformation';
//申报单位--正式申报单位信息更新;
export const declareUpdateUnitInformationURL = '/project/declare/updateUnitInformation';
//申报单位--正式申报单位信息查看
export const declareSelectUnitInformationURL = '/project/declare/selectUnitInformation';

// 项目成员—-展示详情
export const declarePersonSelectUrl = '/project/declarePerson/select';
// 项目成员—-更新操作
export const declarePersonUpdateUrl = '/project/declarePerson/update';
// 项目成员—-展示新增
export const declarePersonInsertUrl = '/project/declarePerson/insertAll';

// 项目成员--弹框查询详情
export const personnelDetailUrl = '/user/personnel/selectlist';

// 课题分解 展示列表
export const declareTaskListUrl = '/project/declareTask/findByPage';
// 课题分解 —课题新增
export const declareTaskInsertUrl = '/project/declareTask/insert';
// 课题分解 —-课题列表中删除某个课题
export const declareTaskDeleteUrl = '/project/declareTask/delete';
// 课题分解 —课题新增批量
export const declareTaskSaveUrl = '/project/declareTask/insertList';
// 依照 code集合 查询部门列表
export const institutionalSectorlistDepartmentsURL = '/user/institutionalSector/listDepartments';
// 依照 code集合 查询单位列表
export const institutionalSectorlistCompanysURL = '/user/institutionalSector/listCompanys';
// 依照 codes 查询人员信息
export const personnellistPersonnelBoURL = '/user/personnel/listPersonnelBo';


//-----------文档章节---------
// 查看章节评论
export const chapterCommentFindChapterCommentByChapterIdURL = '/component/chapterComment/findChapterCommentByChapterId';
// 发表评论
export const chapterCommentInsertCommentURL = '/component/chapterComment/insertComment';
//章节列表
export const pageofficeSelectTemplateChapterListURL = '/component/pageoffice/selectTemplateChapterList';
// 章节管理-查询列表
export const pageofficeGetChapterJsonURL = '/component/pageoffice/getChapterJson';
//上锁
export const pageofficeLockChapterURL = '/component/pageoffice/lockChapter';
//解锁
export const pageofficeUnlockChapterURL = '/component/pageoffice/unlockChapter';
//批量通过;
export const declareApprovalBatchApproveURL = '/project/declareApproval/batchApprove';
//批量不通过
export const declareApprovalBatchFailURL = '/project/declareApproval/batchFail';







//-----------任务---------
// 修改工作任务信息
export const workTaskUpdateURL = '/component/workTask/update.json';
// 查询工作任务列表
export const workTaskQueryWorkTasksURL = '/component/workTask/queryWorkTasks.json';
// 级联删除工作信息
export const workDeleteURL = '/component/work/delete.json';
// 创建工作信息接口
export const workCreateURL = '/component/work/create.json';
// 级联删除工作任务信息;
export const workTaskDeleteURL = '/component/workTask/delete.json';
// 获取工作任务详情
export const workTaskGetWorkTaskInfoURL = '/component/workTask/getWorkTaskInfo.json';
// 创建工作任务接口
export const workTaskCreateURL = '/component/workTask/create.json';
// 查询登陆账号的工作任务权限接口
export const permissionQueryPermissonURL = '/project/permission/queryTaskPermisson.json';
// 查询工作信息
export const queryWorkInfoURL = '/component/work/queryWorkInfo.json';
// 查询登陆账号是否有admin权限接口
export const queryAdminPermissonUrl = '/project/permission/queryAdminPermisson.json';
// 章节管理-查询列表
export const getChapterJsonUrl = '/component/pageoffice/getChapterJson';
//------申报发布提交-------
//正式申报--申报发布
export const declareSubmitUrl = '/project/declare/submit';
//正式申报--审批后提交
export const declareApproveSubmitUrl = '/project/declare/approveSubmit';
//申报添加排名
export const declareRankInsertURL = '/project/declareRank/insert';
//更新排名
export const declareRankUpdateURL = '/project/declareRank/update';
//排名回显
export const declareRankSelectURL = '/project/declareRank/select';
//审批详情
export const declareDetailListURl = '/project/declare/detailList';

//正式申报通过
export const declareApprovalApproveURL = '/project/declareApproval/approve';
//正式申报不通过
export const declareApprovalFailURL = '/project/declareApproval/fail';
//正式申报挂起
export const PreDeclareApprovalHangupURL = '/project/declareApproval/hangup';
// 任务负责人的人员选择
export const selectListFromDeclareURL = '/user/personnel/selectListFromDeclare';


// --------------------------------------登录--------------------------------------
// export const accountPersonnelcheckUserUrl = '/user/accountPersonnel/truelogin'
export const accountPersonnelcheckUserUrl = '/user/accountPersonnel/checkUser';
//获取验证码
export const accountPersonnelgetCaptchaUtilsUrl = '/user/accountPersonnel/getCaptchaUtils';
// 退出登录
export const accountPersonnellogoutUrl = '/user/accountPersonnel/logout';
// 检测登录
export const accountPersonnelhasLoginUrl = '/user/accountPersonnel/hasLogin';


// ---------------系统管理-------------
// 模板管理列表
export const templateListDataUrl = '/component/pageoffice/selectList';
//模板发布
export const templatePublishUrl = '/component/pageoffice/publish';
//取消模板发布
export const cancelTemplateListUrl = '/component/pageoffice/cancelPublish';
// 章节管理删除
export const deletChapterListUrl = '/component/pageoffice/deleteTemplateChapter';
// 角色管理
// 人员账号角色新增
export const userAddUrl = '/user/accountPersonnel/add';
// 人员账号角色更新
export const userUpdateUrl = '/user/accountPersonnel/update';
// 人员账号角色删除
export const userDeleteUrl = '/user/accountPersonnel/deleteAllByAccountId';
// 人员账号角色删除
export const userSearchUrl = '/user/accountPersonnel/list';
// 角色选取接口
export const userQueryRolesUrl = '/user/role/queryRoles.json';
// 用户管理
// 学位列表
export const degreeListUrl = '/user/account/degreeList';
// 职称列表
export const titleListUrl = '/user/account/titleList';
// 部门管理
// 部门列表
export const departmentListUrl = '/user/department/list';
// 部门新增
export const departmentAddUrl = '/user/department/add';
// 部门更新 
export const departmentUpdateUrl = '/user/department/update';
// 部门删除 (级联删除下面的子部门)
export const departmentDeleteUrl = '/user/department/delete';
//添加角色
export const addUserRoleUrl = '/user/role/add.json';
//编辑角色
export const updateUserRoleUrl = '/user/role/update.json';
// 部门树列表 parent、child
export const departmentTreeListUrl = '/user/department/departmentTree';

//权限设置
//分页查询权限设置
export const queryFunctionsListUrl = '/user/function/queryFunctions.json';
//查询角色所得权限
export const queryRoleListUrl = '/user/function/queryRoleFunctions.json';
//分配权限
export const addPowerListUrl = '/user/roleFunction/add.json';
//组织机构管理
//列表查询
export const getCompanyTreeListUrl = '/user/company/getCompanyTree';
//添加单位
export const addCompanyListUrl = '/user/company/addCompany.json';
//删除单位
export const removeCompanyListUrl = '/user/company/remove.json';
//更新单位
export const updateCompanyListUrl = '/user/company/updateCompany';
//查看详情单位
export const showCompanyListUrl = 'user/company/showSingleCompanyPage';



//------------------------------------------------------------我的工作台-------------
//------------我的任务------------
//我的任务列表
export const workTaskQueryMyWorkTasksURL = '/component/workTask/queryMyWorkTasks.json';

//获取文档权限
export const permissionQueryDocPermissonURL = 'project/permission/queryDocPermisson.json'

//正式申报主题
export const topicSelectTopicListPageURL = '/project/topic/selectTopicListPage'



//附件保存
export const declareAddDeclareAttachmentURL = '/project/declare/addDeclareAttachment'
    //查看附件
export const declareSelectListDeclareAttachmentURL = '/project/declare/selectListDeclareAttachment'


//获取章节详情
export const pageofficeChapterDetialURL = '/component/pageoffice/chapterDetial'