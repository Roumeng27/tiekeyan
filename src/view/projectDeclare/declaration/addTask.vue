<template>
  <!-- 新增任务 -->
  <div class="pageWarpper">
    <topTitle :title="pageTitle"></topTitle>
    <div class="wrapperMain">
      <div class="section" v-if="showFlag">
        <div class="editItem">
          <div class="editCenter">
            <div class="editName">上级任务</div>
            <div class="editContent">
              <inputs
                class="inputs"
                width="240px"
                v-model="lastName"
                height="30px"
                disableds="true"
              ></inputs>
            </div>
          </div>
          <div class="editCenter">
            <div class="editName">任务名称</div>
            <div class="editContent">
              <inputs class="inputs" width="240px" v-model="name" height="30px"></inputs>
            </div>
          </div>
          <div class="editCenter">
            <div class="editName">任务状态</div>
            <div class="editContent">
              <inputs class="inputs" disableds="true" width="140px" v-model="status" height="30px"></inputs>
            </div>
          </div>
        </div>
        <div class="editItem">
          <div class="editCenter">
            <div class="editName">任务描述</div>
            <div class="editContent" style="width:856px;padding-right: 0px;">
              <el-input type="textarea" v-model="discription" maxlength="1000"></el-input>
            </div>
          </div>
        </div>
        <div class="editItem">
          <div class="editCenter">
            <div class="editName">开始时间</div>
            <div class="editContent">
              <datePicker
                class="inputs"
                width="240px"
                v-model="startDatetime"
                height="30px"
                type="datetime"
              ></datePicker>
            </div>
          </div>
          <div class="editCenter">
            <div class="editName">结束时间</div>
            <div class="editContent">
              <datePicker
                class="inputs"
                width="240px"
                v-model="endDatetime"
                height="30px"
                type="datetime"
              ></datePicker>
            </div>
          </div>
          <div class="editCenter" style="width:208px;"></div>
        </div>
        <div class="resumeWrapper">
          <div class="resumeTitle">
            <p>负责人</p>
            <button class="fadeInBtn" @click="showPrincipalDialog">选择</button>
          </div>
          <div class="resumeSection" v-show="principalFlag">
            <declareTable
              :tableData="principalData"
              :tableHeader="principalHeader"
              @data="deleteItem"
            ></declareTable>
          </div>
        </div>
        <div class="resumeWrapper">
          <div class="resumeTitle" @click="showAddDialog">
            <p>交付物</p>
            <button class="fadeInBtn">新增</button>
          </div>
          <div class="resumeSection" v-show="deliverableFlag">
            <declareTable
              :tableData="deliverableData"
              :tableHeader="deliverableHeader"
              @data="deleteItem"
            ></declareTable>
          </div>
        </div>
        <div class="changeFooter">
          <button class="ret" @click="goBack">返回</button>
          <button class="hold" @click="saveInfo">保存</button>
        </div>
      </div>
      <div class="section" v-if="isshowFlag">
        <div class="editItem">
          <div class="editCenter">
            <div class="editName">上级任务</div>
            <div class="editContent">
              <inputs
                class="inputs"
                width="240px"
                v-model="lastName"
                height="30px"
                disableds="true"
              ></inputs>
            </div>
          </div>
          <div class="editCenter">
            <div class="editName">任务名称</div>
            <div class="editContent">
              <inputs class="inputs" width="240px" v-model="name" height="30px" disableds="true"></inputs>
            </div>
          </div>
          <div class="editCenter">
            <div class="editName">任务状态</div>
            <div class="editContent">
              <inputs class="inputs" disableds="true" width="140px" v-model="status" height="30px"></inputs>
            </div>
          </div>
        </div>
        <div class="editItem">
          <div class="editCenter">
            <div class="editName">任务描述</div>
            <div class="editContent" style="width:856px;padding-right: 0px;">
              <inputs
                width="856px"
                v-model="discription"
                maxlength="1000"
                disableds="true"
                height="60px"
              ></inputs>
            </div>
          </div>
        </div>
        <div class="editItem">
          <div class="editCenter">
            <div class="editName">开始时间</div>
            <div class="editContent">
              <inputs
                class="inputs"
                disableds="true"
                width="240px"
                v-model="startDatetime"
                height="30px"
              ></inputs>
            </div>
          </div>
          <div class="editCenter">
            <div class="editName">结束时间</div>
            <div class="editContent">
              <inputs
                class="inputs"
                disableds="true"
                width="240px"
                v-model="endDatetime"
                height="30px"
              ></inputs>
            </div>
          </div>
          <div class="editCenter" style="width:208px;"></div>
        </div>
        <div class="resumeWrapper">
          <div class="resumeTitle">
            <p>负责人</p>
          </div>
          <div class="resumeSection" v-if="principalFlag">
            <declareTable
              :tableData="principalData"
              :tableHeader="principalHeader"
              @data="deleteItem"
              :disabled="true"
            ></declareTable>
          </div>
        </div>
        <div class="resumeWrapper">
          <div class="resumeTitle" @click="showAddDialog">
            <p>交付物</p>
          </div>
          <div class="resumeSection" v-if="deliverableFlag">
            <declareTable
              :tableData="deliverableData"
              :tableHeader="deliverableHeader"
              @data="deleteItem"
              :disabled="true"
            ></declareTable>
          </div>
        </div>
        <div class="changeFooter">
          <button class="ret" @click="restart">重新开始</button>
          <button class="hold" @click="closeData">关闭</button>
        </div>
      </div>
    </div>
    <!-- 负责人选择弹框 -->
    <div class="dialogWrapper" v-show="dialogFlag">
      <div class="dialogBox">
        <div class="dialogTitle">
          <p>负责人选择</p>
          <img src="../../../assets/img/components/close.png" alt @click="closePrincipal" />
        </div>
        <div class="dialogSearch">
          <div class="editItem">
            <div class="editCenter">
              <div class="editName">单位代码</div>
              <div class="editContent">
                <inputs class="inputs" width="70px" v-model="changeCompanyCode" height="30px"></inputs>
              </div>
            </div>
            <div class="editCenter">
              <div class="editName">单位名称</div>
              <div class="editContent">
                <inputs class="inputs" width="200px" v-model="changeCompanyName" height="30px"></inputs>
              </div>
            </div>
            <div class="editCenter">
              <div class="editName">姓名</div>
              <div class="editContent">
                <inputs class="inputs" width="90px" v-model="changeName" height="30px"></inputs>
              </div>
            </div>
            <button class="fadeInBtn" @click="searchDetail">查询</button>
          </div>
        </div>
        <div class="dialogMain">
          <TableCommon
            :tableData="tableData"
            :tableHeader="tableHeader"
            @getTemplatePick="getTemplatePick"
            :radioFlag="true"
          ></TableCommon>
        </div>
        <div class="changeBtn">
          <button class="ret" @click="closePrincipal">取消</button>
          <button class="hold" @click="principalSure">确定</button>
        </div>
        <div class="dialogFooter">
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
    </div>
    <!-- 新增交付物弹框 -->
    <div class="dialogWrapper" v-show="addFlag">
      <div class="addBox">
        <div class="dialogTitle">
          <p>新增交付物</p>
          <img src="../../../assets/img/components/close.png" alt @click="closeAddDialog" />
        </div>
        <div class="editItem" style="padding-left:10px;padding-top:20px;">
          <div class="editCenter">
            <div class="editName">&nbsp;&nbsp;&nbsp;任务类型</div>
            <div class="editContent" style="width:400px;">
              <el-select
                v-model="subject"
                placeholder="请选择"
                clearable
                size="small"
                @change="getSelectData"
              >
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
        <div class="documentBox" v-if="changeStatus">
          <div class="documentTitle">文档章节选择</div>
          <div class="tree">
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              default-expand-all
              @check-change="handleClick"
              ref="treeForm"
              @node-click="nodeClick"
              :props="defaultProps"
              @check="tree_select"
              :check-strictly="true"
            ></el-tree>
          </div>
        </div>
        <div class="editItem" style="padding-left:10px;padding-top:20px;" v-if="!changeStatus">
          <div class="editCenter">
            <div class="editName">交付物名称</div>
            <div class="editContent">
              <inputs class="inputs" width="400px" v-model="deliveryName" height="30px"></inputs>
            </div>
          </div>
        </div>
        <div class="changeBtn">
          <button class="ret" @click="closeAddDialog">取消</button>
          <button class="hold" @click="AddDialogSure">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import inputs from "../../../components/common/input.vue";
