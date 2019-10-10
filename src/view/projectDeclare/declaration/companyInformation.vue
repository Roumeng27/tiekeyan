<template>
  <!-- 查看单位信息 -->
  <div class="unitInformation">
    <div class="content">
      <div class="left">
        <menuList index="1"></menuList>
      </div>
      <div class="right">
        <div class="declaringunit">
          <div class="choice">
            <p>申报单位</p>
            <!-- <button @click="declare = !declare">选择</button> -->
          </div>
          <div class="choicecontent">
            <div class="box">
              <p class="choice_name_l">申报单位</p>
              <inputs class="choice_inp_l" disableds="true" v-model="companyName" width="234px"></inputs>
              <p class="choice_name_r">单位性质</p>
              <inputs class="choice_inp_r" disableds="true" v-model="Nature" width="332px"></inputs>
            </div>
            <div class="box">
              <p class="choice_name_l">组织机构代码</p>
              <inputs class="choice_inp_l" disableds="true" v-model="codes" width="234px"></inputs>
              <p class="choice_name_r">单位所在地</p>
              <inputs class="choice_inp_r" disableds="true" v-model="address" width="332px"></inputs>
            </div>
            <div class="box">
              <p class="choice_name_l">邮政编码</p>
              <inputs class="choice_inp_l" disableds="true" v-model="PostalCode" width="234px"></inputs>
              <!-- <p class="choice_name_r">通信地址</p>
              <inputs class="choice_inp_r" disableds="true" v-model="Mailingaddress" width="332px"></inputs> -->
            </div>
          </div>
        </div>
        <div class="participatingunit">
          <div class="choice">
            <p>参与单位</p>
            <!-- <button @click="participate = !participate">新增</button> -->
          </div>
          <div class="choicecontent">
            <tables :tableHeader="tableHeaders"  :disableFlag='true' :tableData="tableDatas" @data="data" :disabled="true"></tables>
          </div>
        </div>
        <div class="Thenum">
          <p>单位总数</p>
          <inputs v-model="companyNums" disableds="true" width="80px" height='30px'></inputs>
        </div>
        <div class="changeFooter">
              <button class="ret" @click="goBack">返回</button>
              <!-- <button class="hold" @click="Preservation()">保存</button> -->
            </div>
      </div>
    </div>

    <!-- <div class="dialogWrapper" v-show="declare">
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
            <inputs class="dialogSearchbox_inp" v-model="code" width="140px"  height="30px"></inputs>
          </div>
          <div class="dialogSearchbox">
            <p class="dialogSearchbox_name_l"  style="width:114px">组织机构代码</p>
            <inputs class="dialogSearchbox_inp" v-model="organizationalCode" width="278px" height="30px"></inputs>
            <button class="dialogSearchbox_btn" @click="search()">查询</button>
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
          <div class="changeBtn">
            <button class="ret" @click="closeProjectContact">取消</button>
            <button class="hold">确定</button>
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
    <div class="dialogWrapper" v-show="participate">
      <div class="dialogBox">
        <div class="dialogTitle">
          <p>选择参与单位</p>
          <img src="../../../assets/img/components/close.png" alt @click="closeProjectContact" />
        </div>
        <div class="dialogSearch">
          <div class="dialogSearchbox">
            <p class="dialogSearchbox_name_l">单位名称</p>
            <inputs class="dialogSearchbox_inp"  v-model="name" width="310px" height="30px"></inputs>
            <p class="dialogSearchbox_name_r">单位代码</p>
            <inputs class="dialogSearchbox_inp"  v-model="code" width="140px"  height="30px"></inputs>
          </div>
          <div class="dialogSearchbox">
            <p class="dialogSearchbox_name_l" style="width:114px">组织机构代码</p>
            <inputs class="dialogSearchbox_inp"  v-model="organizationalCode" width="278px" height="30px"></inputs>
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
          <div class="changeBtn">
            <button class="ret" @click="closeProjectContact">取消</button>
            <button class="hold" >确定</button>
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
    </div> -->
  </div>
</template>

