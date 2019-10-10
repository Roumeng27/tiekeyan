<template>
    <div>
    	<button ref="btn" :disabled="isForBidden" @click='ExportData' class="exportBtn">导出</button>
    </div>
</template>
<script>
export default {
  //   tHeaderFather: [], //导出数据的header
  //   ExportListsFather: [] //导出数据的all
  //   filterArrayLists: [], //导出数据的过滤条件
  //   ExportFileName:"",    //导出的文件的名字
//   isForBidden: boolean,    //是否禁止导出按钮
  props: ["tHeaderFather", "ExportListsFather", "filterArrayLists","ExportFileName","isForBidden"],
  data() {
    return {
      //模板勿删
      list: [
        // {
        //   author: "Carol",
        //   comment_disabled: true,
        //   content_short: "我是测试数据",
        //   display_time: "1974-06-19 10:01:57",
        //   forecast: 71.85,
        //   id: 1,
        //   importance: 2,
        //   pageviews: 1670,
        //   reviewer: "Ruth",
        //   status: "deleted",
        //   timestamp: 1126391703464,
        //   title: "哦i啥v就开始对方能看出来市场v恐龙世界",
        //   type: "JP"
        // }
      ],
      listLoading: true,
      downloadLoading: false,
      filename: "",
      autoWidth: true
    };
  },
  methods: {
    ExportData(){
      console.log(this.ExportListsFather,"导出数据");
      import("@/excel/Export2Excel").then(excel => {
        // const tHeader = ["Id", "Title", "Author", "Readings", "Date"];    表格的表头
        // const filterVal = [
        //   "id",
        //   "title",
        //   "author",
        //   "pageviews",
        //   "display_time"
        // ]; //表格中数据与表头字段相匹配的字段
        const tHeader = this.tHeaderFather;
        const filterVal = this.filterArrayLists;
        console.log(filterVal,'导出数据的过滤条件')
        const list = this.ExportListsFather; //导出数据的all
        console.log(list,' 全部')
        const data = this.formatJson(filterVal, list);
        console.log(data,'该打印的数据')
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.ExportFileName,
          autoWidth: this.autoWidth,
        });
        // this.downloadLoading = false;
      });
    },
    //对数据与表头字段进行匹配
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.exportBtn{
  width: 88px;
  height: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #3f82e1;
  color: #fff;
  margin-top: 21px;
  margin-right: 20px;
  border: none;
  float: right;
  border-radius: 3px;
}
</style>