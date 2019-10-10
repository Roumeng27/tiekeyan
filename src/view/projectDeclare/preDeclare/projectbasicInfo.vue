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
            <div class="editName"><span class="star">*</span>项目名称</div>
            <div class="editContent">
              <inputs class="inputs" width="234px" v-model="name" height="30px"></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName"><span class="star">*</span>所属专业</div>
          <div class="editContent">
            <inputs class="inputs" width="460px" v-model="subject" height="30px"></inputs>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">实施周期</div>
            <div class="editContent">
              <inputs class="inputs" width="234px" v-model="monthNum" height="30px"></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">起止时间</div>
          <div class="editContent">
            <datePicker class="inputs" width="200px" v-model="startDate" height="30px"></datePicker>
          </div>
          <p style="padding:0 20px;">—</p>
          <div class="editContent">
            <datePicker class="inputs" width="200px" v-model="endDate" height="30px"></datePicker>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">建议人</div>
            <div class="editNameselect">
              <selectTree @choicedata="proposerAccountarr" :number="1" :choicelevel='3' ></selectTree>
              <!-- <inputs class="inputs" width='234px' v-model="proposerAccount" height='30px' ></inputs> -->
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">建议单位</div>
          <div class="editNameselect">
						<selectTree @choicedata="proposerCompanyCodearr" :number="1" :endlevel='0' ></selectTree>
            <!-- <inputs class="inputs" width="460px" v-model="proposerCompanyCode" height="30px"></inputs> -->
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">主持单位</div>
            <div class="editNameselect">
							<selectTree @choicedata="presenterCompanyCodearr" :number="1" :endlevel='0'></selectTree>
              <!-- <inputs class="inputs" width="234px" v-model="presenterCompanyCode" height="30px"></inputs> -->
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">参与单位</div>
          <div class="editNameselect">
						<selectTree @choicedata="companyCodesarr" :endlevel='0'></selectTree>
            <!-- <inputs class="inputs" width="460px" v-model="companyCodes" height="30px"></inputs> -->
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">项目负责人</div>
            <div class="editNameselect">
							<selectTree @choicedata="responsibleNamearr" :number="1" :choicelevel='3'></selectTree>
              <!-- <inputs class="inputs" width="234px" v-model="responsibleName" height="30px"></inputs> -->
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">联系电话</div>
          <div class="editContent">
            <inputs class="inputs" width="460px" v-model="contactPhone" height="30px"></inputs>
          </div>
        </div>
      </div>
      <div class="editItem" style="margin-top:20px;">
        <div class="editCenter">
          <div class="centerArea">
            <div class="editName">总预算（万元）</div>
            <div class="editContent">
              <inputs class="inputs" width="234px" v-model="budget" height="30px"></inputs>
            </div>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">单位自筹资金（万元）</div>
          <div class="editContent">
            <inputs class="inputs" width="156px" v-model="selfRaisedFund" height="30px"></inputs>
          </div>
        </div>
        <div class="editCenter">
          <div class="editName">国家拨款资金（万元）</div>
          <div class="editContent">
            <inputs class="inputs" width="156px" v-model="appropriationFunds" height="30px"></inputs>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapperTitle" style="margin-top:10px;">
      <p>项目主要信息</p>
    </div>
    <div class="wrapperTextarea">
      <div class="editArea">
        <p><span class="star">*</span>项目背景及技术经济分析</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="background" height="102px"></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>主要研究内容</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="mainStudyContent" height="102px"></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>研究目标</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="objectives" height="102px"></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>预期成果</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="expect" height="102px"></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>知识产权目标</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="intellectualProperty" height="102px"></inputs>
        </div>
      </div>
      <div class="editArea">
        <p>备注</p>
        <div class="areaContent">
          <inputs class="inputs" width="832px" v-model="remark" height="102px"></inputs>
        </div>
      </div>
      <div class="editBtn">
        <button class="backBtn" @click="goBack">返回</button>
        <button class="saveBtn" @click="saveBasicInfo">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import selectTree from "common/selectTree";
