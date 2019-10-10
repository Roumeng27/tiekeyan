<template>
  <div class="test">
    <div style="width:300px;">
      <!-- <selectTree @choicedata="choice" :startlevel="1"  :endlevel="2" ></selectTree> -->
    </div>
    <div>
      <!-- <div class="box"> -->
      <!-- <div class="tree">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">查看更多</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">关闭</el-button>
              </span>
            </span>
          </el-tree>
      </div>-->
      <!-- <div class="select">
          <div></div>
          <div></div>
        </div>
        <div class="el-select" @click="show = !show">
          <div class="el-select__tags" style="width: 100%;">
            <span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">双皮奶</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">蚵仔煎</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
              <span class="el-tag el-tag--info el-tag--small">
                <span class="el-select__tags-text">北京烤鸭</span>
                <i class="el-tag__close el-icon-close"></i>
              </span>
            </span>
          </div>
          <div class="el-input el-input--suffix">
            <input
              type="text"
              readonly="readonly"
              autocomplete="off"
              placeholder
              class="el-input__inner"
              style="height: 62px;"/>
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner">
                <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
              </span>
              <span class="el-input__suffix-inner">
                <i class="el-select__caret el-input__icon el-icon-arrow-up is-reverse"></i>
              </span>
            </span>
          </div>
        </div>
      <div v-if="show">
        <div class="tree" v-for="(val,index) in datatree" :key="index">
          <el-tree
            :data="val"
            node-key="id"
            :props="defaultProps"
            ref="tree2"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            @node-click="Choice"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click.stop="append(data,index)">查看更多</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">关闭</el-button>
              </span>
            </span>
          </el-tree>
        </div>
        </div>
      </div>-->
      <!-- <el-select
            v-model="value6"
            :multiple="multiple"
            filterable
            :placeholder="placeholder"
            :disabled="disabled"
            :collapse-tags="multiple"
            @remove-tag="handleTagChange"
            @visible-change="handleOptionHidden"
            class="hi-input">
            <el-option 
                class="hidden">
            </el-option>
            el-tree绑定的数组中children里的key值不能是0
            <el-tree
                ref="tree"
                :data="data"
                node-key="key"
                show-checkbox
                :default-checked-keys="selectedData"
                @check="handleCheckChange"
                :props="defaultProps">
            </el-tree>
      </el-select>-->
      <!-- <headLogo></headLogo>
      <headTab
        index='1'
      ></headTab>
      <datePicker width='100px' 
      @date="getdate"></datePicker>-->
      <!-- <Popup v-if="show" type="pass" @cancel="cancel"></Popup> -->
      <!-- <div class="content">
        <leftMenu></leftMenu>
      </div>
      <topTitle Title='32456'></topTitle>
      <inputs class="inputs" width='180px' v-model="aaa" height='30px' ></inputs>
      <inputs class="inputs" width='180px' v-model="aaa" height='30px' disableds='true' ></inputs>
      <button @click="test()">点击</button>-->
      <!-- <TableCommon :tableData="tableData" :tableHeader="tableHeader" :loading="loading" :rowDblclick="rowDblclick"></TableCommon>
      <DialogCommon  @tests="aaa" @unselect="unselect" @confirm="confirm" ></DialogCommon>-->
    </div>
    <!-- <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>-->
    <!-- <datePicker :newdate='times' type="datetime" :mindate="mindate" :maxdate="maxdate" v-model="time"></datePicker> -->
    <!-- <button @click="add()">导出</button> -->
    <!-- <datePicker :mindate="minsdate" :maxdate="maxsdate" v-model="times"></datePicker> -->
    <!-- <lift index='3'></lift> -->
    <!-- <tabs tabIndex='3'></tabs> -->
    <!-- <unit></unit> -->
    <!-- <tables :tableHeader='Header' :tableData="tableData"></tables> -->
    <!-- <button @click="addtable()">新增</button> -->
    <!-- <task></task> -->




    <!-- <el-upload
      class="upload-demo"
      action="/file/fileUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success='successss'
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
    <a href="javascript:POBrowser.openWindowModeless('http://192.168.1.247:9080/component/pageoffice/openTemp?id=502','width=1200px;height=800px;')">最简单的打开</a>
  </div>
</template>

