<template>
  <div class="index">
    <headLogo @login='loginShow = true'>

    </headLogo>
    <headTab
      index='1'>
    </headTab>
    <div class="content">
      <leftMenu :menu='menu' :titleWord="titleWord"></leftMenu>
      <router-view></router-view>
    </div>
    <logins v-if="loginShow"  @SUCCESS="loginShow = false"></logins>
  </div>
    
</template>

<script>
import {accountPersonnelhasLogin} from '../../http/impl/home'
import login from 'common/login.vue'
import store from '../../store/index.js';
import {mapGetters} from 'vuex';
import headLogo from  '../../components/common/headLogo'
import headTab from  '../../components/common/headTab'
import leftMenu from  '../../components/common/leftMenu'
export default {
  name: "index",
  data() {
    return {
			loginShow:false,
      menu:[ 
        {
              name:'预申报',
              url:'/preDeclare/declareTheme'     ,
          // name:'项目预申报',
          // subMenu:[
          //   {
          //     name:'预申报主题',
          //     url:'/preDeclare/declareTheme'
          //   }
          //   // ,
          //   // {
          //   //   name:'预申报信息',
          //   //   url:'/preDeclare/declarationInformation'
          //   // },
          //   // {
          //   //   name:'预申报决策',
          //   //   url:'/preDeclare/declareDecision'
          //   // }
          // ]
        },
        {
          name:'正式申报',
           url:'/preDeclare/formalDeclaration'  
        },
        {
          name:'合同申报',
          url:'/declareContract/pageInfo'
        },
        
      ],
      titleWord:'项目申报'
		};
  },
  components:{
      [headLogo.name]:headLogo,
      [headTab.name]:headTab,
      [leftMenu.name]:leftMenu,
      logins:login
  },
  computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
  },
  created() {
    
			console.log(document.cookie)
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
    // if(!this.loginInforma.name){
    //   this.$message({
    //     message: '当前未登录',
    //     type: 'warning'
    //   });
    //   this.$router.push({
    //     path:'/'
    //   })
    // }
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
  display: flex;
}
</style>