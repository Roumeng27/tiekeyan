<template>
    <div class="pageWarpper">
        <div class="wrapperMain">
            <div class="wrapperTit">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>权限设置</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="editBox">
                <div class="editTitle">
                    基础信息
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">人员姓名</div>
                        <div class="editContent">
                            <inputs class="inputs" width="300px" height="30px" v-model="name"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">性别</div>
                        <div class="editContent">
                            <el-select v-model="gender" clearable  size="small" placeholder="请选择">
                                <el-option
                                    v-for="item in genderList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">手机号码</div>
                        <div class="editContent">
                            <inputs class="inputs" width="300px" height="30px" v-model="mobile"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">身份证号</div>
                        <div class="editContent">
                            <inputs class="inputs" width="300px" height="30px" v-model="idNo"></inputs>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">职称</div>
                        <div class="editContent">
                            <el-select v-model="title" clearable  size="small" placeholder="请选择">
                                <el-option
                                    v-for="item in titleList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <inputs class="inputs" width="300px" height="30px" v-model="title"></inputs> -->
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">职务</div>
                        <div class="editContent">
                            <inputs class="inputs" width="300px" height="30px" v-model="job"></inputs>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">学位</div>
                        <div class="editContent">
                            <!-- <inputs class="inputs" width="300px" height="30px" v-model="degree"></inputs> -->
                            <el-select v-model="degree" clearable  size="small" placeholder="请选择">
                                <el-option
                                    v-for="item in degreeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="editBox editInfo">
                <div class="editTitle">
                    账号信息
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">用户名</div>
                        <div class="editContent">
                            <inputs class="inputs" width="300px" height="30px" v-model="account"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">角色</div>
                        <div class="editContent">
                            <el-select v-model="accountRolesItem" multiple placeholder="请选择">
                                <el-option
                                v-for="item in accountRoles"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">密码</div>
                        <div class="editContent">
                            <inputs class="inputs" type="password" width="300px" height="30px" v-model="password"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">确认密码</div>
                        <div class="editContent">
                            <inputs class="inputs" type="password" width="300px" height="30px" v-model="password"></inputs>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="changeBtn">
                <button class="ret" @click="goBack">返回</button>
                <button class="hold" @click="saveInfo">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import topTitle from '../../components/common/topTitle.vue'
    import inputs from '../../components/common/input.vue'
    import {userAdd,userUpdate,userQueryRoles,getDegreeList,getTitleList} from '../../http/impl/systemMange.js'
    export default {
        name:'userManageDetail',
        data(){
            return {
                companyCode:'',// 单位代码
                departmentCode:'',// 部门代码
                name:'',// 人员名称
                gender:'',// 性别
                genderList:[
                    {
                        value: '男',
                        label: '男'
                    },
                    {
                        value: '女',
                        label: '女'
			        }
                ],
                mobile:'',// 手机号
                idNo:'',// 证件号
                degree:'',// 学位
                degreeList:[],
                title:'',// 职称
                titleList:[],
                job:'',// 职务
                account:'',// 成员
                password:'',// 密码
                accountRoles:[],// 角色列表
                accountRolesItem:[],
                pageStatus:'',
                rowDetail:{},
            }
        },
        components:{
            inputs,
            topTitle
        },
        computed: {
            ...mapGetters({
                loginInforma: "gs_Home_loginInforma"
            })
        },
        created(){
            if(this.$route.params.personnelId || this.$route.params.accountId){
                this.pageStatus = '编辑';
                this.rowDetail = this.$route.params.row;
                this.companyCode = this.rowDetail.companyCode;// 单位代码
                this.departmentCode = this.rowDetail.departmentCode;// 部门代码
                this.name = this.rowDetail.name;// 人员名称
                this.gender = this.rowDetail.gender;// 性别
                this.mobile = this.rowDetail.mobile;// 手机号
                this.idNo = this.rowDetail.idNo;// 证件号
                this.degree = this.rowDetail.degree;// 学位
                this.title = this.rowDetail.title;// 职称
                this.job = this.rowDetail.job;// 职务
                this.account = this.rowDetail.account;// 成员
                this.password = '';// 密码
                let arr = [];
                if(this.rowDetail.accountRoles !=null){
                    this.rowDetail.accountRoles.forEach(item=>{
                        arr.push(item.roleId)
                    })
                    this.accountRolesItem =arr;
                }
                
            }else{
                this.pageStatus = '新增';
            }
            this.getRoleData();// 角色数据
            this.getDegreeData();// 学位列表
            this.getTitleData();// 职称列表
        },
        methods:{
            // 学位列表
            getDegreeData(){
                getDegreeList().then(res=>{
                    if(res.result == 'SUCCESS'){
                        let arr = res.data && res.data.length ? res.data :[];;
                        let list = [];
                        arr.map(item=>{
                            let title = {value :item,label:item};
                            list.push(title)
                        })
                        this.degreeList = list;
                    }
                })
            },
            // 职称列表
             getTitleData(){
                getTitleList().then(res=>{
                    if(res.result == 'SUCCESS'){
                        let arr = res.data && res.data.length ? res.data :[];;
                        let list = [];
                        arr.map(item=>{
                            let title = {value :item,label:item};
                            list.push(title)
                        })
                        this.titleList = list;
                    }
                })
            },
            // 角色数据
            getRoleData(){
                userQueryRoles({
                    role:{
                        companyCode:this.$route.params.companyCode,
                    }
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.accountRoles = res.data.list
                    }
                })
            },
            // 返回
            goBack(){
                window.history.go(-1);
            },
            saveInfo(){
                if(this.pageStatus == '新增'){
                    let arr = [];
                    if(this.accountRolesItem.length>0){
                        this.accountRolesItem.forEach(item=>{
                            arr.push({
                                roleId:item
                            })
                        })
                    }
                    if(!this.account){
                        this.$message({
                            message: "请输入用户名!",
                            type: "info"
                        });
                    }else {
                        userAdd({
                            companyCode:this.$route.params.companyCode,
                            departmentCode:this.$route.params.departmentCode,
                            name:this.name,
                            gender:this.gender,
                            mobile:this.mobile,
                            idNo:this.idNo,
                            degree:this.degree,
                            title:this.title,
                            job:this.job,
                            account:this.account,
                            password:this.password,
                            accountRoles:arr
                        }).then(res=>{
                            if(res.result == 'SUCCESS'){
                                this.$message({
                                    message: "保存成功",
                                    type: "success"
                                });
                                window.history.go(-1);
                            }else{
                                this.$message({
                                    message: "保存失败",
                                    type: "error"
                                });
                            }
                        })
                    }
                }else if(this.pageStatus == '编辑'){
                    let arr = [];
                    this.accountRolesItem.forEach(item=>{
                        arr.push({
                            roleId:item
                        })
                    })
                    if(!this.account){
                        this.$message({
                            message: "请输入用户名!",
                            type: "info"
                        });
                    }else {
                        userUpdate({
                            accountId:this.$route.params.accountId,
                            personnelId:this.$route.params.personnelId,
                            companyCode:this.$route.params.companyCode,
                            departmentCode:this.$route.params.departmentCode,
                            name:this.name,
                            gender:this.gender,
                            mobile:this.mobile,
                            idNo:this.idNo,
                            degree:this.degree,
                            title:this.title,
                            job:this.job,
                            account:this.account,
                            password:this.password,
                            accountRoles:arr
                        }).then(res=>{
                            if(res.result == 'SUCCESS'){
                                this.$message({
                                    message: "保存成功",
                                    type: "success"
                                });
                                window.history.go(-1);
                            }else{
                                this.$message({
                                    message: "保存失败",
                                    type: "error"
                                });
                            }
                        })
                    }
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
    .wrapperTit{
        padding-left: 40px;
        margin-top: 16px;
        width: 960px;
        height: 60px;
        display: flex;
        align-items: center;
    }
    .wrapperMain{
        .editBox{
            width: 980px;
            margin: 0px 10px;
            box-sizing: border-box;
            background-color: #fff;
            border-top-right-radius:10px;
            border-top-left-radius:10px;
            padding-bottom: 20px;
            .editTitle{
                padding: 30px;
                font-size: 18px;
                color: #666;
                font-weight: bold;
            }
            .editItem{
                display: flex;
                padding: 0 30px 20px ;
                justify-content: space-between;
                font-size: 16px;
                color: #666;
                .editCenter{
                    display: flex;
                    align-items: center;
                    .editName{
                        width: 70px;
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
                            width: 300px !important;
                        }
                    }
                }
            }
        }
        .editInfo{
            border-top-right-radius:0px;
            border-top-left-radius:0px;
            border-bottom-right-radius:10px;
            border-bottom-left-radius:10px;
            margin-top:2px;
        }
        .changeBtn{
            margin: 0px 10px;
            padding-top: 40px;
            height: 46px;
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
</style>