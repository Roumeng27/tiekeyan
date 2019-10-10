<template>
    <div class="declareTheme">
		<p class="title">角色管理&emsp;>&emsp;权限设置</p>
		<div class="search">
			<div class="search_box">
				<div class="search_box_1">
					<p>角色名称</p>
					<inputs class="inputs" width='600px' height='30px' v-model="name"></inputs>
				</div>
                <div class="search_btn">
                    <button class="searchbtn">查询</button>
                    <button class="searchbtn">重置</button>
                </div>
			</div>
		</div>
        <div class="select_box">
            <div class="editItem">
                <div class="editCenter">
                    <div class="editName" style="font-weight:bold;">超级管理员</div>
                </div>
            </div>
            <div class="editItem" style="margin-top:20px;">
                <div class="editCenter">
                    <div class="editContent">
                        <el-checkbox-group v-model="powerIds" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(item,index) in rolePowerData" :label="item.id" :key="index">{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="wrapperPagination">
                <PaginationCommon :total="total" :pages='pageNum' :page-size="pageSize" @modifypageSize="modifypageSize"  @handleCurrentChangeSub="handleCurrentChangeFun" :current-page="currentPage"></PaginationCommon>
            </div>
        </div>
        <div class="changeFooter">
            <button class="ret" @click="goBack">返回</button>
            <button class="hold" @click="saveInfo">保存</button>
        </div>
		<DialogCommon v-if="successFlag" :msg="dialogMsg" type="success" @successUnselect="successUnselect"></DialogCommon>
		<DialogCommon v-if="errorFlag" :msg="errorMsg" type="error" @errorUnselect="errorFlag = false"></DialogCommon>
		<DialogCommon v-if="dialogVisible" :msg="dialogMsg" type="warning" @unselect="unselect" @confirm="confirm" ></DialogCommon> 
    </div>
    
</template>

<script>
import dayjs from 'dayjs'
import {queryFunctionsList,queryRoleList,addPowerList} from 'http/systemMange'
import input from '../../components/common/input.vue'
import {mapGetters} from 'vuex';
import TableCommon from '../../components/common/TableCommon.vue'
import PaginationCommon from '../../components/common/PaginationCommon.vue'
import DialogCommon from '../../components/common/DialogCommon.vue'
export default {
  name: "permissionSettings",
  data() {
    return {
        name:'',
        // 总条数
        total:0,
        // 每页条数
        pageSize:20,
        // 总页数
        pageNum:1,
        currentPage:1,
        roleId:'',//角色id
        rolePowerData:[],//角色权限所有数据
        successFlag:false,
        errorFlag:false,
        dialogVisible:false,
        dialogMsg:'',
        errorMsg:'',
        funcIds:[],
        deleteFuncIds:[],//删除id
        powerIds:[],
        a:'',
        b:'',
        resetID:[]
    };
  },
  computed: {
   
  },
	components:{
		inputs:input,
		TableCommon,
		PaginationCommon,
		DialogCommon
	},
	created() {	
        this.roleId = this.$route.query.id;
        this.getPowerList(1,this.pageSize);
        this.rolePowerList();
	},
	methods: {
		//  返回按钮
        goBack(){
            window.history.go(-1);
        },
        //分页查询所有权限
        getPowerList(pageNo,pageSize){
            queryFunctionsList({
				pageNo: pageNo,
				pageSize:pageSize
			}).then((res)=>{
				if(res.result == "SUCCESS"){
					this.total = res.data.rows;
					this.rolePowerData = res.data.list;
				}
			})
        },
        //根据角色返回权限选项
        rolePowerList(){
            queryRoleList({roleId:this.roleId}).then(res=>{
                if(res.result == "SUCCESS"){
                    if(res.data.list != null){
                        let arrList = [];
                        let arrId = [];
                        res.data.list.map((v,i)=>{
                            arrId.push(v.id);
                        })
                        this.powerIds = arrId;
                        this.resetID = arrId;
                    }
                }
            })
        },
        handleCheckedCitiesChange(val) {
            let arr = [];
            val.map((v,i)=>{
                arr.push(v);
            })
            this.funcIds = arr;
        },
        // 修改每页显示条数
		modifypageSize(value){
			this.pageSize = value;
			this.getPowerList(this.currentPage,this.pageSize)// 获取主题列表
        },
        handleCurrentChangeFun(v) { //页面点击
			this.currentPage = v;
			this.getPowerList(this.currentPage,this.pageSize)// 获取主题列表
        },
        unique(arr){
            return Array.from(new Set(arr)); 
        },
        getArrDifference(arr1, arr2) {
            return arr1.concat(arr2).filter(function(v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
            });
        },
        //保存按钮
        saveInfo(){
            this.resetID = this.resetID.concat(this.funcIds);
            var res = this.unique(this.resetID)
            this.getArrDifference(res,this.funcIds);
            this.deleteFuncIds = this.getArrDifference(res,this.funcIds)
            addPowerList({
                roleId:this.roleId,
                funcIds:this.funcIds,
                deleteFuncIds:this.deleteFuncIds
            }).then(res=>{
                if(res.result == "SUCCESS"){
                    this.dialogVisible = false;
					this.successFlag = true;
					this.dialogMsg = '角色权限保存成功!';
					var th = this;
					setTimeout(function(){
						th.successFlag = false;
					},2000)
                    // this.getPowerList(1,this.pageSize);
                    // this.rolePowerList();
                }
            })
        },
        successUnselect(){
			this.successFlag = false;
        },
        // 关闭取消
		unselect(){
			this.dialogVisible = false;
		},
		// 关闭确定
		confirm(){
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
.select_box{
    background:#fff;
    padding:12px 0;
    width: 98%;
    margin-left: 1%;
    .editItem{
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #666;
        margin-bottom: 20px;
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
                .el-checkbox{
                    width:300px;
                }
                .el-checkbox-group{
                    font-size: 26px !important;
                }
            }
        }
    }
}
.changeFooter {
    margin: 0px 10px;
    padding-top: 60px;
    padding-bottom: 60px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
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
