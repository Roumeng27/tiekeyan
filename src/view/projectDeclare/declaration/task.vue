<template>
  <!-- 任务 -->
  <div class="task">
    <div class="wrapperSearch">
      <div class="editItem">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">任务名称</div>
            <div class="editContent">
              <inputs class="inputs" width="310px" v-model="taskName" height="30px"></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">任务状态</div>
          <div class="editContent">
            <el-select v-model="taskStatus" clearable size="small" placeholder="所有">
              <el-option
                v-for="item in taskStateSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <button class="searchbtn" @click="getInitInfo">查询</button>
      </div>
    </div>
    <div class="add">
      <button @click="goTaskPage" v-show="taskFlag">新增任务</button>
    </div>
    <div class="table">
      <tableTreeCommon
        :tableData="tableData"
        :tableHeader="tableHeader"
        :operation="operation"
        :treeProps="treeProps"
        @getStateName="getState"
      ></tableTreeCommon>
    </div>
  </div>
</template>

<script>
import inputs from "../../../components/common/input.vue";
import tableTreeCommon from "./component/tableTreeCommon.vue";
import {
  permissionQueryPermisson,
  workTaskQueryWorkTasks,
  workTaskDelete,
  queryWorkInfo,
  queryAdminPermisson,
  personnellistPersonnelBo
} from "../../../http/impl/formalDeclaration";
export default {
  name: "task",
  components: {
    inputs,
    tableTreeCommon
  },
  data() {
    return {
      taskFlag: true, // 控制新增任务按钮是否展示隐藏
      optionList: [],
      tableData: [],
      // 任务状态
      taskStateSelect: [
        {
          value: "START",
          label: "开始"
        },
        {
          value: "INCOMPLETE",
          label: "进行中"
        },
        {
          value: "RESOLVED",
          label: "已解决"
        },
        {
          value: "CLOSED",
          label: "关闭"
        }
      ],

      tableHeader: [
        {
          label: "任务名称",
          prop: "name",
          minWidth: "234px"
        },
        {
          label: "负责人",
          prop: "leaderName",
          minWidth: "234px"
        },
        {
          label: "开始时间",
          prop: "startDatetime",
          minWidth: "166px"
        },
        {
          label: "结束时间",
          prop: "endDatetime",
          minWidth: "166px"
        },
        {
          label: "任务状态",
          prop: "status",
          minWidth: "80px"
        },
        {
          prop: "oper",
          label: "操作",
          fixed: "right",
          minWidth: "68px",
          icon: "el-icon-menu"
        }
      ],
      operation: [],
      treeProps: { children: "children" },
      // treeProps:{children: 'children', hasChildren: 'hasChildren'},
      // 查询所需字段
      taskName: "", // 任务名称
      taskStatus: "", // 任务状态
			resultStatus: "", // 状态
			

			//申报id
			id:'',
			//工作id
      workId: "",

    };
  },
  created() {
    if (window.sessionStorage.stateStr == '新增') {
      // 新增
      this.id = this.$route.query.declareId;
      window.localStorage.taskId = this.id;
      if(window.sessionStorage.jump == 'ok'){
        // console.log('有')
        // this.declareId = this.$route.query.declareId;
      }else{
        this.$message({
          message: "请先填写基本信息",
          type: "error"
        });
        this.$router.push({
					path:'/formalDeclaration/createDeclaration/projectInformation',
					query:this.$route.query
				})
        return
      }
    } else {
      // 修改
      this.id = this.$route.query.id;
      window.localStorage.taskId = this.id;
      
    }
    // this.workId = this.$route.query.id;
    // window.localStorage.taskId = this.workId;
    // this.getInitInfo(); // 任务列表
		this.goQueryAdmin();//初始化权限
		this.getWorkInfo();
  },
  methods: {
    goQueryAdmin() {
      queryAdminPermisson({
        relationId: parseInt(this.id),
        type: "DECLARE"
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.resultStatus = res.data;
          let arr = [];
          window.sessionStorage.resultStatus = res.data;
          if (res.data == "ADMIN" || res.data == "TOPIC") {
            // 全操作权限
            this.operation.push(
              { name: "新增子任务", icon: "el-icon-tickets" },
              { name: "修改", icon: "baI_modify" },
              { name: "删除", icon: "el-icon-document-copy" },
              { name: "详情", icon: "baI_details" },
              { name: "修改任务状态", icon: "baI_details" }
            );
          } else if (res.data == "READ") {
            // 部分操作权限
            this.taskFlag = false;
          }
        }
      });
    },

    // 查询工作信息
    getWorkInfo() {
      queryWorkInfo({
        relationId: parseInt(this.id),
        workType: "DECLARE"
      }).then(res => {
        if (res.result == "SUCCESS") {
          if (res.data != null) {
				this.workId = res.data.id;
				workTaskQueryWorkTasks({
					taskName: this.taskName,
					taskStatus: this.taskStatus,
					workId: this.workId
				}).then(res => {
					if (res.result == "SUCCESS") {
						if (res.data.list != null) {
              this.tableData = res.data.list;
              for(let i =0 ;i<this.tableData.length;i++){
                if (this.tableData[i].status == "START") {
									this.tableData[i].status = "开始";
								} else if (this.tableData[i].status == "INCOMPLETE") {
									this.tableData[i].status = "进行中";
								} else if (this.tableData[i].status == "RESOLVED") {
									this.tableData[i].status = "已解决";
								} else if (this.tableData[i].status == "CLOSED") {
									this.tableData[i].status = "关闭";
                }
                if(this.tableData[i].children !=null){
                  for(let j=0;j<this.tableData[i].children.length;j++){
                      if (this.tableData[i].children[j].status == "START") {
                        this.tableData[i].children[j].status = "开始";
                      } else if (this.tableData[i].children[j].status == "INCOMPLETE") {
                        this.tableData[i].children[j].status = "进行中";
                      } else if (this.tableData[i].children[j].status == "RESOLVED") {
                        this.tableData[i].children[j].status = "已解决";
                      } else if (this.tableData[i].children[j].status == "CLOSED") {
                        this.tableData[i].children[j].status = "关闭";
                      }
                  }
                }
              }
						} else {
							this.tableData = [];
						}
					}
				});
          }
        }
      });
    },

    // 任务列表
    async getInitInfo() {
			// await this.getWorkInfo(); // 查询工作信息
			workTaskQueryWorkTasks({
				taskName: this.taskName,
				taskStatus: this.taskStatus,
				workId: this.workId
			}).then(res => {
				if (res.result == "SUCCESS") {
					if (res.data.list != null) {
            this.tableData = res.data.list;
            for(let i =0 ;i<this.tableData.length;i++){
                if (this.tableData[i].status == "START") {
									this.tableData[i].status = "开始";
								} else if (this.tableData[i].status == "INCOMPLETE") {
									this.tableData[i].status = "进行中";
								} else if (this.tableData[i].status == "RESOLVED") {
									this.tableData[i].status = "已解决";
								} else if (this.tableData[i].status == "CLOSED") {
									this.tableData[i].status = "关闭";
                }
                if(this.tableData[i].children !=null){
                  for(let j=0;j<this.tableData[i].children.length;j++){
                      if (this.tableData[i].children[j].status == "START") {
                        this.tableData[i].children[j].status = "开始";
                      } else if (this.tableData[i].children[j].status == "INCOMPLETE") {
                        this.tableData[i].children[j].status = "进行中";
                      } else if (this.tableData[i].children[j].status == "RESOLVED") {
                        this.tableData[i].children[j].status = "已解决";
                      } else if (this.tableData[i].children[j].status == "CLOSED") {
                        this.tableData[i].children[j].status = "关闭";
                      }
                  }
                }
              }
            
					} else {
						this.tableData = [];
					}
				}
			});
      
    },
    // 新增任务
    goTaskPage() {
      window.sessionStorage.setItem("states", "新增任务");
      this.$router.push({
        path: "/preDeclare/formalDeclaration/addTask",
        query: {
          // id:this.$route.query.id
          workId: parseInt(this.workId)
        }
      });
    },
    //
    getState(name, row) {
      if (name == "详情") {
        this.$router.push({
          path: "/preDeclare/formalDeclaration/detailTask",
          query: {
            id: row.id
          }
        });
      } else if (name == "修改") {
        window.sessionStorage.setItem("states", "修改");
        this.$router.push({
          path: "/preDeclare/formalDeclaration/addTask",
          query: {
						workId: row.workId,
            id:row.id,
            status:row.status
          }
        });
      } else if (name == "删除") {
        workTaskDelete({
          id: row.id
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.getInitInfo(); // 任务列表
          }
        });
      } else if (name == "新增子任务") {
        window.sessionStorage.setItem("states", "新增子任务");
        this.$router.push({
          path: "/preDeclare/formalDeclaration/addTask",
          query: {
            workId: this.workId,
            parentTaskId: row.id
          }
        });
      } else if (name == "修改任务状态") {
        this.$router.push({
          path: "/preDeclare/formalDeclaration/modifyTaskState",
          query: {
            workId: row.workId,
						id:row.id
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.task {
  width: 980px;
  background-color: #fff;
  margin: 0px 10px;
  margin-bottom: 50px;
  padding-top: 20px;
}
.wrapperSearch {
  width: 960px;
  height: auto !important;
  margin: 0px 10px;
  box-sizing: border-box;
  background-color: #fff;
  height: 72px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 20px 0px 0px 0px;
  flex-direction: column;
  border: 1px solid #b5b5b5;
  .editItem {
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
    .editCenter {
      float: left;
      .editName {
        width: 84px;
        text-align: right;
        float: left;
        line-height: 30px;
        font-size: 16px;
        color: #666;
        padding-right: 10px;
      }
      .editContent {
        width: 310px;
        float: left;
      }
    }
    .editCenter:nth-child(1) {
      margin-right: 40px;
    }
  }
  .searchbtn {
    width: 88px;
    height: 30px;
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    margin-right: 10px;
    border: none;
    float: right;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
  }
}

.add {
  height: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  button {
    width: 88px;
    height: 30px;
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    margin-right: 20px;
    border: none;
    float: right;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
  }
}
.table {
  width: 960px;
  margin: 0 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>