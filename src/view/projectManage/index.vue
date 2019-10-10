<template>
  <div class="index">
    <headLogo @login='loginShow = true'>

    </headLogo>
    <headTab
      index='2'
    >
    </headTab>
    <div class="content">
      <!-- <leftMenu></leftMenu> -->
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
			loginShow:false
		
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