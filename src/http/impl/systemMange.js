//系统管理
import { dataPost, dataGet, strGet, dataPut, dataDeleteStr } from '../config/axios.js'
import {
    templateListDataUrl, //模板管理列表
    templatePublishUrl, //模板发布
    cancelTemplateListUrl, //取消模板发布
    pageofficeSelectTemplateChapterListURL, //章节管理列表
    deletChapterListUrl, //章节管理删除
    userAddUrl, // 人员账号角色新增
    userUpdateUrl, // 人员账号角色更新
    userDeleteUrl, // 人员账号角色删除
    userSearchUrl, // 人员账号角色删除
    userQueryRolesUrl, // 角色选取接口
    departmentListUrl, // 部门查询
    departmentAddUrl, // 部门新增
    departmentUpdateUrl, // 部门更新 
    departmentDeleteUrl, // 部门删除 (级联删除下面的子部门)
    addUserRoleUrl, //添加角色
    updateUserRoleUrl, //编辑角色
    departmentTreeUrl, // 部门树
    companyTreeUrl, // 单位树
    departmentTreeListUrl, // 部门树列表 parent、child
    queryFunctionsListUrl, //分页查询权限设置
    queryRoleListUrl, //查询角色所得权限
    addPowerListUrl, //分配权限
    getCompanyTreeListUrl, //组织机构管理查询列表
    addCompanyListUrl, //添加单位
    removeCompanyListUrl, //删除单位
    updateCompanyListUrl, //更新单位
    showCompanyListUrl, //展示详情单位
    degreeListUrl, // 学位列表
    titleListUrl, // 职称列表
} from '../config/api.js'

const templateListData = (params) => {
    return dataPost(templateListDataUrl, params)
}
const templatePublish = (params) => {
    return dataPost(templatePublishUrl, params)
}
const cancelTemplateList = (params) => {
    return dataPost(cancelTemplateListUrl, params)
}
const pageofficeSelectTemplateChapterList = (params) => {
    return dataPost(pageofficeSelectTemplateChapterListURL, params)
}
const deletChapterList = (params) => {
    return dataPost(deletChapterListUrl, params)
}

const userAdd = (params) => {
    return dataPost(userAddUrl, params)
}
const userUpdate = (params) => {
    return dataPost(userUpdateUrl, params)
}
const userDelete = (params) => {
    return strGet(userDeleteUrl, params)
}
const userSearch = (params) => {
    return dataPost(userSearchUrl, params)
}
const userQueryRoles = (params) => {
    return dataPost(userQueryRolesUrl, params)
}

const departmentList = (params) => {
    return dataPost(departmentListUrl, params)
}
const departmentAdd = (params) => {
    return dataPost(departmentAddUrl, params)
}
const departmentDelete = (params) => {
    return strGet(departmentDeleteUrl, params)
}
const departmentUpdate = (params) => {
    return dataPost(departmentUpdateUrl, params)
}
const addUserRole = (params) => {
    return dataPost(addUserRoleUrl, params)
}
const updateUserRole = (params) => {
    return dataPost(updateUserRoleUrl, params)
}
const queryFunctionsList = (params) => {
    return dataGet(queryFunctionsListUrl, params)
}
const queryRoleList = (params) => {
    return dataGet(queryRoleListUrl, params)
}
const addPowerList = (params) => {
    return dataPost(addPowerListUrl, params)
}
const departmentTreeList = (params) => {
    return dataGet(departmentTreeListUrl, params)
}
const getCompanyTreeList = (params) => {
    return dataPost(getCompanyTreeListUrl, params)
}
const addCompanyList = (params) => {
    return dataPost(addCompanyListUrl, params)
}
const removeCompanyList = (params) => {
    return dataDeleteStr(removeCompanyListUrl, params)
}
const updateCompanyList = (params) => {
    return dataPost(updateCompanyListUrl, params)
}
const showCompanyList = (params) => {
    return strGet(showCompanyListUrl, params)
}
const getDegreeList = (params) => {
    return dataGet(degreeListUrl, params)
}
const getTitleList = (params) => {
    return dataGet(titleListUrl, params)
}
export {
    templateListData,
    templatePublish,
    cancelTemplateList,
    pageofficeSelectTemplateChapterList,
    deletChapterList,
    userAdd,
    userUpdate,
    userDelete,
    userSearch,
    userQueryRoles,
    departmentList,
    departmentAdd,
    departmentDelete,
    departmentUpdate,
    addUserRole,
    updateUserRole,
    departmentTree,
    companyTree,
    departmentTreeList,
    queryRoleList,
    addPowerList,
    queryFunctionsList,
    getCompanyTreeList,
    addCompanyList,
    removeCompanyList,
    updateCompanyList,
    showCompanyList,
    getDegreeList,
    getTitleList
}