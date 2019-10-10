<template>
  <div class="Popup">
    <div class="cen">
      <!-- 不通过 pass-->
      <div class="pass" v-if="type == 'pass'">
        <p class="title">审批意见<span>不通过</span></p>
        <div class="asoptTextarea">
            <el-input
              type="textarea"
              maxlength="50"
              v-model="content">
            </el-input>
          </div>
      </div>
      <!-- 挂起 hangUp-->
      <div class="pass" v-if="type == 'hangUp'">
        <p class="title">审批意见<span>挂起</span></p>
        <div class="asoptTextarea">
            <el-input
              type="textarea"
              maxlength="50"
              v-model="content">
            </el-input>
          </div>
      </div>
      <!-- 通过 adopt-->
      <div class="adopt" v-if="type == 'adopt'">
        <p class="title">审批意见<span>通过</span></p>
        <p class="ranking">建议排名<span><inputs v-model="rank" width="100px" height="40px"></inputs></span></p>
          <div class="asoptTextarea">
            <el-input
              type="textarea"
              maxlength="50"
              v-model="content">
            </el-input>
          </div>
      </div>
      <!-- 建议排名 proposal-->
      <div class="proposal" v-if="type == 'proposal'">
        <p class="ranking">建议排名<span><el-input v-model="rank" width="100px" height="40px"  onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"  @change="blurBlank()"></el-input></span></p>
      </div>
      <div class="btn">
        <button class="cancel" @click="cancel()">取消</button>
        <button class="Sure" @click="Sure()">确定</button>
      </div>
    </div>
   
	</div>
</template>

<script>
import input from  './input'
export default {
  name: "Popup",
  data() {
    return {
      // 排名
      ranking:'',
      // 输入内容
      content:'',
      rank:'',
		};
	},
  props:['type'],
  components:{
    inputs:input,
  },
  created(){
    
  },
  computed:{

  },
  watch:{
    
  },
  methods: {
    cancel(){
      this.$emit('cancel','')
    },
    Sure(){
      var obj = {
        type:this.type,
        ranking:this.rank,
        content:this.content
      }
      this.$emit('cancel',obj)
    },
    blurBlank(){

      this.$emit('rankNum',this.rank)
    }
  }
};
</script>

<style lang="scss" scoped>
.Popup{
  position: absolute;
  width: 1000px;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 9999;
  top: 0px;
  .cen{
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: -285px;
    transform: translateY(-50%);
    width: 570px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
  }
  .pass{
    padding: 30px 30px 0 30px; 
    .title{
      font-size: 18px;
      color: #666;
      span{
        color: #3f82e1;
        margin-left: 30px;
      }
    }
    .asoptTextarea{
      margin-top: 40px;
      height: 128px;
    }
    .asoptTextarea>.el-textarea{
      height: 128px !important;
    }
  }
  .adopt{
    padding: 30px 30px 0 30px; 
    .title{
      font-size: 18px;
      color: #666;
      span{
        color: #3f82e1;
        margin-left: 30px;
      }
    }
    .ranking{
      margin-top: 30px;
      font-size: 18px;
      color: #666;
      span{
        margin-left: 30px;
      }
    }
    .asoptTextarea{
      margin-top: 40px;
      height: 128px;
    }
    .asoptTextarea>.el-textarea{
      height: 128px !important;
    }
  }
  .proposal{
    .ranking{
      margin-top: 30px;
      margin-left: 176px;
      font-size: 18px;
      color: #666;
      display: flex;
      span{
        margin-left: 30px;
      }
    }
  }
  .btn{
    width: 100%;
    margin-top: 40px;
    margin-bottom: 40px;
    button{
      width: 100px;
      height: 46px;
      border: none;
      border-radius: 3px;
    }
    .cancel{
      margin-left: 165px;
      background-color: #fff;
      color: #3f82e1;
      border: 1px solid #3f82e1;
    }
    .Sure{
      margin-left: 40px;
      background-color: #3f82e1;
      color: #fff;
      position: absolute;
    }
  }
}
</style>