
<template>
  <div class="declareDecision">
    <topTitle Title='修改评审会'></topTitle>
     <div class="search" >
      <div class="top">
		  <div class="box" @click="godeclareDecision">决策审批</div>
        <div class="show">开评审会</div>
      </div>
      <div class="condition" v-if="showFlag">
        <div class="left">
          <div class="box">
            <p><span class="star">*</span>会议时间</p>
            <datePicker class="inputs" width="234px" v-model="meetTime" height="30px"></datePicker>
          </div>
          <div class="box">
            <p><span class="star">*</span>责任人</p>
            <div class="treeBox"> 
              <inputs width="234px" height="30px" v-model="responsibleAccount" disabled="true"></inputs>
            </div>
          </div>
          <div class="box">
            <p><span class="star">*</span>联系电话</p>
            <inputs width="234px" v-model="responsiblePhone"></inputs>
          </div>
        </div>
        <div class="right">
          <div class="box">
            <p><span class="star">*</span>会议主题</p>
            <inputs width="506px" v-model="titel"></inputs>
          </div>
          <div class="box">
            <p><span class="star">*</span>会议地点</p>
            <inputs width="506px" v-model="meetAddress"></inputs>
          </div>
          <div class="box">
            <p><span class="star">*</span>责任单位</p>
            <div class="treeBox">
              <inputs width="506px" height="30px" v-model="responsibleCompany" disabled="true"></inputs>
            </div>
          </div>
        </div>
		<div class="boxs">
          <div class="box">
            <p><span class="star">*</span>评审对象</p>
            <div class="allBox">
              <el-select
								disabled 
                v-model="projcetAssessObject"
                placeholder="请选择"
                @change="getProjectAssessPeople"
                clearable>
                <el-option
                  v-for="item in projcetAssessObjectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="boxs">
          <div class="box">
            <p><span class="star">*</span>评审成员</p>
            <div class="allBox">
              <selectTree @choicedata="advisorchoise" :choicelevel="3" :choicedatas="assessAdvisor"></selectTree>
            </div>
          </div>
        </div>
		<div class="boxs">
          <div class="notic">
            <p><span class="star">*</span>评审意见</p>
            <div class="allBox">
              <textarea
                v-model="opinion"
                style="font-size:16px;"
                cols="2"
                rows="6"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="fileBox">
			<div class="titleFile">
				<p>相关附件</p>
				<button class="addBtn">添加</button>
			</div>
			<div class="mainFile">
				<div class="fileItem">
					<inputs width="800px" height="40px" disabled="true"></inputs>
					<button class="deleteBtn">删除</button>
				</div>
				<div class="fileItem">
					<inputs width="800px" height="40px" disabled="true"></inputs>
					<button class="deleteBtn">删除</button>
				</div>
			</div>
        </div>
      </div>
    </div> 
    <div class="operation">
      <button class="ret" @click="goBack">返回</button>
      <button class="hold" @click="saveReviewmeetingInfo">保存</button>
    </div>
    
  </div>
    
</template>


