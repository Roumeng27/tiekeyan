
<template>
  <div class="declareDecision">
    <topTitle Title='决策审批'></topTitle>
    <div class="search">
      <div class="top">
		<div class="box" @click="godeclareDecision()">决策审批</div>
        <div class="show">开评审会</div>
      </div>
      <div class="condition">
        <div class="left">
          <div class="box">
            <div class="title">会议主题</div>
            <inputs width="368px" height="30px" v-model="titel"></inputs>
          </div>
          <div class="box">
            <div class="title">会议地点</div>
            <inputs width="368px" height="30px" v-model="meetAddress"></inputs>
          </div>
        </div>
        <div class="right">
          <div class="box">
            <div class="title">会议时间</div>
            <datePicker class="inputs" width='182px' v-model="minMeetTime" height='30px'></datePicker><span>—</span>
            <datePicker class="inputs" width='182px' v-model="maxMeetTime" height='30px'></datePicker>
          </div>
          <div class="btn">
            <button class="searchbtn" @click="queryDataList('data')">查询</button>
          </div>
        </div>
      </div>
    </div>
    <div class="addtheme">
        <button class="searchbtn" @click="addMeeting">新建评审会</button>
    </div>
    <div class="wrapperMain">
		<TableCommon :tableData="tableData" :tableHeader="tableHeader" :operation="operation" :loading="loading" @getStateName="getState" :page="currentPage" :pageSize="pageSize" :selectionFlag="false" :indexFlag="true"></TableCommon>
	</div>
	<div class="wrapperPagination">
		<PaginationCommon :total="total" :pages='pageNum' :page-size="pageSize" @modifypageSize="modifypageSize"  @handleCurrentChangeSub="handleCurrentChangeFun" :current-page="currentPage"></PaginationCommon>
	</div>
  </div>
    
</template>

<script>
import topTitle from  '../../../components/common/topTitle'
import input from  '../../../components/common/input'
import TableCommon from '../../../components/common/TableCommon.vue'
import PaginationCommon from '../../../components/common/PaginationCommon.vue'
import datePicker from '../../../components/common/datePicker.vue'
import {getreviewMettingInfo} from 'http/projectDeclare';
export default {
  name: "declareDecision",
  data() {
    return {
        // 表格所需字段
		tableData: [
			// {
			// 	id:48,
			// 	type:'评审类型',
			// 	titel:'会议主题'
			// }
		],
		tableHeader:[
			{
				label:'评审类型',
				prop:'type',
				minWidth:'126px'
			},{
				label:'会议主题',
				prop:'titel',
				minWidth:'246px'
			},
			{
				label:'会议时间',
				prop:'meetTime',
				minWidth:'182px'
			},
			{
				label:'会议地点',
				prop:'meetAddress',
				minWidth:'228px'
			},
			{ 
				prop: 'oper',
				label: '操作', 
				fixed: 'right', 
				minWidth: '68px',
				icon:'el-icon-menu',
			}
		],
		loading:false, 
		// 分页器所需字段
		total:0,
		pageSize: 10,
		pageNum:1,
		operation:{
			more:true,
			data1:[
				{name: '详情',icon:"el-icon-tickets"},
				{name: '申报',icon:"el-icon-document-checked"},
				{name: '修改' ,icon:"el-icon-edit-outline"},
				{name: '查看申报' ,icon:"el-icon-document-copy"},
				{name:'发布',icon:"el-icon-document-add"},
				{name:'申报决策',icon:"el-icon-document"},
				{name:'关闭',icon:"el-icon-switch-button"}
			],
			data2:[
				{name: '详情',icon:"el-icon-tickets"},
				{name: '修改',icon:"el-icon-document"}
			]
		},
		currentPage:1,
		// 条件查询
		id:'',// 评审编号
		meetAddress:'',// 会议地点
		titel:'',// 会议主题
		maxMeetTime :'',// 会议时间（后）
		minMeetTime:'',// 会议时间（前）
		relationId:'',// 申报编号
	};
},
  	components:{
		topTitle:topTitle,
		inputs:input,
		TableCommon,
		PaginationCommon,
		datePicker
  	},
  	created() {
	  	this.getRevietingwMeeList(1,this.pageSize,this.$route.query.id);// 评审会列表
	},
  	methods: {
		  // 决策审批
		  godeclareDecision(){
			  this.$router.push({
					path:'/preDeclare/formalDeclaration/reportDecision',
					query:{
						id:this.$route.query.id
					}
				})
		  },
		  // 新建评审会
		  addMeeting(){
			  this.$router.push({
					path:'/preDeclare/formalDeclaration/addreviewMeeting',
					query:{
						id:this.$route.query.id
					}
				})
		  },
		// 修改每页显示条数
		modifypageSize(value){
			this.pageSize = value;
			this.queryDataList();// 查询
		},
		//页面点击
		handleCurrentChangeFun(v) { 
			this.currentPage = v;
			this.getRevietingwMeeList(v,this.pageSize,this.$route.query.id)// 评审会列表
		},
		// 评审会列表
		getRevietingwMeeList(pageNo,pageSize,topicId){
			getreviewMettingInfo({
				pageNo: pageNo,
				pageSize: pageSize,
				topicId:topicId,
				type:'DECLARE'
			}).then((res)=>{
				if(res.result == "SUCCESS"){
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
					this.pageNum = res.data.pages;
					this.tableData = res.data.list;
				}
			})
		},
		// 查询
		queryDataList(data){
			if(data){
				this.currentPage = 1
			}
			getreviewMettingInfo({
				pageNo: this.currentPage,
				pageSize: this.pageSize,
				// id:parseInt(this.id),// 评审编号
				topicId:this.$route.query.id,// 评审编号
				meetAddress:this.meetAddress,// 会议地点
				titel:this.titel,// 会议主题
				maxMeetTime :this.maxMeetTime,// 会议时间（后）
				minMeetTime:this.minMeetTime,// 会议时间（前）
				relationId:this.relationId,// 申报编号
				type:'DECLARATION'
			}).then((res)=>{
				if(res.result == "SUCCESS"){
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
					this.pageNum = res.data.pages;
					this.tableData = res.data.list
				}
			})
		},
		// 点击状态
		getState(name,row){
			if(name == '详情'){
				this.$router.push({
					path:'/preDeclare/formalDeclaration/searchreviewMeeting',
					query:{
						topicId:this.$route.query.id,
						id:row.id
					}
				})
			}else if(name == '修改'){
				this.$router.push({
					path:'/preDeclare/formalDeclaration/editreviewMeeting',
					query:{
						topicId:this.$route.query.id,
						id:row.id
					}
				})
			}
		}
  }
};
</script>