import datePicker from "../../../components/common/datePicker.vue";
import menuList from "./component/createDeclareLeftMenu.vue";
import TableCommon from "../../../components/common/TableCommon.vue";
import PaginationCommon from "../../../components/common/PaginationCommon.vue";
import topTitle from "../../../components/common/topTitle.vue";
import declareTable from "../../../components/common/declareTable.vue";
import {
  workTaskCreate,
  workTaskGetWorkTaskInfo,
  personnellistPersonnelBo,
  workTaskUpdate,
  getChapterJson,
  selectListFromDeclare
} from "../../../http/impl/formalDeclaration";
export default {
  name: "createDeclaration",
  components: {
    inputs,
    datePicker,
    menuList,
    TableCommon,
    PaginationCommon,
    topTitle,
    declareTable
  },
  data() {
    return {
      lastName: "",
      subject: "文档",
      // 任务状态
      taskStateSelect: [
        {
          value: "开始",
          label: "开始"
        },
        {
          value: "进行中",
          label: "进行中"
        },
        {
          value: "已解决",
          label: "已解决"
        },
        {
          value: "关闭",
          label: "关闭"
        }
      ],
      // 任务类型
      optionList: [
        {
          value: "附件",
          label: "附件"
        },
        {
          value: "文档",
          label: "文档"
        }
      ],
      dialogFlag: false, // 控制负责人选择的弹窗展示隐藏
      principalFlag: true, // 控制负责人的列表展示隐藏
      deliverableFlag: true, // 控制交付物的列表展示隐藏
      addFlag: false, // 控制交付物的弹窗展示隐藏
      pageTitle: "", // 标题
      // 负责人
      principalData: [],
      principalHeader: [
        {
          label: "姓名",
          prop: "name",
          minWidth: "362px"
        },
        {
          label: "单位",
          prop: "companyName",
          minWidth: "364px"
        }
      ],
      // 交付物
      deliverableData: [],
      deliverableHeader: [
        {
          label: "内容",
          prop: "name",
          minWidth: "362px"
        },
        {
          label: "类型",
          prop: "type",
          minWidth: "364px"
        }
      ],
      tableData: [],
      tableHeader: [
        {
          label: "姓名",
          prop: "name",
          minWidth: "110px"
        },
        {
          label: "性别",
          prop: "gender",
          minWidth: "66px"
        },
        {
          label: "出生日期",
          prop: "birthday",
          minWidth: "110px"
        },
        {
          label: "工作单位",
          prop: "companyName",
          minWidth: "102px"
        },
        {
          label: "职称",
          prop: "title",
          minWidth: "92px"
        },
        {
          label: "职务",
          prop: "job",
          minWidth: "94px"
        },
        {
          label: "最高学历",
          prop: "name",
          minWidth: "122px"
        }
      ],
      // 分页器所需字段
      // 总条数
      total: 0,
      // 每页条数
      pageSize: 10,
      // 总页数
      pageNum: 1,
      currentPage: 1,
      treeData: [],
      defaultProps: {
        children: "childList",
        label: "name"
      },
      // 任务所需字段
      id: "", // 任务ID
      workId: "", // 工作ID
      parentTaskId: "", // 上级任务ID
      name: "", // 任务名称
      startDatetime: "", // 开始时间
      endDatetime: "", // 结束时间
      status: "开始", // 任务状态
      discription: "", // 任务描述
      accounts: [], // 负责人账号
      createDateTime: "", // 创建时间
      createAccount: "", // 创建人账号
      dependentTaskId: "", // 依赖任务ID
      workTaskDeliveries: [], // 工作任务交付物信息
      taskType: "",
      // 项目负责人选择查询所需字段
      changeCompanyCode: "", //单位代码（可选，支持模糊查询）
      changeCompanyName: "", //单位名称 （可选，支持模糊查询）
      changeName: "", // 姓名（可选，支持模糊查询）
      rowDetail: {}, // 单选框选中的数据
      // 保存所需ID    申报id
      taskId: parseInt(window.localStorage.taskId),
      showFlag: false,
      diffTitle: "",
      nodeData: [],
      nameContent: "", //交付物点击内容
      contentId: "", //交付物点击id
      changeStatus: true,
      deliveryName: "",
      isshowFlag: false
    };
  },
  computed: {
    ...mapGetters({
      loginInforma: "gs_Home_loginInforma"
    })
  },
  created() {
    if (window.sessionStorage.stateStr == "编辑") {
      if (window.sessionStorage.states == "新增任务") {
        this.pageTitle = "新增任务";
        this.diffTitle = "编辑新增";
        this.taskId = parseInt(window.localStorage.taskId);
        this.showFlag = true;
      } else if (window.sessionStorage.states == "修改") {
        this.pageTitle = "修改任务";
        this.diffTitle = "编辑修改";
        this.principalDataList(); //查询负责人列表
      } else if (window.sessionStorage.states == "新增子任务") {
        this.pageTitle = "新增子任务";
        this.diffTitle = "编辑新增子任务";
        this.taskId = parseInt(window.localStorage.taskId);
        this.lastName = this.$route.query.parentTaskId;
        this.showFlag = true;
      }
    } else {
      if (window.sessionStorage.states == "新增任务") {
        this.pageTitle = "新增任务";
        this.diffTitle = "新增";
        this.showFlag = true;
      } else if (window.sessionStorage.states == "修改") {
        this.pageTitle = "修改任务";
        this.diffTitle = "编辑修改";
        this.principalDataList(); //查询负责人列表
      } else if (window.sessionStorage.states == "新增子任务") {
        this.pageTitle = "新增子任务";
        this.diffTitle = "编辑新增子任务";
        this.lastName = this.$route.query.parentTaskId;
        this.taskId = parseInt(window.localStorage.taskId);
        this.showFlag = true;
      }
    }
  },
  methods: {
    getSelectData(val) {
      if (val == "附件") {
        this.changeStatus = false;
      } else {
        this.changeStatus = true;
      }
    },
    // 重新开始
    restart() {
      // 负责人
      let arr = [];
      if (this.principalData.length > 0) {
        this.principalData.forEach(item => {
          arr.push(item.account);
        });
      }
      workTaskUpdate({
        workId: this.$route.query.workId, // 工作ID
        personAccounts: arr, // 负责人账号
        workTask: {
          id: this.id,
          dependentTaskId: this.dependentTaskId, // 依赖任务ID
          type: this.taskType, // 任务类型
          createAccount: this.createAccount, // 创建人账号
          createDateTime: this.createDateTime, // 创建时间
          workId: this.workId, // 工作ID
          parentTaskId: this.parentTaskId, // 上级任务ID
          name: this.name, // 任务名称
          startDatetime: this.startDatetime, // 开始时间
          endDatetime: this.endDatetime, // 结束时间
          status: "START", // 任务状态
          discription: this.discription // 任务描述
        },
        workTaskDeliveries: this.deliverableData // 工作任务交付物信息
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.isshowFlag = false;
          this.showFlag = true;
          this.status = "开始";
        }
      });
    },
    // 关闭
    closeData() {
      let arr = [];
      if (this.principalData.length > 0) {
        this.principalData.forEach(item => {
          arr.push(item.account);
        });
      }
      workTaskUpdate({
        workId: this.$route.query.workId, // 工作ID
        personAccounts: arr, // 负责人账号
        workTask: {
          id: this.id,
          dependentTaskId: this.dependentTaskId, // 依赖任务ID
          type: this.taskType, // 任务类型
          createAccount: this.createAccount, // 创建人账号
          createDateTime: this.createDateTime, // 创建时间
          workId: this.workId, // 工作ID
          parentTaskId: this.parentTaskId, // 上级任务ID
          name: this.name, // 任务名称
          startDatetime: this.startDatetime, // 开始时间
          endDatetime: this.endDatetime, // 结束时间
          status: "CLOSED", // 任务状态
          discription: this.discription // 任务描述
        },
        workTaskDeliveries: this.deliverableData // 工作任务交付物信息
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.isshowFlag = false;
          this.showFlag = true;
          this.status = "关闭";
        }
      });
    },
    // 章节管理-查询列表
    getDeliverableData() {
      getChapterJson({
        relationId: parseInt(window.localStorage.taskId),
        relationType: "DECLARE"
      }).then(res => {
        // if(res.result == 'SUCCESS'){
        this.treeData = res.data;
        // }
      });
    },
    //查询负责人列表
    async principalDataList() {
      await this.getUnitInfo();
      personnellistPersonnelBo({ codes: this.personAccounts }).then(res => {
        this.principalData = res.data;
      });
    },
    // 查询数据
    getUnitInfo() {
      return workTaskGetWorkTaskInfo({ id: this.$route.query.id }).then(res => {
        if (this.$route.query.status) {
          if (this.$route.query.status != "已解决") {
            this.showFlag = true;
            this.isshowFlag = false;
          } else {
            this.showFlag = false;
            this.isshowFlag = true;
          }
        }
        if (res.result == "SUCCESS") {
          this.id = res.data.workTask.id; // 任务ID
          this.parentTaskId = res.data.workTask.parentTaskId; //上级任务
          this.name = res.data.workTask.name; //任务名称
          // this.status = res.data.workTask.status; //任务状态
          if (res.data.workTask.status == "START") {
            this.status = "开始";
          } else if (res.data.workTask.status == "INCOMPLETE") {
            this.status = "进行中";
          } else if (res.data.workTask.status == "RESOLVED") {
            this.status = "已解决";
          } else if (res.data.workTask.status == "CLOSED") {
            this.status = "关闭";
          }
          this.discription = res.data.workTask.discription; //任务描述
          this.startDatetime = res.data.workTask.startDatetime; //开始时间
          this.endDatetime = res.data.workTask.endDatetime; //结束时间
          this.personAccounts = res.data.personAccounts; //负责人信息
          this.deliverableData = res.data.workTaskDeliveries; //交付物
          this.workId = res.data.workTask.workId; // 	工作ID
          this.createAccount = res.data.workTask.createAccount; // 创建人账号
          this.createDateTime = res.data.workTask.createDateTime; // 创建时间
          this.dependentTaskId = res.data.workTask.dependentTaskId; // 依赖任务ID
          this.taskType = res.data.workTask.taskType;
        }
      });
    },
    // 打开负责人选择弹框
    showPrincipalDialog() {
      this.dialogFlag = true;
      this.getProjectLeader(this.currentPage, this.pageSize); // 获取主题列表
    },
    // 项目负责人初始化查询
    getProjectLeader(currentPage, pageSize) {
      selectListFromDeclare({
        pageNo: currentPage, // 页码
        pageSize: pageSize, // 页显示量
        declareId: parseInt(window.localStorage.taskId)
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.tableData = res.data.list; // 返回的数据
          this.total = res.data.rows; // 总条数
        }
      });
    },
    // 查询
    searchDetail() {
      selectListFromDeclare({
        companyCode: this.changeCompanyCode, //单位代码（可选，支持模糊查询）
        companyName: this.changeCompanyName, //单位名称 （可选，支持模糊查询）
        name: this.changeName, // 姓名（可选，支持模糊查询）
        pageNo: this.currentPage, // 页码
        pageSize: this.pageSize, // 页显示量
        declareId: parseInt(window.localStorage.taskId)
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.tableData = res.data.list; // 返回的数据
          this.total = res.data.rows; // 总条数
        }
      });
    },
    // 修改每页显示条数
    modifypageSize(value) {
      this.pageSize = value;
      this.getProjectLeader(this.currentPage, this.pageSize); // 获取主题列表
    },
    // 页面点击
    handleCurrentChangeFun(v) {
      this.currentPage = v;
      this.searchDetail(); // 查询
    },
    // 单选框选中的数据
    getTemplatePick(row) {
      this.rowDetail = row;
    },
    // 关闭负责人选择弹框
    closePrincipal() {
      this.dialogFlag = false;
    },
    // 负责人选择弹框 确定
    principalSure() {
      this.dialogFlag = false;
      this.principalData.push(this.rowDetail);
    },
    deleteItem(row) {
      console.log(row);
    },
    // 打开新增交付物弹框
    showAddDialog() {
      this.addFlag = true;
      this.getDeliverableData(); // 章节管理-查询列表
    },
    handleClick(data, checked, node) {},
    nodeClick(data, checked, node) {},
    tree_select(a, b) {
      this.nameContent = a.name;
      this.contentId = a.id;
    },
    // 关闭新增交付物弹框
    closeAddDialog() {
      this.addFlag = false;
    },
    // 新增交付物弹框确定
    AddDialogSure() {
      if (!this.changeStatus) {
        // 附件
        let obj = {
          name: this.deliveryName,
          type: this.subject
        };
        if (this.deliverableData == null) {
          this.deliverableData = [];
        }
        this.deliverableData.push(obj);
      } else {
        // 文档
        let newArr = [];
        let obj = {
          name: this.nameContent,
          docChapterId: this.contentId,
          type: this.subject
        };
        if (this.deliverableData == null) {
          this.deliverableData = [];
        }
        newArr.push(obj);
        let flag = true;
        if (this.deliverableData.length > 0) {
          for (var i = 0; i < this.deliverableData.length; i++) {
            for (var j = 0; j < newArr.length; j++) {
              if (
                this.deliverableData[i].docChapterId == newArr[j].docChapterId
              ) {
                this.$message({
                  message: "该交付物已添加",
                  type: "info"
                });
                flag = false;
              }
            }
          }
        }
        if (flag) {
          this.deliverableData = this.deliverableData.concat(newArr);
        }
      }
      this.addFlag = false;
      this.deliveryName = "";
    },
    // 返回
    goBack() {
      window.history.go(-1);
    },
    // 保存
    saveInfo() {
      // 负责人
      let arr = [];
      if (this.principalData.length > 0) {
        this.principalData.forEach(item => {
          arr.push(item.account);
        });
      }
      if (!this.name) {
        this.$message({
          message: "请输入任务名称!",
          type: "info"
        });
        return false;
      } else if (!this.startDatetime) {
        this.$message({
          message: "请选择开始时间!",
          type: "info"
        });
        return false;
      } else if (!this.endDatetime) {
        this.$message({
		    message: "请选择结束时间!",
          type: "info"
        });
        return false;
      } else if (
        new Date(this.startDatetime).getTime() >=
        new Date(this.endDatetime).getTime()
      ) {
        this.$message({
          message: "请选择正确的时间格式!",
          type: "info"
        });
        return false;
      } else if (this.principalData.length <= 0) {
        this.$message({
          message: "请选择负责人!",
          type: "info"
        });
        return false;
      } else if (this.deliverableData.length <= 0) {
        this.$message({
          message: "请新增交付物!",
          type: "info"
        });
        return false;
      }
      if (this.diffTitle == "编辑修改") {
        workTaskUpdate({
          workId: this.$route.query.workId, // 工作ID
          personAccounts: arr, // 负责人账号
          workTask: {
            id: this.id,
            dependentTaskId: this.dependentTaskId, // 依赖任务ID
            type: this.taskType, // 任务类型
            createAccount: this.createAccount, // 创建人账号
            createDateTime: this.createDateTime, // 创建时间
            workId: this.workId, // 工作ID
            parentTaskId: this.parentTaskId, // 上级任务ID
            name: this.name, // 任务名称
            startDatetime: this.startDatetime, // 开始时间
            endDatetime: this.endDatetime, // 结束时间
            status: this.status, // 任务状态
            discription: this.discription // 任务描述
          },
          workTaskDeliveries: this.deliverableData // 工作任务交付物信息
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            window.history.go(-1);
          }
        });
      } else if (this.diffTitle == "编辑新增") {
        workTaskCreate({
          workId: this.$route.query.workId,
          name: this.name, // 任务名称
          startDatetime: this.startDatetime, // 开始时间
          endDatetime: this.endDatetime, // 结束时间
          status: "START", // 任务状态
          discription: this.discription, // 任务描述
          createAccount: this.loginInforma.account, // 创建人
          accounts: arr, // 负责人账号
          workTaskDeliveries: this.deliverableData // 工作任务交付物信息
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            window.history.go(-1);
          }
        });
      } else if (this.diffTitle == "新增") {
        workTaskCreate({
          workId: this.$route.query.workId,
          parentTaskId: this.parentTaskId,
          dependentTaskId: this.dependentTaskId, // 依赖任务ID
          name: this.name, // 任务名称
          type: this.taskType, // 任务类型
          startDatetime: this.startDatetime, // 开始时间
          endDatetime: this.endDatetime, // 结束时间
          status: "START", // 任务状态
          discription: this.discription, // 任务描述
          createAccount: this.loginInforma.account, // 创建人
          createDateTime: this.createDateTime, // 创建时间
          accounts: arr,
          workTaskDeliveries: this.deliverableData // 工作任务交付物信息
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            window.history.go(-1);
          }
        });
      } else if (this.diffTitle == "编辑新增子任务") {
        workTaskCreate({
          workId: this.$route.query.workId,
          parentTaskId: this.$route.query.parentTaskId,
          name: this.name, // 任务名称
          startDatetime: this.startDatetime, // 开始时间
          endDatetime: this.endDatetime, // 结束时间
          status: "START", // 任务状态
          discription: this.discription, // 任务描述
          accounts: arr,
          workTaskDeliveries: this.deliverableData // 工作任务交付物信息
        }).then(res => {
          if (res.result == "SUCCESS") {
            this.$message({
              message: "新增子任务成功",
              type: "success"
            });
            window.history.go(-1);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pageWarpper {
  width: 990px;
  height: auto;
  background-color: #f5f5f5;
  padding-bottom: 40px;
  position: relative;
  .fadeInBtn {
    width: 88px;
    height: 30px;
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    margin-left: 20px;
    border: none;
    float: right;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
  }
  .wrapperMain {
    width: 970px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 20px 0px 0px 0px;
    overflow: hidden;
    margin: 0 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .editItem {
      display: flex;
      padding: 0 20px 20px;
      justify-content: space-between;
      font-size: 16px;
      color: #666;
      .editCenter {
        display: flex;
        align-items: center;
        .editName {
          text-align: end;
          padding-right: 10px;
          display: flex;
          flex-direction: column;
          span {
            font-size: 12px;
          }
        }
        .editContent {
          display: flex;
          align-items: center;
          span {
            padding: 0 10px;
          }
          .el-select {
            width: 280px !important;
          }
        }
        .editArea {
          display: flex;
          align-items: center;
          margin-left: 24px;
        }
      }
    }
    .section {
      width: 970px;
      .changeFooter {
        margin: 0px 10px;
        padding-top: 50px;
        padding-bottom: 60px;
        height: 46px;
        background-color: #fff;
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
      .resumeWrapper {
        background-color: #fff;
        padding: 0 20px;
        .resumeTitle {
          display: flex;
          align-items: center;
          padding: 20px 0 12px 0;
          p {
            font-size: 16px;
            font-weight: bold;
            color: #666;
          }
        }
        .resumeSection {
          padding-bottom: 10px;
          padding-left: 66px;
        }
      }
    }
  }
  .dialogWrapper {
    position: absolute;
    top: 0;
    width: 990px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
    .dialogTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px 16px;
      p {
        font-size: 18px;
        color: #666;
        font-weight: bold;
      }
    }
    .changeBtn {
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
        margin-right: 59px;
      }
      .hold {
        background-color: #3f82e1;
        color: #fff;
      }
    }
    .editItem {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      color: #666;
      .editCenter {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .editName {
          text-align: end;
          padding-right: 10px;
          display: flex;
          flex-direction: column;
          span {
            font-size: 12px;
          }
        }
        .editContent {
          display: flex;
          align-items: center;
        }
      }
    }
    .dialogBox {
      width: 822px;
      height: 530px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background: #fff;
      border-radius: 10px;
      padding: 30px 0;
      z-index: 99;
      display: flex;
      flex-direction: column;
      .dialogSearch {
        width: 760px;
        border: 1px solid #b5b5b5;
        margin: 0 auto;
        display: flex;
        align-items: center;
        border-radius: 6px;
        padding: 20px 0;
      }
      .dialogMain {
        width: 760px;
        height: 200px;
        overflow-y: scroll;
        margin: 20px auto;
        .tableBox {
          padding: 0 !important;
        }
      }
      .dialogFooter {
        width: 760px;
        .pagination {
          width: 760px !important;
        }
      }
    }
    .addBox {
      width: 532px;
      height: 508px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background: #fff;
      border-radius: 10px;
      padding: 30px 0;
      z-index: 99;
      display: flex;
      flex-direction: column;
      .documentBox {
        width: 470px;
        height: 276px;
        margin: 0 auto;
        margin-top: 30px;
        overflow: hidden;
        overflow-y: scroll;
        border: 1px solid #ccc;
        padding: 10px;
        .documentTitle {
          font-size: 16px;
          color: #666;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>