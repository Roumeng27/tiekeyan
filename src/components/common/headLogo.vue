<template>
  <div class="headLogo">
		<img class="logo" src="../../assets/img/components/logo.png" alt="">
		<h1>川藏铁路科技创新协作平台</h1>
		<router-link to="/system" tag="p" class="Workbench">系统管理</router-link>
		<router-link to="/workbench" tag="p" class="Workbench">我的工作台</router-link>
		<div class="login">
			<img class="my" src="../../assets/img/components/my.png" alt="">
			<p v-if="loginInforma.name" @click="showout()">{{loginInforma.name}}</p>
			<p @click="login()" v-else style="cursor: pointer;">登录</p>
			<div @click="showout()">
				<img v-if="show" class="downarrow" src="../../assets/img/components/uparrow.png" alt="">
				<img v-if="!show" class="downarrow" src="../../assets/img/components/downarrow.png" alt="">
			</div>
		</div>
		<div class="operation" v-if="show" @click="out()">
			<img src="../../assets/img/components/Signout.png" alt="">
			<p>退出</p>
		</div>
	</div>
</template>

<script>
import store from '../../store/index.js';
import { accountPersonnellogout } from "http/home";
import {mapGetters} from 'vuex';
export default {
  name: "headLogo",
  data() {
    return {
			show : false,
		};
	},
	computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
	},
	
  created() {
		// var _this = this;
		// document.onkeydown = function(e) {
		// 	let key = window.event.keyCode;
		// 	if (key == 13) {
		// 		_this.out();
		// 	}
		// };
	},
  methods: {
    login(){
			this.$emit('login','')
		},
		out(){
			accountPersonnellogout().then(res=>{
				
				if(res.result == 'SUCCESS'){
					this.show = !this.show
					this.$message({
						message: '退出登录成功',
						type: 'success'
					});
					store.dispatch('changeLoginInforma',{});
					this.$router.push({
						path:'/'
					})
				}else{
					this.show = !this.show
					
					store.dispatch('changeLoginInforma',{});
					this.$router.push({
						path:'/'
					})
				}
			})
		},
		showout(){
			if(this.loginInforma.name){
				console.log(1)
				this.show = !this.show
			}
		}
  }
};
</script>

<style lang="scss" scoped>
.headLogo{
	width: 1200px;
	height: 100px;
	margin: 0 auto;
	background-color: #fff;
	position: relative;
	
	.logo{
		margin-top: 10px;
		margin-left: 40px;
		margin-right: 34px;
		float: left;
	}
	h1{
		font-size: 28px;
		font-weight: bold;
		color: #074193;
		line-height: 100px;
		float: left;
	}
	.Workbench{
		float: right;
		margin-right: 20px;
		line-height: 100px;
		font-size: 18px;
		color: #666;
		cursor: pointer;
	}
	.login{
		float: right;
		margin-right: 40px;
		height: 100px;
		display: flex;
		align-items:center;
		.my{
			margin-right: 20px;
			width: 30px;
			height: 30px;
		}
		p{
			margin-right: 20px;
			font-size: 16px;
		}
		.downarrow{
			margin-right: 20px;
			width: 13px;
			height: 7px;
		}
	}
	.operation{
		position: absolute;
		width: 150px;
		height: 40px;
		background-color: #9fcaf5;
		color: #fff;
		font-size: 14px;
		right: 240px;
		bottom: -10px;
		border-radius: 5px;
		box-shadow:0px 0px 2px rgba(38, 38, 38, 0.5);
		display: flex;
		align-items:center;
		z-index: 999;
		img{
			width: 18px;
			height: 18px;
			margin-left: 20px;
			margin-right: 10px;
		}
	}
}
</style>