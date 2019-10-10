<template>
  <div class="selectTree">
    <div class="box">
      <div class="select">
        <!-- <input type="text" @focus="showchoice()" @blur="showchoice()" style=" appearance: none;outline:medium;outline:none;caret-color: rgba(0, 0, 0, 0)" > -->
        <div class="cen" @click.self="showchoice()">
          <span v-for="(val,index) in choice" :key="index">
            <span class="el-tag el-tag--info el-tag--small" @click="cancel(val)">
              <span class="el-select__tags-text">{{val.name}}</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
          </span>
        </div>
        <div class="icon">
          <span class="el-input__suffix-inner" v-if="!show">
            <i class="el-select__caret input__icon el-icon-arrow-down"></i>
          </span>
          <span class="el-input__suffix-inner" v-if="show">
            <i class="el-select__caret input__icon el-icon-arrow-up is-reverse"></i>
          </span>
        </div>
      </div>
      <div v-if="show" class="tree">
        <div class="treebox" v-for="(val,index) in datatree" :key="index">
          <el-tree
            :data="val"
            node-key="index"
            :props="defaultProps"
            ref="tree2"
            :expand-on-click-node="false"
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
              @click.stop="choicenode(data,index)"
            >
              <span>{{ data.name }}</span>
              <span v-if="data.show">
                <el-button type="text" size="mini" @click.stop="append(data,index)">查看更多</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  companyTree, //公司树
  departmentTree, //部门树
  personnelByDepartment, //部门人员树
  personnelByCompany
} from "../../http/impl/projectDeclare.js";
import axios from "axios";
export default {
  name: "selectTree",
  data() {
    return {
      datatree: [],

      defaultProps: {
        children: "subList",
        label: "name"
      },
      show: false,
      choice: [],
      // 公司树
      getcompanyTreearr: [],
      // 部门树
      getdepartmentTreearr: [],
      // 人员树
      getpersonnelByDepartmentarr: []
    };
  },
  //从哪一级开始
  // startlevel
  //结束到那一级
  // endlevel
  //可选 第几级
  // choicelevel
  //公司code
  // companycode
  // 部门code
  // departmentcode
  // 默认参数
  // choicedatas
  // 可选数量
  // number
  // props: ["startlevel", "endlevel",'choicelevel'],
  props: {
    startlevel: {
      default: 1
    },
    endlevel: {
      default: 100
    },
    choicelevel: {
      default: ""
    },
    companycode: {},
    departmentcode: {},
    choicedatas: {},
    number: {}
  },
  watch: {
    choicedatas: function(val) {
      this.choice = val;
    }
  },
  computed: {},
  components: {},
  mounted() {
    if (this.choicedatas) {
      this.choice = this.choicedatas;
    }
  },

  methods: {
    // 递归循环遍历
    loop(val, state) {
      val.map((v, i) => {
        if (v.subList) {
          if (v.subList.length == 0) {
            v.show = state;
          } else {
            v.show = state;
            this.loop(v.subList, state);
          }
        }
      });
    },
    // 获取公司树
    async getcompanyTree(state) {
      let { data } = await companyTree();
      if (data) {
        // this.datatree.push(data);
        // this.datatree.map((v,i)=>{
        this.loop(data, state);
        this.datatree.push(data);
        // })
        // if (this.datatree.length < this.endlevel) {
        //   this.datatree.push(data);
        //   this.datatree.map((v,i)=>{
        //     this.loop(v,true)
        //   })

        // } else {
        //   this.datatree.push(data);
        //   this.datatree.map((v,i)=>{
        //     this.loop(v,false)
        //   })
        // }
      }
    },
    // 获取部门树
    async getdepartmentTree(code, state) {
      let { data } = await departmentTree({
        companyCode: code
      });
      if (data) {
        this.loop(data, state);
        this.datatree.push(data);
        // if (this.datatree.length < this.endlevel) {
        //   this.datatree.push(data);
        //   this.datatree.map((v,i)=>{
        //     this.loop(v,true)
        //   })
        //   console.log(this.datatree)
        // } else {
        //   this.datatree.push(data);
        //   this.datatree.map((v,i)=>{
        //     this.loop(v,false)
        //   })
        // }
      }
    },
    // 获取人员树
    async getpersonnelByDepartment(code, state) {
      let { data } = await personnelByDepartment({
        departmentCode: code
      });
      if (data) {
        data.map((v, i) => {
          v.code = v.account;
        });
        this.loop(data, state);
        this.datatree.push(data);
        // if (this.datatree.length < this.endlevel) {
        //   this.datatree.push(data);
        //   this.datatree.map((v,i)=>{
        //     this.loop(v,true)
        //   })
        // } else {
        //   this.datatree.push(data);
        //   this.datatree.map((v,i)=>{
        //     this.loop(v,false)
        //   })
        // }
      }
    },

    // 取消
    cancel(val) {
      var index = false;
      this.choice.map((v, i) => {
        if (v.code == val.code) {
          index = i;
        }
      });
      if (index === false) {
      } else {
        this.choice.splice(index, 1);
      }

      this.$emit("choicedata", this.choice);
    },
    test(v) {
      this.show = v;
    },
    //新打开
    append(data, i) {
      console.log(this.startlevel + i);
      if (this.startlevel + i == 1) {
        this.datatree.splice(i + 1);
        if (i + 1 == this.endlevel) {
          this.getdepartmentTree(data.code, false);
        } else {
          this.getdepartmentTree(data.code, true);
        }
      } else if (this.startlevel + i == 2) {
        this.datatree.splice(i + 1);
        if (i + 1 == this.endlevel) {
          this.getpersonnelByDepartment(data.code, false);
        } else {
          this.getpersonnelByDepartment(data.code, true);
        }
      } else if (this.startlevel + i == 3) {
      }
    },
    showchoice() {
      if (this.show) {
        this.datatree = [];
      } else {
        if (this.startlevel == 1) {
          if (this.endlevel == 0) {
            this.getcompanyTree(false);
          } else {
            this.getcompanyTree(true);
          }
        } else if (this.startlevel == 2) {
          if (this.endlevel == 0) {
            this.getdepartmentTree(this.companycode, false);
          } else {
            this.getdepartmentTree(this.companycode, true);
          }
        } else if (this.startlevel == 3) {
          if (this.endlevel == 0) {
            this.getpersonnelByDepartment(this.departmentcode, false);
          } else {
            this.getpersonnelByDepartment(this.departmentcode, true);
          }
        }
      }
      this.show = !this.show;
    },
    // 选择
    choicenode(val, i) {
      if (this.choicelevel != "") {
        if (i + 1 == this.choicelevel) {
          if (this.choice.length > 0) {
            var yes = false;
            this.choice.map((v, index) => {
              if (v.code == val.code) {
                yes = true;
              }
            });
            if (!yes) {
              var obj = {
                code: val.code,
                name: val.name
              };
              if (this.number != "") {
                if (this.choice.length >= this.number) {
                  console.log(1);
                } else {
                  this.choice.push(obj);
                }
              }
            }
          } else {
            var obj = {
              code: val.code,
              name: val.name
            };
            if (this.choice.length >= this.number) {
              console.log(1);
            } else {
              this.choice.push(obj);
            }
          }
        }
      } else {
        if (this.choice.length > 0) {
          var yes = false;
          this.choice.map((v, index) => {
            if (v.code == val.code) {
              yes = true;
            }
          });
          if (!yes) {
            var obj = {
              code: val.code,
              name: val.name
            };
            if (this.choice.length >= this.number) {
              console.log(1);
            } else {
              this.choice.push(obj);
            }
          }
        } else {
          var obj = {
            code: val.code,
            name: val.name
          };
          if (this.choice.length >= this.number) {
            console.log(1);
          } else {
            this.choice.push(obj);
          }
        }
      }
      this.$emit("choicedata", this.choice);
    }
  }
};
</script>

<style lang="scss" scoped>
.selectTree {
  .box {
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
    .tree {
      position: absolute;
      // bottom: -340px;
      float: left;
      max-width: 800px;
      z-index: 9999;
      .treebox {
        overflow-x: auto;
        background-color: #fff;
        width: 300px;
        height: 100px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 10px;
      }
      .treebox:nth-child(1) {
        width: 500px;
      }
    }
    .select {
      display: flex;
      .cen {
        width: 90%;
        padding: 5px;
        span {
          margin: 0 5px;
        }
      }
      .icon {
        width: 10%;
      }
    }
  }
}
.input__icon{
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all .3s;
  transition: all .3s;
  line-height: 30px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>