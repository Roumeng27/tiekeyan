<template>
  <div class="pageWarpper">
      <p class="title">组织机构管理&nbsp;>&nbsp;添加单位</p>
      <div class="wrapperMain">
        <div class="content">
            <div class="section">
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">基础信息</div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                    <div class="editName">单位代码</div>
                    <div class="editContent">
                        <inputs v-model="code" width="300px" class="inputs" height="30px"></inputs>
                    </div>
                    </div>
                    <div class="editCenter">
                    <div class="editName">单位名称</div>
                    <div class="editContent">
                        <inputs v-model="name" width="300px" class="inputs" height="30px"></inputs>
                    </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">单位性质</div>
                        <div class="editContent">
                            <inputs v-model="nature" width="300px" class="inputs" height="30px"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">法人代表</div>
                        <div class="editContent">
                            <inputs v-model="legalPerson" width="300px" class="inputs" height="30px"></inputs>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">单位地址</div>
                        <div class="editContent">
                            <inputs v-model="address" width="854px" class="inputs" height="30px"></inputs>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">邮政编码</div>
                        <div class="editContent">
                            <inputs v-model="postCode" width="300px" class="inputs" height="30px"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">开户名称</div>
                        <div class="editContent">
                            <inputs v-model="accountName" width="300px" class="inputs" height="30px"></inputs>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName" style="width:66px;">全国组织机构代码</div>
                        <div class="editContent">
                            <inputs v-model="organizationalCode" width="300px" class="inputs" height="30px"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">银行账户</div>
                        <div class="editContent">
                            <inputs v-model="bankAccount" width="300px" class="inputs" height="30px"></inputs>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">开户银行</div>
                        <div class="editContent">
                            <inputs v-model="bankName" width="300px" class="inputs" height="30px"></inputs>
                        </div>
                    </div>
                </div>
                <div class="blueSelect" style="width:990px;padding:20px 0;background:#e7f0fb">
                    <div class="section">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">联系人</div>
                                <div class="editContent">
                                    <inputs class="inputs inputTypw" width="300px" v-model="contact" height="30px"></inputs>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">手机号码</div>
                                <div class="editContent">
                                    <inputs class="inputs inputTypw" width="300px" v-model="mobile" height="30px"></inputs>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">电&emsp;话</div>
                                <div class="editContent">
                                    <inputs class="inputs inputTypw" width="300px" v-model="phone" height="30px"></inputs>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">邮箱</div>
                                <div class="editContent">
                                    <inputs class="inputs inputTypw" width="300px" v-model="email" height="30px"></inputs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="editItem" style="padding-top:20px;">
                    <div class="editCenter">
                        <div class="editName">上级单位名称</div>
                        <div class="editContent">
                            <span v-if="this.subUnitStr == '编辑'">{{parentCompanyName}}</span>
                            <span v-else>{{keyName}}</span>
                        </div>
                    </div>
                    <div class="editCenter" style="width:350px;">
                        <div class="editName">上级单位代码</div>
                        <div class="editContent">
                            <span v-if="this.subUnitStr == '编辑'">{{parentCompanyCode}}</span>
                            <span v-else>{{keyCode}}</span>
                        </div>
                    </div>
                </div>
                <div style="border:1px solid #f5f5f5;width:990px;"></div>
                <div class="editItem" style="padding-top:20px;">
                    <div class="editCenter">
                        <div class="editName">单位管理员</div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">&emsp;登录名</div>
                        <div class="editContent">
                            <inputs class="inputs"  width="300px" v-model="adminAccount" height="30px"></inputs>
                        </div>
                    </div>
                    <div class="editCenter">
                        <div class="editName">密码</div>
                        <div class="editContent">
                            <inputs class="inputs" type="password" width="300px" v-model="adminPassword" height="30px"></inputs>
                        </div>
                    </div>
                </div>
                <div class="editItem">
                    <div class="editCenter">
                        <div class="editName">确认密码</div>
                        <div class="editContent">
                            <inputs class="inputs" type="password" width="300px" v-model="adminPassword" height="30px"></inputs>
                        </div>
                    </div>
                </div>
                <div class="blueSelect" style="width:990px;padding:20px 0;background:#e7f0fb">
                    <div class="section">
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">姓&emsp;名</div>
                                <div class="editContent">
                                    <inputs class="inputs inputTypw" width="300px" v-model="adminName" height="30px"></inputs>
                                </div>
                            </div>
                            <div class="editCenter">
                                <div class="editName">联系电话</div>
                                <div class="editContent">
                                    <inputs class="inputs inputTypw" width="300px" v-model="adminIhpone" height="30px"></inputs>
                                </div>
                            </div>
                        </div>
                        <div class="editItem">
                            <div class="editCenter">
                                <div class="editName">身份证号</div>
                                <div class="editContent">
                                    <inputs class="inputs inputTypw" width="300px" v-model="adminIdNo" height="30px"></inputs>
                                </div>
                            </div>
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
</template>

