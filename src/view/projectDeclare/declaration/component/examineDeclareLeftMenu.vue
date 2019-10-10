<template>
  <div class="list">
    <p active-class="choice" v-for="(val,index) in list" @click="to(val.url,index)"  :key="index" :class="choice == index? 'choice' : ''">{{val.name}}</p>
  </div>
</template>

<script>
export default {
  name: "examineDeclareLeftMenu",
  data() {
    return {
			list:[
        {
          name:'基本信息',
          url:'/formalDeclaration/examineDeclaration/projectInformation'
        },
        {
          name:'单位信息',
          url:'/formalDeclaration/examineDeclaration/projectInformation/companyInformation'
        },
        {
          name:'项目成员',
          url:'/formalDeclaration/examineDeclaration/projectInformation/teamMembers'
        },
        {
          name:'课题分解',
          url:'/formalDeclaration/examineDeclaration/projectInformation/subjectResolve'
        }
      ],
      choice:'0',
      query:''
		};
  },
  props:['index'],
  created() {
    this.choice = this.index,
    this.query = this.$route.query
	},
  methods: {
   to(url,i){ 
    //  console.log(i)
    //  this.choice = i;
     this.$router.push({
       path:url,
       query:this.query
     })
   }
  }
};
</script>

<style lang="scss" scoped>
.list{
  width: 162px;
  height: 100%;
   border-right: 1px solid #ccc;
  p{
    width: 162px;
    padding: 20px 0px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
  .choice{
    color: #3f82e1;
    background-image: url('../../../../assets/img/components/choice.png');
    background-repeat: no-repeat;
    background-position: 20px center;
  }
}
</style>