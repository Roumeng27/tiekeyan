<template>
  <!-- 申报信息 -->
  <div class="pageWrapper">
    <topTitle title="申报信息"></topTitle>
    <div class="wrapperSearch">
      <div class="editItem">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">申报名称</div>
            <div class="editContent">
              <inputs class="inputs" width="310px" v-model="declareName" height="30px"></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">建议单位</div>
          <div class="editContent">
            <inputs class="inputs" width="310px" v-model="proposerCompanyCode" height="30px"></inputs>
          </div>
        </div>
      </div>
      <div class="editItem">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">申报状态</div>
            <div class="editContent" style>
              <el-select v-model="status" clearable size="small" placeholder="所有">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">审批状态</div>
          <div class="editContent">
            <el-select v-model="approvalStatus" clearable size="small" placeholder="所有">
              <el-option
                v-for="item in declare"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <button ref="btn" class="exportBtn" @click="queryDataList('data')">查询</button>
      </div>
      <!-- <div class="editItem" style="margin-top:20px;">
				<div class="editCenter">
					<div class="centerArea">
						<div class="editName">课题类别</div>
						<div class="editContent">
							<inputs class="inputs" width='100px' v-model="type" height='30px' ></inputs>
						</div>
					</div>
					<div class="centerArea">
						<div class="editName">研究领域</div>
						<div class="editContent" >
							<inputs class="inputs" width='152px' v-model="domain" height='30px' ></inputs>
						</div>
					</div>
				</div>
				<div class="editCenter">
					<div class="editName">申报名称</div>
					<div class="editContent">
						<inputs class="inputs" width='368px' v-model="name" height='30px' ></inputs>
					</div>
				</div>
      </div>-->
      <!-- <div class="editItem" style="margin-top:20px;">
				<div class="editCenter">
					<div class="centerArea" style="margin-right:0;">
						<div class="editName">预计经费（万元）</div>
						<div class="editContent">
							<inputs class="inputs" width='136px' v-model="budgetStart" height='30px' ></inputs>
						</div>
						<p style="padding:0 10px;">-</p>
						<div class="editContent" >
							<inputs class="inputs" width='136px' v-model="budgetEnd" height='30px' ></inputs>
						</div>
					</div>
				</div>
				<div class="editCenter">
					<div class="centerArea" style="margin-right:0;">
						<div class="editName">自筹经费（万元）</div>
						<div class="editContent">
							<inputs class="inputs" width='136px' v-model="selfRaisedFundStart" height='30px' ></inputs>
						</div>
						<p style="padding:0 10px;">-</p>
						<div class="editContent">
							<inputs class="inputs" width='136px' v-model="selfRaisedFundEnd" height='30px' ></inputs>
						</div>
					</div>
				</div>
      </div>-->
      <!-- <div class="editItem" style="margin-top:20px;">
				<div class="editCenter">
					<div class="centerArea">
						<div class="editName">状态</div>
						<div class="editContent" style="width:100px;">
							<el-select v-model="status" clearable size="small" placeholder="所有">
								<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</div>
						<button ref="btn" class="exportBtn" @click="queryDataList('data')">查询</button>
					</div>
				</div>
      </div>-->
    </div>
    <div class="wrapperExport">
      <ExportExcelCommon
        :tHeaderFather="tHeaderFather"
        :isForBidden="isForBiddenExportData"
        :ExportListsFather="ExportListsFather"
        :filterArrayLists="filterArrayLists"
        :ExportFileName="ExportFileName"
      ></ExportExcelCommon>
    </div>
    <div class="wrapperMain">
      <TableCommon
        :page="pageNum"
        :pageSize="pageSize"
        :indexFlag="true"
        :tableData="tableData"
        :operation="operation"
        :tableHeader="tableHeader"
        :loading="loading"
        @getStateName="getState"
      ></TableCommon>
    </div>
    <div class="wrapperPagination">
      <PaginationCommon
        :total="total"
        :pages="pageNum"
        :page-size="pageSize"
        @modifypageSize="modifypageSize"
        @handleCurrentChangeSub="handleCurrentChangeFun"
      ></PaginationCommon>
    </div>
    <DialogCommon
      v-if="successFlag"
      :msg="dialogMsg"
      type="success"
      @successUnselect="successFlag = false"
    ></DialogCommon>
    <DialogCommon v-if="errorFlag" :msg="errorMsg" type="error" @errorUnselect="errorFlag = false"></DialogCommon>
  </div>
