<template>
  <div class="task">
    <topTitle title="我的任务"></topTitle>
    <div class="search">
      <p class="name">任务名称</p>
      <inputs width="354px" v-model="searchname" height="30px"></inputs>
      <p class="state">任务状态</p>
      <div style="width:160px;height:30px">
      <el-select v-model="searchstate" clearable size="small" placeholder="所有">
					<el-option
						v-for="item in taskStateSelect"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
					</el-select>
      </div>
      <div class="btn">
        <button @click="reset()">重置</button>
        <button @click="getlist()">查询</button>
      </div>
    </div>
    <div class="wrapperMain">
      <TableCommon
        :tableData="tableData"
        :tableHeader="tableHeader"
        :operation="operation"
        :loading="loading"
        @getStateName="getState"
        :page="currentPage"
        :pageSize="pageSize"
      ></TableCommon>
    </div>
    <div class="wrapperPagination">
      <PaginationCommon
        :total="total"
        :pages="pageNum"
        :page-size="pageSize"
        @modifypageSize="modifypageSize"
        @handleCurrentChangeSub="handleCurrentChangeFun"
        :current-page="currentPage"
      ></PaginationCommon>
    </div>
  </div>
</template>

<script>
import topTitle from "../../components/common/topTitle.vue";
import inputs from "../../components/common/input.vue";
import TableCommon from "../../components/common/TableCommon.vue";
import PaginationCommon from "../../components/common/PaginationCommon.vue";
import { workTaskQueryMyWorkTasks} from "http/workbench";
export default {
  name: "task",
  data() {
    return {
			tableData: [],
      tableHeader: [
        {
          label: "任务名称",
          prop: "name",
          minWidth: "156px"
        },
        {
          label: "分配时间",
          prop: "createDateTime",
          minWidth: "188px"
        },
        {
          label: "分配人",
          prop: "createAccount",
          minWidth: "90px"
        },
        {
          label: "负责人",
          prop: "leaderName",
          minWidth: "90px"
        },
        {
          label: "任务状态",
          prop: "status",
          minWidth: "156px"
        },
        {
          label: "截止时间",
          prop: "endDatetime",
          minWidth: "188px"
        },
        {
          prop: "oper",
          label: "操作",
          fixed: "right",
          minWidth: "68px",
          icon: "el-icon-menu"
        }
      ],
      operation:  [
        { name: "详情", icon: "baI_details" }
      ],
      taskStateSelect:[
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
      loading: false,
      // 分页器所需字段
      // 总条数
      total: 0,
      // 每页条数
      pageSize: 10,
      // 总页数
      pageNum: 1,
      currentPage: 1,
      searchname:'',
      searchstate:''
		};
  },
  components:{
    topTitle,
    inputs,
    TableCommon,
    PaginationCommon
  },
  created() {
    this.getlist()
	},
  methods: {
    reset(){
      this.searchname = '',
      this.searchstate = ''
    },
    getlist(){
      workTaskQueryMyWorkTasks({
        pageNo:this.currentPage,
        pageSize:this.pageSize,
        taskName:this.searchname,
        taskStatus:this.searchstate
      }).then(res=>{
			if(res.result == 'SUCCESS'){
				if(res.data.list != null && res.data.list.length>0){
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
					this.total = res.data.rows;
				}
			}
      })
    },
    getState(name, row) {
      if(name == '详情'){
        this.$router.push({
          path: "/workbench/taskDetail",
          query: {
            id: row.id
          }
        });
      }

    },
    modifypageSize(value) {
      this.pageSize = value;
      this.getlist(this.currentPage, this.pageSize); // 获取主题列表
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.currentPage = v;
      this.getlist(); // 查询
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
.search{
  width: 980px;
  margin: 0px 10px;
  background-color: #fff;
  height: 70px;
  border-radius: 5px;
  display: flex;
  align-items:center;
  font-size: 16px;
  margin-bottom: 20px;
  .name{
    margin-left: 20px;
    margin-right: 10px;
  }
  .state{
    margin-left: 30px;
    margin-right: 10px;
  }
  .btn{
    flex: 1;
    height: 70px;
    button{
      width: 88px;
      height: 30px;
      margin-top: 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #3f82e1;
      color: #fff;
      margin-right: 20px;
      border: none;
      float: right;
      border-radius: 3px;
    }
  }
}
</style>