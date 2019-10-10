<template>
  <div class="headTab">
    <div class="tab">
      <div class="tabname" v-for="(val,i) in tab" :key="i">
        <router-link :to="val.url" tag="p" class="show" v-if="index == i">
          {{val.name}}
          <span class="triangle"></span>
        </router-link>
        <router-link :to="val.url" tag="p" class="p" v-else>{{val.name}}</router-link>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  name: "headTab",
  data() {
    return {
			tab:[
        {
          name:'首页',
          url:'/'
        },
        {
          name:'项目申报',
          url:'/preDeclare/declareTheme'
        },
        {
          name:'项目管理',
          url:'/projectManage/projectManagement'

        },
        {
          name:'项目归档',
          url:'/projectTotal/projectPigeonhole'
        },
        {
          name:'成果报告',
          url:'/resultInfo/resultsReport'
        },
        {
          name:'知识管理',
          url:'/knowledgeInfo/knowledgeManagement'
        },
        {
          name:'科研资源',
          url:'/scientificInfo/scientificResource'
        }
      ],
      
		};
	},
  props:['index'],
  created() {

	},
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.headTab{
  width: 100%;
  height: 60px;
  background-color: #3f82e1;
  box-shadow:0px 2px 2px rgba(38, 38, 38, 0.5);
  position: relative;
  z-index: 10;
}
.tab{
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content:center;
  .tabname{
    width: 150px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    .show{
      width: 150px;
      height: 56px;
      margin-top: 4px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #fff;
      color: #3f82e1;
      position: relative;
      font-weight: 500;
      line-height: 56px;
      .triangle{
        position: absolute;
        bottom: 0px;
        left: calc(50% - 6px);
        display: block;
        width: 0; 
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: transparent #0099CC transparent transparent;
        transform: rotate(90deg); /*顺时针旋转90°*/
      }
    }
    .p{
      color: #c1d3f3;
      line-height: 60px;
    }
  }
    
   
}
</style>