</template>

<script>
import DialogCommon from "../../../components/common/DialogCommon.vue";
import topTitle from "../../../components/common/topTitle.vue";
import inputs from "../../../components/common/input.vue";
import ExportExcelCommon from "../../../components/common/ExportExcelCommon.vue";
import TableCommon from "../../../components/common/TableCommon.vue";
import PaginationCommon from "../../../components/common/PaginationCommon.vue";
import { getInfolistopic, submitpreDeclare } from "http/projectDeclare";
export default {
  name: "declarationInformation",
  data() {
    return {
      input: "",
      // 导出所需字段
      tHeaderFather: ["序号", "电话", "名称", "地址"], //导出数据的header
      // 全部的数据
      ExportListsFather: [
        {
          index: "1",
          date: "2016-08-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          phone: "110"
        },
        {
          index: "2",
          date: "2016-08-02",
          name: "王二虎",
          address: "北京市普陀区金沙江路 1518 弄",
          phone: "110"
        },
        {
          index: "3",
          date: "2016-08-03",
          name: "王三虎",
          address: "山西省普陀区金沙江路 1518 弄",
          phone: "110"
        }
      ],
      //导出数据的过滤条件
      filterArrayLists: ["index", "phone", "name", "address"],
      ExportFileName: "biubiu", //导出的文件的名字
      isForBiddenExportData: false, //是否禁止导出按钮
      // 表格所需字段
      tableData: [],
      tableHeader: [
        // {
        // 	label:'申报编号',
        // 	prop:'preDeclareNo',
        // 	minWidth:'122px'
        // },
        {
          label: "申报名称",
          prop: "name",
          minWidth: "242px"
        },
        {
          label: "申报状态",
          prop: "state",
          minWidth: "102px"
        },
        {
          label: "审批状态",
          prop: "approvalstate",
          minWidth: "118px"
        },
        {
          label: "建议人",
          prop: "proposerName",
          minWidth: "112px"
        },
        {
          label: "建议单位",
          prop: "pCompanyName",
          minWidth: "216px"
        },
        {
          prop: "oper",
          label: "操作",
          fixed: "right",
          minWidth: "60px",
          icon: "el-icon-menu"
        }
      ],
      operation: {
        state: true,
        // statearr:['DRAFT','FINISH','STOP'],
        statearr: [
          {
            state: "DRAFT",
            data: [
              { name: "查看", icon: "baI_details" },
              { name: "编辑", icon: "baI_modify" },
              { name: "提交", icon: "baI_Submission" }
            ]
          },
          {
            state: "FINISH",
            data: [{ name: "查看", icon: "baI_details" }]
          },
          {
            state: "STOP",
            data: [{ name: "查看", icon: "baI_details" }]
          }
        ]
      },
      loading: false,
      // 分页器所需字段
      total: 0, // 总条数
      pageSize: 10, // 每页条数
      pageNum: 1, // 总页数
      // 申报状态
      declare: [
        {
          value: "EXAMINE",
          label: "审批中"
        },
        {
          value: "HANGUP",
          label: "挂起"
        },
        {
          value: "APPROVE",
          label: "审批通过"
        },
        {
          value: "FAIL",
          label: "审批不通过"
        },
        {
          value: "SUBMIT",
          label: "已提交"
        }
      ],
      approvalStatus: "",
      options: [
        {
          value: "DRAFT",
          label: "草稿"
        },
        {
          value: "FINISH",
          label: "完成"
        }
        // , {
        // 	value: 'CLOSE',
        // 	label: '关闭'
        // }
      ],
      value: "",
      // 查询所需字段
      preDeclareNo: "", // 申报编号
      topicId: "", // 所属主题
      proposerCompanyCode: "", // 建议单位
      type: "", // 课程类别
      domain: "", // 研究领域
      // name:'',// 申报名称
      declareName: "", //申报名称
      budgetStart: "", // 预计经费
      budgetEnd: "", // 预计经费
      selfRaisedFundStart: "", // 自筹经费
      selfRaisedFundEnd: "", // 自筹经费
      status: "", // 状态
      // 提交成功或失败
      successFlag: false,
      dialogMsg: "提交成功",
      errorFlag: false,
      errorMsg: "提交失败",
      currentPage: 1
    };
  },
  components: {
    topTitle,
    inputs,
    ExportExcelCommon,
    TableCommon,
    PaginationCommon,
    DialogCommon
  },
  created() {
    this.getInformationData(1, this.pageSize, this.$route.query.id); // 申报信息列表数据
  },
  methods: {
    // 修改每页显示条数
    modifypageSize(value) {
      this.pageSize = value;
      this.queryDataList();
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.getInformationData(v, this.pageSize, this.$route.query.id);
    },
    // 申报信息列表数据
    getInformationData(pageNo, pageSize, topicId) {
      getInfolistopic({
        pageNo: pageNo,
        pageSize: pageSize,
        topicId: topicId,
        statuss: ["DRAFT", "FINISH", "CLOSE"]
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
          this.pageNum = res.data.pages;
          this.tableData = res.data.list;
          if (res.data.list != null && res.data.list.length > 0) {
            res.data.list.map((v, i) => {
              if (v.approvalStatus == "EXAMINE") {
                v.approvalstate = "审批中";
              } else if (v.approvalStatus == "HANGUP") {
                v.approvalstate = "挂起";
              } else if (v.approvalStatus == "APPROVE") {
                v.approvalstate = "审批通过";
              } else if (v.approvalStatus == "FAIL") {
                v.approvalstate = "审批不通过";
              } else if (v.approvalStatus == "SUBMIT") {
                v.approvalstate = "已提交";
              }
              if (v.status == "DRAFT") {
                v.state = "草稿";
              } else if (v.status == "FINISH") {
                v.state = "完成";
              } else if (v.status == "CLOSE") {
                v.state = "关闭";
              }
            });
          }
        }
      });
    },
    getState(name, row) {
      if (name == "查看") {
        this.$router.push({
          path: "/preDeclare/declarationInformation/searchbasicInfo",
          query: {
            id: row
          }
        });
      } else if (name == "编辑") {
        this.$router.push({
          path: "/preDeclare/declarationInformation/editbasicInfo",
          query: {
            id: row
          }
        });
      } else if (name == "提交") {
        submitpreDeclare({
          id: row.id,
          topicId: row.topicId,
          approvalId: row.approvalId,
          companyCode: row.companyCode,
          departmentCode: row.departmentCode
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.successFlag = true;
            this.getInformationData(1, this.pageSize, this.$route.query.id);
          } else {
            this.errorFlag = true;
          }
        });
      }
    },
    // 查询
    queryDataList(data) {
      if (data) {
        this.currentPage = 1;
      }
      getInfolistopic({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        topicId: this.$route.query.id,
        // preDeclareNo:this.preDeclareNo,// 申报编号
        proposerCompanyCode: this.proposerCompanyCode, // 建议单位
        // type:this.type,// 课程类别
        // domain:this.domain,// 研究领域
        name: this.declareName, // 申报名称
        // budgetStart:this.budgetStart,// 预计经费
        // budgetEnd:this.budgetEnd,// 预计经费
        // selfRaisedFundStart:this.selfRaisedFundStart,// 自筹经费
        // selfRaisedFundEnd:this.selfRaisedFundEnd,// 自筹经费
        status: this.status, // 状态
        approvalStatus: this.approvalStatus, //审批状态
        statuss: ["DRAFT", "FINISH", "CLOSE"]
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
          this.pageNum = res.data.pages;
          this.tableData = res.data.list;
          if (res.data.list != null && res.data.list.length > 0) {
            res.data.list.map((v, i) => {
              if (v.approvalStatus == "EXAMINE") {
                v.approvalstate = "审批中";
              } else if (v.approvalStatus == "HANGUP") {
                v.approvalstate = "挂起";
              } else if (v.approvalStatus == "APPROVE") {
                v.approvalstate = "审批通过";
              } else if (v.approvalStatus == "FAIL") {
                v.approvalstate = "审批不通过";
              } else if (v.approvalStatus == "SUBMIT") {
                v.approvalstate = "已提交";
              }
              if (v.status == "DRAFT") {
                v.state = "草稿";
              } else if (v.status == "FINISH") {
                v.state = "完成";
              } else if (v.status == "CLOSE") {
                v.state = "关闭";
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pageWrapper {
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
  position: relative;
}
.wrapperSearch {
  width: 980px;
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
}
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

.wrapperExport {
  width: 1000px;
  height: 56px;
  display: flex;
  justify-content: flex-end;
}
.exportBtn {
  width: 88px;
  height: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #3f82e1;
  color: #fff;
  margin-right: 20px;
  border: none;
  float: right;
  border-radius: 3px;
}
</style>