<template>
  <div class="addTheme" v-if="show">
    <p class="title">修改主题</p>
    <div class="contents" v-if="showFlag">
      <div class="code">
        <p>主题编号</p>
        <inputs class="inputs" width="160px" v-model="code" height="30px" disableds="true"></inputs>
      </div>
      <div class="name">
        <p>
          <span class="star">*</span>主题名称
        </p>
        <inputs class="inputs" width="324px" v-model="title" height="30px"></inputs>
      </div>
      <div class="theme">
        <p>上级主题</p>
        <inputs class="inputs" width="160px" v-model="parentCode" height="30px" disableds="true"></inputs>
      </div>
      <div class="term">
        <p>
          <span class="star">*</span>&nbsp;&nbsp;&nbsp;申报期
        </p>
        <datePicker class="inputs" width="148px" v-model="reportStartDate" height="30px"></datePicker>
        <span class="in">-</span>
        <datePicker class="inputs" width="148px" v-model="reportEndDate" height="30px"></datePicker>
      </div>
      <div class="company">
        <p>发布单位</p>
        <div>
          <selectTree @choicedata="companychoice" :endlevel="0" :choicedatas="company"></selectTree>
          <!-- <selectTree @choicedata="companychoice" :choicedatas="company"></selectTree> -->
        </div>
      </div>
      <div class="company">
        <p>发布部门</p>
        <div>
          <selectTree
            @choicedata="departmentchoices"
            :startlevel="2"
            :endlevel="0"
            :choicedatas="departmentchoice"
            :companycode="loginInforma.companyCode"
          ></selectTree>
          <!-- <selectTree @choicedata="departmentchoices" :choicedatas="departmentchoice" :department='loginInforma.companyCode'></selectTree> -->
        </div>
      </div>
      <div class="templateBox">
        <button @click="changeProjectContact">选择文档模板</button>
        <p>{{documentName}}模板</p>
      </div>
      <div class="notice">
        <p>&nbsp;主题公告</p>
        <textarea style="font-size:16px;" v-model="description" cols="2" rows="6"></textarea>
      </div>
      <div class="options">
        <p>&nbsp;相关附件</p>
        <fileupload class="fileupload" :file="filelist" @success="filesuccess"></fileupload>
      </div>
    </div>
    <div class="operation">
      <button class="ret" @click="goBack">返回</button>
      <button class="hold" @click="hold()">保存</button>
    </div>
    <!-- 文档模板选择弹框 -->
    <div class="dialogWrapper" v-show="dialogFlag">
      <div class="dialogBox">
        <div class="dialogTitle">
          <p>文档模板选择</p>
          <img src="../../../assets/img/components/close.png" alt @click="closeDocument" />
        </div>
        <div class="dialogSearch">
          <div class="editCenter">
            <div class="editName">项目名称</div>
            <div class="editContent">
              <inputs class="inputs" width="546px" v-model="name" height="30px"></inputs>
            </div>
          </div>
          <button class="fadeInBtn" @click="searchList">查询</button>
        </div>
        <div class="dialogMain">
          <TableCommon
            :tableData="tableData"
            :tableHeader="tableHeader"
            @getTemplatePick="getTemplatePick"
            :radioFlag="true"
          ></TableCommon>
        </div>
        <div class="changeBtn">
          <button class="ret" @click="closeDocument">取消</button>
          <button class="hold" @click="documentSure">确定</button>
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
import { mapGetters } from "vuex";
import selectTree from "common/selectTree";
import datePicker from "../../../components/common/datePicker";
import { getTopicDetailstopic, updatetopic } from "http/projectDeclare";
import {
  addformalDeclarationInfo,
  templateListData
} from "../../../http/impl/formalDeclaration";
import input from "../../../components/common/input.vue";
import TableCommon from "../../../components/common/TableCommon.vue";
import PaginationCommon from "../../../components/common/PaginationCommon.vue";
import fileupload from "../../../components/common/fileupload";
export default {
  name: "editDeclareTheme",
  data() {
    return {
      show:false,
      // 主题code
      code: "",
      // 主题编号
      id: "",
      // 主题名称
      title: "",
      // 上级主题code
      parentCode: "",
      // 上级主题
      parentTopicId: "",
      // 申报期
      reportStartDate: "",
      reportEndDate: "",
      // 发布单位
      company: [],
      // 发布部门
      departmentchoice: [],
      // 主题公告
      description: "",
      // 附件
      topicAttachmentVoList: "",
      showFlag: false,
      // 分页器所需字段0000
      // 总条数
      total: 0,
      // 每页条数
      pageSize: 10,
      // 总页数
      pageNum: 1,
      currentPage: 1,
      dialogFlag: false,
      tableData: [],
      tableHeader: [
        {
          label: "模板名称",
          prop: "name",
          minWidth: "688px"
        }
      ],
      name: "", // 模板名称模糊查询
      rowDetail: {}, // 单选框选中的数据
      documentName: "",

      filelist: []
    };
  },
  computed: {
    ...mapGetters({
      loginInforma: "gs_Home_loginInforma"
    })
  },
  components: {
    inputs: input,
    datePicker,
    selectTree,
    TableCommon,
    PaginationCommon,
    fileupload
  },
  created() {
    this.getDocumentData(this.currentPage, this.pageSize);
  },
  methods: {
    // 附件上传成功
    filesuccess(val){
      this.filelist = []
      val.map((v,i)=>{
        var obj = {
          attachmentName : v.name,
          filePath : v.response.data
        }
        this.filelist.push(obj)
      })
    },
    // 查询
    getDetail() {
      return getTopicDetailstopic(this.$route.params.id).then(res => {
        this.showFlag = true;
        if (res.result == "SUCCESS") {
          this.id = res.data.id;
          this.code = res.data.code;
          this.title = res.data.title;
          this.parentTopicId = res.data.parentTopicId;
          this.parentCode = res.data.parentCode;
          this.reportStartDate = res.data.reportStartDate;
          this.reportEndDate = res.data.reportEndDate;
          this.description = res.data.description;
          this.company = res.data.companList;
          this.departmentchoice = res.data.departmentList;
          this.documentTemplateId = res.data.documentTemplateId; // 文档模板ID
          this.filelist = res.data.topicAttachmentVoList;
          if (this.filelist!=null) {
            this.filelist.map((v, i) => {
              v.name = v.attachmentName;
              v.response = {};
              v.response.data = v.filePath;
            });
          }
          this.show = true
        }
      });
    },

    // 发布单位选择
    companychoice(val) {
      // val.map()
      this.company = val;
    },

    departmentchoices(val) {
      this.departmentchoice = val;
    },
    // 保存
    hold() {
      var companyarr = [];
      if (this.company) {
        this.company.map((v, i) => {
          companyarr.push(v.code);
        });
      }
      var departmentchoicearr = [];
      if (this.departmentchoice) {
        this.departmentchoice.map((v, i) => {
          departmentchoicearr.push(v.code);
        });
      }
      if (companyarr.length == 0) {
        companyarr = null;
      }
      if (departmentchoicearr.length == 0) {
        departmentchoicearr = null;
      }
      if (!this.title) {
        this.$message({
          message: "请输入主题名称!",
          type: "info"
        });
      } else if (!this.reportStartDate) {
        this.$message({
          message: "请输入申报期开始时间!",
          type: "info"
        });
      } else if (!this.reportEndDate) {
        this.$message({
          message: "请输入申报期结束时间!",
          type: "info"
        });
      } else {
        updatetopic({
          // id
          id: this.$route.params.id,
          // 主题名称
          title: this.title,
          // 上级主题
          // parentTopicId: this.parentTopicId,
          // 申报开始时间
          reportStartDate: this.reportStartDate,
          // 申报结束时间
          reportEndDate: this.reportEndDate,
          // 发布单位
          companyCodes: companyarr,
          // 发布部门
          departmentCodes: departmentchoicearr,
          // 主题公告
          description: this.description,
          // 主题模板
          documentTemplateId: this.documentTemplateId,
          // 附件
          filePaths: this.filelist
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            window.history.go(-1);
          } else {
            this.$message({
              message: "保存失败",
              type: "error"
            });
          }
        });
      }
    },
    // 返回上一級
    goBack() {
      window.history.go(-1);
    },
    // 项目负责人选择
    changeProjectContact() {
      this.dialogFlag = true;
    },
    // 文档模板列表
    async getDocumentData(currentPage, pageSize) {
      await this.getDetail();
      templateListData({
        pageNo: currentPage, // 页码
        pageSize: pageSize, // 页显示量
        name: this.name // 模板名称模糊查询
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.tableData.forEach(item => {
            if (item.id == this.documentTemplateId) {
              this.documentName = item.name;
            }
          });
        }
      });
    },
    // 查询
    searchList() {
      this.getDocumentData(this.currentPage, this.pageSize); // 获取主题列表
    },

    // 修改每页显示条数
    modifypageSize(value) {
      this.pageSize = value;
      this.getDocumentData(this.currentPage, this.pageSize); // 获取主题列表
    },
    //页面点击
    handleCurrentChangeFun(v) {
      this.currentPage = v;
      this.searchList(); // 查询
    },
    // 单选框选中的数据
    getTemplatePick(row) {
      this.rowDetail = row;
    },
    // 关闭文档模板选择
    closeDocument() {
      this.dialogFlag = false;
    },
    // 文档模板确定
    documentSure() {
      this.documentName = this.rowDetail.name;
      this.documentTemplateId = this.rowDetail.id;
      this.dialogFlag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.addTheme {
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
  position: relative;
}
.title {
  width: 980px;
  margin: 0px 10px;
  height: 58px;
  background-color: #fff;
  margin-top: 16px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 18px;
  line-height: 58px;
  text-indent: 20px;
  border-bottom: 1px solid #f5f5f5;
}
.contents {
  width: 980px;
  margin: 0px 10px;
  font-size: 16px;
  background-color: #fff;
  overflow: hidden;
  .code {
    width: 352px;
    height: 30px;
    margin-top: 30px;
    float: left;
    .inputs {
      float: left;
    }
  }
  .inputs {
    font-size: 16px;
  }
  div p {
    line-height: 30px;
    text-indent: 20px;
    float: left;
    margin-right: 16px;
  }
  .name {
    float: left;
    width: 628px;
    height: 30px;
    margin-top: 30px;
    .star {
      color: #f00;
      padding: 0 4px;
    }
  }
  .theme {
    width: 352px;
    height: 30px;
    float: left;
    margin-top: 40px;
  }
  .term {
    width: 628px;
    height: 30px;
    float: left;
    margin-top: 40px;
    display: flex;
    .star {
      color: #f00;
      padding: 0 4px;
    }
    .in {
      margin-left: 10px;
      margin-right: 10px;
      line-height: 30px;
    }
  }
}
.company {
  margin-top: 40px;
  float: left;
  div {
    width: 800px;
    float: left;
  }
}
.notice {
  width: 912px;
  height: 160px;
  float: left;
  margin-top: 40px;
  textarea {
    width: 800px;
    height: 160px;
    float: left;
    resize: none;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
}
.options {
  width: 912px;
  min-height: 30px;
  float: left;
  margin-top: 40px;
  .fileupload{
    float: left;
    width: 800px
  }
  .add {
    width: 86px;
    height: 30px;
    border: 1px solid #3f82e1;
    background-color: #fff;
    color: #3f82e1;
    border-radius: 3px;
  }
}
.operation {
  margin: 0px 10px;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 980px;
  height: 46px;
  background-color: #fff;
  position: relative;
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
    position: absolute;
    left: 350px;
  }
  .hold {
    background-color: #3f82e1;
    color: #fff;
    position: absolute;
    left: 550px;
  }
}
.templateBox {
  width: 912px;
  display: flex;
  align-items: center;
  padding: 20px;
  button {
    width: 100px;
    height: 32px;
    border: none;
    border-radius: 3px;
    background-color: #3f82e1;
    color: #fff;
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

  .dialogBox {
    width: 820px;
    // height: 568px;
    height: 510px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 10px;
    padding: 30px 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    .dialogSearch {
      display: flex;
      align-items: center;
      border-radius: 6px;
      padding: 20px 10px;
      .editCenter {
        display: flex;
        align-items: center;
        padding-left: 20px;
        font-size: 16px;
        color: #666;
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
      .fadeInBtn {
        width: 88px;
        height: 30px;
        box-sizing: border-box;
        background-color: #3f82e1;
        color: #fff;
        margin-left: 50px;
        border: none;
        float: right;
        border-radius: 3px;
        color: #fff;
        font-size: 14px;
      }
    }
    .dialogMain {
      width: 758px;
      height: 200px;
      overflow: hidden;
      overflow-y: scroll;
      overflow-x: none;
      margin: 20px auto;
      .tableBox {
        padding: 0 !important;
      }
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
    .dialogFooter {
      width: 758px;
      .pagination {
        width: 758px !important;
      }
    }
  }
}
</style>