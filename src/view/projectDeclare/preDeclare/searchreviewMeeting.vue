
<template>
  <div class="declareDecision">
    <topTitle Title='查看评审会'></topTitle>
    <div class="search" v-if="show">
      <div class="top">
        <div class="box" @click="godeclareDecision">决策审批</div>
        <div class="show">开评审会</div>
      </div>
      <div class="condition">
        <div class="left">
          <div class="box">
            <p>会议时间</p>
            <inputs width="234px" v-model="meetTime" disabled="true"></inputs>
          </div>
          <div class="box">
            <p>责任人</p>
            <inputs width="234px" v-model="responsibleAccount" disabled="true"></inputs>
          </div>
          <div class="box">
            <p>联系电话</p>
            <inputs width="234px" v-model="responsiblePhone" disabled="true"></inputs>
          </div>
        </div>
        <div class="right">
          <div class="box">
            <p>会议主题</p>
            <inputs width="506px" v-model="titel" disabled="true"></inputs>
          </div> 
          <div class="box">
            <p>会议地点</p>
            <inputs width="506px" v-model="meetAddress" disabled="true"></inputs>
          </div>
          <div class="box">
            <p>责任单位</p>
            <inputs width="506px" v-model="responsibleCompany" disabled="true"></inputs>
          </div>
          
        </div>
		<div class="boxs">
			<div class="box">
				<p>评审对象</p>
				<inputs width="864px" disabled="true" v-model="projcetAssessObject"></inputs>
			</div>
		</div>
        <div class="boxs">
          <div class="box">
            <p>参会成员</p>
            <inputs width="864px" disabled="true" v-model="advisorAccount"></inputs>
          </div> 
        </div>
		<div class="boxs">
          <div class="notic">
            <p>评审意见</p>
            <div class="allBox">
              <inputs width="864px" height="160px" disabled="true" v-model="opinion"></inputs>
            </div>
          </div>
        </div>
        <div class="fileBox">
			<div class="titleFile">
				<p>相关附件</p>
				<fileupload class="fileupload" :file="filelist" disabled='true'></fileupload>
			</div>
			
        </div>
      </div>
    </div>
    <div class="operation">
      <button class="ret" @click="goBack">返回</button>
    </div>
    
  </div>
    
</template>

<script>
import topTitle from  '../../../components/common/topTitle'
import input from  '../../../components/common/input'
import fileupload from "../../../components/common/fileupload";
import {searchReviewmeetingInfo,getInfolistopic} from 'http/projectDeclare';
export default {
	name: "modificationJury",
	data() {
		return {
			show:false,
			id:'',// 评审编号
			meetTime:'',// 会议时间
			titel:'',// 会议主题
			meetAddress:'',// 会议地点
			responsibleAccount:'',// 责任人
			responsibleCompany:'',// 责任单位
			responsiblePhone:'',// 联系电话 
			advisorAccount:'',
			projcetAssessObjectList:[],// 申报信息列表数据
			projcetAssessObject:'',
			projcetAssessObjectId:[206],
			opinion:"",// 评审意见
			filelist:[]
		};
    
    
	},
	components:{
		topTitle:topTitle,
		inputs:input,
		fileupload
	},
  	created() {
      this.getReviewmeetingInfo();// 查看评审会议详情
      // this.getInformationData(this.$route.query.topicId);// 申报信息列表数据
    },
	methods: {
    // 决策审批
		  godeclareDecision(){
			  this.$router.push({
					path:'/preDeclare/declareDecision',
					query:{
						id:this.$route.query.id
					}
				})
		  },
    // 申报信息列表数据
	 getInformationData(topicId){
			 return getInfolistopic({
				topicId:topicId,
				statuss: ["FINISH"]
			}).then((res)=>{
				if(res.result == "SUCCESS"){
					if(res.data.list != null && res.data.list.length >0){
						let arr = [];
						let obj = {};
						res.data.list.forEach(item=>{
              // 过滤申报信息的审批状态是否审批通过
              if (item.approvalStatus == "APPROVE") {
                obj = {
                  value: item.id,
                  label: item.name
                };
                arr.push(obj);
              }
						})
						this.projcetAssessObjectList = arr
					}
				}
			})
		},
		// 查看评审会议详情
		async getReviewmeetingInfo(){
			await this.getInformationData(this.$route.query.topicId);// 申报信息列表数据
				searchReviewmeetingInfo(this.$route.query.id).then((res)=>{
					if(res.result == 'SUCCESS'){
						this.id = res.data.id;// 评审编号
						this.meetTime = res.data.meetTime;// 会议时间
						this.titel = res.data.titel;// 会议主题
						this.meetAddress = res.data.meetAddress;// 会议地点
						this.responsibleAccount = res.data.responsiableAdvisorCommonVo.name;// 责任人
						this.responsibleCompany = res.data.responsibleCompanyCommonVo.name;// 责任单位
						this.responsiblePhone = res.data.responsiblePhone;// 联系电话 
						let peopleArr = [];
						res.data.assessAdvisorList.forEach(item=>{
							peopleArr.push(item.name)
						})
						this.advisorAccount  = peopleArr.join(',');// 参会成员 
						// assessAdvisor    参会成员
						// responsableDepartment     责任单位
						// responsiableAdvisor    责任人

						// 评审对象
						this.projcetAssessObjectId = res.data.projcetAssessObjectId;// 评审对象
						
						if(this.projcetAssessObjectId !=null && this.projcetAssessObjectId.length>0){
							let str = ''
							this.projcetAssessObjectList.forEach(item=>{
							if(item.value == this.projcetAssessObjectId[0]){
								
								str = item.label;
							}
							})
							this.projcetAssessObject = str;
						}
						this.filelist = res.data.attachmentList;
						if(this.filelist.length>0){
							this.filelist.map((v,i)=>{
								console.log(v)
								v.name = v.attachmentName
							})
						}
						this.opinion = res.data.opinion;// 评审意见 
						this.show = true;
					}
					
				})
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
.fileBox{
	.titleFile{
		// display: flex;
		// align-items: center;
		// padding-top: 40px;
    margin-top: 20px;
		p{
      float: left;
			width: 65px;
      height: 30px;
      line-height: 30px;
			// text-align: right;
      margin-left: 30px;
		}
    .fileupload{
      float: left;
      width: 800px
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
  display: flex;
  justify-content: center;
  align-items: center;
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
  }
}
</style>