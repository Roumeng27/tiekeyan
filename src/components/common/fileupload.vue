<template>
  <div class="fileupload">
    <div>
    <el-upload
      class="upload-demo"
      action="/file/fileUpload"
      
      :on-success="success"
      :on-error="error"
      :show-file-list='false'
      :data="data"
      :disabled="disabled"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
    
      <el-button size="small" type="primary" v-if="!disabled">点击上传</el-button>
      <el-button size="small" type="primary" v-if="disabled" disabled>点击上传</el-button>
    </el-upload>
    </div>
    
    <ul class="fileList" v-if="fileList.length>0">
      <li v-for="(v,i) in fileList" :key="i">{{v.name}}<span @click="beforeRemove(v,i)">删除</span><span @click="download(v)">下载</span></li>
    </ul>
    
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "test",
  data() {
    return {
      show:false,
      doUpload: "/file/fileUpload",
      fileList: [
        
      ],
      test: {
        "Content-Type": "multipart/form-data"
      },
      // data: {
      //   oldFilePath: "L3Vzci9sb2NhbC9yYWlscy9maWxlLw"
      // }
    };
  },
  watch: {},
  computed: {},
  components: {},
  mounted() {
    console.log(this.file)
    if(this.file){
      this.fileList = this.file
    }
  },
  props:['data','file','disabled'],
  methods: {
    //下载
    download(v){
      
      axios.post('/file/downLoad',{
        attachmentName: v.name,
        filePath: v.response.data
      },{
        responseType:'blob'
      }).then(res=>{
        console.log(navigator.userAgent)
        // var filename;
        // if (navigator.userAgent.toUpperCase().indexOf("MSIE") > 0) {  
        //     filename = URLEncoder.encode(filename, "UTF-8");  
        // } else {  
        //     filename = new String(filename.getBytes("UTF-8"), "ISO8859-1");  
        // }
        let header = res.headers;
        let url = window.URL.createObjectURL(new Blob([res.data]))
        let fileName = header["content-disposition"].split(";")[1].split("=")[1];
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download',fileName)
        document.body.appendChild(link)
        link.click()
      })
    },
    success(response, file, fileList) {
      // console.log(response, file, fileList);
      this.fileList.push(file)
      this.$emit('success',this.fileList)
      this.show = true
      console.log(this.fileList)
    },
    error() {
      console.log("失败", this.fileList);
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, index) {
      this.fileList.splice(index,1)
      // console.log(this.fileList)
      this.$emit('success',fileList)
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {

    },
    // 删除文件之前的钩子
    beforeRemove(file,index) {
      this.$confirm(`确定移除 ${file.name}？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleRemove(file,index)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fileupload{
  width: 100%
}
.fileList{
  width: 100%;
  height: 30px;
  li{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-indent: 10px
    
  }
  span{
    float: right;
    margin-right: 10px;
    // display: none
  }
}
.fileList li:hover{
  background-color: rgb(244, 247, 250);
  color: rgb(0, 160, 255);
  span{
    // display: block;
  }
}

</style>