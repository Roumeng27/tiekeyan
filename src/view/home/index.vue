<template>
  <div class="index">
    <headLogo @login='loginShow = true'></headLogo>
    <headTab index='0'></headTab>
    <div style="width:100%;background-color: #f5f5f5;">
      <div class="content">
        <div class="swiper">
          <div class="top">
            重要发布
          </div>
          <div class="img">
            <img src="../../assets/img/components/img.png" />
          </div>
        </div>
        <div class="notice">
          <div class="top">
            重要发布
            <span>更多></span>
          </div>
          <div class="list">
            <ul>
              <!-- <li><span class="dian"></span> 3456789 <span class="time">4567</span></!--> 
              <li v-for="(v,i) in list" :key="i"><span class="dian"></span>{{v.name}}<span class="time">{{v.time}}</span></li>
            </ul>
          </div>
        </div>
        <div class="left">
          <div class="top">
            重要发布
            <span>更多></span>
          </div>
          <div class="list">
            <ul>
              <li v-for="(v,i) in list" :key="i"><span class="dian"></span>{{v.name}}</li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="top">
            重要发布
            <span>更多></span>
          </div>
          <div class="list">
            <ul>
              <li v-for="(v,i) in list" :key="i"><span class="dian"></span>{{v.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="cen">
        <p class="company">科研创新协同平台</p>
      </div>
    </div>
    <logins v-if="loginShow" @SUCCESS="loginShow = false"></logins>
    
  </div>
    
</template>

<script>
import {accountPersonnelhasLogin} from '../../http/impl/home'
import store from '../../store/index.js';
import {mapGetters} from 'vuex';
import login from 'common/login.vue'
import headLogo from  '../../components/common/headLogo'
import headTab from  '../../components/common/headTab'
export default {
  name: "index",
  data() {
    return {
      list:[
        {
          name:'高速铁路轨道技术国家重点技术实验室2019年度开放课题申请',
          time:'2019-07-18'
        },
        {
          name:'高速铁路轨道技术国家重点技术实验室2019年度开放课题申请',
          time:'2019-07-18'
        },
        {
          name:'高速铁路轨道技术国家重点技术实验室2019年度开放课题申请',
          time:'2019-07-18'
        },
      ],
      loginShow:false
		};
  },
  components:{
      [headLogo.name]:headLogo,
      [headTab.name]:headTab,
      logins:login
  },
  created() {
    // accountPersonnelhasLogin().then(res=>{
    //   if(res.result == 'SUCCESS'){
    //     store.dispatch('changeLoginInforma',res.data);
    //     // console.log(this.loginInforma)
    //   }else{
    //     this.$message({
    //       message: '当前未登录',
    //       type: 'warning'
    //     });
    //     this.$router.push({
    //       path:'/'
    //     })
    //   }
    // })
    
	},
  methods: {
    login(){
			this.loginShow = true
		}
  }
};
</script>

<style lang="scss" scoped>
.content{
  width: 1200px;
  height: auto;
  margin: 0 auto;
  padding-top: 28px;
  padding-bottom: 60px;
  display: flex;
  flex-wrap:wrap;
  .swiper{
    width: 484px;
    height: 350px;
    .top{
      height: 36px;
      width: 484px;
      border-bottom: 6px solid #3f82e1;
      background-image: url('../../assets/img/components/blue.png');
      background-repeat: no-repeat;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      line-height: 39px;
      text-indent: 20px;
    }
    .img{
      margin-top: 6px;
    }
  }
  .notice{
    width: 696px;
    margin-left: 20px;
    height: 350px;
    .top{
      height: 36px;
      width: 696px;
      border-bottom: 6px solid #3f82e1;
      background-image: url('../../assets/img/components/blue.png');
      background-repeat: no-repeat;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      line-height: 39px;
      text-indent: 20px;
      span{
        float: right;
        color: #666;
        font-size: 18px;
        font-weight: normal;
      }
    }
    .list{
      background-color: #fff;
      width: 654px;
      padding: 0px 20px;
      padding-top: 6px;
      height: 293px;
      ul{
        li{
          margin-top: 34px;
          padding-bottom: 16px;
          width: 654px;
          font-size: 14px;
          color: #666;
          text-indent: 10px;
          border-bottom: 1px dashed #666;
          .dian{
            width: 10px;
            height: 10px;
            display: flex;
            background-color: #b5b5b5;
            border-radius: 50%;
            float: left;
            margin-top: 5px;
          }
          .time{
            float: right;
          }
        }
      }
    }
    
  }
  .left{
    width: 580px;
    margin-top: 40px;
    height: 230px;
    .top{
      height: 36px;
      width: 580px;
      border-bottom: 6px solid #3f82e1;
      background-image: url('../../assets/img/components/blue.png');
      background-repeat: no-repeat;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      line-height: 39px;
      text-indent: 20px;
      span{
        float: right;
        color: #666;
        font-size: 18px;
        font-weight: normal;
      }
    }
    .list{
      margin-top: 6px;
      width: 580px;
      background-color: #fff;
      padding-bottom: 26px;
      ul{
        padding-left: 14px;
        li{
          padding-top: 26px;
          text-indent: 10px;
          font-size: 14px;
          color: #666;
          .dian{
            width: 10px;
            height: 10px;
            display: flex;
            background-color: #b5b5b5;
            border-radius: 50%;
            float: left;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .right{
    width: 580px;
    margin-top: 40px;
    margin-left: 20px;
    height: 230px;
    .top{
      height: 36px;
      width: 580px;
      border-bottom: 6px solid #3f82e1;
      background-image: url('../../assets/img/components/blue.png');
      background-repeat: no-repeat;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      line-height: 39px;
      text-indent: 20px;
      span{
        float: right;
        color: #666;
        font-size: 18px;
        font-weight: normal;
      }
    }
    .list{
      margin-top: 6px;
      width: 580px;
      background-color: #fff;
      padding-bottom: 26px;
      ul{
        padding-left: 14px;
        li{
          padding-top: 26px;
          text-indent: 10px;
          font-size: 14px;
          color: #666;
          .dian{
            width: 10px;
            height: 10px;
            display: flex;
            background-color: #b5b5b5;
            border-radius: 50%;
            float: left;
            margin-top: 5px;
          }
        }
      }
    }
  }
  
}
.bottom{
  width: 100%;
  background-color: #565656;
  height: 170px;
  .cen{
    width: 1200px;
    margin: 0 auto;
    height: 170px;
    overflow: hidden;
    .company{
      margin-top: 30px;
      font-size: 16px;
      color: #c0c0c0;
      width: 100%;
      text-align: center;
    }
  }
}
input{
  outline: none;
}

</style>