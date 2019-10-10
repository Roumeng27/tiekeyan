<template>
  <div class="declareTheme">
		<p class="title">主题列表</p>
		<div class="search">
			<div class="search_box">
				<div class="search_box_1">
					<p>主题编号</p>
					<inputs class="inputs" width='186px' height='30px' v-model="code"></inputs>
				</div>
				<div class="search_box_2">
					<p>主题名称</p>
					<inputs class="inputs" width='268px' height='30px' v-model="title"></inputs>
				</div>
				<div class="search_box_3">
					<p>状态</p>
					<div style="width:196px" class="select">
						<el-select v-model="status" clearable  size="small" placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<div class="search_box">
				<div class="search_box_1">
					<p>上层主题编号</p>
					<inputs class="inputs" width='186px' height='30px' v-model="parentCode"></inputs>
				</div>
				<div class="search_box_2">
					<p>创建机构</p>
					<inputs class="inputs" width='268px' height='30px' v-model="name"></inputs>
				</div>
				<div class="search_box_3">
					<p>主题层级</p>
					<div style="width:196px" class="select">
						<el-select v-model="Hierarchyval" clearable  size="small" placeholder="请选择">
							<el-option
								v-for="item in Hierarchy"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<div class="search_btn">
				<button class="searchbtn" @click="queryDataList('data')">查询</button>
			</div>
		</div>
		<div class="addtheme">
			<router-link to="/preDeclare/formalDeclaration/addDeclareTheme" tag="button" class="searchbtn">创建主题</router-link>
		</div>
    	<div class="wrapperMain">
			<TableCommon :tableData="tableData" :tableHeader="tableHeader" :operation="operation" @getStateName="getState" :page="currentPage" :pageSize="pageSize" :selectionFlag="false" :indexFlag="false"></TableCommon>
		</div>
		<div class="wrapperPagination">
			<PaginationCommon :total="total" :pages='pageNum' :page-size="pageSize" @modifypageSize="modifypageSize"  @handleCurrentChangeSub="handleCurrentChangeFun" :current-page="currentPage"></PaginationCommon>
		</div>
		<DialogCommon v-if="successFlag" :msg="dialogMsg" type="success" @successUnselect="successUnselect"></DialogCommon>
		<DialogCommon v-if="errorFlag" :msg="errorMsg" type="error" @errorUnselect="errorFlag = false"></DialogCommon>
		<DialogCommon v-if="dialogVisible" :msg="dialogMsg" type="warning" @unselect="unselect" @confirm="confirm" ></DialogCommon> 
  </div>
    
</template>

