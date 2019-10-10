<template>
  <div class="addTheme" v-if="show">
    <p class="title">查看主题</p>
    <div class="contents" >
      <div class="code">
        <p>&nbsp;&nbsp;&nbsp;创建人</p>
        <inputs class="inputs" width='160px' height='30px' v-model="createAccount" disableds='true'></inputs>
      </div>
      <div class="name">
        <p>创建机构</p>
        <inputs class="inputs" width='324px' height='30px' v-model="name" disableds='true'></inputs>
      </div>
      <div class="code">
        <p>创建时间</p>
        <inputs class="inputs" width='160px' height='30px' v-model="createDatetime" disableds='true'></inputs>
      </div>
      <div class="name">
        <p>主题状态</p>
        <inputs class="inputs" width='324px' height='30px' v-model="status" disableds='true'></inputs>
      </div>
      <div class="code">
        <p>主题编号</p>
        <inputs class="inputs" width='160px' height='30px' v-model="code" disableds='true'></inputs>
      </div>
      <div class="name">
        <p>主题名称</p>
        <inputs class="inputs" width='324px' height='30px' v-model="title" disableds='true'></inputs>
      </div>
      <div class="theme">
        <p>上级主题</p>
        <inputs class="inputs" width='160px' height='30px' v-model="parentCode"  disableds='true'></inputs>
      </div>
      <div class="term">
        <p>申报期&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <inputs class="inputs" width='144px' v-model="reportStartDate" disableds='true' height='30px'></inputs><span>-</span>
        <inputs class="inputs" width='144px' v-model="reportEndDate" disableds='true' height='30px'></inputs>
      </div>
      <div class="company">
        <p>发布单位</p>
        <div>
          <span v-for="(val,index) in company" :key="index">
            <span class="el-tag el-tag--info el-tag--small">
              <span class="el-select__tags-text">{{val.name}}</span>
              <!-- <i class="el-tag__close el-icon-close"></i> -->
            </span>
          </span>
        </div>
      </div>
      <div class="company">
        <p>发布部门</p>
        <div>
          <span v-for="(val,index) in departmentchoice" :key="index">
            <span class="el-tag el-tag--info el-tag--small" >
              <span class="el-select__tags-text">{{val.name}}</span>
            </span> 
          </span>
        </div>
      </div>
      <div class="templateBox">
        <!-- <button >选择文档模板</button> -->
        <p>{{documentName}}模板</p>
      </div>
      <div class="notice">
        <p>&nbsp;主题公告</p>
        <textarea
          style="font-size:16px;"
          cols="2"
          v-model="description"
          disabled="disabled"
          rows="6"
        ></textarea>
      </div>
      <div class="options">
        <p>&nbsp;相关附件</p>
        <fileupload class="fileupload" :file="filelist" :disabled='true'></fileupload>
      </div>
    </div>
    <div class="operation">
      <button class="ret" @click="ret()">返回</button>
    </div>
  </div>
    
</template>