<style lang="scss" scoped>
.declareDecision{
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
}
.search{
  width: 980px;
  margin: 0 10px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .top{
    overflow: hidden;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    height: 52px;
    div{
      width: 136px;
      height: 52px;
      margin-left: 10px;
      margin-top: 10px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      text-align: center;
      font-size: 18px;
      line-height: 52px;
    }
    .show{
      background-color: #c2d7f5;
      color: #3f82c1;
      cursor: pointer;
    }
    .box{
      background-color: #e7e7e7;
      color: #666;
      cursor: pointer;
    }
  }
  .condition{
    overflow: hidden;
    padding-bottom: 20px;
    .left{
      float: left;
      margin-left: 20px;
      .box{
        display: flex;
        margin-top: 20px;
        .title{
          margin-right: 10px;
          line-height: 30px;
          
        }
      }
      
    }
    .right{
      float: right;
      margin-right: 10px;
      .box{
        display: flex;
        margin-top: 20px;
        .title{
          margin-right: 10px;
          line-height: 30px;
          
        }
        span{
          display: block;
          margin:0px 10px;
		  line-height: 30px;
        }
        
      }
      
    }
    .btn{
      margin-top: 20px;
      margin-left: 40px;
      .searchbtn{
          width: 112px;
          height: 30px;
          border: none;
          background-color: #3f82e1;
          color: #fff;
          border-radius: 3px;
          margin-left: 15px;
          float: right;
        } 
    }
  }
  
}
.addtheme{
    width: 1000px;
    height: 56px;
    .searchbtn{
      width: 112px;
      height: 30px;
      box-sizing: border-box;
      background-color: #3f82e1;
      color: #fff;
      margin-top: 16px;
      margin-right: 20px;
      border: none;
      float: right;
      border-radius: 3px;
    }
  }
  .wrapperPagination{
	  padding-bottom: 30px;
  }
</style>