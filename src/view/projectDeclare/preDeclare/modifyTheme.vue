<template>
  <div class="addTheme">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import selectTree from "common/selectTree";
import datePicker from "../../../components/common/datePicker";
import fileupload from "../../../components/common/fileupload";
import { getTopicDetailstopic, updatetopic } from "http/projectDeclare";
import input from "../../../components/common/input.vue";
export default {
  name: "addTheme",
  data() {
    return {
      // 主题code
      code:'',
      // 主题编号
      id: "",
      // 主题名称
      title: "",
      // 上级主题code
      parentCode:'',
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
      //附件列表
      filelist:[],
      showFlag: false
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
    fileupload
  },
  created() {
    getTopicDetailstopic(this.$route.query.id).then(res => {
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
        this.filelist = res.data.topicAttachmentVoList;
        if(this.filelist.length>0){
          this.filelist.map((v,i)=>{
            v.name = v.attachmentName
            v.response = {}
            v.response.data = v.filePath
          })
        }
        console.log(this.filelist)
        this.show= true
      }
    });
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
    // 发布单位选择
    companychoice(val) {
      // val.map()
      this.company = val;
    },

    departmentchoices(val) {
      this.departmentchoice = val;
      console.log(val);
    },
    // 保存
    hold() {
      console.log(this.company, this.departmentchoice);
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
          id: this.$route.query.id,
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
          // 附件
          filePaths:this.filelist
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
    }
  }
};
</script>

<style lang="scss" scoped>
.addTheme {
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
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
</style>