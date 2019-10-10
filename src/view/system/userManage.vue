<template>
    <div class="pageWarpper">
        <div class="pageBox">
            <topTitle Title='用户管理'></topTitle>
            <div class="pageCenter">
                <div class="leftPage">
                    <p>中国铁路科学研究院</p>
                   <SearchTree :unitData="unitData" :defaultProps="defaultProps" @getTreeData ="getTreeData"></SearchTree>
                </div>
                <div class="rightPage">
                     <div class="searchBox">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">姓名</div>
                                <div class="editContent">
                                    <inputs class="inputs" ref="reset" width="190px" height="30px" v-model="resetName"></inputs>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">手机号码</div>
                                <div class="editContent">
                                    <inputs class="inputs"  ref="reset1" width="190px" height="30px" v-model="resetMobile"></inputs>
                                </div>
                            </div>
                        </div>
                        <div class="editBtn">
                            <button class="fadeInBtn" @click="resetData">重置</button>
                            <button class="fadeInBtn" @click="queryDataList">查询</button>
                        </div>
                    </div>
                    <div class="wrapperMain">
                        <div class="mainTitle">
                            <p>部门名称</p>
                            <button class="fadeInBtn" @click="manageDetail">添加</button>
                        </div>
                        <div class="mainContent">
                            <TableCommon :tableData='tableData' :tableHeader='tableHeader' :operation='operation'  @getStateName="getState"></TableCommon>
                        </div>
                    </div>
                    <div class="wrapperPagination">
                        <PaginationCommon :total="total" :pages='pageNum' :page-size="pageSize" @modifypageSize="modifypageSize"  @handleCurrentChangeSub="handleCurrentChangeFun" :current-page="currentPage"></PaginationCommon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import topTitle from '../../components/common/topTitle.vue'
    import input from '../../components/common/resetInput.vue'
    import TableCommon from '../../components/common/TableCommon.vue'
    import PaginationCommon from '../../components/common/PaginationCommon.vue'
    import SearchTree from './components/SearchTree.vue'
    import {userSearch,userDelete,departmentTreeList} from '../../http/impl/systemMange.js'
    export default {
        data(){
            return {
                tableData:[],
                tableHeader:[
                    {
                        label: "登录名",
                        prop: "account",
                        minWidth: "152px"
                    },
                    {
                        label: "人员姓名",
                        prop: "name",
                        minWidth: "130px"
                    },
                    {
                        label: "性别",
                        prop: "gender",
                        minWidth: "66px"
                    },
                    {
                        label: "联系电话",
                        prop: "mobile",
                        minWidth: "120px"
                    },
                    {
                        label: "职务",
                        prop: "job",
                        minWidth: "122px"
                    },
                    {
                        label: "角色",
                        prop: "roleCode",
                        minWidth: "102px"
                    },
                    {
                        prop: "oper",
                        label: "操作",
                        fixed: "right",
                        minWidth: "68px",
                        icon: "el-icon-menu"
                    }
                ],
                operation:[
                    {name: '编辑',icon:"baI_modify"},
					{name: '删除' ,icon:"el-icon-edit-outline"},
                ],
                defaultProps: {
                    children: 'child',
                    label: 'name'
                },
                unitData: [],
                // 分页器所需字段
                total:0,// 总条数
                pageSize: 10,// 每页条数
                pageNum:1,// 总页数
                currentPage:1,
                // 查询所需字段
                resetName:'',// 姓名
                resetMobile:'',// 手机
            }
        },
        components:{
            topTitle,
            inputs:input,
            TableCommon,
            SearchTree,
            PaginationCommon
        },
        created(){
            this.companyCode = this.loginInforma.companyCode;// 单位代码
            this.departmentCode = this.loginInforma.departmentCode;// 部门代码
            this.getInitData(1,this.pageSize);// 初始化查询
            this.getWorkData();
        },
        computed: {
            ...mapGetters({
                loginInforma: "gs_Home_loginInforma"
            })
        },
        methods:{
            // 重置
            resetData(){
                this.$refs.reset.resetList();
                this.$refs.reset1.resetList();
                this.resetName = '';
                this.resetMobile = '';
            },
            getWorkData(){
                departmentTreeList({
                   departmentName:''
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.unitData = res.data.list;
                    }
                })
            },
            getTreeData(data){
                this.companyCode = data.companyCode;// 单位代码
                this.departmentCode= data.code;//部门代码
                userSearch({
                    companyCode:data.companyCode,// 单位代码
                    departmentCode:data.code,// 部门代码
                    pageNo:this.currentPage,// 页码
                    pageSize:this.pageSize,// 页显示量
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.tableData = res.data.list;
                        if(res.data.list!=null){
                            for(let i=0;i<this.tableData.length;i++){
                                if(this.tableData[i].accountRoles!=null){
                                    let arr = []
                                    for(let j=0;j<this.tableData[i].accountRoles.length;j++){
                                        arr.push(this.tableData[i].accountRoles[j].roleCode) 
                                    }
                                    this.tableData[i].roleCode =arr.join('，')
                                }
                            }
                        }
                        this.total = res.data.size;
                    }
                })
            },
            getState(name,row){
                if(name == '编辑'){
                   this.$router.push({
                        name:'userManageDetail',
                        params:{
                            accountId:row.accountId,
                            personnelId:row.personnelId,
                            row:row
                        }
                    })
                }else if(name == '删除'){
                    userDelete(row.accountId).then(res=>{
                        if(res.result == 'SUCCESS'){
                            this.$message({
                                message: "删除成功!",
                                type: "success"
                            });
                            this.getInitData(1,this.pageSize)// 初始化查询
                        }
                    })
                }
            },
            // 添加用户管理
            manageDetail(){
                this.$router.push({
                    name:'userManageDetail',
                    params:{
                        companyCode:this.companyCode,// 单位代码
                        departmentCode:this.departmentCode,// 部门代码
                    }
                })
            },
            // 修改每页显示条数
            modifypageSize(value){
                this.pageSize = value;
                this.getInitData(this.currentPage,this.pageSize);// 初始化查询
            },
            handleCurrentChangeFun(v) { //页面点击
                this.currentPage = v;
                this.queryDataList();// 查询
            },
            // 初始化查询
            getInitData(pageNo,pageSize){
                userSearch({
                    companyCode:this.companyCode,// 单位代码
                    departmentCode:this.departmentCode,// 部门代码
                    pageNo:pageNo,// 页码
                    pageSize:pageSize,// 页显示量
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.tableData = res.data.list;
                        if(res.data.list!=null){
                            for(let i=0;i<this.tableData.length;i++){
                                if(this.tableData[i].accountRoles!=null){
                                    let arr = []
                                    for(let j=0;j<this.tableData[i].accountRoles.length;j++){
                                        arr.push(this.tableData[i].accountRoles[j].roleCode) 
                                    }
                                    this.tableData[i].roleCode =arr.join('，')
                                }
                            }
                        }
                        this.total = res.data.size;
                    }
                })
            },
            // 查询
            queryDataList(){
                userSearch({
                    companyCode:this.loginInforma.companyCode,// 单位代码
                    departmentCode:this.loginInforma.departmentCode,// 部门代码
                    mobile:this.resetMobile,// 手机（可模糊）
                    name:this.resetName,// 姓名（可模糊）
                    pageNo:this.currentPage,// 页码
                    pageSize:this.pageSize,// 页显示量
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.tableData = res.data.list;
                        this.total = res.data.size;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.pageWarpper{
    width: 1000px;
    height: auto;
    background-color: #f5f5f5;
	padding-bottom: 40px;
    .pageBox{
        .pageCenter{
            display: flex;
            justify-content: space-between;
            .leftPage{
                width: 200px;
                padding: 20px;
                background: #fff;
                border-right: 1px solid #ccc;
                p{
                    text-align: center;
                    font-size: 16px;
                    color: #3f82e1;
                }
            }
            .rightPage{
                width: 800px;
                .searchBox{
                    width: 790px;
                    margin-right: 10px;
                    box-sizing: border-box;
                    background-color: #fff;
                    height: 70px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .editBtn{
                        padding-right: 10px;
                        display: flex;
                    }
                }
                .wrapperMain{
                    width: 790px;
                    margin-right: 10px;
                    margin-top: 10px;
                    box-sizing: border-box;
                    background-color: #fff;
                    // overflow: hidden;
                    // overflow-y: scroll;
                    .mainTitle{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        p{
                            font-size: 16px;
                            color: #666; 
                        }
                    }
                    .mainContent{
                         width: 790px;
                    }
                }
                .wrapperPagination{
                     width: 790px !important;
                     .pagination{
                         width: 790px !important;
                     }
                }
            }
        }
    }
    
    
    .fadeInBtn{
        width: 88px;
        height: 30px;
        box-sizing: border-box;
        background-color: #3f82e1;
        color: #fff;
        margin-left: 20px;
        border: none;
        float: right;
        border-radius: 3px; 
        color:#fff;
        font-size: 14px;
    }
    .editItem{
        display: flex;
        padding: 0 20px 0 ;
        justify-content: space-between;
        font-size: 16px;
        color: #666;
        .editCenter{
            display: flex;
            align-items: center;
            padding-right: 5px;
            .editName{
                text-align: end;
                padding-right: 10px;
                display: flex;
                flex-direction: column;
                span{
                    font-size: 12px;
                }
            }
            .editContent{
                display: flex;
                align-items: center;
                span{
                    padding: 0 10px;
                }
                .el-select{
                    width: 280px !important;
                }
            }
        }
    }
}
</style>