import topTitle from "../../../components/common/topTitle.vue";
import inputs from "../../../components/common/input.vue";
import datePicker from "../../../components/common/datePicker";
import { addBasicinfotopic } from "http/projectDeclare";
export default {
  components: {
    topTitle,
    inputs,
    datePicker,
    selectTree
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
	computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
  },
  created() {},
  methods: {
    //建议人
    proposerAccountarr(val){
      this.proposerAccount = val
    },
    // 项目负责人
    responsibleNamearr(val){
      this.responsibleName = val
    },
		// 建议单位
		proposerCompanyCodearr(val){
			// if(this.proposerCompanyCode.length > 0){
			// 	return
			// }else{
				this.proposerCompanyCode = val
			// }
			
		},
		// 主持单位
		presenterCompanyCodearr(val){
			// if(this.presenterCompanyCode.length > 0){
			// 	return
			// }else{
				this.presenterCompanyCode = val
			// }
		},
		// 参与单位
		companyCodesarr(val){
			this.companyCodes = val
    },
    // 返回上一級
    goBack(){
      window.history.go(-1);
    },
    // 保存项目基本信息
    saveBasicInfo() {
      //建议人
			var proposerAccountarr = ''
      if(this.proposerAccount.length>0){
        this.proposerAccount.map((v,i)=>{
          proposerAccountarr=v.code
        })
      }
      // 项目负责人
			var responsibleNamearr = ''
      if(this.responsibleName.length>0){
        this.responsibleName.map((v,i)=>{
          responsibleNamearr=v.code
        })
      }
      // 建议单位
			var proposerCompanyCodearr = ''
      if(this.proposerCompanyCode.length>0){
        this.proposerCompanyCode.map((v,i)=>{
          proposerCompanyCodearr=v.code
        })
      }
      // 主持单位
			var presenterCompanyCodearr = ''
      if(this.presenterCompanyCode.length>0){
        this.presenterCompanyCode.map((v,i)=>{
          presenterCompanyCodearr= v.code
        })
      }
      // 参与单位
			var companyCodesarr = []
      if(this.companyCodes.length>0){
        this.companyCodes.map((v,i)=>{
          companyCodesarr.push(v.code)
        })
      }
      // console.log(proposerAccountarr,responsibleNamearr,proposerCompanyCodearr,presenterCompanyCodearr,companyCodesarr)
      addBasicinfotopic({
        topicId: this.$route.query.id, // 主题id
        preDeclareNo: this.preDeclareNo, // 项目预申报编号
        name: this.name, // 项目名称
        subject: this.subject, // 所属专业
        type: this.type, // 项目类别
        monthNum: this.monthNum, // 实施周期
        startDate: this.startDate, // 项目开始日期
        endDate: this.endDate, // 项目结束日期
        proposerAccount:proposerAccountarr,// 建议人
        proposerCompanyCode:proposerCompanyCodearr,// 建议单位
        responsibleAccount: responsibleNamearr, // 项目责任人
        contactPhone: this.contactPhone, // 联系电话
        budget: this.budget, // 总预算
        selfRaisedFund: this.selfRaisedFund, // 自筹资金
        appropriationFunds: this.appropriationFunds, // 拨款资金
        background: this.background, // 项目背景及技术经济分析
        mainStudyContent: this.mainStudyContent, // 主要研究内容
        objectives: this.objectives, // 研究目标
        expect: this.expect, // 预期成果
        intellectualProperty: this.intellectualProperty, // 知识产权目标
        remark: this.remark, // 备注
        presenterCompanyCode:presenterCompanyCodearr,// 主持单位
        companyCodes:companyCodesarr// 参与单位
      }).then(res => {
        if (res.result == "SUCCESS") {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          window.history.go(-1);
        } else {
          this.$message({
            message: "保存失败",
            type: "error"
          });
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
  .wrapperTitle {
    // width: 980px;
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
				.editNameselect{
						width: 460px;
					height: 30px; 
				}
      }
      .editName {
        width: 100px;
        text-align: end;
        font-size: 16px;
        color: #666;
        padding-right: 10px;
        .star{
          color: #f00;
          padding: 0 4px;
        }
      }
      .centerArea {
        display: flex;
        align-items: center;
				.editNameselect{
					width: 234px;
					height: 30px; 
				}
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
        .star{
          color: #f00;
          padding: 0 4px;
        }
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