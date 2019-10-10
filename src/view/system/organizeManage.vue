<template>
  <div class="declareTheme">
		<p class="title">组织机构管理</p>
		<!-- <div class="search">
			<div class="search_box">
				<div class="search_box_1">
					<p>单位代码</p>
					<inputsa class="inputs" ref="reset" width='130px' height='30px' v-model="name"></inputsa>
				</div>
				<div class="search_box_3">
					<p>单位名称</p>
                    <inputsa class="inputs"  ref="resetUnit" width='350px' height='30px' v-model="status"></inputsa>
				</div>
                <div class="search_btn">
                    <button class="searchbtn" @click="queryData('data')">查询</button>
                    <button class="searchbtn" @click="resetData()">重置</button>
                </div>
			</div>
		</div> -->
        <div style="background:#fff;padding-bottom:12px;">
            <div class="addtheme">
				<button class="searchbtn" @click="addUnits">添加</button>
                <!-- <router-link to="/preDeclare/declareTheme/addTheme" tag="button" class="searchbtn">创建模板</router-link> -->
            </div>
            <div class="wrapperMain">
				<tableTreeCommon
					class="talbe_box"
					:tableData="tableListData"
					:tableHeader="tableHeader"
					:operation="operation"
					:treeProps="treeProps"
					@getStateName="getState"
      			></tableTreeCommon>
            </div>
            <div class="wrapperPagination">
                <PaginationCommon :total="total" :pages='pageNum' :page-size="pageSize" @modifypageSize="modifypageSize"  @handleCurrentChangeSub="handleCurrentChangeFun" :current-page="currentPage"></PaginationCommon>
            </div>
        </div>
		<!-- 新增模板 -->
        <div class="dialogWrapper" v-if="addChapter">
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
import {getCompanyTreeList,removeCompanyList} from 'http/systemMange'
import input from '../../components/common/input.vue'
import inputsa from '../../components/common/resetInput.vue'
import {mapGetters} from 'vuex';
import tableTreeCommon from '../../components/common/tableTree.vue'
import PaginationCommon from '../../components/common/PaginationCommon.vue'
import DialogCommon from '../../components/common/DialogCommon.vue'
export default {
  name: "organizeManage",
  data() {
    return {
			treeProps: { children: "subList" },
			chapterNames:'',//模板名称
			addChapter:false,//新增模板
			optionList:[],//模板类型
			type:'',//类型
			chapterTitle:'',//模板标题
			name:'',//模板名称
			value: '',
			values:'',
        	// 表格所需字段
			tableListData: [],
			tableHeader:[
				{
					label:'单位代码',
					prop:'code',
					minWidth:'116px'
				},
				{
					label:'单位名称',
					prop:'name',
					minWidth:'262px'
				},
				{
					label:'单位性质',
					prop:'nature',
					minWidth:'220px'
				},
				{
					label:'联系人',
					prop:'contact',
					minWidth:'146px'
				},
				{
					label:'联系电话',
					prop:'phone',
					minWidth:'134px'
				},
				{ 
					prop: 'oper',
					label: '操作', 
					fixed: 'right', 
          			minWidth: '68px',
					icon:'el-icon-menu',
				}
			],
			operation:[
                {name:'编辑',icon:"baI_modify"},
                {name:'添加子单位',icon:"baI_add_subchapter"},
                {name:'删除',icon:"baI_delete"},
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
		tableTreeCommon,
		PaginationCommon,
		DialogCommon,
		inputsa
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
			getCompanyTreeList({
				
			}).then((res)=>{
				if(res.result == "SUCCESS"){
					this.total = res.data.total;
					this.pageSize = res.data.pageSize;
					this.pageNum = res.data.pages;
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
		//重置按钮
		resetData(){
			this.$refs.reset.resetList();
			this.$refs.resetUnit.resetList();
			this.name = "";
			this.status = "";
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
			if(name == '编辑'){
				this.$router.push({
					path:'/system/addUnit',
					query:{
						id:row.id
					}
				})
				window.localStorage.setItem('SubUnit','编辑')
			}else if(name == '添加子单位'){
				this.$router.push({
					path:'/system/addUnit',
					query:{
						id:row.id,
						code:row.code,
						name:row.name
					}
				})
				window.localStorage.setItem('SubUnit','添加子单位')
			}else if(name == '删除'){
				removeCompanyList({
					id:row.id
				}).then(res=>{
					if(res.result == "SUCCESS"){
						this.successFlag = true;
						this.dialogVisible = false;
						this.dialogMsg = '单位删除成功!'
						var th = this;
						setTimeout(function(){
							th.successFlag = false;
						},2000)
						this.getTemplatelist(this.currentPage,this.pageSize);//单位列表
					}else{
						this.errorFlag = true;
						this.errorMsg = '单位删除失败'
					}
				})
			}
		},
		// 关闭主题发布成功
		successUnselect(){
			this.successFlag = false;
		},
		//新增单位
		addUnits(){
			this.$router.push({
                path:'/system/addUnit',
			})
			window.localStorage.setItem('SubUnit','新增')
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
			margin-left: 22px;
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
