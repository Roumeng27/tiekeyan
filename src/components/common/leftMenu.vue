<template>
  <div class="leftMenu">
    <div class="top">
      <p>{{titleWord}}</p>
	  </div>
    <div class="menu" >
      <div class="box" v-for="(val,index) in menu" :key="index" >
        <p class="title" @click="switchs(val,index)" :class="[{'subMenu': val.subMenu},{ 'Selection' : menuIndex  == index && subMenu && val.subMenu},{'Selections' : menuIndex  == index}]">
          <span v-if="menuIndex == index"></span>
          {{val.name}}
        </p>
        <ul v-if="subMenu && menuIndex == index" class="switch">
          <li v-for="(v,i) in val.subMenu" @click="subMenus(v.url,i)" :class="subMenuindex == i ? 'switchli' : ''" :key="i">{{v.name}}</li>
        </ul>
      </div>
    </div>
  </div>
    
</template>

<script>
export default {
  name: "leftMenu",
  data() {
    return {
			// titleWord:'',
      // 左侧一级标题打开index
      menuIndex:'0',
      // 二级标题开合
      subMenu:false,
      // 二级标题选中index
      subMenuindex:'0'
		};
	},
  props:['menu','titleWord'],
  created() {

	},
  methods: {
    switchs(val,i){
      if(val.url){
         this.$router.push({path:val.url})
      }
      if(i == this.menuIndex && this.subMenu){
        // console.log('关闭')
        
        this.subMenu = false
      }else if(i == this.menuIndex && !this.subMenu){
        // console.log('打开')
        
        this.subMenu = true
      }else{
        // console.log('切换')
        this.subMenuindex = 0;
        this.menuIndex = i;
        this.subMenu = true
      }
      
    },
    subMenus(url,i){
      this.subMenuindex = i;
      this.$router.push({path:url})
    }
  }
};
</script>

<style lang="scss" scoped>
.leftMenu{
  width: 202px;
  padding-left: 6px;
  box-sizing: border-box;
  background-color: #f7f7f7;
}
.top{
  padding-top: 16px;
  width: 197px;
  height: 62px;
  background-image: url('../../assets/img/components/bak.png');
  background-repeat: no-repeat;
  background-position: 0px 16px;
  p{
    height: 62px;
    line-height: 62px;
    background-image: url('../../assets/img/components/shenbao.png');
    background-repeat: no-repeat;
    background-position:  20px center;
    text-indent: 54px;
    color: #fff;
    font-size: 24px;
  }
}
.menu{
  width: 196px;
  background-color: #fff;
  font-size: 16px;
  .box{
    .title{
      text-indent: 30px;
      height: 60px;
      line-height: 60px;
      position: relative;
      background-repeat: no-repeat;
      background-position: 160px center;
      cursor: pointer;
      span{
        display: block;
        width: 3px;
        height: 60px;
        background-color: #3f82e1;
        position: absolute;
        left: 0px;
      }
    }
    .subMenu{
      
      background-image: url('../../assets/img/components/downarrow.png');
    }
    .Selection{
      background-image: url('../../assets/img/components/uparrow.png');
    }
    .Selections{

      background-color: #f5f5f5;
    }
    .switch{
      background-color: #f5f5f5;
      .switchli{
        color: #3f82e1
      }
    }
    ul>li{
      text-indent: 70px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
}

</style>