<script>
import {getTopicDetailstopic} from 'http/projectDeclare'
import {templateListData} from "../../../http/impl/formalDeclaration";
import input from '../../../components/common/input.vue'
import fileupload from "../../../components/common/fileupload";
export default {
  name: "searchDeclareTheme",
  data() {
    return {
      show:false,
      documentName:'',//模板名称
      options:'',
      // 创建人
      createAccount:'',
      // 创建机构
      name:'',
      // 创建时间
      createDatetime:'',
      // 主题状态
      status:'',
      // 主题code
      code:'',
      // 主题编号
      id:'',
      // 主题名称
      title:'',
      // 上级主题code
      parentCode:'',
      // 上级主题
      parentTopicId:'',
      // 申报期
      reportStartDate:'',
      reportEndDate:'',
      /// 发布单位
      company:'',
      // 发布部门
      departmentchoice:'',
      // 主题公告
      description:'',
      // 主题公告
      description:'',
      // 附件
      //附件列表
      filelist:[],
      topicAttachmentVoList:'',
      documentTemplateId:'',// 文档模板ID
      currentPage:1,
      pageSize:10,
		};
  },
 
  components:{
    inputs:input,
    fileupload
  },
  created() {
    getTopicDetailstopic(this.$route.params.id).then((res)=>{
       this.show = true
        if(res.result == 'SUCCESS'){
          this.createAccount=res.data.createAccount;
          this.name=res.data.name;
          this.createDatetime=res.data.createDatetime;
          var state = '';
          if(res.data.status == 'DRAFT'){
            state = '草稿'
          }else if(res.data.status == 'RELEASE'){
            state = '发布'
          }else if(res.data.status == 'CLOSE'){
            state = '关闭'
          }else if(res.data.status == 'STOP'){
            state = '停用'
          }
          this.status=state,
          this.id = res.data.id;
          this.code = res.data.code;
          this.title = res.data.title;
          this.parentTopicId = res.data.parentTopicId;
          this.parentCode = res.data.parentCode;
          this.reportStartDate = res.data.reportStartDate;
          this.reportEndDate = res.data.reportEndDate;
          this.description = res.data.description;
          this.company = res.data.companList
          this.departmentchoice = res.data.departmentList
          this.documentTemplateId = res.data.documentTemplateId;
          this.filelist = res.data.topicAttachmentVoList;
          if(this.filelist!=null){
            this.filelist.map((v,i)=>{
              console.log(v)
              v.name = v.attachmentName
            })
          }
         
          this.getDocumentData(this.currentPage,this.pageSize)
        }
      })
    
	},
  methods: {
    ret(){
      window.history.go(-1);
    },
    getDocumentData(currentPage,pageSize){
			templateListData({
        pageNo:currentPage,// 页码
        id:this.documentTemplateId,
				pageSize:pageSize,// 页显示量
			}).then(res=>{
				if(res.result == 'SUCCESS'){
          if(res.data.list != null){
            this.documentName = res.data.list[0].name;
          }
				}
			})
		},
  }
};
</script>

<style lang="scss" scoped>
.addTheme{
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
}
.title{
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
  border-bottom: 1px solid #f5f5f5
}
.contents{
  width: 980px;
  margin: 0px 10px;
  font-size: 16px;
  background-color: #fff;
  overflow: hidden;
  .code{
    width: 352px;
    height: 30px;
    margin-top: 30px;
    float: left;
    .inputs{
      float: left;
    }
  }
  div p{
    line-height: 30px;
    text-indent: 20px;
    float: left;
    margin-right: 16px;
  }
  .name{
    float: left;
    width: 628px;
    height: 30px;
    margin-top: 30px;
   
  }
  .theme{
    width: 352px;
    height: 30px;
    float: left;
    margin-top: 40px;
  }
  .term{
    width: 628px;
    height: 30px;
    float: left;
    margin-top: 40px;
    display: flex;
    span{
      margin-left: 10px;
      margin-right: 10px;
      line-height: 30px;
    }
  }
}
.company{
  margin-top: 40px;
  float: left;
  div{
    width: 800px;
    float: left;
    border: 1px solid #ccc;
    // height: 30px;
    border-radius: 5px;
    min-height: 30px;
    span{
      margin: 5px;
    }
  }
}
.notice{
  width: 912px;
  height: 160px;
  float: left;
  margin-top: 40px;
  textarea{
    width: 800px;
    height: 160px;
    float: left;
    resize: none;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
}
.options{
  width: 912px;
  min-height: 30px;
  float: left;
  margin-top: 40px;
  .fileupload{
    float: left;
    width: 800px
  }
  .add{
    width: 86px;
    height: 30px;
    border: 1px solid #3f82e1;
    background-color: #fff;
    color: #3f82e1;
    border-radius: 3px;
  }
}
.operation{
  margin: 0 10px;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 980px;
  height: 46px;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    width: 100px;
    height: 46px;
    border: none;
    border-radius: 3px;
  }
  .ret{
    background-color: #fff;
    color: #3f82e1;
    border: 1px solid #3f82e1;
    // position: absolute;
    // left: 350px;
  }
}
.templateBox {
  width: 912px;
  display: flex;
  align-items: center;
  padding: 20px 0 0 0 ;
  button {
    width: 100px;
    height: 32px;
    border: none;
    border-radius: 3px;
    background-color: #3f82e1;
    color: #fff;
  }
}
</style>