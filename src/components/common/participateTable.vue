<template>
  <div>
    <el-table :data="tableData" stripe size="mini" fit highlight-current-row>
      <el-table-column
        v-for="(th, key) in tableHeader"
        :key="key"
        :prop="th.prop"
        :label="th.label"
        :width="th.width"
        align="center"
        >
        <template slot-scope="scope">
          <span>{{ scope.row[th.prop] }}</span>
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column label="项目分工">
        <template slot-scope="scope">
          <el-input  :disabled='disableFlag' v-model="scope.row.delcareJob" @change="changeProData"></el-input>
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
            type="text"
            size="small"
          ><img src="../../assets/img/components/delete.png" alt=""></el-button>
        </template>
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableHeader", "tableData" ,"disabled","disableFlag"],
  created() {},
  data() {
    return {
        proDivision:'',
        proDivisionData:'',
    };
  },
  watch:{
      
  },
  methods: {
    changeProData(val){
        this.$emit('proDivisionList',val)
    },
    deleteRow(i, v) {
      if(!this.disabled){
      this.tableData.splice(i,1)
      this.$emit('data',this.tableData)
      }else{
        // console.log(1)
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>