<script>
import { companySelectlist , declareAddUnitInformation, declareSelectUnitInformation ,institutionalSectorlistCompanys} from "http/formalDeclaration";
import inputs from "../../../components/common/input.vue";
import datePicker from "../../../components/common/datePicker.vue";
import menuList from "./component/examineDeclareLeftMenu.vue";
import TableCommon from "../../../components/common/TableCommon.vue";
import PaginationCommon from "../../../components/common/PaginationCommon.vue";
import tables from "../../../components/common/unitTable";
export default {
  name: "companyInformation",
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
      disableFlag:true,
      declare: false,
      participate: false,
      // 搜索框数据
      Header: [
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
        }
      ],
      tableData: [],
      // 表格数据
      tableDatas: [
      ],
      tableHeaders: [
        {
          label: "单位名称",
          prop: "companyName",
          width: "200px"
        },
        {
          label: "单位性质",
          prop: "companyNature",
          width: "202px"
        },
        {
          label: "组织机构代码",
          prop: "companyOrganizationalCode",
          width: "260px"
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
      subject: "",


      // 查询所需字段
      // 单位名称
      name:'',
      // 单位代码
      code:'',
      // 机构代码
      organizationalCode:'',


      // 申报单位信息
      //申报单位
      companyName:'',
      // 单位性质
      Nature:'',
      // 组织机构代码
      codes:'',
      // 单位所在地
      address:'',
      // 邮政编码
      PostalCode:'',
      // 通信地址
      Mailingaddress:'',


      //保存字段
      declareId:'',
      // 申报机构代码
      applyCompanyCode:'',
      topicId:'',//主键id
      applyCode:'',//code码
      companyCodes:[],//code集合
      companyNums:'',
    };
  },
  mounted() {
    // if (this.$route.query) {
    //   this.declareId = this.$route.query.declareId;
    //   // console.log(this.$route.query);
    // }
  },
  created(){
    if (this.$route.query){
      this.topicId = this.$route.query.id;
      this.getTableDataList();
    }
  },
  methods: {
    //初始化查看单位信息
    getLookCompanyInfor(){
        return declareSelectUnitInformation({
            id:this.topicId
        }).then(res=>{
          this.tableDatas = res.data.declareCompanys;
          console.log(res.data.declareCompanys)
            this.applyCode = res.data.applyCompanyCode;
            this.companyNums = res.data.companyNum;
            let declareCompanys = [];
            let codeKeys = "";
            if(res.data.declareCompanys != null){
                res.data.declareCompanys.map((item,index)=>{
                    codeKeys = item.companyCode
                    declareCompanys.push(codeKeys)
                })
                this.companyCodes = declareCompanys;
            } 
            if(this.applyCode != null){
                institutionalSectorlistCompanys({
                    codes:[this.applyCode]
                }).then(res=>{
                    res.data.map((val,i)=>{
                        this.companyName = val.name;//申报单位
                        this.Nature = val.nature;//机构性质
                        this.codes = val.organizationalCode;//组织机构代码
                        this.address = val.address;//单位所在地
                        this.PostalCode = val.postCode;//邮政编码
                        this.Mailingaddress = val.address;//通信地址
                    })
                })
            }
        })
    },
    //表格
    async getTableDataList(){
        await this.getLookCompanyInfor();
        institutionalSectorlistCompanys({
            codes:this.companyCodes
        }).then(res=>{
          if(res.result == "SUCCESS"){
            // this.tableDatas = res.data;
          }
        })
    },
    // 返回
    goBack() {
      window.history.go(-1);
    },
    search(){
      companySelectlist({
        name:this.name,
        code:this.code,
        organizationalCode:this.organizationalCode,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(res=>{
        if(res.result == 'SUCCESS'){
          this.tableData = res.data.list
        }
      })
    },
    data(val) {
      console.log(val);
    },
    // 项目负责人选择
    changeProjectContact() {
      this.dialogFlag = true;
    },
    // 关闭项目负责人选择
    closeProjectContact() {
      this.declare = false;
      this.participate = false;
    },
    
    ParticipatingUnits(row){
      this.tableDatas = row;
    },
    getTemplatePick(row) {
      
      //申报单位
      this.companyName=row.name;
      // 单位性质
      this.Nature=row.nature;
      // 组织机构代码
      this.codes=row.organizationalCode;
      // 单位所在地
      this.address=row.address;
      // 邮政编码
      this.PostalCode=row.postCode;
      // 通信地址
      this.Mailingaddress=row.address;
      this.applyCompanyCode = row.code
    },
    // 修改每页显示条数
    modifypageSize(value) {
      this.pageSize = value;
      // this.getthemelist(this.currentPage,this.pageSize)// 获取主题列表
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.currentPage = v;
      // this.queryDataList();// 查询
    }
  },
};
</script>

<style lang="scss" scoped>
.unitInformation {
  width: 980px;
  margin: 0px 10px;
  height: auto;
  background-color: #f5f5f5;
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
    .Thenum{
      background-color: #fff;
      padding-top: 60px;
      height: 30px;
      p{
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
      .dialogSearchbox{
        width: 760px;
        height: 30px;
        margin-bottom: 10px;
        .dialogSearchbox_name_l{
          width: 83px;
          height: 30px;
          line-height: 30px;
          float: left;
          text-align: right;
          margin-right: 10px;
          font-size: 16px;
        }
        .dialogSearchbox_inp{
          float: left;
        }
        .dialogSearchbox_btn{
          width: 88px;
          height: 30px;
          box-sizing: border-box;
          background-color: #3f82e1;
          color: #fff;
          margin-right: 40px;
          border: none;
          float: right;
          border-radius: 3px; 
          color:#fff;
          font-size: 14px;
        }
        .dialogSearchbox_name_r{
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
      .tableBox {
        padding: 0 !important;
      }
      .dialogMaintable{
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
      }
      .changeBtn {
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
</style>