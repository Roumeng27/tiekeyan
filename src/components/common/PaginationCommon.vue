<template>
    <div class="pagination">
      <div class="left">
        <div>
          <p>第1到{{strip}}条</p>
          <!-- <el-input v-model="strip" size="small"></el-input> -->
          <div class="select">
            <el-select v-model="strip" size="small" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </div>
          
          <p>条记录每页</p>
        </div>
        <p>共{{total}}条记录</p>
      </div>
      <div class="right">
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange"  :current-page="currentPage" :page-size='pageSize' :total="total"></el-pagination>
        <p>共{{pages}}页</p>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 1
    },
    pages:{
      type: Number,
    },
    currentPage:{
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      strip:10,
      options: [{
          label: 10
        }, {
          label: 20
        }, {
          label: 50
        }],
		  value: ''
    };
  },
  watch:{
    'strip':function(val){
      this.$emit('modifypageSize',val)
    }
  },
  methods: {
    // // 每页查看条数变化
    // handleSizeChange(val) {
    //   console.log(val)
    //   this.page.page_limit = val;
    //   this.$emit("pageChange", this.page);
    // },
    // 当前页码变化
    handleCurrentChange(val) {
      this.$emit('handleCurrentChangeSub',val) 
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  width: 980px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666666;
  margin-top: 62px;
  padding: 0 10px;
  .left {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
    }
    .select {
      width: 70px;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
  p {
    padding: 0 10px;
    font-size: 14px;
    color: #666;
  }
}
</style>