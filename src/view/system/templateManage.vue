<template>
  <div class="declareTheme">
		<p class="title">模板管理</p>
		<!-- <div class="search">
			<div class="search_box">
				<div class="search_box_1">
					<p>模板名称</p>
					<inputs class="inputs" width='440px' height='30px' v-model="name"></inputs>
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
                <div class="search_btn">
                    <button class="searchbtn" @click="queryData('data')">查询</button>
                </div>
			</div>
		</div> -->
        <div style="background:#fff;padding-bottom:12px;">
            <div class="addtheme">
				<button class="searchbtn" @click="addSelectons">创建模板</button>
                <!-- <router-link to="/preDeclare/declareTheme/addTheme" tag="button" class="searchbtn">创建模板</router-link> -->
            </div>
            <div class="wrapperMain">
                <TableCommon class="talbe_box" :tableData="tableListData" :tableHeader="tableHeader" :operation="operation" :loading="loading" @getStateName="getState" :page="currentPage" :pageSize="pageSize" :selectionFlag="false" :indexFlag="false"></TableCommon>
            </div>
            <div class="wrapperPagination">
                <PaginationCommon :total="total" :pages='pageNum' :page-size="pageSize" @modifypageSize="modifypageSize"  @handleCurrentChangeSub="handleCurrentChangeFun" :current-page="currentPage"></PaginationCommon>
            </div>
        </div>
		<!-- 新增模板 -->
        <div class="dialogWrapper" v-show="addChapter">
            <div class="addBox">
                <div class="dialogTitle">
                    <p>{{chapterTitle}}</p>
                    <img src="../../assets/img/components/close.png" alt="" @click="closeAddDialog">
                </div>
                <div class="editItem" style="padding-left:10px;padding-top:20px;">
                    <div class="editCenter">
                        <div class="editName">模板名称</div>
                        <div class="editContent" style="width:476px;">
                            <inputs class="inputs" width="476px" v-model="chapterNames" height="30px"></inputs>
                        </div>
                    </div>
                </div>
				<div class="editItem" style="padding-left:10px;padding-top:20px;">
					<div class="editCenter">
						<div class="editName">模板类型</div>
						<div class="editContent" style="width:476px;">
							<el-select
								v-model="type"
								placeholder="请选择"
								clearable
								size="small">
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
                <div class="changeBtn">
                    <button class="ret" @click="closeAddDialog">取消</button>
                    <button class="hold">确定</button>
                </div>
            </div>
        </div>
		<DialogCommon v-if="successFlag" :msg="dialogMsg" type="success" @successUnselect="successUnselect"></DialogCommon>
		<DialogCommon v-if="errorFlag" :msg="errorMsg" type="error" @errorUnselect="errorFlag = false"></DialogCommon>
		<DialogCommon v-if="dialogVisible" :msg="dialogMsg" type="warning" @unselect="unselect" @confirm="confirm" ></DialogCommon> 
  </div>
    
</template>