<script>
import {mapGetters} from 'vuex';
import topTitle from  '../../../components/common/topTitle'
import input from  '../../../components/common/input'
import datePicker from  '../../../components/common/datePicker'
import selectTree from  '../../../components/common/selectTree.vue'
import {searchReviewmeetingInfo,editReviewmeetingInfo,getInfolistopic} from 'http/projectDeclare';
import { getDeclarlistopic } from "http/formalDeclaration";
export default {
	name: "modificationJury",
	data() {
		return {
			id:'',// 评审编号
			meetTime:'',// 会议时间
			titel:'',// 会议主题
			meetAddress:'',// 会议地点
			responsibleAccount:'',// 责任人
			responsibleCompany:'',// 责任单位
			responsiblePhone:'',// 联系电话
			company:[], //责任单位code和name
			person:[],// 责任人code和name
			advisor:[],// 评审成员code和name
			projcetAssessObject:'',// 评审对象label
			projcetAssessObjectList:[],// 评审对象数组
			projcetAssessObjectId:'',// 评审对象ID
			assessAdvisor:[], //评审成员
			responsableDepartment:[],//责任单位
			responsiableAdvisor:[],// 责任人
			showFlag:false,
			opinion:'',// 评审意见
		};
	},
	components:{
		topTitle:topTitle,
		inputs:input,
		datePicker,
		selectTree
  },
  computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
  },
  	created() {
	  this.getReviewmeetingInfo();// 查看评审会议详情
	//   this.getInformationData(this.$route.query.topicId);// 申报信息列表数据
    },
	methods: {
		// 决策审批
		godeclareDecision(){
			this.$router.push({
				path:'/preDeclare/formalDeclaration/reportDecision',
				query:{
					id:this.$route.query.topicId
				}
			})
		},
		// 发布单位选择
		companychoice(val) {
			this.company = val;
		},
		//责任人选择
		responsibleAccountchoice(val) {
			this.person = val;
		},
		// 评审成员
		advisorchoise(val) {
			this.advisor = val;
		},
			// 申报信息列表数据
		getInformationData(topicId){
			 return getDeclarlistopic({
				topicId:topicId,
				statuss:["FINISH"]
			}).then((res)=>{
				
				if(res.result == "SUCCESS"){
					if(res.data.list != null && res.data.list.length >0){
						let arr = [];
						let obj = {};
						res.data.list.forEach(item=>{
							// 过滤申报信息的审批状态是否审批通过
							// if (item.declareApprovalVo.approvalStatus == "APPROVE") {
								obj = {
									value: item.id,
									label: item.name
								};
								arr.push(obj);
							// }
						})
						this.projcetAssessObjectList = arr
					}
				}
			})
		},
		getProjectAssessPeople(val){
			let arr = [];
			arr.push(val)
			this.projcetAssessObjectId = arr;
		},
		// 查看评审会议详情
		async getReviewmeetingInfo(){
			await this.getInformationData(this.$route.query.topicId);// 申报信息列表数据
			searchReviewmeetingInfo(this.$route.query.id).then((res)=>{
				this.showFlag = true;
				if(res.result == 'SUCCESS'){
					this.id = res.data.id;// 评审编号
					this.meetTime = res.data.meetTime;// 会议时间
					this.titel = res.data.titel;// 会议主题
					this.meetAddress = res.data.meetAddress;// 会议地点
					this.responsibleAccount = res.data.responsiableAdvisorCommonVo.name;// 责任人
					this.responsibleCompany = res.data.responsibleCompanyCommonVo.name;// 责任单位
					this.responsiblePhone = res.data.responsiblePhone;// 联系电话 
					this.advisorAccount  = res.data.advisorAccount;// 评审成员
					// 评审对象
					this.projcetAssessObjectId = res.data.projcetAssessObjectId;// 评审对象
					if(this.projcetAssessObjectId !=null && this.projcetAssessObjectId.length>0){
						
							// let str = res.data.list[0].declareApprovalVo.id;
							// this.projcetAssessObject = str;
						
						var str = ''
						this.projcetAssessObjectList.forEach(item=>{
							console.log(item)
							if(item.value == this.projcetAssessObjectId[0]){
								console.log(item)
								str = item.value;
							}
						})
						
						this.projcetAssessObject = str;
						console.log(this.projcetAssessObject)
					}
					// 评审成员[]
					let obj = {};
					let arr = [];
					if(res.data.assessAdvisorList != null && res.data.assessAdvisorList.length >0){
						res.data.assessAdvisorList.forEach(item=>{
							obj = {
								code:item.code,
								name:item.name
							}
							arr.push(obj)
						})
					}
					this.assessAdvisor = arr;   
					// 责任单位[]
					let arrWork = [];
					if(res.data.responsibleCompanyCommonVo != null){
						arrWork.push(res.data.responsibleCompanyCommonVo)
					}
					this.responsableDepartment = arrWork; 
					this.company = res.data.responsableCompany;
					// 责任人[]
					let arrPeople = [];
					if(res.data.responsiableAdvisorCommonVo != null){
						arrPeople.push(res.data.responsiableAdvisorCommonVo)
					}
					this.responsiableAdvisor = arrPeople;  

					this.personarr = arrPeople;
					this.opinion = res.data.opinion; 
				}
			})
		},
		// 保存
		saveReviewmeetingInfo(){
			// 责任单位
			var companyarr = [];
			if (this.company.length > 0) {
				this.company.map((v, i) => {
					companyarr.push(v.code);
				});
			}
			//责任人
			var personarr = [];
			if (this.person.length > 0) {
				this.person.map((v, i) => {
					personarr.push(v.code);
				});
			}
			// 评审成员
			var advisorarr = [];
			if (this.advisor.length > 0) {
				this.advisor.map((v, i) => {
					advisorarr.push(v.code);
				});
			}
			if(!this.meetTime){
				this.$message({
					message: "请输入会议时间!",
					type: "info"
				});
				return false;
			}else if(!this.titel){
					this.$message({
						message: "请输入会议主题!",
						type: "info"
					});
					return false;
			}else if(!this.meetAddress){
				this.$message({
					message: "请输入会议地点!",
					type: "info"
				});
				return false;
			}else if(this.person.length<=0 && this.responsiableAdvisor.length<=0){
				this.$message({
					message: "请输入责任人!",
					type: "info"
				});
				return false;
			}else if(this.person.length>=2){
				this.$message({
					message: "责任人只能选择一个!",
					type: "info"
				});
				return false;
			}else if(this.company.length<=0 && this.responsableDepartment.length<=0){
				this.$message({
					message: "请输入责任单位!",
					type: "info"
				});
				return false;
			}else if(this.company.length>=2){
				this.$message({
					message: "责任单位只能选择一个!",
					type: "info"
				});
				return false;
			}else if(!this.responsiblePhone){
				this.$message({
					message: "请输入联系电话!",
					type: "info"
				});
				return false;
			}else if(this.advisor.length <=0 && this.assessAdvisor.length<=0){
				this.$message({
					message: "请选择评审成员!",
					type: "info"
				});
				return false;
			}else if(!this.projcetAssessObject){
				this.$message({
					message: "请选择评审对象!",
					type: "info"
				});
				return false;
			}else{
				// 责任人
				if(this.person.length<=0){
					this.responsiableAdvisor.map((v, i) => {
						personarr.push(v.code);
					});
				}
				// 责任人
				if(this.advisor.length<=0){
					this.assessAdvisor.map((v, i) => {
						advisorarr.push(v.code);
					});
				}
				editReviewmeetingInfo({
					id: this.id, // 评审编号
					meetTime: this.meetTime, // 会议时间
					titel: this.titel, // 会议主题
					meetAddress: this.meetAddress, // 会议地点
					responsibleAccount: personarr.toString(), // 责任人
					responsibleCompany: companyarr.toString(), // 责任单位
					responsiblePhone: this.responsiblePhone, // 联系电话
					advisorAccount: advisorarr,// 评审成员
					projcetAssessObjectId:this.projcetAssessObjectId,// 评审对象
					opinion:this.opinion,
					type:'DECLARE'
				}).then((res)=>{
					if(res.result == 'SUCCESS'){
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						window.history.go(-1);
					}else{
						this.$message({
							message: '保存失败',
							type: 'error'
						});
					}
				})
			}		
		},
		// 返回
		goBack(){
			window.history.go(-1);
		}
	}
};
</script>

