
<template>
  <div class="approvalDetails">
    <topTitle Title='决策审批'></topTitle>
    <div class="search">
      <div class="top">
        <div class="show">决策审批</div>
        <router-link to="/preDeclare/declareDecision/addreviewMeeting" tag="div" class="box">开评审会</router-link>
      </div>
      <div class="condition">
        <div class="left">
          <div class="box">
            <p>申报编号</p>
            <inputs width="172px"></inputs>
          </div>
          <div class="box">
            <p>专家人数</p>
            <inputs width="172px"></inputs>
          </div>
          <div class="box">
            <p>平均分</p>
            <inputs width="172px"></inputs>
          </div>
        </div>
        <div class="right">
          <div class="box">
            <p>评审会编号</p>
            <inputs width="508px"></inputs>
          </div>
          <div class="box">
            <p>有效评审意见份数</p>
            <inputs width="508px"></inputs>
          </div>
          <div class="boxs">
            <p>建议立项份数</p>
            <inputs width="180px"></inputs>
            <p>建议不立项份数</p>
            <inputs width="170px"></inputs>
          </div>
        </div>
      </div>
      <div class="textarea">
        <p>专家个人评审意见汇总</p>
        <textarea
          cols="2"
          rows="6"
        ></textarea>
      </div>
    </div>
    <div class="operation">
      <button class="ret">返回</button>
      <button class="hold">保存</button>
    </div>
  </div>
    
</template>

<script>
import topTitle from  '../../../components/common/topTitle'
import input from  '../../../components/common/input'
export default {
  name: "approvalDetails",
  data() {
    return {
      
		};
  },
  
  components:{
    topTitle:topTitle,
    inputs:input,
  },
  created() {

	},
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.approvalDetails{
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
  .condition{
    overflow: hidden;
    display: flex;
    .left{
      margin-top: 20px;
      .box{
        margin-bottom: 20px;
        display: flex;
        p{
          width: 86px;
          height: 30px;
          line-height: 30px;
          text-align: right;
          margin-right: 10px;
        }
      }
    }
    .right{
      margin-top: 20px;
      .box{
        margin-bottom: 20px;
        display: flex;
        p{
          width: 172px;
          height: 30px;
          line-height: 30px;
          text-align: right;
          margin-right: 10px;
        }
      }
      .boxs{
        margin-bottom: 20px;
        display: flex;
        p:nth-child(1){
          width: 172px;
          height: 30px;
          line-height: 30px;
          text-align: right;
          margin-right: 10px;
        }
        p:nth-child(3){
          // width: 172px;
          margin-left: 34px;
          height: 30px;
          line-height: 30px;
          text-align: right;
          margin-right: 10px;
        }
      }
    }
  }
  .textarea{
    margin-top: 40px;
    p{
      margin-left: 20px;
    }
    textarea{
      width: 940px;
      height: 300px;
    resize: none;
      margin-left: 20px;
      margin-top: 20px;
      border-radius: 5px;;
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