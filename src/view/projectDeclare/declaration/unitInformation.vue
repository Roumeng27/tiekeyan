<template>
  <!-- 单位信息 -->
  <div class="unitInformation">
    <div class="content">
      <div class="left">
        <menuList index="1"></menuList>
      </div>
      <div class="right">
        <div class="declaringunit">
          <div class="choice">
            <p>申报单位</p>
            <button @click="changeWoke">选择</button>
          </div>
          <div class="choicecontent">
            <div class="box">
              <p class="choice_name_l">申报单位</p>
              <inputs class="choice_inp_l" v-model="companyName" width="234px"></inputs>
              <p class="choice_name_r">单位性质</p>
              <inputs class="choice_inp_r" v-model="Nature" width="332px"></inputs>
            </div>
            <div class="box">
              <p class="choice_name_l">组织机构代码</p>
              <inputs class="choice_inp_l" v-model="organizationalCode" width="234px"></inputs>
              <p class="choice_name_r">单位所在地</p>
              <inputs class="choice_inp_r" v-model="address" width="332px"></inputs>
            </div>
            <div class="box">
              <p class="choice_name_l">邮政编码</p>
              <inputs class="choice_inp_l" v-model="PostalCode" width="234px"></inputs>
            </div>
          </div>
        </div>
        <div class="participatingunit">
          <div class="choice">
            <p>参与单位</p>
            <button @click="addWork">新增</button>
          </div>
          <div class="choicecontent">
            <tables :tableHeader="tableHeaders"  @proDivisionList="proDivisionList" :tableData="tableDatas" @data="data" ></tables>
          </div>
        </div>
        <div class="Thenum">
          <p>单位总数</p>
          <inputs v-model="companyNum" disableds="true" width="80px" height="30px"></inputs>
        </div>
        <div class="changeFooter">
          <button class="ret" @click="goBack">返回</button>
          <button class="hold" @click="Preservation()">保存</button>
        </div>
      </div>
    </div>

    <div class="dialogWrapper" v-if="declare">
      <div class="dialogBox">
        <div class="dialogTitle">
          <p>选择申报单位</p>
          <img src="../../../assets/img/components/close.png" alt @click="closeProjectContact" />
        </div>
        <div class="dialogSearch">
          <div class="dialogSearchbox">
            <p class="dialogSearchbox_name_l">单位名称</p>
            <inputs class="dialogSearchbox_inp" v-model="name" width="310px" height="30px"></inputs>
            <p class="dialogSearchbox_name_r">单位代码</p>
            <inputs class="dialogSearchbox_inp" v-model="code" width="140px" height="30px"></inputs>
          </div>
          <div class="dialogSearchbox">
            <p class="dialogSearchbox_name_l" style="width:114px">组织机构代码</p>
            <inputs
              class="dialogSearchbox_inp"
              v-model="searchorganizationalCode"
              width="278px"
              height="30px"
            ></inputs>
            <button class="dialogSearchbox_btn" @click="search">查询</button>
          </div>
        </div>
        <div class="dialogMain">
          <div class="dialogMaintable">
            <TableCommon
              :tableData="tableData"
              :tableHeader="Header"
              @getTemplatePick="getTemplatePick"
              :radioFlag="true"
            ></TableCommon>
          </div>
        </div>
        <div class="changeBtn">
            <button class="ret" @click="closeProjectContact">取消</button>
            <button class="hold" @click="closeProjectContact">确定</button>
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
    <div class="dialogWrapper" v-if="participate">
      <div class="dialogBox">
        <div class="dialogTitle">
          <p>选择参与单位</p>
          <img src="../../../assets/img/components/close.png" alt @click="closeProjectContact" />
        </div>
        <div class="dialogSearch">
          <div class="dialogSearchbox">
            <p class="dialogSearchbox_name_l">单位名称</p>
            <inputs class="dialogSearchbox_inp" v-model="name" width="310px" height="30px"></inputs>
            <p class="dialogSearchbox_name_r">单位代码</p>
            <inputs class="dialogSearchbox_inp" v-model="code" width="140px" height="30px"></inputs>
          </div>
          <div class="dialogSearchbox">
            <p class="dialogSearchbox_name_l" style="width:114px">组织机构代码</p>
            <inputs
              class="dialogSearchbox_inp"
              v-model="searchorganizationalCode"
              width="278px"
              height="30px"
            ></inputs>
            <button class="dialogSearchbox_btn" @click="search()">查询</button>
          </div>
        </div>
        <div class="dialogMain">
          <div class="dialogMaintable">
            <TableCommon
              :selectionFlag="true"
              :tableData="tableData"
              :tableHeader="Header"
              @handleSelectionChange="ParticipatingUnits"
            ></TableCommon>
          </div>
        </div>
        <div class="changeBtn">
          <button class="ret" @click="closeProjectContact">取消</button>
          <button class="hold" @click="sureProjectContact">确定</button>
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
  companySelectlist,
  declareAddUnitInformation,
  declareSelectUnitInformation,
  institutionalSectorlistCompanys,
  declareUpdateUnitInformation
} from "http/formalDeclaration";
import inputs from "../../../components/common/input.vue";
import datePicker from "../../../components/common/datePicker.vue";
import menuList from "./component/createDeclareLeftMenu.vue";
import TableCommon from "../../../components/common/TableCommon.vue";
import PaginationCommon from "../../../components/common/PaginationCommon.vue";
import tables from "../../../components/common/unitTable";
export default {
  name: "projectMember",
  components: {
    inputs,
    datePicker,
    menuList,
    TableCommon,
    PaginationCommon,
    tables
  },
  data() {
    return {
      jobData:[],
      proDivisionData:'',//项目分工
      declare: false,
      participate: false,
      // 搜索框数据
      Header: [
        {
          label: "单位名称",
          prop: "name",
          width: "140px"
        },
        {
          label: "单位性质",
          prop: "nature",
          width: "142px"
        },
        {
          label: "组织机构代码",
          prop: "organizationalCode",
          width: "130px"
        },
        {
          label: "单位代码",
          prop: "code",
          width: "130px"
        }
      ],
      tableData: [],
      // 表格数据参与单位
      tableDatas: [],
      tableHeaders: [
        {
          label: "单位名称",
          prop: "companyName",
          width: "180px"
        },
        {
          label: "单位性质",
          prop: "companyNature",
          width: "182px"
        },
        {
          label: "组织机构代码",
          prop: "companyOrganizationalCode",
          width: "150px"
        },
      ],
      // 分页器所需字段
      // 总条数
      total: 0,
      // 每页条数
      pageSize: 10,
      // 总页数
      pageNum: 1,
      currentPage: 1,
      subject: "",
      //单位总数
      companyNum: "",

      // 查询所需字段
      // 单位名称
      name: "",
      // 单位代码
      code: "",
      // 机构代码
      searchorganizationalCode: "",

      // 申报单位信息
      //申报单位
      companyName: "",
      // 单位性质
      Nature: "",
      // 组织机构代码
      organizationalCode: "",
      // 单位所在地
      address: "",
      // 邮政编码
      PostalCode: "",
      // 通信地址
      // Mailingaddress: "",

      //参与单位机构代码集合
      declareCompanys: "",

      //保存字段
      declareId: "",
      // 申报机构代码
      applyCompanyCode: "",

      edit: false,
      show: false,
      keyId:'',
      multipleSelection:[],
      declareCompanyList:[],//codes数组
    };
  },
  mounted() {
    // if (this.$route.query) {
    //   this.declareId = this.$route.query.declareId;
    //   if (this.$route.query.declareId) {
    //     declareSelectUnitInformation({
    //       id: this.declareId
    //     }).then(res => {
    //       this.edit = true;
    //       if (res.result == "SUCCESS") {
    //         if(res.data.applyCompanyCode){
    //           this.applyCompanyCode = res.data.applyCompanyCode;
    //           this.seedeclare();
    //         }
    //         if(res.data.declareCompanys){
    //           this.declareCompanys = res.data.declareCompanys;
    //           // this.seeparticipate();
    //         }
    //         this.companyNum = res.data.companyNum;
    //       }
    //     });
    //     this.declareId = this.$route.query.declareId;
    //   } else {
    //     // this.show = true;
    //   }
    // }
    
  },
  created(){
    this.getUnitInfo();
  },
  methods: {
    //初始化查询数据
    getUnitInfo(){
      if(window.sessionStorage.stateStr == '编辑'){
          this.keyId = this.$route.query.id;
          this.declareId = this.keyId;
      }else{
          if(window.sessionStorage.jump == 'ok'){
            console.log('有')
            this.declareId = this.$route.query.declareId;
          }else{
            console.log('没有')
            this.$message({
              message: "请先填写基本信息",
              type: "error"
            });
            window.history.go(-1);
            return
          }
      }
      declareSelectUnitInformation({
          id: this.declareId
        }).then(res => {
          if (res.result == "SUCCESS" && res.data != null) {
            if(res.data.applyCompanyCode){
              this.applyCompanyCode = res.data.applyCompanyCode;
              this.seedeclare();
            }
            if(res.data.declareCompanys){
              this.tableDatas = res.data.declareCompanys;
              this.declareCompanys = res.data.declareCompanys;
              this.declareCompanys.map((v,i)=>{
                v.code = v.companyCode
              })
              // this.seeparticipate();
            }
            this.companyNum = res.data.companyNum;
            
          }
        });
    },
    // 选择申报单位
    changeWoke(){
      this.declare = true;
      companySelectlist({
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.result == "SUCCESS") {
          res.data.list.map((v,i)=>{
            v.job = this.proDivisionData;
          })
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    // 新增参与单位
    addWork(){
      this.participate = true;
      companySelectlist({
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.result == "SUCCESS") {
          res.data.list.map((v,i)=>{
            v.job = this.proDivisionData;
            v.companyCode = this.code;
          })
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    //项目分工值
    proDivisionList(val){
      this.proDivisionData = val;
    },
    // 回填申报单位
    seedeclare() {
      institutionalSectorlistCompanys({
        codes: [this.applyCompanyCode]
      }).then(res => {
        //申报单位
        this.companyName = res.data[0].name;
        // 单位性质
        this.Nature = res.data[0].nature;
        // 组织机构代码
        this.organizationalCode = res.data[0].organizationalCode;
        // 单位所在地
        this.address = res.data[0].address;
        // 邮政编码
        this.PostalCode = res.data[0].postCode;
        // 通信地址
        // this.Mailingaddress = res.data[0].address;
      });
    },
    //回填参与单位
    // seeparticipate() {
    //   var seearr = [];
    //   this.declareCompanys.map((v, i) => {
    //     seearr.push(v.companyCode);
    //   });
    //   institutionalSectorlistCompanys({
    //     codes: seearr
    //   }).then(res => {
    //     // this.tableDatas = res.data;
    //   });
    // },
    // 返回
    goBack() {
      window.history.go(-1);
    },
    // 搜索
    search() {
      companySelectlist({
        name: this.name,
        code: this.code,
        organizationalCode: this.searchorganizationalCode,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.result == "SUCCESS") {
          res.data.list.map((v,i)=>{
            v.job = this.proDivisionData;
          })
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    // 确认
    Preservation() {
        let arr = [];
        let obj = {};
        this.tableDatas.map((v,i)=>{
          obj = {
            companyCode:v.code,
            job:v.job
          }
          arr.push(obj);
        })
        this.declareCompanyList = arr;
      if(window.sessionStorage.stateStr == '编辑'){
          this.keyId = this.$route.query.id;
          this.declareId = this.keyId;
          var companyCodes = [];
          this.tableDatas.map((v, i) => {
            companyCodes.push(v.code);
          });
          declareUpdateUnitInformation({
            id: this.declareId,
            applyCompanyCode: this.applyCompanyCode,
            declareCompanyList:this.declareCompanyList
            // companyCodes: companyCodes
          }).then(res => {
            if (res.result == "SUCCESS") {
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
          var companyCodes = [];
          this.tableDatas.map((v, i) => {
            companyCodes.push(v.code);
          });
          declareAddUnitInformation({
            id: this.declareId,
            applyCompanyCode: this.applyCompanyCode,
            declareCompanyList:this.declareCompanyList,
          }).then(res => {
            if (res.result == "SUCCESS") {
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
    // 表格操作
    data(val) {
      this.tableDatas = val;
    },
    // 项目参入单位选择
    ParticipatingUnits(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    // 点击确定
    sureProjectContact(){
      let flag = true;

      if(this.tableDatas.length>0){
        console.log(this.tableDatas,this.multipleSelection)
          for(let i=0;i<this.tableDatas.length;i++){
              for(let j=0;j<this.multipleSelection.length;j++){
                  if(this.tableDatas[i].companyCode == this.multipleSelection[j].code){
                      this.$message({
                          message: "该单位已添加",
                          type: "info"
                      });
                      flag = false;
                  }
              }
          }
      }
      if(flag){
        this.multipleSelection.map((v,i)=>{
          v.companyName = v.name;
          v.companyNature = v.nature;
          v.companyOrganizationalCode = v.organizationalCode;
        })
        this.tableDatas = this.tableDatas.concat(this.multipleSelection);
        
        // input框清空
        this.name = '';//姓名
        this.code = '';// 单位代码
        this.searchorganizationalCode = '';// 机构代码
      }
      this.participate = false;
    },
    // 关闭弹框选择
    closeProjectContact() {
      this.declare = false;
      this.participate = false;
      this.tableData = [];
      // 单位名称
      this.name = "";
      // 单位代码
      this.code = "";
      // 机构代码
      this.searchorganizationalCode = "";
    },
    // 申报单位选择
    getTemplatePick(row) {
      //申报单位
      this.companyName = row.name;
      // 单位性质
      this.Nature = row.nature;
      // 组织机构代码
      this.organizationalCode = row.organizationalCode;
      // 单位所在地
      this.address = row.address;
      // 邮政编码
      this.PostalCode = row.postCode;
      // 通信地址
      // this.Mailingaddress = row.address;
      this.applyCompanyCode = row.code;
    },
    // 修改每页显示条数
    modifypageSize(value) {
      this.pageSize = value;
      this.search()// 获取主题列表
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.currentPage = v;
      this.search();// 查询
    }
  }
};
</script>

<style lang="scss" scoped>
.unitInformation {
  width: 980px;
  margin: 0px 10px;
  height: auto;
  background-color: #f5f5f5;
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
.content {
  width: 980px;
  // background-color: #fff;
  display: flex;
  .left {
    background-color: #fff;
  }
  .right {
    width: 817px;
    flex: 1;
    .declaringunit,
    .participatingunit {
      // width: 100%;
      min-height: 90px;
      background-color: #fff;
      overflow: hidden;
      .choice {
        margin-top: 10px;
        display: flex;
        margin-bottom: 10px;
        p {
          margin-left: 10px;
          height: 30px;
          margin-right: 10px;
          line-height: 30px;
          font-size: 18px;
          font-weight: 500;
        }
        button {
          width: 88px;
          height: 30px;
          box-sizing: border-box;
          background-color: #3f82e1;
          color: #fff;
          border: none;
          border-radius: 3px;
          color: #fff;
          font-size: 14px;
        }
      }
    }
    .declaringunit {
      .choicecontent {
        background-color: #f6f8fd;
        padding-bottom: 30px;
        overflow: hidden;
        .box {
          margin-top: 20px;
          // width: 100%;
          height: 30px;
          display: flex;
          font-size: 16px;
          .choice_name_l {
            width: 108px;
            text-align: right;
            line-height: 30px;
            margin-right: 10px;
          }
          .choice_name_r {
            width: 110px;
            text-align: right;
            line-height: 30px;
            margin-right: 10px;
          }
        }
      }
    }
    .participatingunit {
      .choicecontent {
        // width: 980px;
        margin: 0px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        overflow-y: auto;
      }
    }
    .Thenum {
      background-color: #fff;
      padding-top: 60px;
      height: 30px;
      p {
        margin-left: 10px;
        height: 30px;
        margin-right: 10px;
        line-height: 30px;
        font-size: 18px;
        font-weight: 500;
        float: left;
      }
    }
    .changeFooter {
      // margin: 0px 10px 0px 0px;
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

.dialogWrapper {
  position: absolute;
  top: 0;
  width: 1000px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .dialogBox {
    width: 822px;
    height: 530px;
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
      border-radius: 6px;
      padding: 20px 0px 10px 0px;
      .dialogSearchbox {
        width: 760px;
        height: 30px;
        margin-bottom: 10px;
        .dialogSearchbox_name_l {
          width: 83px;
          height: 30px;
          line-height: 30px;
          float: left;
          text-align: right;
          margin-right: 10px;
          font-size: 16px;
        }
        .dialogSearchbox_inp {
          float: left;
        }
        .dialogSearchbox_btn {
          width: 88px;
          height: 30px;
          box-sizing: border-box;
          background-color: #3f82e1;
          color: #fff;
          margin-right: 40px;
          border: none;
          float: right;
          border-radius: 3px;
          color: #fff;
          font-size: 14px;
        }
        .dialogSearchbox_name_r {
          width: 165px;
          height: 30px;
          line-height: 30px;
          float: left;
          text-align: right;
          margin-right: 10px;
          font-size: 16px;
          float: left;
        }
      }
    }
    .dialogMain {
      width: 760px;
      margin: 20px auto;
      height: 200px;
      overflow-y: scroll;
      .tableBox {
        padding: 0 !important;
      }
      .dialogMaintable {
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
      }
    }
    .changeBtn {
        margin: 0px 10px;
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
    .dialogFooter {
      width: 760px;
      .pagination {
        width: 760px !important;
      }
    }
  }
}
</style>