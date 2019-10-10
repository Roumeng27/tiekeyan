<template>
  <div class="pageWrapper">
    <div class="wrapperTitle">
      <p>基本信息</p>
    </div>
    <div class="wrapperSearch">
      <div class="editItem">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">申报编号</div>
            <div class="editContent">
              <inputs
                class="inputs"
                width="234px"
                v-model="preDeclareNo"
                height="30px"
                disabled="true"
              ></inputs>
            </div>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">项目名称</div>
            <div class="editContent">
              <inputs class="inputs" width="234px" v-model="name" height="30px" disabled="true"></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">所属专业</div>
          <div class="editContent">
            <inputs class="inputs" width="460px" v-model="subject" height="30px" disabled="true"></inputs>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">实施周期</div>
            <div class="editContent">
              <inputs class="inputs" width="234px" v-model="monthNum" height="30px" disabled="true"></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">起止时间</div>
          <div class="editContent">
            <inputs class="inputs" width="200px" v-model="startDate" height="30px" disabled="true"></inputs>
          </div>
          <p style="padding:0 20px;">—</p>
          <div class="editContent">
            <inputs class="inputs" width="200px" v-model="endDate" height="30px" disabled="true"></inputs>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">建议人</div>
            <div class="editContent">
              <inputs
                class="inputs"
                width="234px"
                v-model="proposerAccount"
                height="30px"
                disabled="true"
              ></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">建议单位</div>
          <div class="editContent">
            <inputs
              class="inputs"
              width="460px"
              v-model="proposerCompanyCode"
              height="30px"
              disabled="true"
            ></inputs>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">主持单位</div>
            <div class="editContent">
              <inputs
                class="inputs"
                width="234px"
                v-model="presenterCompanyCode"
                height="30px"
                disabled="true"
              ></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">参与单位</div>
          <div class="editContent">
            <inputs
              class="inputs"
              width="460px"
              v-model="companyCodes"
              height="30px"
              disabled="true"
            ></inputs>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">项目负责人</div>
            <div class="editContent">
              <inputs
                class="inputs"
                width="234px"
                v-model="responsibleName"
                height="30px"
                disabled="true"
              ></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">联系电话</div>
          <div class="editContent">
            <inputs
              class="inputs"
              width="460px"
              v-model="contactPhone"
              height="30px"
              disabled="true"
            ></inputs>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">总预算（万元）</div>
            <div class="editContent">
              <inputs class="inputs" width="234px" v-model="budget" height="30px" disabled="true"></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">单位自筹资金（万元）</div>
          <div class="editContent">
            <inputs
              class="inputs"
              width="156px"
              v-model="selfRaisedFund"
              height="30px"
              disabled="true"
            ></inputs>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">国家拨款资金（万元）</div>
          <div class="editContent">
            <inputs
              class="inputs"
              width="156px"
              v-model="appropriationFunds"
              height="30px"
              disabled="true"
            ></inputs>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapperTitle" style="margin-top:10px;">
      <p>项目主要信息</p>
    </div>
    <div class="wrapperTextarea">
      <div class="editArea">
        <p>项目背景及技术经济分析</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="background" height="102px" disabled="true"></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>主要研究内容</p>
        <div class="areaContent">
          <inputs
            class="inputs"
            width="832px"
            v-model="mainStudyContent"
            height="102px"
            disabled="true"
          ></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>研究目标</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="objectives" height="102px" disabled="true"></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>预期成果</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="expect" height="102px" disabled="true"></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>知识产权目标</p>
        <div class="areaContent">
          <inputs
            class="inputs"
            width="832px"
            v-model="intellectualProperty"
            height="102px"
            disabled="true"
          ></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>备注</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="remark" height="102px" disabled="true"></inputs>
        </div>
      </div>
      <div class="editBtn">
        <button class="backBtn" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import topTitle from "../../../components/common/topTitle.vue";
