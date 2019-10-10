<template>
  <div class="login" @click.self="Close()">
      <div style="width:1200px;height:100vh;margin: 0 auto;position: relative;" @click.self="Close()">
      <div class="box">
        <p class="title">用户登录</p>
        <div class="name">
          <p>用户名</p>
          <input type="text" v-model="name">
        </div>
        <div class="password">
          <p>密&nbsp;&nbsp;&nbsp;&nbsp;码</p>
          <input type="password" @click.stop.native="stopstop" v-model="password" >
        </div>
        <div class="verification">
          <p>验证码</p>
          <input type="text" v-model="verification">
          <div class="img" >
            <img :src="img" alt="">
          </div>
        </div>
        <p class="switchimg" @click="getverification()">看不清换一张</p>
        <button class="loginbtn" @click="login()">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
      </div>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import store from '../../store/index.js';
import {accountPersonnelcheckUser,accountPersonnelgetCaptchaUtils} from 'http/home'
export default {
  name: "login",
  data() {
    return {
			name:'',
      password:'',
      verification:'',
      img:''
		};
  },
  computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
  },
  mounted() {
    this.getverification()
	},
  methods: {
    getverification(){
      accountPersonnelgetCaptchaUtils().then((res)=>{
        var img = 'data:image/png;base64,' +res
        this.img = img
      })
    },
    login(){
      var th = this
      accountPersonnelcheckUser({
        accountName:this.name,
        password:this.password,
        captcha:this.verification
      }).then((res)=>{
        if(res.result == 'SUCCESS'){
          store.dispatch('changeLoginInforma',res.data);
          th.$emit('SUCCESS')
        }else{
          console.log(res)
          this.getverification()
          // this.$message({
          //   message: res.errorMessage,
          //   type: 'warning'
          // });
        }
      })
    },
    Close(){
      this.$emit('SUCCESS')
    }
  }
};
</script>

<style lang="scss" scoped>
.login{
  position: fixed;
  top: 0px;
  z-index: 888;
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.3);
  .box{
    width: 522px;
    height: 560px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    right: 0px;
    top: 50%;
    margin-top: -280px;
    z-index: 999;
    .title{
      font-size: 28px;
      margin-top: 38px;
      color: #3f82e1;
      text-align: center;
    }
    .name{
      width: 438px;
      height: 60px;
      border-bottom: 1px solid #ccc;
      margin: 0 auto;
      margin-top: 20px;
      p{
        width: 80px;
        font-size: 20px;
        color: #666;
        text-align: right;
        line-height: 60px;
        float: left;
      }
      input{
        width: 358px;
        float: left;
        border: none;
        height: 60px;
        font-size: 20px;
        text-indent: 30px;
      }
    }
    .password{
      width: 438px;
      height: 60px;
      border-bottom: 1px solid #ccc;
      margin: 0 auto;
      margin-top: 20px;
      p{
        width: 80px;
        font-size: 20px;
        color: #666;
        text-align: right;
        line-height: 60px;
        float: left;
      }
      input{
        width: 358px;
        float: left;
        border: none;
        height: 60px;
        font-size: 20px;
        text-indent: 30px;
      }
    }
    .verification{
      width: 438px;
      height: 60px;
      border-bottom: 1px solid #ccc;
      margin: 0 auto;
      margin-top: 20px;
      p{
        width: 80px;
        font-size: 20px;
        color: #666;
        text-align: right;
        line-height: 60px;
        float: left;
      }
      input{
        width: 238px;
        float: left;
        border: none;
        height: 60px;
        font-size: 20px;
        text-indent: 30px;
      }
      .img{
        width: 100px;
        height: 40px;
        // background-color: #000;
        float: left;
        margin-top: 10px;
        img{
          
        width: 100px;
        height: 40px;
        }
      }
    }
    .switchimg{
      margin-top: 20px;
      width: 450px;
      text-align: right;
      font-size: 18px;
      color: #666;
    }
    .loginbtn{
      width: 400px;
      height: 60px;
      background-color: #3f82e1;
      margin-top: 80px;
      margin-left: 61px;
      border: none;
      border-radius: 5px;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>