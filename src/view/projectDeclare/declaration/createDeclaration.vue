<template>
  <!-- 基本信息 -->
  <div class="pageWarpper">
    <div class="wrapperMain">
      <div class="content">
        <div class="leftMenu">
          <menuList index="0"></menuList>
        </div>
        <div class="section" v-if="show">
          <div class="editItem">
            <div class="editCenter">
              <div class="editName">项目名称</div>
              <div class="editContent">
                <inputs class="inputs" width="280px" v-model="name" height="30px"></inputs>
              </div>
            </div>
            <div class="editCenter">
              <div class="editName">项目类别</div>
              <div class="editContent">
                <el-select v-model="type" placeholder="请选择" clearable size="small">
                  <el-option
                    v-for="item in optionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="editItem">
            <div class="editCenter">
              <div class="editName">项目性质</div>
              <div class="editContent">
                <el-select v-model="subject" placeholder="请选择" clearable size="small">
                  <el-option
                    v-for="item in optionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="editCenter">
              <div class="editName">研究方向</div>
              <div class="editContent">
                <el-select v-model="direction" placeholder="请选择" clearable size="small">
                  <el-option
                    v-for="item in optionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="editItem">
            <div class="editCenter">
              <div class="editName">起止时间</div>
              <div class="editContent">
                <datePicker width="120px" v-model="startDate" height="30px"></datePicker>
                <span>—</span>
                <datePicker width="120px" v-model="endDate" height="30px"></datePicker>
              </div>
            </div>
            <div class="editCenter">
              <div class="editName">实施周期</div>
              <div class="editContent">
                <inputs class="inputs" width="280px" v-model="monthNum" height="30px"></inputs>
              </div>
            </div>
          </div>
          <div class="editItem">
            <div class="editCenter">
              <div class="editName" style="padding-right: 26px;">
                总预算
                <span>（万元）</span>
              </div>
              <div class="editContent">
                <inputs
                  class="inputs"
                  width="280px"
                  disableds="true"
                  v-model="budget"
                  height="30px"
                ></inputs>
              </div>
            </div>
            <div class="editCenter">
              <div class="editArea">
                <div class="editName">
                  国家拨款
                  <span>（万元）</span>
                </div>
                <div class="editContent">
                  <inputs class="inputs" width="90px" v-model="funds" height="30px" @sumAdd="sumAdd()"></inputs>
                </div>
              </div>
              <div class="editArea">
                <div class="editName">
                  单位自筹
                  <span>（万元）</span>
                </div>
                <div class="editContent">
                  <inputs class="inputs" width="90px" v-model="selfRaised" height="30px" @sumAdd="sumAdd()"></inputs>
                </div>
              </div>
            </div>
          </div>

          <div class="changeItem">
            <div class="changeTitle">
              <p>项目联系人</p>
              <button class="fadeInBtn" @click="changeProjectContact ">选择</button>
            </div>
            <div class="changeMain" v-show="changeFlag">
              <div class="editItem">
                <div class="editCenter">
                  <div class="editName" style="margin-left:30px;">姓名</div>
                  <div class="editContent">
                    <inputs
                      class="inputs"
                      width="280px"
                      disableds="true"
                      v-model="contactsName"
                      height="30px"
                    ></inputs>
                  </div>
                </div>
                <div class="editCenter">
                  <div class="editName">证件类型</div>

                  <div class="editContent">
                    <inputs
                      class="inputs"
                      width="280px"
                      disableds="true"
                      v-model="contactsIdtype"
                      height="30px"
                    ></inputs>
                  </div>
                </div>
              </div>
              <div class="editItem">
                <div class="editCenter">
                  <div class="editName">证件号码</div>
                  <div class="editContent">
                    <inputs
                      class="inputs"
                      width="280px"
                      disableds="true"
                      v-model="contactsId"
                      height="30px"
                    ></inputs>
                  </div>
                </div>
                <div class="editCenter">
                  <div class="editName">移动电话</div>
                  <div class="editContent">
                    <inputs
                      class="inputs"
                      width="280px"
                      disableds="true"
                      v-model="contactsPhone"
                      height="30px"
                    ></inputs>
                  </div>
                </div>
              </div>
              <div class="editItem">
                <div class="editCenter">
                  <div class="editName">固定电话</div>
                  <div class="editContent">
                    <inputs
                      class="inputs"
                      width="280px"
                      disableds="true"
                      v-model="contactsFixedPhone"
                      height="30px"
                    ></inputs>
                  </div>
                </div>
                <div class="editCenter">
                  <div class="editName">电子邮箱</div>
                  <div class="editContent">
                    <inputs
                      class="inputs"
                      width="280px"
                      disableds="true"
                      v-model="contactsMail"
                      height="30px"
                    ></inputs>
                  </div>
                </div>
              </div>
            </div>
            <div class="changeFooter">
              <button class="ret" @click="goBack">返回</button>
              <button class="hold" @click="Preservation()">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查询框 -->
    <div class="dialogWrapper" v-if="dialogFlag">
      <div class="dialogBox">
        <div class="dialogTitle">
          <p>项目联系人选择</p>
          <img src="../../../assets/img/components/close.png" alt @click="closeProjectContact" />
        </div>
        <div class="dialogSearch">
          <div class="editItem">
            <div class="editCenter">
              <div class="editName">单位代码</div>
              <div class="editContent">
                <inputs class="inputs" width="70px" v-model="unitCode" height="30px"></inputs>
              </div>
            </div>
            <div class="editCenter">
              <div class="editName">单位名称</div>
              <div class="editContent">
                <inputs class="inputs" width="200px" v-model="unitName" height="30px"></inputs>
              </div>
            </div>
            <div class="editCenter">
              <div class="editName">姓名</div>
              <div class="editContent">
                <inputs class="inputs" width="90px" v-model="searchname" height="30px"></inputs>
              </div>
            </div>
            <button class="fadeInBtn" @click="search()">查询</button>
          </div>
        </div>
        <div class="dialogMain">
          <TableCommon
            :tableData="tableData"
            :tableHeader="tableHeader"
            @getTemplatePick="getTemplatePick"
            :radioFlag="true"
          ></TableCommon>
          <div class="changeBtn">
            <button class="ret" @click="closeProjectContact">取消</button>
            <button class="hold" @click="closeProjectContact">确定</button>
          </div>
        </div>
        <div class="dialogFooter">
          <PaginationCommon
            :total="total"
            :pages="pageNum"
            :page-size="pageSize"
            @modifypageSize="modifypageSize"
            @handleCurrentChangeSub="handleCurrentChangeFun"
            :current-page="currentPage"
          ></PaginationCommon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  personnelSelectlist,
  declareAddDeclare,
  declareeSlectInformationById,
  declareeUpdateById
} from "http/formalDeclaration";
import inputs from "../../../components/common/input.vue";
import datePicker from "../../../components/common/datePicker.vue";
import menuList from "./component/createDeclareLeftMenu.vue";
import TableCommon from "../../../components/common/TableCommon.vue";
import PaginationCommon from "../../../components/common/PaginationCommon.vue";
export default {
  name: "createDeclaration",
  components: {
    inputs,
    datePicker,
    menuList,
    TableCommon,
    PaginationCommon
  },
  data() {
    return {
      subject: "",
      show: false,
      optionList: [],
      changeFlag: true,
      dialogFlag: false,
      tableData: [],
      tableHeader: [
        {
          label: "姓名",
          prop: "name",
          minWidth: "300px"
        },
        {
          label: "性别",
          prop: "gender",
          minWidth: "66px"
        },
        {
          label: "出生日期",
          prop: "birthday",
          minWidth: "110px"
        },
        {
          label: "工作单位",
          prop: "companyName",
          minWidth: "500px"
        },
        {
          label: "职称",
          prop: "title",
          minWidth: "92px"
        },
        {
          label: "职务",
          prop: "job",
          minWidth: "94px"
        },
        {
          label: "最高学历",
          prop: "degree",
          minWidth: "122px"
        }
      ],
      // 分页器所需字段
      // 总条数
      total: 0,
      // 每页条数
      pageSize: 10,
      // 总页数
      pageNum: 1,
      currentPage: 1,
      // 查询字段
      // 单位代码
      unitCode: "",
      //单位名称
      unitName: "",
      //姓名
      searchname: "",
      // 项目联系人展示字段
      // 姓名
      contactsName: "",
      // 证件类型
      contactsIdtype: "",
      // 证件号
      contactsId: "",
      // 移动电话
      contactsPhone: "",
      // 固定电话
      contactsFixedPhone: "",
      // 电子邮箱
      contactsMail: "",
      // 项目联系人
      contactAccount: "",
      // 主题id
      topicId: "",
      // 模板id
      documentTemplateId: "",
      // 基本信息字段
      // 名称
      name: "",
      // 项目类别
      type: "",
      // 项目性质
      subject: "",
      // 研究方向
      direction: "",
      // 项目开始时间
      startDate: "",
      // 项目结束日期
      endDate: "",
      // 实施周期
      monthNum: "",
      //总预算
      budget: "",
      // 拨款需求
      funds: "",
      // 自筹需求
      selfRaised: "",
      // 编辑状态
      edit: false,
      declareId: "",
      keyId:'',
    };
  },
  mounted() {
    if (this.$route.query) {
      this.topicId = this.$route.query.id;
      this.documentTemplateId = this.$route.query.documentTemplateId;
      if (this.$route.query.declareId) {
        this.edit = true;
        this.declareId = this.$route.query.declareId;
      } else {
        // this.show = true;
      }
    }
  },
  created(){
    this.getUnitInfo();
  },
  methods: {
    //初始化查询
    getUnitInfo(){
      if(window.sessionStorage.stateStr == '编辑'){
          this.keyId = this.$route.query.id;
          this.declareId = this.keyId;
      }else{
          this.declareId = this.$route.query.declareId;
      }
      declareeSlectInformationById({
            id: this.declareId
          }).then(res => {
            this.show = true;
            if(res.result == 'SUCCESS' && res.data != null){
              //项目名称
              this.name = res.data.name;
              //项目类别
              this.type = res.data.type;
              //项目性质
              this.subject = res.data.subject;
              //研究方向
              this.direction = res.data.direction;
              //项目开始时间
              this.startDate = res.data.startDate;
              //项目结束日期
              this.endDate = res.data.endDate;
              // 总预算
              this.budget = res.data.budget;
              // 实施周期
              this.monthNum = res.data.monthNum;
              // 拨款需求
              this.funds = res.data.funds;
              // 自筹需求
              this.selfRaised = res.data.selfRaised;
              // 文档模版ID
              this.documentTemplateId = res.data.documentTemplateId;
              //项目联系人
              this.contactAccount = res.data.contactAccount;
              //人员姓名
              this.contactsName = res.data.comPersonnelName;
              // 证件类型
              this.contactsIdtype = res.data.comPersonnelIdType;
              // 证件号码
              this.contactsId = res.data.comPersonnelIdNo;
              // 手机号
              this.contactsPhone = res.data.comPersonnelMobile;
              // 联系电话
              this.contactsFixedPhone = res.data.comPersonnelPhone;
              // 电子邮箱
              this.contactsMail = res.data.comPersonnelEmail;
            }
          });
    },
    sumAdd(){
      if(this.funds == "" || this.selfRaised == ""){
        this.budget = ""
      }else {
        this.budget = parseInt(this.funds) + parseInt(this.selfRaised);
      }
    },
    // 返回
    goBack() {
      window.history.go(-1);
    },
    // 保存
    Preservation() {
      if(window.sessionStorage.stateStr == '编辑'){
          this.keyId = this.$route.query.id;
          this.declareId = this.keyId;
          declareeUpdateById({
            id: this.declareId,
            name: this.name,
            type: "类别",
            subject: "性质",
            direction: "方向",
            startDate: this.startDate,
            endDate: this.endDate,
            monthNum: this.monthNum,
            funds: this.funds,
            selfRaised: this.selfRaised,
            contactAccount: this.contactAccount,
            documentTemplateId: this.documentTemplateId
          }).then(res => {
            if (res.result == "SUCCESS") {
              this.$route.query.declareId = res.data.id;
              window.sessionStorage.setItem('jump','ok')
                // window.sessionStorage.jump == 'ok'
              this.$message({
                message: "修改成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "修改失败",
                type: "error"
              });
          }
        });
      }else{
          this.declareId = this.$route.query.declareId;
          declareAddDeclare({
            name: this.name,
            type: "类别",
            subject: "性质",
            direction: "方向",
            startDate: this.startDate,
            endDate: this.endDate,
            monthNum: this.monthNum,
            funds: this.funds,
            selfRaised: this.selfRaised,
            contactAccount: this.contactAccount,
            topicId: this.topicId,
            documentTemplateId: this.documentTemplateId
          }).then(res => {
            if (res.result == "SUCCESS") {
              this.$route.query.declareId = res.data.id;
              window.sessionStorage.setItem('jump','ok')
              this.$message({
                message: "保存成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "保存失败",
                type: "error"
              });
            }
        });
      }
      
    },
    // 项目联系人查询
    search() {
      personnelSelectlist({
        companyCode: this.unitCode,
        companyName: this.unitName,
        name: this.searchname,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.tableData = res.data.list;
          this.total = res.data.rows;
        }
      });
    },
    // 显示项目联系人选择
    changeProjectContact() {
      this.dialogFlag = true;
      personnelSelectlist({
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.tableData = res.data.list;
          this.total = res.data.rows;
        }
      });
    },
    // 关闭项目联系人选择
    closeProjectContact() {
      this.dialogFlag = false;
      this.tableData = [];
      // 单位代码
      this.unitCode = "";
      //单位名称
      this.unitName = "";
      //姓名
      this.searchname = "";
    },
    // 选择后返回
    getTemplatePick(row) {
      // 姓名
      this.contactsName = row.name;
      // 证件类型
      this.contactsIdtype = row.idType;
      // 证件号
      this.contactsId = row.idNo;
      // 移动电话
      this.contactsPhone = row.mobile;
      // 固定电话
      this.contactsFixedPhone = row.phone;
      // 电子邮箱
      this.contactsMail = row.email;
      // 项目联系人
      this.contactAccount = row.account;
    },
    // 修改每页显示条数
    modifypageSize(value) {
      this.pageSize = value;
      console.log(val)
      this.search()// 获取主题列表
    },
    handleCurrentChangeFun(v) {
      console.log(v)
      //页面点击
      this.currentPage = v;
      this.search();// 查询
    }
  },
  beforeDestroy(){
    console.log(1)
  }
};
</script>

<style lang="scss" scoped>
.pageWarpper {
  width: 990px;
  height: auto;
  background-color: #f5f5f5;
  // position: relative;
  padding-bottom: 40px;
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
        width: 820px;
        padding-top: 20px;
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