<template>
  <div class="declareTheme">
		<p class="title">管理章节</p>
		<div class="search">
			<div class="search_box">
				<div class="search_box_1">
					<p>模板名称：</p>
                    <span class="inputs">{{name}}</span>
				</div>
				<div class="search_box_3">
					<p>模板类型：</p>
                    <span class="inputs">{{type}}</span>
				</div>
			</div>
		</div>
        <div style="background:#fff;padding-bottom:12px;">
            <div class="addtheme">
                <button class="searchbtn" @click="addSelectons">新增章节</button>
                <!-- <router-link to="/preDeclare/declareTheme/addTheme" tag="button" class="searchbtn">新增章节</router-link> -->
            </div>
            <div class="wrapperMain_chapterbox">
                <tableTree :tableData='tableData' :tableHeader='tableHeader' :operation='operation' :treeProps='treeProps' @getStateName="getState"></tableTree>
            </div>
            <div class="wrapperPagination">
                <PaginationCommon :total="total" :pages='pageNum' :page-size="pageSize" @modifypageSize="modifypageSize"  @handleCurrentChangeSub="handleCurrentChangeFun" :current-page="currentPage"></PaginationCommon>
            </div>
        </div>
        <!-- 新增章节 -->
        <div class="dialogWrapper" v-show="addChapter">
            <div class="addBox">
                <div class="dialogTitle">
                    <p>{{chapterTitle}}</p>
                    <img src="../../assets/img/components/close.png" alt="" @click="closeAddDialog">
                </div>
                <div class="editItem" style="padding-left:10px;padding-top:20px;">
                    <div class="editCenter">
                        <div class="editName">章节名称</div>
                        <div class="editContent" style="width:476px;">
                            <inputs class="inputs" width="476px" v-model="chapterNames" height="30px"></inputs>
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
import {pageofficeSelectTemplateChapterList,deletChapterList} from 'http/systemMange'
import inputs from '../../components/common/input.vue'
import {mapGetters} from 'vuex';
import tableTree from '../../components/common/tableTree.vue'
import PaginationCommon from '../../components/common/PaginationCommon.vue'
import DialogCommon from '../../components/common/DialogCommon.vue'
export default {
  name: "manageChapter",
  data() {
    return {
            addChapter:false,//新增章节弹框
            chapterNames:'',//章节名称
            chapterTitle:'',//章节名字
            name:'',//模板章节名称
            type:'',//模板类型
			options: [{
				value: 'OFFICIAL',
				label: '正式申报'
			}, {
				value: 'BEFORE',
				label: '预申报'
			}],
        // 表格所需字段
			tableData: [
                {
                    id: 3,
                    date: "2016-05-01",
                    chapterName: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄",
                    children: [
                        {
                            id: 31,
                            date: "2016-05-01",
                            chapterName: "王小虎",
                            address: "上海市普陀区金沙江路 1519 弄"
                        },
                    {
                        id: 32,
                        date: "2016-05-01",
                        chapterName: "王小虎",
                        address: "上海市普陀区金沙江路 1519 弄",
                        children: [
                            {
                                id: 311,
                                date: "2016-05-01",
                                chapterName: "王小虎",
                                address: "上海市普陀区金沙江路 1519 弄"
                            },
                            {
                            id: 322,
                            date: "2016-05-01",
                            chapterName: "王小虎",
                            address: "上海市普陀区金沙江路 1519 弄",
                            children: [
                                {
                                    id: 3111,
                                    date: "2016-05-01",
                                    chapterName: "王小虎",
                                    address: "上海市普陀区金沙江路 1519 弄"
                                },
                                {
                                    id: 3222,
                                    date: "2016-05-01",
                                    chapterName: "王小虎",
                                    address: "上海市普陀区金沙江路 1519 弄",
                                    children: [
                                    {
                                        id: 31111,
                                        date: "2016-05-01",
                                        chapterName: "王小虎",
                                        address: "上海市普陀区金沙江路 1519 弄"
                                    },
                                    {
                                        id: 32222,
                                        date: "2016-05-01",
                                        chapterName: "王小虎",
                                        address: "上海市普陀区金沙江路 1519 弄"
                                    }
                                ]
                            }
                        ]}
                    ]}
                ]}
            ],
			tableHeader:[
				{
					label:'章节名称',
					prop:'templateChapterName',
                    minWidth:'850px',
				},
				{ 
					prop: 'oper',
					label: '操作', 
					fixed: 'right', 
          			minWidth: '84px',
					icon:'el-icon-menu',
				}
			],
			operation:[
                // more:true,
                {name: '修改名称' ,icon:"el-icon-edit-outline"},
                {name:'新增子章节',icon:"baI_add_subchapter"},
                {name:'删除',icon:"baI_delete"},
                {name:'修改章节',icon:"baI_write_word"},
                {name: '查看章节',icon:"baI_look_word"},
            ],
            treeProps:{children: 'childList'},
			// 分页器所需字段
			// 总条数
			total:0,
			// 每页条数
			pageSize: 10,
			// 总页数
			pageNum:1,
            currentPage:1,
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
            chapterId:'',//模板id
		};
  },
  computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
  },
	components:{
		inputs,
		tableTree,
		PaginationCommon,
		DialogCommon
	},
	created() {	
        this.chapterId = this.$route.query.id;
        this.name = this.$route.query.name;
        this.type = this.$route.query.type;
		this.getChapterList(1,this.pageSize);// 获取主题列表
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
        },
        // 修改每页显示条数
		modifypageSize(value){
			this.pageSize = value;
			this.getChapterList(this.currentPage,this.pageSize)// 获取主题列表
        },
        //管理章节列表
        getChapterList(pageNo,pageSize){
            pageofficeSelectTemplateChapterList({
                id:this.chapterId
            }).then(res=>{
                if(res.result == 'SUCCESS'){
                    if(res.data != null){
					this.tableData = res.data;
                    }else {
                        this.tableData = [];
                    }
                }
            })
        },
        getState(name,row){
            if(name == '修改名称'){
                this.addChapter = true;
                this.chapterTitle = "修改名称";
            }else if(name == '新增子章节'){
                this.addChapter = true;
                this.chapterTitle = "新增子章节";
            }else if(name == '删除'){
                deletChapterList({id:row.id}).then(res=>{
                    if(res.result == 'SUCCESS'){
                        this.successFlag = true;
						this.dialogVisible = false;
						this.dialogMsg = '删除章节成功!'
						this.getChapterList(this.currentPage,this.pageSize);//模板列表
						var th = this;
						setTimeout(function(){
							th.successFlag = false;
						},2000)
					}else{
						this.errorFlag = true;
						this.errorMsg = '删除章节失败'
					}
                })
            }else if(name == '修改章节'){
                var a = document.createElement('a');
				$("body").append(a); 
				var url = "javascript:POBrowser.openWindowModeless('http://192.168.1.247:9080/bo/component/pageoffice/openChapter?id=27','width=1200px;height=800px;')";
				a.href = url;
				a.click();
				$(a).remove();
            }else if(name == '查看章节'){
                var a = document.createElement('a');
				$("body").append(a); 
				var url = "javascript:POBrowser.openWindowModeless('http://localhost:9990/bo/component/pageoffice/openReadChapter?id=27','width=1200px;height=800px;')";
				a.href = url;
				a.click();
				$(a).remove();
            }
        },
        // 新增章节
        addSelectons(){
            this.addChapter = true;
            this.chapterTitle = "新增章节";
        },
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
            width: 612px;
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
                height: 30px;
                line-height: 32px;
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
        height: 256px;
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