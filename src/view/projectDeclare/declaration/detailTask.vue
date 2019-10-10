<template>
    <!-- 查看详情任务 -->
    <div class="pageWarpper">
        <topTitle title="新建任务"></topTitle>
        <div class="wrapperMain">
            <div class="section">
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">上级任务</div>
                        <div class="editContent">
                            <inputs class="inputs" disableds="true" width="220px" v-model="parentTaskId" height="30px"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">任务名称</div>
                        <div class="editContent">
                           <inputs class="inputs" disableds="true" width="220px" v-model="name" height="30px"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">任务状态</div>
                        <div class="editContent">
                            <inputs class="inputs" disableds="true" width="140px" v-model="status" height="30px"></inputs>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">任务描述</div>
                        <div class="editContent" style="width:856px;padding-right: 0px;">
                           <el-input type="textarea" v-model="discription" maxlength="1000" disabled="disabled"></el-input>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">开始时间</div>
                        <div class="editContent">
                            <inputs class="inputs" disableds="true" width="240px" v-model="startDatetime" height="30px"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">结束时间</div>
                        <div class="editContent">
                           <inputs class="inputs" disableds="true" width="240px" v-model="endDatetime" height="30px"></inputs>
                        </div>
                    </div>
                     <div class="editCenter" style="width:208px;"></div>
                </div>
                <div class="resumeWrapper">
                    <div class="resumeTitle">
                        <p>负责人</p>
                    </div>
                    <div class="resumeSection" v-show="principalFlag">
                        <declareTable :tableData="principalData" :tableHeader="principalHeader" @data="deleteItem" :disabled="true"></declareTable>
                    </div>
                </div>
                <div class="resumeWrapper">
                    <div class="resumeTitle">
                        <p>交付物</p>
                    </div>
                    <div class="resumeSection" v-show="deliverableFlag">
                        <declareTable :tableData="deliverableData" :tableHeader="deliverableHeader" @data="deleteItem" :disabled="true"></declareTable>
                    </div>
                </div>
                <div class="changeFooter">
                    <button class="ret" @click="goBack">返回</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import inputs from '../../../components/common/input.vue'
    import datePicker from '../../../components/common/datePicker.vue'
    import menuList from './component/createDeclareLeftMenu.vue'
    import TableCommon from '../../../components/common/TableCommon.vue'
    import PaginationCommon from '../../../components/common/PaginationCommon.vue'
    import topTitle from '../../../components/common/topTitle.vue'
    import declareTable from '../../../components/common/declareTable.vue'
    import {workTaskGetWorkTaskInfo,personnellistPersonnelBo} from 'http/formalDeclaration'
    export default {
        name:'createDeclaration',
        components:{
            inputs,
            datePicker,
            menuList,
            TableCommon,
            PaginationCommon,
            topTitle,
            declareTable
        },
        data(){
            return {
                personAccounts:[],//负责人姓名集合
                topcId:'',//主键id
                parentTaskId:'',//上级任务Id
                name:'',//任务名称
                status:'',//任务状态
                discription:'',//任务描述
                startDatetime:'',//开始时间
                endDatetime:'',//结束时间
                subject:'',
                optionList:[],
                dialogFlag:false,// 控制负责人选择的弹窗展示隐藏
                principalFlag:true,// 控制负责人的列表展示隐藏
                deliverableFlag:true,// 控制交付物的列表展示隐藏
                addDialogFlag:false,// 控制交付物的弹窗展示隐藏
                // 负责人
                principalData:[],
                principalHeader:[
                    {
                        label:'姓名',
                        prop:'name',
                        minWidth:'362px'
                    },
                    {
                        label:'单位',
                        prop:'companyName',
                        minWidth:'364px'
                    }
                ],
                // 交付物
                deliverableData:[],
                deliverableHeader:[
                    {
                        label:'内容',
                        prop:'name',
                        minWidth:'362px'
                    },
                    {
                        label:'类型',
                        prop:'type',
                        minWidth:'364px'
                    }
                ],
                tableData:[{
                    code:'111111',
                    id:1
                },{
                    code:'222222',
                    id:2
                }],
                tableHeader:[
                    {
                        label:'姓名',
                        prop:'code',
                        minWidth:'110px'
                    },
                    {
                        label:'性别',
                        prop:'title',
                        minWidth:'66px'
                    },
                    {
                        label:'出生日期',
                        prop:'state',
                        minWidth:'110px'
                    },
                    {
                        label:'工作单位',
                        prop:'Hierarchy',
                        minWidth:'102px'
                    },
                    {
                        label:'职称',
                        prop:'parentCode',
                        minWidth:'92px'
                    },
                    {
                        label:'职务',
                        prop:'reportEndDate',
                        minWidth:'94px'
                    },
                    {
                        label:'最高学历',
                        prop:'name',
                        minWidth:'122px'
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
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 6,
                        label: '二级 1-1'
                    }]
                    },{
                    id: 2,
                    label: '二级 2',
                    children: [{
                        id: 5,
                        label: '二级 1-5'
                    },{
                        id: 3,
                        label: '二级 1-3'
                    },{
                        id: 4,
                        label: '二级 1-4'
                    }]
                }],
            }
        },
        created(){
            this.topcId = this.$route.query.id;
            this.principalDataList();
        },
        methods:{
            //初始化查询
            getUnitInfo(){
                return workTaskGetWorkTaskInfo({id:this.topcId}).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.parentTaskId = res.data.workTask.parentTaskId;//上级任务
                        this.name = res.data.workTask.name;//任务名称
                        this.status = res.data.workTask.status;//任务状态
                        this.discription = res.data.workTask.discription;//任务描述
                        this.startDatetime = res.data.workTask.startDatetime;//开始时间
                        this.endDatetime = res.data.workTask.endDatetime;//结束时间
                        this.personAccounts = res.data.personAccounts;//负责人信息
                        this.deliverableData = res.data.workTaskDeliveries;//交付物
                    }
                })
            },
            //查询负责人列表
            async principalDataList(){
                await this.getUnitInfo();
                personnellistPersonnelBo({codes:this.personAccounts}).then(res=>{
                    this.principalData = res.data;
                })
            },
            // 返回
            goBack(){
                window.history.go(-1);
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
    padding-bottom: 40px;
    position: relative;
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
        width: 970px;
        box-sizing: border-box;
        background-color: #fff;
        padding: 20px 0px 0px 0px;
        overflow: hidden;
        margin: 0 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
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
                    margin-left: 24px;
                }
            }
        }
        .section{
            width: 970px;
             .changeFooter{
                margin: 0px 10px;
                padding-top: 50px;
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
            .resumeWrapper{
                background-color: #fff;
                padding: 0 20px;
                .resumeTitle {
                    display: flex;
                    align-items: center;
                    padding:20px 0 12px 0;
                    p{
                        font-size: 16px;
                        font-weight: bold;
                            color: #666;
                    }
                
                }
                .resumeSection{
                    padding-bottom: 10px;
                    padding-left: 66px;
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
            padding: 0 30px 16px;
            p{
                font-size: 18px;
                color:#666;
                font-weight: bold;
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
        .editItem{
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            color: #666;
            .editCenter{
                display: flex;
                align-items: center;
                padding-left: 20px;
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
                }
            }
        }
        .dialogBox{
            width:822px;
            height: 440px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            background: #fff;
            border-radius: 10px;
            padding:30px 0;
            z-index:99;
            display: flex;
            flex-direction: column;
            .dialogSearch{
                width: 760px;
                border:1px solid #b5b5b5;
                margin: 0 auto;
                display: flex;
                align-items: center;
                border-radius: 6px;
                padding: 20px 0;
                
            }
            .dialogMain{
                width: 760px;
                margin: 20px auto;
                .tableBox{
                    padding: 0 !important;
                }
                
            }
            .dialogFooter{
                width: 760px;
                .pagination{
                    width: 760px !important;
                }
            }
        }
        .addBox{
            width:532px;
            height: 508px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            background: #fff;
            border-radius: 10px;
            padding:30px 0;
            z-index:99;
            display: flex;
            flex-direction: column;
            .documentBox{
                width: 470px;
                height: 276px;
                margin: 0 auto;
                margin-top:30px;
                overflow: hidden;
                overflow-y: scroll;
                border:1px solid #ccc;
                padding: 10px;
                .documentTitle{
                    font-size: 16px;
                    color:#666;
                    margin-bottom: 20px;
                }
            }
        }
    }
}
</style>