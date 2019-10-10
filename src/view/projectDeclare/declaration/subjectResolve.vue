<template>
    <!-- 项目成员 -->
    <div class="pageWarpper">
        <div class="wrapperMain">
            <div class="content">
                <div class="leftMenu">
                    <menuList index='3'></menuList>     
                </div>
                <div class="section">
                    <div class="changeItem">
                        <div class="resumeWrapper" >
                            <div class="resumeTitle">
                                <p>项目课题</p>
                                <!-- <button class="fadeInBtn"  @click="addNewProject">新增</button> -->
                            </div>
                            <div class="resumeSection" v-show="taskFlag">
                                <declareTable :tableData="tableData" :tableHeader="tableHeader" @data="deleteItem" :disabled="true"></declareTable>
                            </div>
                        </div>
                        <div class="resumeWrapper">
                            <div class="resumeItem">
                                <div class="resumeArea">
                                    <p>课题总数</p>
                                    <inputs class="inputs" width="60px" v-model="taskTotal" height="30px" disabled="true"></inputs>
                                </div>
                            </div>
                        </div>
                        <div class="changeFooter">
                            <button class="ret" @click="goBack">返回</button>
                            <!-- <button class="hold" @click="saveInfo">保存</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增课题弹框 -->
        <div class="dialogWrapper" v-show="addDialogFlag">
            <div class="historyBox">
                <div class="dialogTitle">
                    <p>新增课题</p>
                    <img src="../../../assets/img/components/close.png" alt="" @click="closeNewProject">
                </div>
                <div class="historySearch">
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">课题名称</div>
                            <div class="editContent">
                                <inputs class="inputs" width="220px" v-model="taskName" height="30px"></inputs>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">承担单位</div>
                            <div class="treeBox">
                               <!-- <inputs class="inputs" width="220px" v-model="leaderCompanyCode" height="30px"></inputs> -->
                               <selectTree @choicedata="companychoice" :choicedatas="responsableDepartment"></selectTree>
                            </div>
                        </div>
                    </div>
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">负责人</div>
                            <div class="treeBox">
                                <!-- <inputs class="inputs" width="220px" v-model="taskResponsibleAccount" height="30px"></inputs> -->
                                <selectTree @choicedata="responsibleAccountchoice"  :choicelevel="3" :choicedatas="responsiableAdvisor"></selectTree>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">总经费 <span>（万元）</span></div>
                            <div class="editContent">
                               <inputs class="inputs" width="220px" v-model="budget" height="30px"></inputs>
                            </div>
                        </div>
                    </div>
                     <div class="editItem" style="padding-bottom:0;">
                        <div class="editCenter">
                            <div class="editName">国家拨款 <span>（万元）</span></div>
                            <div class="editContent">
                                <inputs class="inputs" width="220px" v-model="funds" height="30px"></inputs>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">单位自筹 <span>（万元）</span></div>
                            <div class="editContent">
                               <inputs class="inputs" width="220px" v-model="selfRaised" height="30px"></inputs>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="historyMain">
                    <div class="changeBtn">
                        <button class="ret" @click="closeNewProject">取消</button>
                        <button class="hold" @click="sureNewProject">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import inputs from '../../../components/common/input.vue'
    import datePicker from '../../../components/common/datePicker.vue'
    import menuList from './component/examineDeclareLeftMenu.vue'
    import TableCommon from '../../../components/common/TableCommon.vue'
    import PaginationCommon from '../../../components/common/PaginationCommon.vue'
    import declareTable from '../../../components/common/declareTable.vue'
    import selectTree from '../../../components/common/selectTree'
    import {declareTaskList,declareTaskInsert,declareTaskDelete,declareTaskSave} from "../../../http/impl/formalDeclaration"
    export default {
        name:'subjectResolve',
        components:{
            inputs,
            datePicker,
            menuList,
            TableCommon,
            PaginationCommon,
            declareTable,
            selectTree
        },
        data(){
            return {
                subject:'',
                optionList:[],
                taskFlag:true,// 课题分解列表展示或隐藏
                addDialogFlag:false,// 新增项目负责人课题弹框
                memberInfoFlag:false,// 项目成员信息列表
                tableData:[],
                tableHeader:[
                    {
                        label:'课题名称',
                        prop:'taskName',
                        minWidth:'122px'
                    },
                    {
                        label:'承担单位',
                        prop:'leaderCompanyName',
                        minWidth:'210px'
                    },
                    {
                        label:'负责人',
                        prop:'responsibleName',
                        minWidth:'108px'
                    },
                    {
                        label:'总经费',
                        prop:'budget',
                        minWidth:'132px'
                    },
                    {
                        label:'国家拨款',
                        prop:'funds',
                        minWidth:'158px'
                    },
                    {
                        label:'单位自筹',
                        prop:'selfRaised',
                        minWidth:'158px'
                    }
                ],
                // 分页器所需字段
                // 总条数
                total:0,
                // 每页条数
                pageSize: 10,
                // 总页数
                pageNum:1,
                currentPage:1,
                // 新增课题所需字段
                taskName:'',// 课题名称
                leaderCompanyCode:'',// 牵头机构代码
                taskResponsibleAccount:'',// 负责人
                responsiableAdvisor:[],// 负责人
                responsableDepartment:[],//承担单位
                taskResponsibleAccountList:[],// 负责人code和name
                leaderCompanyCodeList:[],// 承担单位code和name
                budget:'',// 总经费需求
                funds:'',// 国家拨款需求
                selfRaised:'',// 单位自筹需求
                indexNo:'',// 序号
                taskTotal:'',// 课题总数
                newTableData:[],
                // 保存所需字段
                declareId:'',// 主键ID
            }
        },
        created(){
          if (this.$route.query){
            this.declareId = this.$route.query.id;
            this.getInitInfo();// 初始化查询
          }
            // if (this.$route.query.declareId) {
            //     this.declareId = this.$route.query.declareId;
            //     this.getInitInfo();// 初始化查询
            //     this.taskFlag = true;
            // }
        },
        methods:{
            // 初始化查询
            getInitInfo(){
                declareTaskList(this.declareId).then(res=>{
                    if(res.result == "SUCCESS"){
                        this.tableData = res.data.list;
                        this.taskTotal = res.data.total;
                    }
                })
            },
            //负责人选择
            responsibleAccountchoice(val) {
                this.taskResponsibleAccountList = val;
            },
            // 承担单位选择
            companychoice(val) {
                this.leaderCompanyCodeList = val;
            },
            // 新增课题弹框
            addNewProject(){
                this.addDialogFlag = true;
                this.taskName = '';// 课题名称
                this.responsableDepartment = [];// 牵头机构代码
                this.responsiableAdvisor= [];// 负责人
                this.budget = '';// 总经费需求
                this.funds = '';// 国家拨款需求
                this.selfRaised = '';// 单位自筹需求
            },
            // 关闭课题弹框
            closeNewProject(){
                this.addDialogFlag = false;
            },
            // 新增课题 确定
            sureNewProject(){
                // 负责人
                let personNameArr = [];
                let personCodeArr = [];
                if (this.taskResponsibleAccountList.length > 0) {
                    this.taskResponsibleAccountList.map((v, i) => {
                        personNameArr.push(v.name);
                        personCodeArr.push(v.code);
                    });
                }
                // 承担单位
                let conpanyNameArr = [];
                let conpanyCodeArr = [];
                if (this.leaderCompanyCodeList.length > 0) {
                    this.leaderCompanyCodeList.map((v, i) => {
                        conpanyNameArr.push(v.name);
                        conpanyCodeArr.push(v.code); 
                    });
                }
                // 校验
                if(!this.taskName){
                    this.$message({
                        message: "请输入课题名称!",
                        type: "info"
                    });
                    return false;
                }else  if(!this.budget){
                    this.$message({
                        message: "请输入总经费!",
                        type: "info"
                    });
                    return false;
                }else  if(!this.funds){
                    this.$message({
                        message: "请输入国家拨款!",
                        type: "info"
                    });
                    return false;
                }else  if(!this.selfRaised){
                    this.$message({
                        message: "请输入单位自筹!",
                        type: "info"
                    });
                    return false;
                }else if(this.taskResponsibleAccountList.length<=0 && this.responsiableAdvisor.length<=0){
                    this.$message({
                        message: "请输入负责人!",
                        type: "info"
                    });
                    return false;
                }else if(this.taskResponsibleAccountList.length>=2){
                    this.$message({
                        message: "负责人只能选择一个!",
                        type: "info"
                    });
                    return false;
                }else if(this.leaderCompanyCodeList.length<=0 && this.responsableDepartment.length<=0){
                    this.$message({
                        message: "请输入承担单位!",
                        type: "info"
                    });
                    return false;
                }else if(this.leaderCompanyCodeList.length>=2){
                    this.$message({
                        message: "承担单位只能选择一个!",
                        type: "info"
                    });
                    return false;
                }else{
                    // 前端页面展示
                    let obj = {
                        declareId:this.declareId,// 项目申报Id
                        taskName:this.taskName,// 课题名称
                        leaderCompanyCode:conpanyCodeArr.join(''),// 承担单位code
                        leaderCompanyName:conpanyNameArr.join(''),// 承担单位name
                        taskResponsibleAccount:personCodeArr.join(''),// 负责人code
                        responsibleName:personNameArr.join(''),// 负责人name
                        budget:this.budget,// 总经费需求
                        funds:this.funds,// 国家拨款需求
                        selfRaised:this.selfRaised,// 单位自筹需求
                    }
                    if(this.tableData == null){
                        this.tableData = []
                        this.tableData.push(obj);
                    }else{
                        this.tableData.push(obj);
                    }
                    this.addDialogFlag = false;
                }
            },
             // 返回
            goBack(){
                window.history.go(-1);
            },
            // 课题分解 保存
            saveInfo(){
                declareTaskSave(this.tableData).then(res=>{
                    if(res.result == "SUCCESS"){
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.getInitInfo();// 初始化查询
                    }
                })
            },
            deleteItem(row){
               console.log(row)
            },

        }
    }
