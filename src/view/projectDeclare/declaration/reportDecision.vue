
<template>
<!-- 正式申报-申报决策 -->
  <div class="declareDecision">
    <topTitle title="决策审批"></topTitle>
    <div class="search">
      <div class="top">
        <div class="show">决策审批</div>
        <div class="box" @click="openMeeting">开评审会</div>
      </div>
      <div class="wrapperSearch">
        <div class="editItem">
          <div class="editCenter">
            <div class="centerArea">
              <div class="editName">申报名称</div>
              <div class="editContent">
                <inputs class="inputs" width="310px" v-model="name" height="30px"></inputs>
              </div>
            </div>
          </div>
          <div class="editCenter">
            <div class="editName">责任单位</div>
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
      </div>
    </div>
    <div class="addtheme">
      <button class="searchbtn">导出</button>
      <button class="searchbtn" @click="notApprovedFn">审批不通过</button>
      <button class="searchbtn" @click="approveFn">审批通过</button>
    </div>
    <div class="wrapperMain">
      <TableCommon
        :tableData="tableData"
        :operation="operation"
        :tableHeader="tableHeader"
        :loading="loading"
        @getStateName="getState"
        :page="currentPage"
        :pageSize="pageSize"
        :selectionFlag="true"
        :indexFlag="true"
        @handleSelectionChange="handleSelectionChange"
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
    <popup v-if="popupshow" :type="popuptype" @cancel="cancel" :rank="ranking"></popup>
    <DialogCommon
      v-if="detailFlag"
      type="detail"
      @closeDetail="closeDetail"
      :detailList="detailList"
    ></DialogCommon>
  </div>
</template>

<script>
import {
  addPreDeclareApproval,
  detailBasicinfotopic,
  approvedBasicinfotopic,
  notApprovedBasicinfotopic
} from "http/projectDeclare";
import { getDeclarlistopic ,declareApprovalApprove ,declareApprovalFail ,PreDeclareApprovalHangup,declareApproveSubmit,declareApprovalBatchApprove,
  declareApprovalBatchFail ,
  declareRankInsert,
  declareDetailList} from "http/formalDeclaration";

