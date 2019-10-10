<template>
  <div class="addTheme">
    <p class="title">创建主题</p>
    <div class="contents">
      <div class="code">
        <p>主题编号</p>
        <inputs class="inputs" width="160px" height="30px" disabled="true"></inputs>
      </div>
      <div class="name">
        <p>
          <span class="star">*</span>主题名称
        </p>
        <inputs class="inputs" width="324px" height="30px" v-model="title"></inputs>
      </div>
      <div class="theme">
        <p>上级主题</p>
        <inputs class="inputs" width="160px" height="30px" disableds="true" v-model="parentCode"></inputs>
      </div>
      <div class="term">
        <p>
          <span class="star">*</span>&nbsp;&nbsp;&nbsp;申报期
        </p>
        <datePicker class="inputs" width="148px" v-model="reportStartDate" height="30px"></datePicker>
        <span class="in">-</span>
        <datePicker class="inputs" width="148px" height="30px" v-model="reportEndDate"></datePicker>
      </div>
      <div class="company">
        <p>发布单位</p>
        <div>
          <selectTree @choicedata="companychoice" :endlevel="0"></selectTree>
          <!-- <el-select v-model="company" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
        </div>
      </div>
      <div class="company">
        <p>发布部门</p>
        <!-- departmentCodes -->
        <div>
          <selectTree
            @choicedata="departmentchoices"
            :startlevel="2"
            :endlevel="0"
            :companycode="loginInforma.companyCode"
          ></selectTree>
          <!-- <el-select v-model="company" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
        </div>
      </div>
      <div class="notice">
        <p>&nbsp;主题公告</p>
        <textarea v-model="description" style="font-size:16px;" cols="2" rows="6"></textarea>
      </div>
      <div class="options">
        <p>&nbsp;相关附件</p>
        <fileupload class="fileupload" @success="filesuccess"></fileupload>
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
import input from "../../../components/common/input.vue";
import fileupload from "../../../components/common/fileupload";
import datePicker from "../../../components/common/datePicker";
import { addtopic } from "../../../http/impl/projectDeclare";
import { Loading } from 'element-ui';
export default {
  name: "addTheme",
  data() {
    return {
      // 主题名称
      title: "",
      // 上级主题id
      parentTopicId: "",
      // 上级主题code
      parentCode:'',
      // 主题模板
      documentTemplateId:'',
      // 发布单位
      company: "",
      // 发布部门
      departmentchoice: "",
      // 主题公告
      description: "",
      // 申报开始时间
      reportStartDate: "",
      // 申报结束时间
      reportEndDate: "",
      //附件列表
      filelist:[],
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
    if (this.$route.query.id) {
      this.parentTopicId = this.$route.query.id;
      this.parentCode = this.$route.query.code;
      this.documentTemplateId = this.$route.query.documentTemplateId;
    }
  },
  mounted(){
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
      this.company = val;
    },
    departmentchoices(val) {
      this.departmentchoice = val;
      console.log(val);
    },
    hold() {
      var load = Loading.service({
          lock: true,
          text: '加载中……',
          background: 'rgba(255, 255, 255, 0.7)'
      })
      var companyarr = [];
      if (this.company.length > 0) {
        this.company.map((v, i) => {
          companyarr.push(v.code);
        });
      }
      var departmentchoicearr = [];
      if (this.departmentchoice.length > 0) {
        this.departmentchoice.map((v, i) => {
          departmentchoicearr.push(v.code);
        });
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
        addtopic({
          // 主题名称
          title: this.title,
          // 上级主题
          parentTopicId: this.parentTopicId,
          // 上级主题code
          parentCode:this.parentCode,
          // 主题模板
          documentTemplateId:this.documentTemplateId,
          // 申报开始时间
          reportStartDate: this.reportStartDate,
          // 申报结束时间
          reportEndDate: this.reportEndDate,
          // 发布单位
          companyCodes: companyarr,
          //发布部门
          departmentCodes: departmentchoicearr,
          // 主题公告
          description: this.description,
          // 附件
          filePaths: this.filelist
        }).then(res => {
          if (res.result == "SUCCESS") {
            load.close();
            this.$message({
              message: "保存成功",
              type: "success"
            });
            window.history.go(-1);
          } else {
            load.close();
            this.$message({
              message: "保存失败",
              type: "error"
            });
          }
        });
      }
    },
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
      line-height: 30px;
      margin-left: 10px;
      margin-right: 10px;
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
    font-size: 16px;
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