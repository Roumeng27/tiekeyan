<template>
    <div class="pageWarpper">
        <div class="pageBox">
            <topTitle Title='部门管理'></topTitle>
            <div class="searchBox">
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">部门名称</div>
                        <div class="editContent">
                            <inputs class="inputs" width="600px" height="30px" v-model="departmentName" ref="reset"></inputs>
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
                    <p>机构名称</p>
                    <button class="fadeInBtn" @click="appendOrganization">添加</button>
                </div>
                <div class="mainContent">
                    <tableTree :tableData='tableData' :tableHeader='tableHeader' :operation='operation' :treeProps='treeProps'  @getStateName="getState"></tableTree>
                </div>
            </div>
        </div>
        <div class="dialogWrapper" v-if="dialog">
            <div class="dialogBox">
                <div class="dialogTitle">
                    <p>添加部门</p>
                </div>
                <div class="dialogMain">
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">部门名称</div>
                            <div class="editContent">
                                <inputs class="inputs" width="476px" height="30px" v-model="name"></inputs>
                            </div>
                        </div>
                    </div>
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">部门代码</div>
                            <div class="editContent">
                                <inputs class="inputs" width="476px" height="30px" v-model="code"></inputs>
                            </div>
                        </div>
                    </div>
                     <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">上级部门代码:</div>
                            <div class="editContent">
                                {{parentCode}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="changeBtn">
                    <button class="ret" @click="closeOrganization">返回</button>
                    <button class="hold" @click="saveInfo">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import topTitle from '../../components/common/topTitle.vue'
    import input from '../../components/common/resetInput.vue'
    import tableTree from '../../components/common/tableTree.vue'
    import {departmentList,departmentAdd,departmentDelete,departmentUpdate,departmentTree,departmentTreeList} from '../../http/impl/systemMange.js'
    export default {
        data(){
            return {
                tableData:[],
                tableHeader:[
                    {
                        label: "部门名称",
                        prop: "name",
                        minWidth: "234px"
                    },
                    {
                        label: "部门代码",
                        prop: "code",
                        minWidth: "234px"
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
					{name: '添加子部门',icon:"el-icon-document-checked"},
					{name: '删除' ,icon:"el-icon-edit-outline"},
                ],
                treeProps:{children: 'child'},
                // 弹框所需字段
                dialog:false,
                // 查询所需字段
                departmentName:"",// 部门名称
                name:'',// 部门名称
                code:'',// 部门代码
                parentCode:'',// 上级部门代码
                // 分页器所需字段
                total:0,// 总条数
                pageSize: 10,// 每页条数
                pageNum:1,// 总页数
                currentPage:1,
                resultStatus:'',// 区分新增还是编辑
                rowId:'',// 点击当前id
            }
        },
        components:{
            topTitle,
            inputs:input,
            tableTree
        },
        created(){
            this.getInfoData();// 列表查询
        },
        computed: {
            ...mapGetters({
                loginInforma: "gs_Home_loginInforma"
            })
        },
        methods:{
            // 列表查询
            getInfoData(){
                departmentTreeList({
                   departmentName:''
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.tableData = res.data.list;
                    }
                })
            },
            // 重置
            resetData(){
                this.$refs.reset.resetList();
                this.departmentName = ''
            },
            // 查询
            queryDataList(){
                departmentTreeList({
                   departmentName:this.departmentName
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.tableData = res.data.list;
                    }
                })
            },
            getState(name,row){
                if(name == '编辑'){
                    this.dialog = true;
                    this.name = row.name;// 单位名称
                    this.code = row.code;// 单位代码
                    this.parentCode = row.parentCode;// 上级代码
                    this.resultStatus = '编辑'
                    this.rowId = row.id;
                }else if(name == '删除'){
                    departmentDelete(row.id).then(res=>{
                        if(res.result == 'SUCCESS'){
                            this.$message({
                                message: "删除成功!",
                                type: "success"
                            });
                            this.getInfoData();// 列表查询
                        }
                    })
                }else if(name == '添加子部门'){
                    this.name = '';// 单位名称
                    this.code = '';// 单位代码
                    this.dialog = true;
                    this.parentCode = row.code;// 上级代码
                    this.rowId = row.id;
                    this.resultStatus = '新增'
                }
            },
            // 添加机构名称
            appendOrganization(){
                this.dialog = true;
                this.resultStatus = '新增'
                this.name = '';
                this.code = '';
                this.parentCode = '';
            },
            // 机构名称弹框隐藏
            closeOrganization(){
                this.dialog = false;
            },
            // 保存
            saveInfo(){
                if(this.resultStatus == '新增'){
                     departmentAdd({
                        name:this.name,// 部门名称
                        code:this.code,// 部门代码
                        parentCode:this.parentCode,// 上级部门代码
                        companyCode:this.loginInforma.companyCode,// 单位代码
                        managerFlag:'',
                    }).then(res=>{
                        if(res.result == 'SUCCESS'){
                            this.getInfoData();// 列表查询
                            this.dialog = false;
                        }
                    })
                }else if(this.resultStatus == '编辑'){
                    departmentUpdate({
                        id:this.rowId,
                        name:this.name,// 部门名称
                        code:this.code,// 部门代码
                        managerFlag:'',
                        companyCode:this.loginInforma.companyCode,// 单位代码
                    }).then(res=>{
                        if(res.result == 'SUCCESS'){
                            this.getInfoData();// 列表查询
                            this.dialog = false;
                        }
                    })
                }
               
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
    .searchBox{
        width: 980px;
        margin: 0px 10px;
        box-sizing: border-box;
	    background-color: #fff;
        height: 70px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .editBtn{
            padding-right: 20px;
        }
    }
    .wrapperMain{
        width: 980px;
        box-sizing: border-box;
        background-color: #fff;
        // overflow: hidden;
        // overflow-y: scroll;
        margin: 10px 10px;
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
            width: 960px;
            margin: 0 10px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
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
     .dialogWrapper{
        position: absolute;
        top: 0;
        width: 990px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index:2055;
        .dialogTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px 16px;
            p{
                font-size: 18px;
                color:#666;
                font-weight: bold;
            }
        }
        
        .dialogBox{
            width:626px;
            height: 342px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            background: #fff;
            border-radius: 10px;
            padding:30px 0;
            z-index:99;
            display: flex;
            flex-direction: column;
            .dialogMain{
                .editItem{
                    padding: 0 30px 30px;
                }
            }
            .changeBtn{
                margin: 0px 10px;
                padding-top: 40px;
                height: 46px;
                background-color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                button {
                    width: 100px;
                    height: 46px;
                    border: none;
                    border-radius: 3px;
                }
                .ret {
                    background-color: #fff;
                    color: #3f82e1;
                    border: 1px solid #3f82e1;
                    margin-right:59px;
                }
                .hold {
                    background-color: #3f82e1;
                    color: #fff;
                }
            }
        }
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