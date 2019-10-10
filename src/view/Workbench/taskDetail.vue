<template>
  <div class="task">
    <topTitle title="我的任务   >   任务详情"></topTitle>
    <div class="taskInformation">
      <p class="title">{{workTask.name}}</p>
      <ul class="tasklist">
        <li>分配人 : {{workTask.createAccount}}</li>
        <li>分配时间 : {{workTask.createDateTime}}</li>
        <li>截止时间 : {{workTask.endDatetime}}</li>
        <li>状态 : {{workTask.status}}</li>
      </ul>
      <div class="taskExplain">
        <p>任务说明 :</p>
        <p>{{workTask.discription}}</p>
      </div>
    </div>
    <div class="taskFile">
      <p>申报书填写</p>
      <div class="form">
        <TableCommon
          :tableData="fileData"
          :tableHeader="fileHeader"
          :operation="fileOperation"
          :loading="loading"
          @getStateName="getState"
          :selectionFlag="false"
          :indexFlag="false"
        ></TableCommon>
      </div>
    </div>
    <div class="taskEnclosure">
      <p>上传附件</p>
      <div class="form">
        <TableCommon
          :tableData="enclosureData"
          :tableHeader="enclosureHeader"
          :operation="fileOperation"
          :loading="loading"
          @getStateName="getState"
          :selectionFlag="false"
          :indexFlag="false"
        ></TableCommon>
      </div>
    </div>
    <div class="complete">
      <button @click="complete()">完成任务</button>
    </div>
  </div>
</template>

<script>
import topTitle from "../../components/common/topTitle.vue";
import inputs from "../../components/common/input.vue";
import TableCommon from "../../components/common/TableCommon.vue";
import PaginationCommon from "../../components/common/PaginationCommon.vue";
import {workTaskGetWorkTaskInfo,workTaskUpdate} from "../../http/impl/formalDeclaration"
export default {
  name: "task",
  data() {
    return {
      //文档
      fileData: [],
      //附件
			enclosureData: [],
      fileHeader: [
        {
          label: "章节名称",
          prop: "name",
          minWidth: "156px"
        },
        {
          prop: "oper",
          label: "操作",
          fixed: "right",
          minWidth: "68px",
          icon: "el-icon-menu"
        }
      ],
      enclosureHeader:[
        {
          label: "附件名称",
          prop: "name",
          minWidth: "156px"
        },
        {
          label: "上传附件",
          prop: "name",
          minWidth: "156px"
        },
        {
          prop: "oper",
          label: "操作",
          fixed: "right",
          minWidth: "68px",
          icon: "el-icon-menu"
        }
      ],
      fileOperation:  [
        { name: "去完成", icon: "baI_details" }
      ],
      loading: false,
      

      //任务信息
      workTask:'',
      //申报id
      relationId:''
      
      
		};
  },
  components:{
    topTitle,
    inputs,
    TableCommon,
    PaginationCommon
  },
  created() {
    workTaskGetWorkTaskInfo({
      id:this.$route.query.id
    }).then(res=>{
      console.log(res)
      if(res.result == 'SUCCESS'){
        this.workTask = res.data.workTask;
        this.relationId = res.data.relationId;
        res.data.workTaskDeliveries.map((v,i)=>{
          if(v.type == '文档'){
            this.fileData.push(v)
          }
        })
        console.log(this.fileData)
      }
    })
	},
  methods: {
    complete(){
      var arr = []
      var th = this;
      this.fileData.map((v,i)=>{
        var obj = {
          id:v.id,
          taskId:th.$route.query.id,
          name:v.name,
          docChapterId:v.docChapterId,
          type: "文档",
        }
        arr.push(obj)
      })
      workTaskUpdate({
        workTask: {
          id: this.workTask.id,
          status: this.workTask.status
        },
        workTaskDeliveries: arr
      }).then(res=>{
        console.log(res)
        if(res.result == 'SUCCESS'){

        }

      })
    },
    getState(name, row) {
      console.log(name,row)
      if(name == '去完成'){
        // POBrowser.openWindowModeless('http://192.168.1.247:9080/component/pageoffice/openChapterDetial?id='+row.docChapterId,'width=1200px;height=800px;');
        window.sessionStorage.setItem('stateStr','')
        this.$router.push({
          path: "/formalDeclaration/createDeclaration/document",
          query: {
            id: this.relationId,
            docChapterId:row.docChapterId
          }
        });
      }

    },
    modifypageSize(value) {
      this.pageSize = value;
      this.getthemelist(this.currentPage, this.pageSize); // 获取主题列表
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.currentPage = v;
      this.queryDataList(); // 查询
    },
  }
};
</script>

<style lang="scss" scoped>
.task{
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
  position: relative;
} 
.taskInformation{
  width: 980px;
  margin: 0px 10px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 20px;
  .title{
    font-size: 18px;
    font-weight: 500;
    margin-top: 20px;
    text-indent: 20px;
    margin-bottom: 30px;
  }
  .tasklist{
    display: flex;
    font-size: 16px;
    margin-bottom: 20px;
    li:nth-child(1){
      margin-left: 20px;
      width: 240px;
    }
    li:nth-child(2){
      width: 284px;
    }
    li:nth-child(3){
      width: 304px;
    }
    li:nth-child(4){
      font-size: 18px;
      font-weight: 600
    }
  }
  .taskExplain{
    font-size: 16px;
    margin-bottom: 20px;
    display: flex;
    p:nth-child(1){
      width: 80px;
      margin-left: 20px;

    }
    p:nth-child(2){
      flex: 1;
      margin-right: 20px;
    }
  }
}
.taskFile,.taskEnclosure{
  width: 980px;
  margin: 0px 10px;
  background-color: #fff;
  overflow: hidden;
  margin-bottom: 20px;
  border-radius: 5px;
  p{
    font-size: 16px;
    margin: 20px 0px;
    text-indent: 20px
  }
  .form{
    width: 960px;
    margin: 0px 10px;
    margin-bottom: 20px;
  }
}
.complete{
  width: 1000px;
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  justify-content:center;
  button{
    width: 100px;
    height: 50px;
    margin-top: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    border: none;
    border-radius: 3px;
  }
}
</style>