<template>
  <!-- 任务 -->
  <div class="tableTree">
    <el-table
      :data="tableData"
      stripe
      size="mini"
      fit
      highlight-current-row
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      row-key="id"
      border
      :tree-props="treeProps"
    >
      <!-- <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>-->
      <el-table-column
        v-for="(th, key) in tableHeader"
        :key="key"
        :prop="th.prop"
        :label="th.label"
        :fixed="th.fixed"
        :min-width="th.minWidth"
        align="center"
      >
        <!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的， 数据不是动态获取的，不过我这里操作一栏的名字定死了（oper表示是操作这一列，否则就不是） -->
        <template slot-scope="scope">
          <!-- <div> -->
            <span v-if="th.icon" class="handleIcon">
              <el-popover placement="top-start" @show="test(scope.row)" width="262" trigger="click">
                <div class="handelBox">
                  <dl
                    v-for="(o, index) in oper"
                    :key="index"
                    :index="index"
                    :class="activeClass == index ? 'active':''"
                    @click="addClassFun(index,o,scope.row)"
                  >
                    <dt>
                      <p style="width:20px;height:20px" :class="o.icon"></p>
                    </dt>
                    <dd>{{o.name}}</dd>
                  </dl>
                </div>
                <i :class="th.icon" slot="reference"></i>
              </el-popover>
            </span>
            <span v-else>{{ scope.row[th.prop] }}</span>
          <!-- </div> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import '../../assets/css/font.css'
export default {
  name: "tableTree",

  data() {
    return {
      
      oper: [],
      
      activeClass: ""
    };
  },
  // operation 操作
  // tableData表格数据
  // tableHeader表头
  // oper操作
  // treeProps 树形结构取值
  props:['operation','tableData','tableHeader','treeProps'],
  mounted: function() {
    this.oper = this.operation;

  },
  methods: {
    test() {},
    addClassFun(index, o, row) {
      this.activeClass = index;
      // 判断是否有path路径 如果有则跳转页面  如果没有把name值传到所需的页面
      if (!o.path) {
        this.$emit("getStateName", o.name, row);
      } else {
        this.$router.push({
          path: o.path
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tableBox {
  padding: 0 10px;
  display: flex;
}
.handleIcon {
  cursor: pointer;
  font-size: 20px;
}
.handleIcon:hover {
  color: #3f82e1;
}
.handelBox {
  background: #9fcaf5;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  dl {
    width: 50%;
    display: flex;
    // justify-content: center;
    align-items: center;
    padding-top: 10px;
    color: #fff;
    cursor: pointer;
    padding-left: 20px;
    dt {
      font-size: 18px;
      padding-right: 16px;
    }
    dd {
      font-size: 14px;
    }
  }
  .active {
    color: #3f82e1;
    cursor: pointer;
  }
}
</style>