<style lang="scss" scoped>
.declareDecision{
	width: 1000px;
	height: auto;
	background-color: #f5f5f5;
}
.search{
	width: 980px;
	margin: 0 10px;
	background-color: #fff;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	.top{
		overflow: hidden;
		display: flex;
		border-bottom: 1px solid #f5f5f5;
		height: 52px;
		div{
			width: 136px;
			height: 52px;
			margin-left: 10px;
			margin-top: 10px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			text-align: center;
			font-size: 18px;
			line-height: 52px;
			cursor: pointer;
		}
		.show{
			background-color: #c2d7f5;
			color: #3f82c1;
		}
		.box{
			background-color: #e7e7e7;
			color: #666;
		}
	}
}
.condition{
	display: flex;
	flex-wrap:wrap;
	padding-bottom: 20px;
  .left{
    line-height: 30px;
	.box{
		display: flex;
		margin-top: 20px;
		p{
			width: 84px;
			margin-right: 10px;
			text-align: right;
		}
    .treeBox{
      width: 234px;
      height: 30px;
    }
	}
  }
  .right{
    line-height: 30px;
    .box{
      display: flex;
      margin-top: 20px;
      p{
        width: 116px;
        margin-right: 10px;
        text-align: right;
      }
      .treeBox{
        width: 508px;
         height: 30px;
      }
    }
  }
  .boxs{
    width: 100%;
    margin-top: 20px;
    .box{
      display: flex;
      height: 30px;
      line-height: 30px;
      p{
         width: 84px;
        margin-right: 10px;
        text-align: right; 
      }
       .allBox{
        width: 864px;
      }
    }
	.notic{
      display: flex;
       p {
        width: 84px;
        margin-right: 10px;
        text-align: right;
      }
      .allBox{
        width: 864px;
         textarea{
          width: 864px;
          font-size: 16px;
          height: 160px;
          float: left;
          resize: none;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
      }
    }
  }
}
.star{
	color: #f00;
	padding: 0 4px;
}
.fileBox{
	.titleFile{
		display: flex;
		align-items: center;
		padding-top: 40px;
		p{
			width: 84px;
			margin-right: 10px;
			text-align: right;
		}
		.addBtn{
			width: 86px;
			height: 30px;
			border: 1px solid #3f82e1;
			background-color: #fff;
			color: #3f82e1;
			border-radius: 3px;
		}
	}
	.mainFile{
		padding:20px 0 0 35px;
		.fileItem{
			display: flex;
			align-items: center;
			padding-top:10px;
			.deleteBtn{
				width: 86px;
				height: 30px;
				border: 1px solid #3f82e1;
				background-color: #fff;
				color: #3f82e1;
				border-radius: 3px;
				margin-left:12px;
			}
		}
	}
}
.operation{
  margin: 0px 10px;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 980px;
  height: 46px;
  background-color: #fff;
  position: relative;
  button{
    width: 100px;
    height: 46px;
    border: none;
    border-radius: 3px;
  }
  .ret{
    background-color: #fff;
    color: #3f82e1;
    border: 1px solid #3f82e1;
    position: absolute;
    left: 350px;
  }
  .hold{
    background-color: #3f82e1;
    color: #fff;
    position: absolute;
    left: 550px;
    
  }
}
</style>