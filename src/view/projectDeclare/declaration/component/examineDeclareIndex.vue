<template>
  <div class="createDeclareIndex">
    <topTitle Title='查看申报'></topTitle>
    <div class="tab">
      <ul>
        <!-- <li v-for="(val,index) in list" :key="index" :class="index == show ? 'show' : ''" @click="to(index,val.url)">{{val.name}}</li> -->
      <router-link v-for="(val,index) in list" tag="li" :key="index" :to="{path:val.url,query:query}" active-class="show">{{val.name}}</router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import topTitle from "../../../../components/common/topTitle";

export default {
  name: "examineDeclareIndex",
  data() {
    return {
      show:'0',
      list:[
        {
          name:'项目信息',
          url:'/formalDeclaration/examineDeclaration/projectInformation'
        },
        {
          name:'文档',
          url:'/formalDeclaration/createDeclaration/document'
        },
        {
          name:'附件',
          url:'/test'
        },
        {
          name:'任务',
          url:'/formalDeclaration/createDeclaration/task'
        },
      ],
      query:''
		};
  },
  components: {
    topTitle: topTitle
  },
  created() {
    console.log(this)
    this.query = this.$route.query
	},
  methods: {
   
    to(i,url){
    
      this.show = i;
      this.$router.push({
       path:url
     })
    }
  }
};
</script>

<style lang="scss" scoped>
.createDeclareIndex{
  width: 1000px;
  // padding: 0 10px;
  background-color: #f5f5f5;
  position: relative;
}
.tab{
  width: 980px;
  margin: 0px 10px;
  height: 60px;
  background-color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid #f5f5f5;
  ul{
    display: flex;
    line-height: 60px;
    li{
      height: 60px;
      width: 114px;
      text-align: center;
      font-size: 16px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .show{
      color: #3f82e1;
      border-bottom: 4px solid #3f82e1;
    }
    li:nth-child(1){
      margin-left: 20px;
    }
  }
}
</style>