import inputs from "../../../components/common/input.vue";
import { searchBasicinfotopic } from "http/projectDeclare";
export default {
  name: "searchbasicInfo",
  components: {
    topTitle,
    inputs
  },
  data() {
    return {
      // 项目基本信息所需字段
      preDeclareNo: "", // 项目预申报编号
      name: "", // 项目名称
      subject: "", // 所属专业
      type: "", // 项目类别
      monthNum: "", // 实施周期
      startDate: "", // 项目开始日期
      endDate: "", // 项目结束日期
      proposerAccount: "", // 建议人
      proposerCompanyCode: "", // 建议单位
      responsibleName: "", // 项目责任人
      contactPhone: "", // 联系电话
      budget: "", // 总预算
      selfRaisedFund: "", // 自筹资金
      appropriationFunds: "", // 拨款资金
      background: "", // 项目背景及技术经济分析
      mainStudyContent: "", // 主要研究内容
      objectives: "", // 研究目标
      expect: "", // 预期成果
      intellectualProperty: "", // 知识产权目标
      remark: "", // 备注
      presenterCompanyCode: "", // 主持单位
      companyCodes: "" // 参与单位
    };
  },
  created() {
		console.log(this.$route.query.id)
    this.getbasicIndoDetail(); // 查看项目基本信息 详情
  },
  methods: {
    // 查看项目基本信息 详情
    getbasicIndoDetail() {
			var res = this.$route.query.id
    //   searchBasicinfotopic(this.$route.query.id).then(res => {
    //     if (res.result == "SUCCESS") {
          this.preDeclareNo = res.preDeclareNo; // 项目预申报编号
          this.name = res.name; // 项目名称
          this.subject = res.subject; // 所属专业
          this.type = res.type; // 项目类别
          this.monthNum = res.monthNum; // 实施周期
          this.startDate = res.startDate; // 项目开始日期
          this.endDate = res.endDate; // 项目结束日期
          this.proposerAccount = res.proposerName; // 建议人
          this.proposerCompanyCode = res.pCompanyName; // 建议单位
          this.responsibleName = res.responsibleName; // 项目责任人
          this.contactPhone = res.contactPhone; // 联系电话
          this.budget = res.budget; // 总预算
          this.selfRaisedFund = res.selfRaisedFund; // 自筹资金
          this.appropriationFunds = res.appropriationFunds; // 拨款资金
          this.background = res.background; // 项目背景及技术经济分析
          this.mainStudyContent = res.mainStudyContent; // 主要研究内容
          this.objectives = res.objectives; // 研究目标
          this.expect = res.expect; // 预期成果
          this.intellectualProperty = res.intellectualProperty; // 知识产权目标
          this.remark = res.remark; // 备注
          this.presenterCompanyCode = res.presenterName; // 主持单位
          this.companyCodes = res.otherNames; // 参与单位
      //   }
      // });
    },
    // 返回
    goBack() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.pageWrapper {
  width: 1000px;
  height: auto;
  background-color: #f5f5f5;
  .wrapperTitle {
    width: 980px;
    height: 58px;
    margin: 0px 10px;
    background-color: #fff;
    line-height: 58px;
    padding: 0 20px;
    border-bottom: 1px solid #f5f5f5;
    p {
      font-size: 16px;
      color: #3f82e1;
    }
  }
  .wrapperSearch {
    width: 980px;
    height: auto !important;
    margin: 0px 10px;
    box-sizing: border-box;
    background-color: #fff;
    height: 72px;
    display: flex;
    align-items: center;
    padding: 30px 20px;
    flex-direction: column;
    .editItem {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .editCenter {
        display: flex;
        align-items: center;
      }
      .editName {
        width: 100px;
        text-align: end;
        font-size: 16px;
        color: #666;
        padding-right: 10px;
      }
      .centerArea {
        display: flex;
        align-items: center;
      }
      .editComment {
        display: flex;
        align-items: center;
      }
    }
  }
  .wrapperTextarea {
    width: 980px;
    height: auto !important;
    margin: 0px 10px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    // align-items:center;
    // padding:30px 20px;
    flex-direction: column;
    .editArea {
      padding: 0 30px;
      p {
        font-size: 16px;
        color: #666;
        padding-top: 20px;
      }
      .areaContent {
        padding-top: 10px;
      }
    }
    .editBtn {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 60px;
      .backBtn {
        width: 100px;
        height: 46px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        color: #fff;
        border: none;
        float: right;
        border-radius: 3px;
        font-size: 18px;
        color: #3f82e1;
        border: 1px solid #3f82e1;
      }
      .saveBtn {
        width: 100px;
        height: 46px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #3f82e1;
        color: #fff;
        margin-left: 20px;
        border: none;
        float: right;
        border-radius: 3px;
        font-size: 18px;
        color: #fff;
      }
    }
  }
}
</style>