<script>
import {
  addtopic,
  test,
  getTopicListPagetopic,
  companyTree,
  getInfolistopic
} from "../http/impl/projectDeclare";
import axios from "axios";
import { mapGetters } from "vuex";
// import vuex from 'vuex';
import store from "../store/index.js";
import selectTree from "common/selectTree";
// import DialogCommon from 'common/DialogCommon.vue'
// import TableCommon from 'common/TableCommon.vue'
// import headLogo from  'common/headLogo'
// import headTab from  'common/headTab'
// import leftMenu from  'common/leftMenu'
// import topTitle from  'common/topTitle'
// import input from  'common/input'
// import Popup from  'common/Popup'
import datePicker from "common/datePicker";
import { setTimeout } from 'timers';
import lift from './projectDeclare/declaration/component/createDeclareLeftMenu'
import tabs from './projectDeclare/declaration/component/createDeclareIndex'
import unit from './projectDeclare/declaration/unitInformation'
import tables from '../components/common/declareTable'
import task from './projectDeclare/declaration/task'
export default {
  name: "test",
  data() {
    return {

       fileList: [],
      options: [
        {
          value: "1",
          label: "黄金糕"
        },
        {
          value: "2",
          label: "双皮奶"
        },
        {
          value: "3",
          label: "蚵仔煎"
        },
        {
          value: "4",
          label: "龙须面"
        },
        {
          value: "5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      datatree: [
        [
          {
            id: 1,
            label: "一级 1",
            children: [
              {
                id: 4,
                label: "二级 1-1",
                children: [
                  {
                    id: 9,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 10,
                    label: "三级 1-1-2"
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: "一级 2",
            children: [
              {
                id: 5,
                label: "二级 2-1"
              },
              {
                id: 6,
                label: "二级 2-2"
              }
            ]
          },
          {
            id: 3,
            label: "一级 3",
            children: [
              {
                id: 7,
                label: "二级 3-1"
              },
              {
                id: 8,
                label: "二级 3-2"
              }
            ]
          }
        ],
        [
          {
            id: 1,
            label: "一级 1",
            children: [
              {
                id: 4,
                label: "二级 1-1",
                children: [
                  {
                    id: 9,
                    label: "三级 1-1-1"
                  },
                  {
                    id: 10,
                    label: "三级 1-1-2"
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: "一级 2",
            children: [
              {
                id: 5,
                label: "二级 2-1"
              },
              {
                id: 6,
                label: "二级 2-2"
              }
            ]
          },
          {
            id: 3,
            label: "一级 3",
            children: [
              {
                id: 7,
                label: "二级 3-1"
              },
              {
                id: 8,
                label: "二级 3-2"
              }
            ]
          }
        ]
      ],
      value5: ["1", "2", "3", "4", "5"],

      filterText: "",
      defaultProps: {
        children: "subList",
        label: "name"
      },
      show: false,
      choices: [],
      mindate:'2019-08-13',
      minsdate:'',
      maxsdate:'',
      maxdate:'2019-10-01',
      time:'',
      times:'',


      // Header:[
      //   {
      //     label: "申报名称",
      //     prop: "name",
      //     width: "242px"
      //   },
      //   {
      //     label: "申报状态",
      //     prop: "date",
      //     width: "102px"
      //   },
      //   {
      //     label: "申批状态",
      //     prop: "address",
      //     width: "118px"
      //   },
      //   {
      //     label: "建议人",
      //     prop: "name",
      //     width: "112px"
      //   },
      //   {
      //     label: "建议单位",
      //     prop: "date",
      //     width: "216px"
      //   },
      // ],
      // tableData: [
      //   {
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   }, {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   }, {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   }, {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }
      // ],
      tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
          }]
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
    };
  },
  watch: {
    time:function(val){
      console.log(val)
      this.minsdate = val
    }
  },
  computed: {},
  components: {
    selectTree,
    datePicker,
    lift,
    tabs,
    unit,
    tables,
    task
  },
  mounted() {
    setTimeout(function(){
      this.times = '2019-10-01'
      console.log(this.times)
    },2000)
    // getInfolistopic({
    //   topicId:'143',
    //   statuss:["DRAFT", "FINISH"]
    // }).then(res=>{
    //   console.log(res)
    // })
    // companyTree().then(res=>{
    //   this.datatree=[]
    //   this.datatree.push(res.data)
    //   console.log(this.datatree)
    // })
  },

  methods: {
    successss(response, file, fileList){
      console.log(response, file, fileList)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    addtable(){
      var obj = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      this.tableData.push(obj)
    },
    exportSupplierCommission({ commit }, request) {
      axios.post("/backapi/v1/commission/exportCommission", JSON.stringify(request), { responseType: 'blob' }).then((res) => {
          let header = res.headers;
          let fileName = header["content-disposition"].split(";")[1].split("=")[1];
          let url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/octet-stream' }))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
      }
      );

    },
    add(){
      // axios.post('project/preDeclare/excelList?topicId=221',{headers: {'Content-Type': 'application/vnd.ms-excel;charset=UTF-8'}}).then(res=>{
      //   console.log(res)
      // })
      axios({
        method:'get',
        url:'project/preDeclare/excelList?topicId=221',
        responseType:'blob',
      }).then(res=>{
        
        let header = res.headers;
        let fileName = header["content-disposition"].split(";")[1].split("=")[1];
        let url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/octet-stream' }))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', decodeURI(fileName))
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link); 
      })
    },
    choice(val) {
      this.choices = val;
      console.log(this.choices);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    test(v) {
      this.show = v;
    },
    append(data, i) {
      console.log(data, i);

      if (i == 0) {
        this.datatree.splice(i + 1);
        axios
          .get("/user/organizationTree/departmentTree?companyCode=" + data.code)
          .then(res => {
            console.log(res);
            this.datatree.push(res.data.data);
          });
      } else if (i == 1) {
        this.datatree.splice(i + 1);
        axios
          .get(
            "/user/organizationTree/personnelByDepartment?departmentCode=" +
              data.code
          )
          .then(res => {
            console.log(res);
            this.datatree.push(res.data.data);
          });
      }
      // }
      // const newChild = { id: id++, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },

    remove(node, data) {
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },
    // Choice(v, i, n) {
    //   console.log(v)

    // },
    renderContent(h, { node, data, store }) {
      // return (
      //   <span class="custom-tree-node">
      //     <span>{node.label}</span>
      //     <span>
      //       <el-button
      //         size="mini"
      //         type="text"
      //         on-click={() => this.append(data)}
      //       >
      //         Append
      //       </el-button>
      //       <el-button
      //         size="mini"
      //         type="text"
      //         on-click={() => this.remove(node, data)}
      //       >
      //         Delete
      //       </el-button>
      //     </span>
      //   </span>
      // );
    },
    changecurrent(val, v) {
      console.log(val, v);
      console.log(this.arr);
    }
  }
};
</script>

<style lang="scss" scoped>
.tree {
  width: 500px;
  height: 200px;
  float: left;
  // background-color: red;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: auto;
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