<script>
import inputs from "../../components/common/input.vue";
import dayjs from 'dayjs'
import {addCompanyList,updateCompanyList,showCompanyList} from 'http/systemMange'
import input from '../../components/common/input.vue'
import inputsa from '../../components/common/resetInput.vue'
import {mapGetters} from 'vuex';
import TableCommon from '../../components/common/TableCommon.vue'
import PaginationCommon from '../../components/common/PaginationCommon.vue'
import DialogCommon from '../../components/common/DialogCommon.vue'
import {getIdcard,isMobilephone,isPhone,isEmail,checkCode} from '../../assets/js/base.js'
export default {
  components: {
    inputs
  },
  props:{},
  data(){
    return {
        subUnitStr:'',
        code:'',//单位代码
        name:'',//单位名称
        nature:'',//单位性质
        legalPerson:'',//法人代表
        address:'',//地址
        postCode:'',//邮政编码
        accountName:'',//开户名称
        organizationalCode:'',//全国组织机构代码
        bankAccount:'',//银行账户
        bankName:'',//开户银行
        contact:'',//联系人
        mobile:'',//手机号码
        phone:'',//电话
        email:'',//邮编
        adminAccount:'',//账户
        adminName:'',//姓名
        adminPassword:'',//密码
        adminIhpone:'',//联系电话
        adminIdNo:'',//身份证号
        keyId:'',//主键id
        parentCompanyCode:'',//上级单位代码
        parentCompanyName:'',//上级单位名称
        keyCode:'',//子单位的上级code
        keyName:'',//子单位的上级name
    }
  },
  watch:{},
  computed:{},
  created(){
      this.keyId = this.$route.query.id;
      this.keyCode = this.$route.query.code;
      this.keyName = this.$route.query.name;
      this.subUnitStr = window.localStorage.getItem('SubUnit');
      if(window.localStorage.getItem('SubUnit') == '编辑'){
          this.getUnitInfo()
      }
  },
  methods:{
    //  返回按钮
    goBack(){
        window.history.go(-1);
    },
    //初始化详情数据
    getUnitInfo(){
        showCompanyList(this.keyId).then(res=>{
            if(res.result == 'SUCCESS'){
                this.parentCompanyCode = res.data.parentCompanyCode;//上级单位代码
                this.parentCompanyName = res.data.parentCompanyName;//上级单位名称
                this.code = res.data.code;//单位代码
                this.name = res.data.name;//单位名称
                this.nature = res.data.nature;//单位性质
                this.legalPerson = res.data.legalPerson;//法人代表
                this.address = res.data.address;//地址
                this.postCode = res.data.postCode;//邮政编码
                this.accountName = res.data.accountName;//开户名称
                this.organizationalCode = res.data.organizationalCode;//全国组织机构代码
                this.bankAccount = res.data.bankAccount;//银行账户
                this.bankName = res.data.bankName;//开户银行
                this.contact = res.data.contact;//联系人
                this.mobile = res.data.mobile;//手机号码
                this.phone = res.data.phone;//电话
                this.email = res.data.email;//邮编
                this.adminAccount = res.data.adminAccount;//账户
                this.adminName = res.data.adminName;//姓名
                this.adminPassword = res.data.adminPassword;//密码
                this.adminIhpone = res.data.adminIhpone;//联系电话
                this.adminIdNo = res.data.adminIdNo;//身份证号
            }
        })
    },
    //保存按钮
    saveInfo(){
        if(!checkCode(this.code)){
            this.$message({
                type:'warning',
                message:'单位代码请填写3位英文字母格式'
            })
            return false
        }else if(!getIdcard(this.adminIdNo)){
            this.$message({
                type:'warning',
                message:'请填写正确的身份证格式'
            })
            return false
        }else if(!isMobilephone(this.mobile)){
            this.$message({
                type:'warning',
                message:'请填写正确的手机格式'
            })
            return false
        }else if(!isPhone(this.phone)){
            this.$message({
                type:'warning',
                message:'请填写正确的电话格式'
            })
            return false
        }else if(!isPhone(this.adminIhpone)){
            this.$message({
                type:'warning',
                message:'请填写正确的电话格式'
            })
            return false
        }else if(!isEmail(this.email)){
            this.$message({
                type:'warning',
                message:'请填写正确的邮编格式'
            })
            return false
        }
        if(window.localStorage.getItem('SubUnit') == '编辑'){
            updateCompanyList({
                id:this.keyId,
                code:this.code,//单位代码
                name:this.name,//单位名称
                nature:this.nature,//单位性质
                legalPerson:this.legalPerson,//法人代表
                address:this.address,//地址
                postCode:this.postCode,//邮政编码
                accountName:this.accountName,//开户名称
                organizationalCode:this.organizationalCode,//全国组织机构代码
                bankAccount:this.bankAccount,//银行账户
                bankName:this.bankName,//开户银行
                contact:this.contact,//联系人
                mobile:this.mobile,//手机号码
                phone:this.phone,//电话
                email:this.email,//邮编
                adminAccount:this.adminAccount,//账户
                adminName:this.adminName,//姓名
                adminPassword:this.adminPassword,//密码
                adminIhpone:this.adminIhpone,//联系电话
                adminIdNo:this.adminIdNo,//身份证号
            }).then(res=>{
                if(res.result == 'SUCCESS'){
                    this.$message({
                        message: "修改单位成功",
                        type: "success"
                    });
                    window.history.go(-1);
                }
            })
        }else{
            addCompanyList({
                code:this.code,//单位代码
                name:this.name,//单位名称
                nature:this.nature,//单位性质
                legalPerson:this.legalPerson,//法人代表
                address:this.address,//地址
                postCode:this.postCode,//邮政编码
                accountName:this.accountName,//开户名称
                organizationalCode:this.organizationalCode,//全国组织机构代码
                bankAccount:this.bankAccount,//银行账户
                bankName:this.bankName,//开户银行
                contact:this.contact,//联系人
                mobile:this.mobile,//手机号码
                phone:this.phone,//电话
                email:this.email,//邮编
                adminAccount:this.adminAccount,//账户
                adminName:this.adminName,//姓名
                adminPassword:this.adminPassword,//密码
                adminIhpone:this.adminIhpone,//联系电话
                adminIdNo:this.adminIdNo,//身份证号
            }).then(res=>{
                if(res.result == 'SUCCESS'){
                    this.$message({
                        message: "新增单位成功",
                        type: "success"
                    });
                    window.history.go(-1);
                }
            })
        }
        
    }
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
.pageWarpper {
  width: 990px;
  height: auto;
  background-color: #f5f5f5;
  // position: relative;
  padding-bottom: 40px;
  .title{
    margin-top: 16px;
    width: 990px;
    height: 60px;
    text-indent: 60px;
    line-height: 60px;
    font-size: 18px;
    color: #666;
    font-weight: 500;
    }
  .fadeInBtn {
    width: 88px;
    height: 30px;
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    margin-left: 20px;
    border: none;
    float: right;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
  }
  .wrapperMain {
    width: 980px;
    box-sizing: border-box;
    background-color: #fff;
    // padding: 20px 0px 0px 0px;
    overflow: hidden;
    margin: 0 10px;
    .editItem {
      display: flex;
      padding: 0 20px 20px;
      justify-content: space-between;
      font-size: 16px;
      color: #666;
      .editCenter {
        display: flex;
        align-items: center;
        .editName {
          text-align: end;
          padding-right: 10px;
          display: flex;
          flex-direction: column;
          span {
            font-size: 12px;
          }
        }
        .editContent {
          display: flex;
          align-items: center;
          span {
            padding: 0 10px;
          }
          .el-select {
            width: 280px !important;
          }
        }
        .editArea {
          display: flex;
          align-items: center;
          margin-left: 24px;
        }
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      .section {
        width: 970px;
        padding-top: 20px;
        .inputTypw{
            background: #e7f0fb;
        }
        .changeItem {
          padding: 60px 0;
          .changeTitle {
            display: flex;
            align-items: center;
            padding: 0 0 20px 0;
            margin-left: 20px;
            p {
              font-size: 16px;
              font-weight: bold;
              color: #666;
            }
          }
          .changeMain {
            flex: 1;
            padding: 10px 0;
            background: #f6f8fd;
          }
        }
        .changeFooter {
            margin: 0px 10px;
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
              margin-right: 59px;
            }
            .hold {
              background-color: #3f82e1;
              color: #fff;
            }
        }
      }
    }
  }
  .dialogWrapper {
    position: absolute;
    top: 0;
    width: 990px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    .dialogBox {
      width: 822px;
      // height: 440px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background: #fff;
      border-radius: 10px;
      padding: 30px 0;
      z-index: 99;
      display: flex;
      flex-direction: column;
      .dialogTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px 16px;
        p {
          font-size: 18px;
          color: #666;
          font-weight: bold;
        }
      }
      .dialogSearch {
        width: 760px;
        border: 1px solid #b5b5b5;
        margin: 0 auto;
        display: flex;
        align-items: center;
        border-radius: 6px;
        padding: 20px 0;
        .editItem {
          // display: flex;
          // justify-content: space-between;
          font-size: 16px;
          color: #666;
          .editCenter {
            display: flex;
            align-items: center;
            padding-left: 20px;
            float: left;
            .editName {
              text-align: end;
              padding-right: 10px;
              display: flex;
              flex-direction: column;
              span {
                font-size: 12px;
              }
            }
            .editContent {
              display: flex;
              align-items: center;
            }
          }
        }
      }
      .dialogMain {
        width: 760px;
        margin: 20px auto;
        .tableBox {
          padding: 0 !important;
        }
        .changeBtn {
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
            margin-right: 59px;
          }
          .hold {
            background-color: #3f82e1;
            color: #fff;
          }
        }
      }
      .dialogFooter {
        width: 760px;
        .pagination {
          width: 760px !important;
        }
      }
    }
  }
}
</style>