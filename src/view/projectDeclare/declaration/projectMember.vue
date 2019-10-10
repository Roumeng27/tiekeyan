<template>
    <!-- 项目成员 -->
    <div class="pageWarpper">
        <div class="wrapperMain">
            <div class="content">
                <div class="leftMenu">
                    <menuList index='2'></menuList>     
                </div>
                <div class="section">
                    <div class="changeItem">
                        <div class="changeTitle">
                            <p>项目负责人</p>
                            <button class="fadeInBtn" @click="changeProjectContact ">选择</button>
                        </div>
                        <div class="changeWrapper" v-show="changeFlag">
                            <div class="changeMain" >
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName" style="margin-left:30px;">姓名</div>
                                        <div class="editContent">
                                            <inputs class="inputs" width="280px" v-model="name" height="30px"></inputs>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editArea">
                                            <div class="editName">性别</div>
                                            <div class="editContent">
                                                <inputs class="inputs" width="74px" v-model="gender" height="30px"></inputs>
                                            </div>
                                        </div>
                                        <div class="editArea" style="padding-left:5px;">
                                            <div class="editName">出生日期</div>
                                            <div class="editContent">
                                                <inputs class="inputs" width="128px" v-model="birthday" height="30px"></inputs>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">证件类型</div>
                                        <div class="editContent">
                                            <inputs class="inputs" width="280px" v-model="idType" height="30px"></inputs>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">证件号码</div>
                                        <div class="editContent">
                                        <inputs class="inputs" width="280px" v-model="idNo" height="30px"></inputs>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">最高学历</div>
                                        <div class="editContent">
                                            <inputs class="inputs" width="280px" v-model="degree" height="30px"></inputs>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">所在单位</div>
                                        <div class="editContent">
                                        <inputs class="inputs" width="280px" v-model="companyName" height="30px"></inputs>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName"  style="margin-left:30px;">职称</div>
                                        <div class="editContent">
                                            <inputs class="inputs" width="280px" v-model="title" height="30px"></inputs>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">职务</div>
                                        <div class="editContent">
                                        <inputs class="inputs" width="280px" v-model="job" height="30px"></inputs>
                                        </div>
                                    </div>
                                </div>
                                <div class="editItem">
                                    <div class="editCenter">
                                        <div class="editName">移动电话</div>
                                        <div class="editContent">
                                            <inputs class="inputs" width="280px" v-model="phone" height="30px"></inputs>
                                        </div>
                                    </div>
                                    <div class="editCenter">
                                        <div class="editName">电子邮箱</div>
                                        <div class="editContent">
                                        <inputs class="inputs" width="280px" v-model="email" height="30px"></inputs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="resumeBox">
                                <div class="resumeTitle">
                                    <p>工作简历 (限1000字以内)</p>
                                </div>
                                <div class="resumeMain">
                                    <el-input type="textarea" v-model="resume" maxlength="1000"></el-input>
                                </div>
                            </div>
                            <div class="resumeBox" >
                                <div class="resumeTitle">
                                    <p>承担的其他研究项目情况</p>
                                    <button class="fadeInBtn" @click="addHistoryCase">新增</button>
                                </div>
                                <div class="resumeSection">
                                    <declareTable :tableData="declareExperienceList" :tableHeader="declareExperienceHeader" @data="deleteItem"></declareTable>
                                </div>
                            </div>
                        </div>
                        <div class="resumeWrapper" style="margin:10px 0">
                            <div class="resumeTitle">
                                <p>项目成员信息</p>
                                <button class="fadeInBtn"  @click="addPerson">新增</button>
                            </div>
                            <div class="resumeSection" v-show="memberInfoFlag">
                                <participateTable :tableData="projectMemberData" :proMemberFlag="true"  @proDivisionList="proDivisionList" :tableHeader="projectMemberHeader" @data="deleteItem"></participateTable>
                            </div>
                        </div>
                        <div class="resumeWrapper" style="margin-top:10px">
                            <div class="resumeItem">
                                <div class="resumeArea">
                                    <p>项目参加人数</p>
                                    <inputs class="inputs" width="60px" v-model="personNum" height="30px" disabled="true"></inputs>
                                </div>
                            </div>
                            <div class="resumeItem">
                                <div class="resumeArea">
                                    <p>高级职称人数</p>
                                    <inputs class="inputs" width="60px" v-model="seniorTitleNum" height="30px" disabled="true"></inputs>
                                </div>
                                <div class="resumeArea">
                                    <p>中级职称人数</p>
                                    <inputs class="inputs" width="60px" v-model="middleTitleNum" height="30px" disabled="true"></inputs>
                                </div>
                                <div class="resumeArea">
                                    <p>初级职称人数</p>
                                    <inputs class="inputs" width="60px" v-model="primaryTitleNum" height="30px" disabled="true"></inputs>
                                </div>
                                <div class="resumeArea">
                                    <p>其他人数</p>
                                    <inputs class="inputs" width="60px" v-model="otherTitleNum" height="30px" disabled="true"></inputs>
                                </div>
                            </div>
                            <div class="resumeItem">
                                <div class="resumeArea">
                                    <p>硕士人数</p>
                                    <inputs class="inputs" width="60px" v-model="masterNum" height="30px" disabled="true"></inputs>
                                </div>
                                <div class="resumeArea">
                                    <p>学士人数</p>
                                    <inputs class="inputs" width="60px" v-model="bachelorNum" height="30px" disabled="true"></inputs>
                                </div>
                                <div class="resumeArea">
                                    <p>博士人数</p>
                                    <inputs class="inputs" width="60px" v-model="doctorNum" height="30px" disabled="true"></inputs>
                                </div>
                                <div class="resumeArea">
                                    <p>其他人数</p>
                                    <inputs class="inputs" width="60px" v-model="otherDegreeNum" height="30px" disabled="true"></inputs>
                                </div>
                            </div>
                        </div>
                        <div class="changeFooter">
                            <button class="ret" @click="goBack">返回</button>
                            <button class="hold" @click="saveInfo">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 项目成员选择弹框 -->
        <div class="dialogWrapper" v-show="changeDialog">
            <div class="dialogBox">
                <div class="dialogTitle">
                    <p>项目负责人选择</p>
                    <img src="../../../assets/img/components/close.png" alt="" @click="closeChangeDialog">
                </div>
                <div class="dialogSearch">
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">单位代码</div>
                            <div class="editContent">
                                <inputs class="inputs" width="70px" v-model="changeCompanyCode" height="30px"></inputs>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">单位名称</div>
                            <div class="editContent">
                                <inputs class="inputs" width="200px" v-model="changeCompanyName" height="30px"></inputs>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">姓名</div>
                            <div class="editContent">
                               <inputs class="inputs" width="90px" v-model="changeName" height="30px"></inputs>
                            </div>
                        </div>
                        <button class="fadeInBtn" @click="searchDetail(1)">查询</button>
                    </div>
                </div>
                <div class="dialogMain">
                    <TableCommon :tableData="tableData" :tableHeader="changeHeader" @getTemplatePick="getTemplatePick" :radioFlag="true"></TableCommon>
                </div>
                 <div class="changeBtn">
                    <button class="ret" @click="closeChangeDialog">取消</button>
                    <button class="hold" @click="changeSure">确定</button>
                </div>
                <div class="dialogFooter">
                    <PaginationCommon :total="total" :pages='pageNum' :page-size="pageSize" @modifypageSize="modifypageSize"  @handleCurrentChangeSub="handleCurrentChange" :current-page="currentPage"></PaginationCommon>
                </div>
            </div>
        </div>
        <!-- 新增项目负责人选择弹框 -->
        <div class="dialogWrapper" v-show="dialogFlag">
            <div class="dialogBox">
                <div class="dialogTitle">
                    <p>项目成员选择</p> 
                    <img src="../../../assets/img/components/close.png" alt="" @click="closeProjectContact">
                </div>
                <div class="dialogSearch">
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">单位代码</div>
                            <div class="editContent">
                                <inputs class="inputs" width="220px" v-model="companyCodeAdd" height="30px"></inputs>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">姓名</div>
                            <div class="editContent">
                               <inputs class="inputs" width="220px" v-model="nameAdd" height="30px"></inputs>
                            </div>
                        </div>
                        <button class="fadeInBtn" @click="searchDetail(2)">查询</button>
                    </div>
                </div>
                <div class="dialogMain">
                    <TableCommon :tableData="addtableData" :tableHeader="changeHeader" @getTemplatePick="getTemplatePick"  :selectionFlag="true" @handleSelectionChange="handleSelectionChange"></TableCommon>
                    
                </div>
                <!-- <div class="dialogCase">
                    <p>项目分工</p>
                    <el-input type="textarea" v-model="project" maxlength="1000"></el-input>
                </div> -->
                 <div class="changeBtn">
                    <button class="ret" @click="closeProjectContact">取消</button>
                    <button class="hold" @click="addSure">确定</button>
                </div>
                <div class="dialogFooter">
                    <PaginationCommon :total="addtotal" :pages='addPageNum' :page-size="addPageSize" @modifypageSize="modifypageSizeAdd"  @handleCurrentChangeSub="handleCurrentAdd" :current-page="currentPage"></PaginationCommon>
                </div>

            </div>
        </div>
        <!-- 新增项目负责人历史参与项目弹框 -->
        <div class="dialogWrapper" v-if="historyDialogFlag">
            <div class="historyBox">
                <div class="dialogTitle">
                    <p>新增项目负责人历史参与项目</p>
                    <img src="../../../assets/img/components/close.png" alt="" @click="closeHistoryCase">
                </div>
                <div class="historySearch">
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">合同编号</div>
                            <div class="editContent">
                                <inputs class="inputs" width="100px" v-model="contractCode" height="30px"></inputs>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">项目名称</div>
                            <div class="editContent">
                               <inputs class="inputs" width="318px" v-model="contractName" height="30px"></inputs>
                            </div>
                        </div>
                    </div>
                    <div class="editItem">
                        <div class="editCenter">
                            <div class="editName">起止时间</div>
                            <div class="editContent">
                                <datePicker class="inputs" width="220px" v-model="startDate" height="30px"></datePicker>
                            </div>
                        </div>
                        <span style="width:100px;display:block;text-align:center;line-height: 30px;">—</span>
                        <div class="editCenter">
                            <div class="editContent">
                               <datePicker class="inputs" width="220px" v-model="endDate" height="30px"></datePicker>
                            </div>
                        </div>
                    </div>
                     <div class="editItem" style="padding-bottom:0;">
                        <div class="editCenter">
                            <div class="editName">负责或参加</div>
                            <div class="editContent">
                                <el-select
                                    v-model="participation"
                                    placeholder="请选择"
                                    clearable
                                    size="small">
                                    <el-option
                                    v-for="item in participationSelect"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="editCenter">
                            <div class="editName">进度或完成情况</div>
                            <div class="editContent">
                               <el-select
                                    v-model="projess"
                                    placeholder="请选择"
                                    clearable
                                    size="small">
                                    <el-option
                                    v-for="item in projessSelect"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="historyMain">
                    <div class="changeBtn">
                        <button class="ret" @click="closeHistoryCase">取消</button>
                        <button class="hold" @click="addDeclarePersonInfo">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import inputs from '../../../components/common/input.vue'
    import datePicker from '../../../components/common/dateCommon.vue'
    import menuList from './component/createDeclareLeftMenu.vue'
    import TableCommon from '../../../components/common/TableCommon.vue'
    import PaginationCommon from '../../../components/common/PaginationCommon.vue'
    import participateTable from '../../../components/common/participateTable.vue'
    import declareTable from '../../../components/common/declareTable.vue'
    import {declarePersonSelect, declarePersonUpdate, declarePersonInsert,personnelDetail} from "../../../http/impl/formalDeclaration"
    export default {
        name:'projectMember',
        components:{
            inputs,
            datePicker,
            menuList,
            TableCommon,
            PaginationCommon,
            declareTable,
            participateTable
        },
        data(){
            return {
                tableData:[],
                subject:'',
                optionList:[],
                changeFlag:false,// 项目负责人详情信息展示或隐藏
                dialogFlag:false,// 项目负责人弹框
                historyDialogFlag:false,// 新增项目负责人历史参与项目弹框
                memberInfoFlag:true,// 项目成员信息列表
                changeDialog:false,// 项目负责人选择
                // 承担的其他项目研究情况
                declareExperienceList:[],// 承担的其他项目研究情况数组
                declareExperienceHeader:[
                    {
                        label:'合同编号',
                        prop:'contractCode',
                        minWidth:'122px'
                    },
                    {
                        label:'项目名称',
                        prop:'contractName',
                        minWidth:'210px'
                    },
                    {
                        label:'起止年月',
                        prop:'startDate',
                        minWidth:'108px'
                    },
                    {
                        label:'负责或参加',
                        prop:'participation',
                        minWidth:'132px'
                    },
                    {
                        label:'进展或完成情况',
                        prop:'projess',
                        minWidth:'158px'
                    }
                ],
                projectMemberData:[],
                // 项目负责人列表展示
                projectMemberHeader:[
                     {
                        label:'姓名',
                        prop:'name',
                        minWidth:'110px'
                    },
                    {
                        label:'性别',
                        prop:'gender',
                        minWidth:'50px'
                    },
                    {
                        label:'年龄',
                        prop:'age',
                        minWidth:'80px'
                    },
                    {
                        label:'最高学历',
                        prop:'name',
                        minWidth:'122px'
                    },
                    {
                        label:'工作单位',
                        prop:'companyName',
                        minWidth:'102px'
                    },
                    {
                        label:'职称',
                        prop:'title',
                        minWidth:'92px'
                    },
                    {
                        label:'职务',
                        prop:'job',
                        minWidth:'94px'
                    }
                ],
                changeHeader:[
                    {
                        label:'姓名',
                        prop:'name',
                        minWidth:'110px'
                    },
                    {
                        label:'性别',
                        prop:'gender',
                        minWidth:'66px'
                    },
                    {
                        label:'出生日期',
                        prop:'birthday',
                        minWidth:'110px'
                    },
                    {
                        label:'最高学历',
                        prop:'degree',
                        minWidth:'122px'
                    },
                    {
                        label:'工作单位',
                        prop:'companyName',
                        minWidth:'102px'
                    },
                    {
                        label:'职称',
                        prop:'title',
                        minWidth:'92px'
                    },
                    {
                        label:'职务',
                        prop:'job',
                        minWidth:'94px'
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
                // 人数
                responsibleAccount:'',// 负责人账号
                seniorTitleNum:'',// 正高级职称人数
                viceSeniorTitleNum:'',// 副高级职称人数（高级职称人数=正高+副高）
                middleTitleNum:'',// 中级职称人数
                primaryTitleNum:'',// 初级职称人数
                otherTitleNum:'',// 其他职称人数
                doctorNum:'',// 博士学历人数
                masterNum:'',// 硕士学历人数
                bachelorNum:'',// 学士学历人数
                otherDegreeNum:'',// 其他学历人数
                personNum:'',// 成员数（项目参加人数=成员数+1）
                // 
                contractCode:'',// 合同编号
                contractName:'',// 项目名称
                startDate:'',// 开始时间
                endDate:'',// 结束时间
                participation:'',// 参与方式
                projess:'',// 进度
                // 负责或参加下拉框数据
                participationSelect:[{
                    value: '负责',
                    label: '负责'
                },{
                    value: '参加',
                    label: '参加'
                } ],
                // 进度或完成情况下拉框数据
                projessSelect:[{
                    value: '已完成',
                    label: '已完成'
                },{
                    value: '进行中',
                    label: '进行中'
                } ],
                // 成员基本信息
                account:'',// 项目成员账号
                companyName:'',// 机构名称
                companyCode:'',// 机构代码
                departmentCode:'',// 部门代码
                name:'',// 姓名
                job:'',// 职务
                gender:'',// 性别
                birthday:'',// 生日
                idType:'身份证',// 证件类型
                idNo:'',// 证件号
                major:'',// 专业
                degree:'',// 学位
                title:'',// 职称
                mobile:'',// 手机
                phone:'',// 联系电话
                email:'',// 邮箱
                resume:'',// 简历
                rowDetail:{},// 点击单选框选中的数据
                // 查询所需字段
                // 项目负责人选择查询所需字段
                changeCompanyCode:'',//单位代码（可选，支持模糊查询）
                changeCompanyName:'',//单位名称 （可选，支持模糊查询）
                changeName:'',// 姓名（可选，支持模糊查询）
                // 项目成员新增查询所需字段
                nameAdd:'',// 姓名
                companyCodeAdd:'',// 单位代码
                types:'',// 查询项目类别
                multipleSelection:[],// 多选框选中的数据
                project:'',// 项目分工
                addtableData:[],// 查询项目成员列表数据
                addtotal:0,// 总条数
                addPageNum:1,// 总页数
                addPageSize:10,// 每页条数
                currentPage:1,
                infoFlag:false,
                // 保存所需字段
                declareId:'',// 主键ID
                keyId:'',
                proDivisionData:'',
            }
        },
        created(){
            if (window.sessionStorage.stateStr == '新增') {
                this.declareId = this.$route.query.declareId;
                window.localStorage.taskId = this.id;
                if(window.sessionStorage.jump == 'ok'){
                    // console.log('有')
                    // this.declareId = this.$route.query.declareId;
                }else{
                    console.log('没有')
                    this.$message({
                    message: "请先填写基本信息",
                    type: "error"
                    });
                    this.$router.push({
                                path:'/formalDeclaration/createDeclaration/projectInformation',
                                query:this.$route.query
                            })
                    return
                }
                // this.changeFlag = true;
            }else{
               // 新增
               this.declareId = this.$route.query.id;
               this.changeFlag = false;
            }
            this.getInitInfo();// 初始化查询
        },
        methods:{
            // 初始化查询
            getInitInfo(){
                // if(window.sessionStorage.stateStr == '编辑'){
                //     this.keyId = this.$route.query.declareId;
                //     this.declareId = this.keyId;
                // }else{
                //     this.declareId = this.$route.query.declareId;
                // }
                declarePersonSelect(this.declareId).then(res => {
                     this.changeFlag = true;
                    if (res.result == "SUCCESS" && res.data != null) {
                        // 项目成员信息
                        if(res.data.declarePersonListDetails != null){
                            res.data.declarePersonListDetails.map((v,i)=>{
                                // console.log(v.delcareJob)
                            })
                        }
                        this.projectMemberData = res.data.declarePersonListDetails;

                        // 承担的其他研究项目情况
                        this.declareExperienceList = res.data.declareExperienceList;
                        // 统计信息 res.data.declareVo
                        this.responsibleAccount	= res.data.declareVo.responsibleAccount;// 负责人账号
                        this.seniorTitleNum	= res.data.declareVo.seniorTitleNum + res.data.declareVo.viceSeniorTitleNum;// 正高级职称人数
                        this.viceSeniorTitleNum	= res.data.declareVo.viceSeniorTitleNum;// 副高级职称人数（高级职称人数=正高+副高）
                        this.middleTitleNum	= res.data.declareVo.middleTitleNum;// 中级职称人数
                        this.primaryTitleNum = res.data.declareVo.primaryTitleNum;// 初级职称人数
                        this.otherTitleNum = res.data.declareVo.otherTitleNum;// 其他职称人数
                        this.doctorNum = res.data.declareVo.doctorNum;// 博士学历人数
                        this.masterNum = res.data.declareVo.masterNum;// 硕士学历人数
                        this.bachelorNum = res.data.declareVo.bachelorNum;// 学士学历人数
                        this.otherDegreeNum	= res.data.declareVo.otherDegreeNum;// 其他学历人数
                        this.personNum	= res.data.declareVo.personNum;// 成员数（项目参加人数=成员数+1）
                        // 负责人信息 responsibleAccountDetails
                        if(res.data.declarePersonListDetails !=null){
                             this.account = res.data.responsibleAccountDetails.account;// 项目成员账号
                            this.companyName = res.data.responsibleAccountDetails.companyName;// 机构名称
                            this.companyCode = res.data.responsibleAccountDetails.companyCode;// 机构代码
                            this.departmentCode = res.data.responsibleAccountDetails.departmentCode;// 部门代码
                            this.name = res.data.responsibleAccountDetails.name;// 姓名
                            this.job = res.data.responsibleAccountDetails.job;// 职务
                            this.gender = res.data.responsibleAccountDetails.gender;// 性别
                            this.birthday = res.data.responsibleAccountDetails.birthday;// 生日
                            // this.idType = res.data.responsibleAccountDetails.idType;// 证件类型
                            this.idType = '身份证';// 证件类型
                            this.idNo = res.data.responsibleAccountDetails.idNo;// 证件号
                            this.major = res.data.responsibleAccountDetails.major;// 专业
                            this.degree = res.data.responsibleAccountDetails.degree;// 学位
                            this.title = res.data.responsibleAccountDetails.title;// 职称
                            this.mobile = res.data.responsibleAccountDetails.mobile;// 手机
                            this.phone = res.data.responsibleAccountDetails.phone;// 联系电话
                            this.email = res.data.responsibleAccountDetails.email;// 邮箱
                            // this.resume = res.data.responsibleAccountDetails.resume;// 简历
                        }
                        // 简历
                        this.resume = res.data.resume;
                    }else if(res.result == "SUCCESS" && res.data == null){
                        this.changeFlag = false;
                    }
                    
                })
            },
            //项目分工值
            proDivisionList(val){
                this.proDivisionData = val;
            },
            // 返回
            goBack(){
                window.history.go(-1);
            },
            
            // 项目成员选择
            changeProjectContact(){
                this.changeDialog = true;
                this.getProjectMember(1,this.pageSize);
            },
            // 关闭项目成员选择
            closeChangeDialog(){
                this.changeDialog = false;
            },
            // 单选框
            getTemplatePick(row){
                this.rowDetail = row
            },
            // 确定项目成员选择
            changeSure(){
                this.changeDialog = false;// 选择项目成员弹框关闭
                this.changeFlag = true;// 详情信息展示
                this.account = this.rowDetail.account;// 项目成员账号
                this.companyName = this.rowDetail.companyName;// 机构名称
                this.companyCode = this.rowDetail.companyCode;// 机构代码
                this.departmentCode = this.rowDetail.departmentCode;// 部门代码
                this.name = this.rowDetail.name;// 姓名
                this.job = this.rowDetail.job;// 职务
                this.gender = this.rowDetail.gender;// 性别
                this.birthday = this.rowDetail.birthday;// 生日
                // this.idType = this.rowDetail.idType;// 证件类型
                this.idType = '身份证';// 证件类型
                this.idNo = this.rowDetail.idNo;// 证件号
                this.major = this.rowDetail.major;// 专业
                this.degree = this.rowDetail.degree;// 学位
                this.title = this.rowDetail.title;// 职称
                this.mobile = this.rowDetail.mobile;// 手机
                this.phone = this.rowDetail.phone;// 联系电话
                this.email = this.rowDetail.email;// 邮箱
                // this.resume = this.rowDetail.resume;// 简历
                // input框清空
                this.changeCompanyCode = '';// 机构名称
                this.changeCompanyName = '';// 机构代码
                this.changeName = '';// 姓名
            },
            // 项目成员选择--- 模糊查询
            searchDetail(num){
                if(num == 1){
                     personnelDetail({
                        companyCode:this.changeCompanyCode,//单位代码（可选，支持模糊查询）
                        companyName:this.changeCompanyName,//单位名称 （可选，支持模糊查询）
                        name:this.changeName,// 姓名（可选，支持模糊查询）
                        pageNo:this.currentPage,// 页码
                        pageSize:this.pageSize,// 页显示量
                    }).then(res => {
                        if (res.result == "SUCCESS") {
                            this.tableData = res.data.list;// 返回的数据
                            this.total = res.data.rows;// 总条数
                        } 
                    })
                }else{
                    personnelDetail({
                        companyCode:this.companyCodeAdd,//单位代码（可选，支持模糊查询）
                        name:this.nameAdd,// 姓名（可选，支持模糊查询）
                        pageNo:this.currentPage,// 页码
                        pageSize:this.pageSize,// 页显示量
                    }).then(res => {
                        if (res.result == "SUCCESS") {
                            res.data.list.map((v,i)=>{
                                v.delcareJob = this.proDivisionData;
                            })
                            this.addtableData = res.data.list;// 返回的数据
                            this.addtotal = res.data.rows;// 总条数
                        } 
                    })
                }
               
            },
            
            // 修改每页显示条数
            modifypageSize(value){
                this.pageSize = value;
                this.getProjectMember(this.currentPage,this.pageSize)// 获取主题列表
            },
            // 项目负责人选择修改页码
            handleCurrentChange(v) { //页面点击
                this.currentPage = v;
                this.searchDetail(1);
            },
            // 项目成员选择修改页码
            handleCurrentAdd(v){
                this.currentPage = v;
                this.searchDetail(2);
            },
            modifypageSizeAdd(value){
                this.pageSize = value;
                this.getProjectLeader(this.currentPage,this.pageSize)// 获取主题列表
            },
            // 项目成员初始化查询
            getProjectMember(currentPage,pageSize){
                personnelDetail({
                    pageNo:currentPage,// 页码
                    pageSize:pageSize,// 页显示量
                }).then(res => {
                    if (res.result == "SUCCESS") {
                        this.tableData = res.data.list;// 返回的数据
                        this.total = res.data.rows;// 总条数
                    } 
                })
            },
            // 项目负责人初始化查询
            getProjectLeader(currentPage,pageSize){
                personnelDetail({
                    pageNo:currentPage,// 页码
                    pageSize:pageSize,// 页显示量
                }).then(res => {
                    if (res.result == "SUCCESS") {
                        this.addtableData = res.data.list;// 返回的数据
                        this.addtotal = res.data.rows;// 总条数
                    } 
                })
            },
            // 新增历史参与项目弹框
            addHistoryCase(){
                // input框清空
                this.contractName = '';// 项目名称
                this.contractCode = '';// 合同编号
                this.startDate = '';// 开始时间
                this.endDate = '';// 结束时间
                this.participation = '';// 参与方式
                this.projess = '';// 进度
                this.historyDialogFlag = true;
            },
            // 关闭历史参与项目弹框
            closeHistoryCase(){
                this.historyDialogFlag = false;
            },
            // 新增项目负责人历史参与项目 确定
            addDeclarePersonInfo(){
                if(!this.contractCode){
                    this.$message({
                        message: "请输入合同编号!",
                        type: "info"
                    });
                    return false;
                }else if(!this.contractName){
                    this.$message({
                        message: "请输入项目名称!",
                        type: "info"
                    });
                    return false;
                }else if(!this.startDate){
                    this.$message({
                        message: "请选择开始时间!",
                        type: "info"
                    });
                    return false;
                }else if(!this.endDate){
                    this.$message({
                        message: "请选择结束时间!",
                        type: "info"
                    });
                    return false;
                }else if (
                    new Date(this.startDate).getTime() >=
                    new Date(this.endDate).getTime()
                ) {
                    this.$message({
                    message: "请选择正确的时间格式!",
                    type: "info"
                    });
                    return false;
                }else if(!this.participation){
                    this.$message({
                        message: "请选择参与方式!",
                        type: "info"
                    });
                    return false;
                }else if(!this.projess){
                    this.$message({
                        message: "请选择进度!",
                        type: "info"
                    });
                    return false;
                }
                let obj={
                    contractCode:this.contractCode,// 合同编号
                    contractName:this.contractName,// 项目名称
                    startDate:this.startDate,// 开始时间
                    endDate:this.endDate,// 结束时间
                    participation:this.participation,// 参与方式
                    projess:this.projess,// 进度
                }
                if(this.declareExperienceList == null){
                    this.declareExperienceList = []
                    this.declareExperienceList.push(obj);
                }else{
                    this.declareExperienceList.push(obj);
                }
                this.historyDialogFlag = false;
                
            },
            deleteItem(row){
                console.log(row)
            },
            // 新增项目负责人
            addPerson(){
                this.dialogFlag = true;
                this.getProjectLeader(this.currentPage,this.pageSize)// 获取主题列表
            },
            // 关闭项目负责人选择
            closeProjectContact(){
                this.dialogFlag = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //  新增项目负责人确定
            addSure(){
                let flag = true;
                if(this.projectMemberData != null){
                    for(let i=0;i<this.projectMemberData.length;i++){
                        for(let j=0;j<this.multipleSelection.length;j++){
                            if(this.projectMemberData[i].id == this.multipleSelection[j].id){
                                this.$message({
                                    message: "该成员已添加",
                                    type: "info"
                                });
                                flag = false;
                            }
                        }
                    }
                }
                if(flag){
                    // let array = [];// 新数组
                    // let list = [];// 旧数组
                    // list = this.multipleSelection;
                    // list.map((item,index)=>{
                    //     array.push(
                    //         Object.assign({},item,{delcareJob:this.project})
                    //     )
                    // });
                    if(this.projectMemberData == null){
                        this.projectMemberData = [];
                    }
                    // 合并后的数组
                    let concatArr = this.projectMemberData.concat(this.multipleSelection)
                    this.projectMemberData = concatArr;
                    this.dialogFlag = false;
                    // input框清空
                    this.project = '';
                    this.companyCodeAdd = '';// 单位代码
                    this.nameAdd = '';// 姓名
                }
            },
            // 保存项目成员信息
            saveInfo(){
                    // if(window.sessionStorage.stateStr == '编辑'){
                    //     this.keyId = this.$route.query.declareId;
                    //     this.declareId = this.keyId;
                    // }else{
                    //     this.declareId = this.$route.query.declareId;
                    // }
                    // 新增
                    if(this.declareId != null){
                        // 项目成员信息  
                        let arr = [];
                        let obj = {};
                        this.projectMemberData.forEach(item=>{
                            obj = {
                                account:item.account,
                                job:item.delcareJob
                            }
                            arr.push(obj)
                        })
                        declarePersonInsert({
                            declareId:this.declareId,
                            responsibleAccount:this.account,
                            resume:this.resume,// 简历
                            declarePersonList:arr,// 项目成员信息
                            declareExperienceList:this.declareExperienceList,// 承担的其他研究项目情况
                        }).then(res => {
                            if (res.result == "SUCCESS") {
                                this.$message({
                                    message: "保存成功",
                                    type: "success"
                                });
                            }else{
                                this.infoFlag = true;
                            }
                        })
                        
                    }
                        
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
                background-color: #f5f5f5;
                .changeItem{
                    .changeTitle {
                        display: flex;
                        align-items: center;
                        padding: 10px 0 10px 20px;
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
                .resumeBox{
                     background-color: #fff;
                    .resumeTitle {
                        display: flex;
                        align-items: center;
                        padding:30px 0 12px 0;
                        margin-left: 20px;
                        p{
                            font-size: 16px;
                            font-weight: bold;
                             color: #666;
                        }
                        
                    }
                    .resumeMain{
                        height: 230px;
                        padding: 0 20px;
                        .el-textarea{
                            height: 230px;
                        }
                    }
                    .resumeSection{
                        padding: 0 10px;
                        padding-bottom: 20px;
                    }
                }
                .resumeWrapper{
                    background-color: #fff;
                    padding-left: 20px;
                    .resumeTitle {
                        display: flex;
                        align-items: center;
                        padding:30px 0 12px 0;
                        p{
                            font-size: 16px;
                            font-weight: bold;
                                color: #666;
                        }
                    
                    }
                    .resumeSection{
                        padding-bottom: 20px;
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
                                width: 118px;
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
        z-index:999;
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
            width:822px;
            height: 560px;
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
            }
            .dialogMain{
                width: 760px;
                margin: 20px auto;
                overflow-y: scroll;
                .tableBox{
                    padding: 0 !important;
                }
                
            }
            .dialogCase{
                width: 760px;
                 margin: 0px auto;
                p{
                    line-height: 40px;
                    font-size: 16px;
                    color:#666;
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
            .dialogFooter{
                width: 760px;
                .pagination{
                    width: 760px !important;
                }
            }
        }
         .historyBox{
            width:736px;
            height: 436px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            background: #fff;
            border-radius: 10px;
            padding:30px 0;
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
                    padding-bottom: 54px;
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