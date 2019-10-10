<template>
  <div class="tableBox">
    <el-table
      :data="tableData"
      stripe
      size="mini"
      fit
      highlight-current-row
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
       @selection-change="handleSelectionChange"
    >
	<!-- 多选框 -->
    <el-table-column
        type="selection"
        width="55"
        v-if="selectionFlag"
    >
    </el-table-column>
	<!-- 序号 -->
	<el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
        v-if="indexFlag"
	>
		<template slot-scope="scope">
			<span>{{(page - 1) * pageSize + scope.$index + 1}}</span>
		</template>
	</el-table-column>
	<!-- 单选框 -->
	<el-table-column align="center" width="55" label="" v-if="radioFlag">
		<template slot-scope="scope">
			<el-radio v-model="radio" :label="scope.row.id" @change.native="getTemplatePick(scope.row)">&nbsp;</el-radio>
		</template>
	</el-table-column>
      <!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper: 是否有操作列
      oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 -->
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
          <div  >
            <span v-if="th.icon" class="handleIcon" >
              <el-popover placement="top-start"  @show='test(scope.row)' width="262" trigger="click">
                <div class="handelBox" v-if="show">
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
                <!-- <img style= src="../../assets/img/icon/操作按钮选中.png" alt=""> -->
              </el-popover>
            </span>
            <span v-else>{{ scope.row[th.prop] }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import '../../assets/css/font.css'
import {mapGetters} from 'vuex';
export default {
    data() {
      return {
        oper: [] ,
        activeClass: -1,
        radio:'',
        show:false
      }
    },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableHeader: {
      type: Array,
      default: function() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 控制多选框是否展示
    selectionFlag: {
        type: Boolean,
        default: false
    },
    // 控制序号是否展示
    indexFlag: {
        type: Boolean,
        default: false
    },
    // 控制单选是否展示
    radioFlag:{
      type: Boolean,
          default: false
    },
    operation:{
      // type: Object,
      default: function() {
        return [];
      }
	  },
    // 每页条数
    pageSize:{
      type: Number,
      default:10
    },
    // 第几页
    page:{
      type: Number,
      default:1
    }
  },
  computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
  },
  
  methods: {
    getJurisdiction(val){
      console.log(val)
      this.oper = val;
      this.show = true
    },
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
    },
    test(row) {
      // 申报主题
      if(this.operation.more){
        // 根据登录人信息
        if(row.departmentCode==this.loginInforma.departmentCode && row.companyCode == this.loginInforma.companyCode){
          // this.oper = this.operation.data1
            if(row.status == 'RELEASE'){
              // 发布
              this.oper =this.operation.data3
            }else if(row.status == 'DRAFT'){
              // 草稿
              this.oper =this.operation.data4
            }else if(row.status == 'CLOSE'){
              // 关闭
              
              this.oper =this.operation.data5
            }
        }else{
          this.oper =this.operation.data2
        }
        this.show = true
        // 状态
      }else if(this.operation.state){
        this.operation.statearr.map((v,i)=>{
          if(v.state == row.status){
            this.oper =this.operation.statearr[i].data
          }
        })
        this.show = true
        // 状态
      }else if(this.operation.approvalStatus){
        this.operation.statearr.map((v,i)=>{
          if(v.state == row.approvalStatus){
            this.oper =this.operation.statearr[i].data
          }
        })
        this.show = true
      }else if(this.operation.jurisdiction){
        this.$emit("getJurisdiction", row);
      }else{
        this.oper = this.operation;
        this.show = true
      }
      
	}, 
	// 多选框
	handleSelectionChange(val){
		this.$emit("handleSelectionChange", val);
	},
	// 单选框
	getTemplatePick(row){
		this.$emit("getTemplatePick", row);
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