<script>
import dayjs from 'dayjs'
import {templateListData,templatePublish,cancelTemplateList} from 'http/systemMange'
import input from '../../components/common/input.vue'
import {mapGetters} from 'vuex';
import TableCommon from '../../components/common/TableCommon.vue'
import PaginationCommon from '../../components/common/PaginationCommon.vue'
import DialogCommon from '../../components/common/DialogCommon.vue'
export default {
  name: "declareTheme",
  data() {
    return {
			chapterNames:'',//模板名称
			addChapter:false,//新增模板
			optionList:[],//模板类型
			type:'',//类型
			chapterTitle:'',//模板标题
			name:'',//模板名称
			options: [{
				value: 'OFFICIAL',
				label: '正式申报'
			}, {
				value: 'CONTRACT',
				label: '合同'
			}],
			Hierarchy:[{
				value: '0',
				label: '本层主题'
			}, {
				value: '1',
				label: '上层主题'
			}, ],
					value: '',
					values:'',
        	// 表格所需字段
			tableListData: [],
			tableHeader:[
				{
					label:'模板名称',
					prop:'name',
					minWidth:'282px'
				},
				{
					label:'模板类型',
					prop:'type',
					minWidth:'94px'
				},
				{
					label:'更新时间',
					prop:'modifyDatetime',
					minWidth:'170px'
				},
				{
					label:'更新人',
					prop:'responsibleName',
					minWidth:'160px'
				},
				{
					label:'更新状态',
					prop:'status',
					minWidth:'180px'
				},
				{ 
					prop: 'oper',
					label: '操作', 
					fixed: 'right', 
          			minWidth: '74px',
					icon:'el-icon-menu',
				}
			],
			operation:[
				{name: '查看' ,icon:"el-icon-document-copy"},
				{name: '修改' ,icon:"el-icon-edit-outline"},
				{name:'发布',icon:"el-icon-document-add"},
				{name:'取消发布',icon:"baI_cancle"},
				{name: '管理章节',icon:"baI_chapter"},
				{name: '查看文档',icon:"baI_look_word"},
				{name:'编辑文档',icon:"baI_write_word"},
			],
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
			currentPage:1,
			code:'',
			status:'',//更新状态
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
		this.getTemplatelist(1,this.pageSize);// 获取模板列表

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
			this.getTemplatelist(this.currentPage,this.pageSize)// 获取主题列表
			this.queryData();// 查询
		},
		// 获取主题列表
		getTemplatelist(pageNo,pageSize){
			templateListData({
				pageNo: pageNo,
				pageSize:pageSize
			}).then((res)=>{
				if(res.result == "SUCCESS"){
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
					this.pageNum = res.data.pages;
					if(res.data.list != null && res.data.list.length >0){
						res.data.list.map((val,index)=>{
							if(val.modifyDatetime == null){
								val.modifyDatetime = ""
							}else{
								val.modifyDatetime = dayjs(val.modifyDatetime).format('YYYY-MM-DD HH:mm:ss');
							}
							if(val.status == 'CANCELPUBLISH'){
								val.status = '取消发布'
							}
						})
					}
					this.tableListData = res.data.list;
				}
			})
		},
		//查询
		queryData(data){
			if(data){
				this.currentPage = 1
			}
			templateListData({
				pageNo: this.currentPage,
				pageSize: this.pageSize,
				name:this.name,
				status:this.status
			}).then(res=>{
				if(res.result == "SUCCESS"){
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
					this.pageNum = res.data.pages;
					if(res.data.list != null && res.data.list.length >0){
						res.data.list.map((val,index)=>{
							if(val.modifyDatetime == null){
								val.modifyDatetime = ""
							}else{
								val.modifyDatetime = dayjs(val.modifyDatetime).format('YYYY-MM-DD HH:mm:ss');
							}
							if(val.status == 'CANCELPUBLISH'){
								val.status = '取消发布'
							}
						})
					}
					this.tableListData = res.data.list;
				}
			})
		},
		// 修改每页显示条数
		modifypageSize(value){
			this.pageSize = value;
			this.getTemplatelist(this.currentPage,this.pageSize)// 获取主题列表
		},
		// 关闭取消
		unselect(){
			this.dialogVisible = false;
		},
		// 关闭确定
		confirm(){
			closetopic({
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
				}
			})
			
		},
		// 点击状态
		getState(name,row){
			if(name == '查看'){
				this.addChapter = true;
				this.chapterTitle = "查看模板";
			}else if(name == '修改'){
				this.addChapter = true;
				this.chapterTitle = "修改模板";
			}else if(name == '发布'){
				templatePublish({
					id:row.id
				}).then(res=>{
					if(res.result == "SUCCESS"){
						this.successFlag = true;
						this.dialogVisible = false;
						this.dialogMsg = '模板发布成功!'
						this.getTemplatelist(this.currentPage,this.pageSize);//模板列表
						var th = this;
						setTimeout(function(){
							th.successFlag = false;
						},2000)
					}else{
						this.errorFlag = true;
						this.errorMsg = '模板发布失败'
					}
				})
			}else if(name == '取消发布'){
				cancelTemplateList({
					id:row.id
				}).then(res=>{
					if(res.result == "SUCCESS"){
						this.successFlag = true;
						this.dialogVisible = false;
						this.dialogMsg = '模板取消发布成功!'
						this.getTemplatelist(this.currentPage,this.pageSize);//模板列表
						var th = this;
						setTimeout(function(){
							th.successFlag = false;
						},2000)
					}else{
						this.errorFlag = true;
						this.errorMsg = '模板取消发布失败'
					}
				})
			}else if(name == '查看文档'){
				var a = document.createElement('a');
				$("body").append(a); 
				var url = "javascript:POBrowser.openWindowModeless('http://192.168.1.247:9080/component/pageoffice/openTemp?id="+ row.id +"','width=1200px;height=800px;')";
				a.href = url;
				a.click();
				$(a).remove();
			}else if(name == '编辑文档'){
				var a = document.createElement('a');
				$("body").append(a); 
				var url = "javascript:POBrowser.openWindowModeless('http://192.168.1.247:9080/component/pageoffice/editTemp?id=" + row.id +"','width=1200px;height=800px;')";
				a.href = url;
				a.click();
				$(a).remove();
			}else if(name == '管理章节'){
				this.$router.push({
					path:'/system/manageChapter',
					query:{
						id:row.id,
						name:row.name,
						type:row.type
					}
				})
			}
		},
		// 关闭主题发布成功
		successUnselect(){
			this.successFlag = false;
		},
		//新增模板
		addSelectons(){
			this.addChapter = true;
			this.chapterTitle = "创建模板";
		},
		// 关闭模板
		closeAddDialog(){
			this.addChapter = false;
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
  height: 90px;
  margin: 0px 10px;
  box-sizing: border-box;
  margin-bottom: 12px;
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
.dialogWrapper{
    position: absolute;
    top: 0;
    width: 990px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:9999;
    .dialogTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px 16px;
        p{
            font-size: 18px;
            color:#666;
            font-weight: bold;
        }
    }
    .changeBtn{
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
            margin-right:59px;
        }
        .hold {
            background-color: #3f82e1;
            color: #fff;
        }
    }
    .editItem{
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #666;
        .editCenter{
            display: flex;
            align-items: center;
            padding-left: 20px;
            .editName{
                text-align: end;
                padding-right: 10px;
                display: flex;
                flex-direction: column;
                span{
                    font-size: 12px;
                }
            }
            .editContent{
                display: flex;
                align-items: center;
            }
        }
    }
    .dialogBox{
        width:822px;
        height: 530px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 10px;
        padding:30px 0;
        z-index:99;
        display: flex;
        flex-direction: column;
        .dialogSearch{
            width: 760px;
            border:1px solid #b5b5b5;
            margin: 0 auto;
            display: flex;
            align-items: center;
            border-radius: 6px;
            padding: 20px 0;
            
        }
        .dialogMain{
            width: 760px;
            height: 200px;
            overflow-y: scroll;
            margin: 20px auto;
            .tableBox{
                padding: 0 !important;
            }
            
        }
        .dialogFooter{
            width: 760px;
            .pagination{
                width: 760px !important;
            }
        }
    }
    .addBox{
        width:626px;
        height: 288px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 10px;
        padding:30px 0;
        z-index:99;
        display: flex;
        flex-direction: column;
        .documentBox{
            width: 470px;
            height: 276px;
            margin: 0 auto;
            margin-top:30px;
            overflow: hidden;
            overflow-y: scroll;
            border:1px solid #ccc;
            padding: 10px;
            .documentTitle{
                font-size: 16px;
                color:#666;
                margin-bottom: 20px;
            }
        }
    }
}
</style>
