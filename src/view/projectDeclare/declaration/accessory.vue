<template>
  <div class="accessory" v-if="show">
    <div class="btn">
      <fileupload class="fileupload" :file="filelist" @success="filesuccess"></fileupload>
    </div>
    <div class="changeBtn">
      <button class="ret" @click="closeAddDialog">取消</button>
      <button class="hold" @click="sureAddDialog">确定</button>
    </div>
  </div>
</template>

<script>
import fileupload from "../../../components/common/fileupload";
import { declareAddDeclareAttachment,declareSelectListDeclareAttachment } from "http/formalDeclaration";
export default {
  name: "accessory",
  components: {},
  data() {
    return {
      show:false,
      //附件列表
      filelist: [],
      //申报id
      id: ""
    };
  },
  components: {
    fileupload
  },
  mounted() {
    if (window.sessionStorage.stateStr == "新增") {
      //   if (window.sessionStorage.jump == "ok") {
      //     console.log("有");
      //     this.declareId = this.$route.query.declareId;
      //   } else {
      //     console.log("没有");
      //     this.$message({
      //       message: "请先填写基本信息",
      //       type: "error"
      //     });
      //     this.$router.push({
      //       path: "/formalDeclaration/createDeclaration/projectInformation",
      //       query: this.$route.query
      //     });
      //     return;
      //   }
      this.id = this.$route.query.declareId;
    } else {
      this.id = this.$route.query.id;
    }
    this.getaccessory()
  },
  methods: {
    getaccessory(){
      declareSelectListDeclareAttachment({
        id:this.id
      }).then((res=>{
        if(res.result == 'SUCCESS' && res.data.list){
          this.filelist = res.data.list;
          if(this.filelist.length>0){
            this.filelist.map((v,i)=>{
              v.name = v.attachmentName
              v.response = {}
              v.response.data = v.filePath
            })
          }
          this.show = true
        }else{
          this.show = true
        }
      }))
    },
    // 附件上传成功
    filesuccess(val) {
      this.filelist = [];
      val.map((v, i) => {
        var obj = {
          attachmentName: v.name,
          filePath: v.response.data
        };
        this.filelist.push(obj);
      });
    },
    closeAddDialog() {},
    sureAddDialog() {
      console.log( this.filelist)
      declareAddDeclareAttachment({
        id: this.id,
        declareAttachmentList:this.filelist
      }).then((res=>{
        if(res.result == 'SUCCESS'){
          this.$message({
            message: "保存成功",
            type: "success"
          });
        }
      }))
    }
  }
};
</script>

<style lang="scss" scoped>
.accessory {
  width: 980px;
  margin: 0px 10px;
  background-color: #fff;
  // height: 1000px;
  .btn {
    width: 940px;
    margin: 0px 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
.changeBtn {
  margin: 0px 10px;
  padding-top: 40px;
  height: 46px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  button {
    width: 100px;
    height: 46px;
    border: none;
    border-radius: 3px;
  }
  .ret {
    background-color: #fff;
    color: #3f82e1;
    border: 1px solid #3f82e1;
    margin-right: 59px;
  }
  .hold {
    background-color: #3f82e1;
    color: #fff;
  }
}
</style>