</script>

<style lang="scss" scoped>
.pageWarpper{
    width: 990px;
    height: auto;
    background-color: #f5f5f5;
    // position: relative;
	padding-bottom: 40px;
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
    .wrapperMain{
        width: 980px;
        box-sizing: border-box;
        background-color: #fff;
        // padding: 20px 0px 0px 0px;
        overflow: hidden;
        margin: 0 10px;
        .editItem{
            display: flex;
            padding: 0 20px 20px ;
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
                
                .editArea{
                    display: flex;
                    align-items: center;
                }
            }
        }
        .content{
            display: flex;
            justify-content: space-between;
            .section{
                width: 820px;
                //  padding-top: 20px;
                background-color: #f5f5f5;
                .changeItem{
                    .changeTitle {
                        display: flex;
                        align-items: center;
                        padding:0 0 20px 0;
                        padding-left: 20px;
                        background-color: #fff;
                        p{
                            font-size: 16px;
                            font-weight: bold;
                             color: #666;
                        }
                        
                    }
                    .changeMain{
                        flex: 1;
                        padding: 10px 0;
                        background: #f6f8fd;
                    }
                    .changeFooter{
                        padding-top: 60px;
                        padding-bottom: 60px;
                        height: 46px;
                        background-color: #fff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
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
                .resumeWrapper{
                    background-color: #fff;
                    padding-left: 20px;
                    .resumeTitle {
                        display: flex;
                        align-items: center;
                        padding: 10px 0 10px 0;
                        p{
                            font-size: 16px;
                            font-weight: bold;
                            color: #666;
                        }
                    
                    }
                    .resumeSection{
                        padding: 0 10px 40px 0px;
                        .tableBox{
                            padding:0 !important;
                        }
                    }
                    .resumeItem{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 16px;
                        color:#666;
                        padding: 10px 10px 20px 0;
                        .resumeArea{
                            display: flex;
                            align-items: center;
                            p{
                                padding-right: 10px;
                                text-align: end;
                            }
                        }
                    }
                }
            }
        }
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
        z-index:9999;
        .dialogTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 30px 16px;
            p{
                font-size: 18px;
                color:#666;
                font-weight: bold;
            }
        }
         .historyBox{
            width:736px;
            height: 386px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            background: #fff;
            border-radius: 10px;
            // padding:30px 0;
            z-index:99;
            display: flex;
            flex-direction: column;
            .historySearch{
                width: 660px;
                border:2px solid #b5b5b5;
                margin: 0 auto;
                display: flex;
                border-radius: 6px;
                padding: 30px 0;
                flex-direction: column;
                padding-right: 20px;
                .editItem{
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    color: #666;
                    padding-bottom: 25px;
                    font-size: 14px;
                    .editCenter{
                        display: flex;
                        align-items: center;
                        .editName{
                            text-align: end;
                            padding-right: 10px;
                            display: flex;
                            flex-direction: column;
                            width: 102px;
                            span{
                                font-size: 12px;
                            }
                        }
                        .treeBox{
                            width: 220px;
                            height: 30px;
                        }
                        .editContent{
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
            .historyMain{
                width: 680px;
                margin: 20px auto;
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
    }
    
}
</style>