<template>
  <div class="index">
    <headLogo @login='loginShow = true'>

    </headLogo>
    <headTab
      index='8'
    >
    </headTab>
    <div class="content">
      <leftMenu :menu="menu_data" :titleWord="titleWord"></leftMenu>
      <router-view></router-view>
    </div>
    <logins v-if="loginShow" @SUCCESS="loginShow = false"></logins>
  </div>
    
</template>

<script>
import login from 'common/login.vue'
import headLogo from  '../../components/common/headLogo'
import headTab from  '../../components/common/headTab'
import leftMenu from  '../../components/common/leftMenu'
export default {
  name: "projectManage",
  data() {
    return {
      loginShow:false,
      menu_data:[
        {
          name:'组织机构管理',
          url:'/system' 
        },
        {
          name:'部门管理',
          url:'/system/divisionManage' 
        },
        {
          name:'用户管理',
          url:'/system/userManage' 
        },
        {
          name:'角色管理',
          url:'/system/roleManage' 
        },
        {
          name:'模板中心',
          url:'/system/templateManage' 
        }
      ],
      titleWord:'系统管理'
		};
  },
  components:{
      [headLogo.name]:headLogo,
      [headTab.name]:headTab,
      [leftMenu.name]:leftMenu,
      logins:login
  },
  created() {

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