<script>
import {getTopicListPagetopic,releasetopic} from 'http/projectDeclare'
import {officialDeclarationclose,topicSelectTopicListPage} from 'http/formalDeclaration'
import input from '../../../components/common/input.vue'
import {mapGetters} from 'vuex';
import TableCommon from '../../../components/common/TableCommon.vue'
import PaginationCommon from '../../../components/common/PaginationCommon.vue'
import DialogCommon from '../../../components/common/DialogCommon.vue'
export default {
  name: "formalDeclaration",
  data() {
    return {
			options: [{
				value: 'DRAFT',
				label: '草稿'
			}, {
				value: 'RELEASE',
				label: '发布'
			}, {
				value: 'CLOSE',
				label: '关闭'
			}, {
				value: 'STOP',
				label: '停用'
			}],
			Hierarchy:[{
				value: '0',
				label: '本层主题'
			}, {
				value: '1',
				label: '上层主题'
			}],
			Hierarchyval:'',
      		value: '',
        // 表格所需字段
			tableData: [],
			tableHeader:[
				{
					label:'主题编号',
					prop:'code',
					minWidth:'156px'
				},
				{
					label:'主题名称',
					prop:'title',
					minWidth:'236px'
				},
				{
					label:'主题状态',
					prop:'state',
					minWidth:'90px'
				},
				{
					label:'主题层级',
					prop:'Hierarchy',
					minWidth:'90px'
				},
				{
					label:'上层主题编号',
					prop:'parentCode',
					minWidth:'156px'
				},
				{
					label:'申报截止时间',
					prop:'reportEndDate',
					minWidth:'188px'
				},
				{
					label:'创建机构',
					prop:'name',
					minWidth:'230px'
				},
				{ 
					prop: 'oper',
					label: '操作', 
					fixed: 'right', 
          			minWidth: '68px',
					icon:'el-icon-menu',
				}
			],
			operation:{
				more:true,
				data1:[
					{name: '详情',icon:"el-icon-tickets"},
					{name: '申报',icon:"el-icon-document-checked"},
					{name: '修改' ,icon:"el-icon-edit-outline"},
					{name: '查看申报' ,icon:"el-icon-document-copy"},
					{name:'发布',icon:"el-icon-document-add"},
					{name:'申报决策',icon:"baI_seedecision"},
					{name:'关闭',icon:"el-icon-switch-button"}
				],
				data2:[
					{name: '详情',icon:"baI_details"},
					{name: '创建子主题',icon:"baI_addson"}
				],
				// 发布
				data3:[
					{name: '详情',icon:"baI_details"},
					{name: '申报',icon:"baI_declare"},
					{name: '查看申报' ,icon:"baI_seedeclare"},
					{name:'申报决策',icon:"baI_seedecision"},
					{name:'关闭',icon:"baI_close"}
				],
				// 草稿
				data4:[
					{name: '详情',icon:"baI_details"},
					{name: '修改' ,icon:"baI_modify"},
					{name:'发布',icon:"baI_release"}
				],
				// 关闭 CLOSE
				data5:[
					{name: '详情',icon:"baI_details"}
				],

			},
			loading:false, 
			// 分页器所需字段
			// 总条数
			total:0,
			// 每页条数
			pageSize: 10,
			// 总页数
			pageNum:1,
			// 确认关闭
			dialogVisible:false,
			dialogMsg:'',
			// 发布成功
			successFlag:false,
			// 当前id
			currentId:'',
			// 错误提示
			errorFlag:false,
			errorMsg:'',
			// 查询所需字段
			id:'',// 主题id
			// 主题code
			code:'',
			name:'',// 创建机构
			title:'',// 标题
			// 上层主题code
			parentCode:'',
			status:"",// 主题状态
			currentPage:1,
		};
  },
  computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
  },
	components:{
		inputs:input,
		TableCommon,
		PaginationCommon,
		DialogCommon
	},
	created() {	
		this.getthemelist(1,this.pageSize);// 获取主题列表
		window.sessionStorage.setItem('jump','')
	},
	methods: {
		test(){
			console.log(1)
		},
		handleSizeChangeFun(v) {
			console.log(v)
		},
		handleCurrentChangeFun(v) { //页面点击
			this.currentPage = v;
			this.queryDataList();// 查询
		},
		// 获取主题列表
		getthemelist(pageNo,pageSize){
			topicSelectTopicListPage({
				pageNo: pageNo,
				pageSize:pageSize,
				type:'DECLARE',
			}).then((res)=>{
				if(res.result == "SUCCESS"){
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
					this.pageNum = res.data.pages;
					if(res.data.list != null && res.data.list.length >0){
						res.data.list.map((v,i)=>{
							if(v.departmentCode==this.loginInforma.departmentCode && v.companyCode == this.loginInforma.companyCode){
								v.Hierarchy = '本层主题'
							}else{
								v.Hierarchy = '上层主题'
							}
							if(v.status == 'DRAFT'){
								v.state = '草稿'
							}else if(v.status == 'RELEASE'){
								v.state = '发布'
							}else if(v.status == 'CLOSE'){
								v.state = '关闭'
							}else if(v.status == 'STOP'){
								v.state = '停用'
							}
						})
					}
					this.tableData = res.data.list
				}
			})
		},
		// 查询
		queryDataList(data){
			if(data){
				this.currentPage = 1
			}
			topicSelectTopicListPage({
				pageNo: this.currentPage,
				pageSize: this.pageSize,
				type:'DECLARE',
				// id:this.id,
				code:this.code,
				parentCode:this.parentCode,
				name:this.name,
				title:this.title,
				topicLevel:this.Hierarchyval,
				status:this.status
			}).then((res)=>{
				if(res.result == "SUCCESS"){
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
					this.pageNum = res.data.pages;
					if(res.data.list != null && res.data.list.length >0){
						res.data.list.map((v,i)=>{
							if(v.departmentCode==this.loginInforma.departmentCode && v.companyCode == this.loginInforma.companyCode){
								v.Hierarchy = '本层主题'
							}else{
								v.Hierarchy = '上层主题'
							}
							if(v.status == 'DRAFT'){
								v.state = '草稿'
							}else if(v.status == 'RELEASE'){
								v.state = '发布'
							}else if(v.status == 'CLOSE'){
								v.state = '关闭'
							}else if(v.status == 'STOP'){
								v.state = '停用'
							}
						})
					}
					this.tableData = res.data.list
				}
			})
			
		},
		// 修改每页显示条数
		modifypageSize(value){
			this.pageSize = value;
			this.getthemelist(this.currentPage,this.pageSize)// 获取主题列表
		},
		// 关闭取消
		unselect(){
			this.dialogVisible = false;
		},
		// 关闭确定
		confirm(){
			officialDeclarationclose({
				id:this.currentId
			}).then(res=>{
				if(res.result == 'SUCCESS'){
					this.dialogVisible = false;
					this.successFlag = true;
					this.dialogMsg = '主题关闭成功!';
					var th = this;
					this.tableData.map((v,i)=>{
						if(v.id == this.currentId){
							v.state = '关闭';
							v.status == 'CLOSE'
						}
					})
					setTimeout(function(){
						th.successFlag = false;
					},2000)
					this.getthemelist(this.currentPage,this.pageSize)// 获取主题列表
				}
			})
			
		},
		// 点击状态
		getState(name,row){
			if(name == '关闭'){
				if(row.status == 'RELEASE'){
					this.currentId = row.id;
					this.dialogVisible = true;
					this.dialogMsg ='主题关闭后,将无法访问和操作主题,子主题下的相关内容，是否确定关闭?'
				}else{
					this.errorFlag = true;
					this.errorMsg = '当前主题无法关闭'
				}
				this.getthemelist(this.currentPage,this.pageSize);// 查询申报主题列表
			}else if(name == '发布'){
				releasetopic({
					id:row.id
				}).then((res)=>{
					if(res.result == 'SUCCESS'){
						this.successFlag = true;
						this.dialogVisible = false;
						this.dialogMsg = '主题发布成功!'
						this.getthemelist(this.currentPage,this.pageSize);// 查询申报主题列表
						var th = this;
						setTimeout(function(){
							th.successFlag = false;
						},2000)
					}else{
						this.errorFlag = true;
						this.errorMsg = '当前主题无法发布'
					}
				})
			}else if(name == '详情'){
				this.$router.push({
					// path:'/preDeclare/formalDeclaration/searchDeclareTheme',
					name:'searchDeclareTheme',
					params:{
						id:row.id,
						code : row.code,
						parentCode:row.parentCode,
						documentTemplateId:row.documentTemplateId
					}
				})
			}else if(name == '修改'){
				this.$router.push({
					// path:'/preDeclare/formalDeclaration/editDeclareTheme',
					name:'editDeclareTheme',
					params:{
						id:row.id,
						code : row.code,
						parentCode:row.parentCode,
						documentTemplateId:row.documentTemplateId
					}
				})
			}else if(name == '申报'){
				window.sessionStorage.setItem('stateStr','新增')
				this.$router.push({
					path:'/formalDeclaration/createDeclaration/projectInformation',
					query:{
						id:row.id,
						documentTemplateId:row.documentTemplateId
					}
				})
			}else if(name == '查看申报'){
				this.$router.push({
					path:'/preDeclare/formalDeclaration/checkDeclaration',
					query:{
						id:row.id
					}
				})
			}
			else if(name == '申报决策'){
				this.$router.push({
					path:'/preDeclare/formalDeclaration/reportDecision',
					query:{
						id:row.id
					}
				})
			}
			else if(name == '创建子主题'){
					this.$router.push({
					// path:'/preDeclare/formalDeclaration/addDeclareTheme',
					name:'addDeclareTheme',
					params:{
						id:row.id,
						code : row.code,
						parentCode:row.parentCode,
						documentTemplateId:row.documentTemplateId
					}
				})
			}
		},
		// 关闭主题发布成功
		successUnselect(){
			this.successFlag = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.declareTheme{
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
  position: relative;
	padding-bottom: 40px;
}
.title{
  margin-top: 16px;
  width: 1000px;
  height: 60px;
  text-indent: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #666;
  font-weight: 500;
}
.search{
  width: 980px;
  margin: 0px 10px;
  box-sizing: border-box;
	background-color: #fff;
	padding: 20px 0px 0px 0px;
  // height: 72px;
  border-radius: 5px;
  // line-height: 72px;
	overflow: hidden;
	.search_box{
		width: 100%;
		font-size: 16px;
		height: 30px;
		margin-bottom: 12px;
		.search_box_1{
			float: left;
			p{
				width: 110px;
			}
		}
		.search_box_2{
			float: left;
			p{
				width: 84px;
			}
		}
		.search_box_3{
			float: left;
			p{
				width: 84px;
			}
		}
		div{
			p{
				height: 30px;
				text-align: right;
				float: left;
				line-height: 30px;
				margin-right: 10px;
			}
			.inputs{
				float: left;
			}
		}
	}
	.search_btn{
		height: 30px;
		margin-bottom: 12px;
		.searchbtn{
			width: 88px;
			height: 30px;
			box-sizing: border-box;
			background-color: #3f82e1;
			color: #fff;
			margin-right: 22px;
			border: none;
			float: right;
			border-radius: 3px;
		}
	}
  // .inputs{
  //   float: left;
  //   margin-top: 21px;
  // }
  .name{
    font-size: 16px;
    color: #666;
    margin-left: 20px;
    margin-right: 10px;
    float: left;
  }
  .names{
    float: right;
    margin-right: 10px;
  }
  
  .select{
    float: right;
    margin-right: 20px;
  }
  
}
.addtheme{
    width: 1000px;
    height: 56px;
    .searchbtn{
      width: 88px;
      height: 30px;
      box-sizing: border-box;
      background-color: #3f82e1;
      color: #fff;
      margin-top: 13px;
      margin-right: 20px;
      border: none;
      float: right;
      border-radius: 3px;
    }
  }
</style>