import topTitle from "../../../components/common/topTitle";
import input from "../../../components/common/input";
import TableCommon from "../../../components/common/TableCommon.vue";
import PaginationCommon from "../../../components/common/PaginationCommon.vue";
import popup from "../../../components/common/Popup";
import DialogCommon from "../../../components/common/DialogCommon";
export default {
  name: "declareDecision",
  data() {
    return {
      // 申报编号
      preDeclareNo: "",
      // 所属主题
      topicId: "",
      // 建议单位
      proposerCompanyCode: "",
      // 课题类别
      type: "",
      // 申报名称
      name: "",
      // 研究领域
      domain: "",
      // 预计经费（万元）
      budgetStart: "",
      budgetEnd: "",
      // 自筹经费（万元）
      selfRaisedFundStart: "",
      selfRaisedFundEnd: "",
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
        } // , {
        // 	value: 'CLOSE',
        // 	label: '关闭'
        // }
      ],

      value: "",
      // 表格所需字段
      tableData: [],
      tableHeader: [
        {
          label: "申报名称",
          prop: "name",
          minWidth: "230px"
        },
        {
          label: "申报状态",
          prop: "state",
          minWidth: "62px"
        },
        {
          label: "申批状态",
          prop: "approvalstate",
          minWidth: "102px"
        },
        {
          label: "排名",
          prop: "rank",
          minWidth: "90px"
        },
        {
          label: "责任人",
          prop: "cpName",
          minWidth: "82px"
        },
        {
          label: "责任单位",
          prop: "ccName",
          minWidth: "236px"
        },
        {
          prop: "oper",
          label: "操作",
          fixed: "right",
          minWidth: "68px",
          icon: "el-icon-menu"
        }
      ],
      operation: {
        approvalStatus: true,
        // statearr:['DRAFT','FINISH','STOP'],
        statearr: [
          // 审批中
          {
            state: "EXAMINE",
            data: [
              { name: "通过", icon: "baI_adopt" },
              { name: "不通过", icon: "baI_pass" },
              { name: "挂起", icon: "baI_hangup" },
              { name: "排名", icon: "baI_ranking" }
            ]
            // data2:[
            // 	{name: '查看' ,icon:"baI_details"},
            // ]
          },
          // 挂起
          {
            state: "HANGUP",
            data: [{ name: "查看", icon: "baI_details" }]
          },
          // 审批通过
          {
            state: "APPROVE",
            data: [
              { name: "审批意见", icon: "baI_opinion" },
              // {name: '查看' ,icon:"baI_details"},
              { name: "排名", icon: "baI_ranking" },
              { name: "审批后提交", icon: "baI_Submission" },
              { name: "审批详情", icon: "baI_Submission" }
            ]
          },
          // 审批不通过
          {
            state: "FAIL",
            data: [{ name: "查看", icon: "baI_details" }]
          },
          {
            state: "SUBMIT",
            data: [{ name: "查看", icon: "baI_details" }]
          }
        ]
      },
      loading: false,
      // 分页器所需字段
      total: 0,
      pageSize: 10,
      pageNum: 1,
      // 弹框类型
      popuptype: "pass",
      // 弹框显示
      popupshow: false,
      currentid: "",
      currentpreDeclareId: "",
      currentrow: "",
      currentPage: 1,
      ranking: "", // 排名
      detailFlag: false, // 控制审批详情弹窗展示隐藏
      status: "",
      detailList: [], // 审批详情返回的数据
      multipleSelection: [], // 多选框的数组
      arrList: [],
      // 机构代码
      companyCode:'',
    };
  },

  components: {
    topTitle: topTitle,
    inputs: input,
    TableCommon,
    PaginationCommon,
    popup,
    DialogCommon
  },
  created() {
    this.topicId = this.$route.query.id;
    this.getInformationData(
      this.currentPage,
      this.pageSize,
      this.$route.query.id
    ); // 申报信息列表数据
  },
  methods: {
    handleCurrentChangeFun(v) {
      //页面点击
      this.currentPage = v; //当前页
      this.queryDataList(); // 查询
      //   this.getInformationData(this.currentPage, v, this.$route.query.id);
    },
    // 修改每页显示条数
    modifypageSize(value) {
      this.pageSize = value;
      this.getInformationData(
        this.currentPage,
        this.pageSize,
        this.$route.query.id
      );
    },
    // 查询
    queryDataList(data) {
      getDeclarlistopic({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        topicId: this.$route.query.id,
        // statuss:this.value,//状态：必填 （是statuss两个s）[“DRAFT”, “FINISH”]
        // preDeclareNo: this.preDeclareNo, //申报编号
        ccName: this.proposerCompanyCode, //建议单位
        // type: this.type, //课程类别
        // domain: this.domain, //研究领域
        name: this.name, //申报名称
        status: this.status, //状态
        approvalStatus: this.approvalStatus, //审批状态
        statuss: ["FINISH"]
        // budgetStart: this.value,
        // budgetEnd: this.budgetEnd, //预计经费
        // selfRaisedFundStart: this.selfRaisedFundStart,
        // selfRaisedFundEnd: this.selfRaisedFundEnd //自筹经费
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
          this.pageNum = res.data.pages;
          this.tableData = res.data.list;
          if (res.data.list != null && res.data.list.length > 0) {
            res.data.list.map((v, i) => {
              if (v.status == "DRAFT") {
                v.state = "草稿";
              } else if (v.status == "FINISH") {
                v.state = "完成";
              } else if (v.status == "STOP") {
                v.state = "停用";
              }
              if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "EXAMINE") {
                v.approvalstate = "审批中";
                v.approvalStatus = "EXAMINE";
              } else if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "HANGUP") {
                v.approvalstate = "挂起";
                v.approvalStatus = "HANGUP";
              } else if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "APPROVE") {
                v.approvalstate = "审批通过";
                v.approvalStatus = "APPROVE";
              } else if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "FAIL") {
                v.approvalstate = "审批不通过";
                v.approvalStatus = "FAIL";
              } else if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "SUBMIT") {
                v.approvalstate = "已提交";
                v.approvalStatus = "SUBMIT";
              }
            });
          }
        }
      });
    },
    // 开评审会
    openMeeting() {
      this.$router.push({
        path: "/preDeclare/formalDeclaration/reviewMeeting",
        query: {
          id: this.$route.query.id
        }
      });
    },
    getInformationData(pageNo, pageSize, topicId) {
      getDeclarlistopic({
        pageNo: pageNo,
        pageSize: pageSize,
        topicId: topicId,
        statuss: ["FINISH"]
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
          this.pageNum = res.data.pages;
          this.tableData = res.data.list;
          if (res.data.list != null && res.data.list.length > 0) {
            res.data.list.map((v, i) => {
              if (v.status == "DRAFT") {
                v.state = "草稿";
              } else if (v.status == "FINISH") {
                v.state = "完成";
              } else if (v.status == "STOP") {
                v.state = "停用";
              }
              
              if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "EXAMINE") {
                v.approvalstate = "审批中";
                v.approvalStatus = "EXAMINE";
              } else if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "HANGUP") {
                v.approvalstate = "挂起";
                v.approvalStatus = "HANGUP";
              } else if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "APPROVE") {
                v.approvalstate = "审批通过";
                v.approvalStatus = "APPROVE";
              } else if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "FAIL") {
                v.approvalstate = "审批不通过";
                v.approvalStatus = "FAIL";
              } else if (v.declareApprovalVo && v.declareApprovalVo.approvalStatus == "SUBMIT") {
                v.approvalstate = "已提交";
                v.approvalStatus = "SUBMIT";
              }
            });
          }
        }
      });
    },
    // 操作类型
    getState(name, row) {
      // console.log(name,row)
      if (name == "通过") {
        this.popupshow = true;
        this.popuptype = "adopt";
        //机构代码
        this.companyCode = row.declareApprovalVo.companyCode;
        // 主题id
        this.topicId = row.declareApprovalVo.topicId;
        // 当前id
        this.currentid = row.declareApprovalVo.id;
        // 申报id
        this.currentpreDeclareId = row.id;
      } else if (name == "不通过") {
        this.popupshow = true;
        this.popuptype = "pass";
        this.currentid = row.declareApprovalVo.id;
        this.currentpreDeclareId = row.id;
      } else if (name == "排名") {
        this.popupshow = true;
        this.popuptype = "proposal";
        this.currentid = row.declareApprovalVo.declareId;
        this.currentpreDeclareId = row.declareApprovalVo.companyCode;
      } else if (name == "挂起") {
        this.popupshow = true;
        this.popuptype = "hangUp";
        this.currentid = row.declareApprovalVo.id;
        this.currentpreDeclareId = row.id;
        this.currentrow = row;
      } else if (name == "审批后提交") {
        console.log(1)
        declareApproveSubmit({
          id:row.id,
          approvalId: row.declareApprovalVo.id,
          topicId: row.declareApprovalVo.topicId
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.$message({
              message: "操作成功",
              type: "success"
            });
          }
        });
        this.getInformationData(1, this.pageSize, this.$route.query.id);
      } else if (name == "审批意见") {
        getDeclarlistopic({
          topicId: row.declareApprovalVo.topicId
        }).then(res => {
          // console.log(res)
        });
      } else if (name == "审批详情") {
        this.detailFlag = true;
        declareDetailList(row.declareApprovalVo.id).then(res => {
          if (res.result == "SUCCESS") {
            this.detailList = res.data.list;
          }
        });
      }
    },
    // 弹框操作
    cancel(obj) {
      if (obj == "") {
        this.popupshow = false;
      } else if (obj.type == "adopt") {
        //   通过
        console.log(declareApprovalApprove)
        declareApprovalApprove({
          id: this.currentid,
          topicId:this.topicId,
          declareId:this.currentpreDeclareId,
          companyCode:this.companyCode,
          rank: obj.ranking,
          comments: obj.content
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.popupshow = false;
            this.getInformationData(1, this.pageSize, this.$route.query.id);
          }
        });
      } else if (obj.type == "pass") {
        // 不通过
        declareApprovalFail({
          id: this.currentid,
          declareId: this.currentpreDeclareId,
          approvalComment: obj.content
        }).then(res => {
          if(res.result == 'SUCCESS'){
            this.popupshow = false;
            this.getInformationData(this.currentPage, this.pageSize, this.$route.query.id);
            this.$message({
              message: "操作成功",
              type: "success"
            });
          }
            
        });
      } else if (obj.type == "proposal") {

        // "declareId":1,
        // "companyCode":"TKY001",
        // "topicId":1,
        // "rank":"1",
        // "comments":"第一"
        // 排名
        declareRankInsert({
          topicId:this.topicId,
          declareId:this.currentid,
          companyCode:this.currentpreDeclareId,
          rank:obj.ranking
        }).then(res => {
          this.popupshow = false;
          this.getInformationData(1, this.pageSize, this.$route.query.id);
        });
      } else if (obj.type == "hangUp") {
        console.log( this.currentid,this.currentPage,)
        // 挂起
        PreDeclareApprovalHangup({
          id: this.currentid,
          declareId: this.currentpreDeclareId,
          approvalComment: obj.content
        }).then(res => {
          this.popupshow = false;
          this.getInformationData(this.currentPage, this.pageSize, this.$route.query.id);
        });
      }
    },
    closeDetail() {
      this.detailFlag = false;
    },
    handleSelectionChange(val) {
      console.log(val, "----");
      this.multipleSelection = val;
    },
    // 审批通过方法
    approveFn() {
      let arr = [];
      let areaItem = {};
      let flag = true;
      console.log(this.multipleSelection)
      if (!this.multipleSelection.length) {
        this.$message({
          message: "请选择需要批量操作的数据!",
          type: "info"
        });
      } else {
        this.multipleSelection.forEach(item => {
          if (item.approvalstate != "审批中") {
            this.$message({
              message: "审批状态为审批中才能批量选择!",
              type: "error"
            });
            flag = false;
          }
          arr.push({
            id: item.declareApprovalVo.id,
          });
        });
        if (flag) {
          declareApprovalBatchApprove(arr).then(res => {
            if (res.result == "SUCCESS") {
              this.$message({
                message: "批量审批通过已成功!",
                type: "success"
              });
              this.getInformationData(1, this.pageSize, this.$route.query.id);
            }
          });
        }
      }
    },
    // 审批不通过方法
    notApprovedFn() {
      let arr = [];
      let areaItem = {};
      let flag = true;
      if (!this.multipleSelection.length) {
        this.$message({
          message: "请选择需要批量操作的数据!",
          type: "info"
        });
      } else {
        this.multipleSelection.forEach(item => {
          if (item.approvalstate != "审批中") {
            this.$message({
              message: "审批状态为审批中才能批量选择!",
              type: "error"
            });
            flag = false;
          }
          arr.push({
            id: item.declareApprovalVo.id
          });
        });
        if (flag) {
          declareApprovalBatchFail(arr).then(res => {
            if (res.result == "SUCCESS") {
              this.$message({
                message: "批量审批不通过已成功!",
                type: "success"
              });
              this.getInformationData(1, this.pageSize, this.$route.query.id);
            }
          });
        }
        // let infoMsg = this.multipleSelection.some(item=> item.approvalstate == '审批中')
        // if(infoMsg){
        // 	this.$message({
        // 		message: "审批状态为审批中才能批量选择!",
        // 		type: "error"
        // 	});
        // }else {
        // 	arr.push({
        // 		id: item.approvalId,
        // 		preDeclareId: item.id
        // 	})
        // 	notApprovedBasicinfotopic(arr).then(res => {
        // 		if (res.result == "SUCCESS") {
        // 			 this.$message({
        // 				message: "批量审批不通过已成功!",
        // 				type: "success"
        // 			});
        // 			this.getInformationData(1, this.pageSize, this.$route.query.id);
        // 		 }
        // 	});
        // }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.declareDecision {
  position: relative;
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
  padding-bottom: 40px;
}
.search {
  width: 980px;
  margin: 0 10px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .top {
    overflow: hidden;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    height: 52px;
    div {
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
    .show {
      background-color: #c2d7f5;
      color: #3f82c1;
      cursor: pointer;
    }
    .box {
      background-color: #e7e7e7;
      color: #666;
      cursor: pointer;
    }
  }

  .wrapperSearch {
    width: 980px;
    height: auto !important;
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

  .exportBtn {
    width: 88px;
    height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    margin-right: 10px;
    border: none;
    float: right;
    border-radius: 3px;
  }
}
.addtheme {
  width: 1000px;
  height: 56px;
  .searchbtn {
    width: 88px;
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
</style>