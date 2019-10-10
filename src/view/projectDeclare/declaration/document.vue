<template>
  <!-- 文档 -->
  <div class="pageWarpper">
    <div class="wrapperMain">
      <div class="content">
        <div class="leftMenu">
          <documentLeftMenu v-if="LeftMenu" @clickData='clickData' :documentData='documentData' :defaultProps='defaultProps'></documentLeftMenu>
        </div>
        <div class="section">
          <div class="sectionItem">
            <div class="documentTitle">
              <button class="fadeInBtn" @click="documentPreview()">文档总览</button>
              <button class="fadeInBtn" @click="documentEdit()" v-if="allJurisdiction">文档编辑</button>
            </div>
            <div class="documentMain">
              <ul>
                <li>
                  <h1>{{name}}</h1>
                  <p v-if="state == 'LOCK'">
                    <span>锁定人: {{lockName}}</span>
                    <span>锁定时间: {{lockDatetime}}</span>
                  </p>
                </li>
              </ul>
              <div class="mainBtn">
                <button class="fadeInBtn" @click="seeChapter()" v-if="See">查看章节</button>
                <button class="fadeInBtn" @click="editChapter()" v-if="edit && state == 'LOCK' && lockaccount==account">编辑章节</button>
                <button v-if="state == 'LOCK' && operation && lockaccount == account" class="fadeInBtn" @click="Unlock()">解锁</button>
                <button v-if="state == 'UNLOCK' && operation " class="fadeInBtn" @click="lockUp()">上锁</button>
              </div>
            </div>
          </div>
          <div class="setionArea">
            <div class="lookTitle">
              <p>查看评论</p>
            </div>
            <ul v-if="publishshow">
              <li v-for="(val,index) in  publishlist" :key="index">
                <p>{{val.account}} {{val.commentDatetime}}</p>
                <inputs class="inputs" width="744px" v-model="val.comments" height="40px" disableds="true"></inputs>
              </li>
              <!-- <li>
                <p>赵亮 2019-09-01 12:23:23</p>
                <inputs class="inputs" width="744px" height="40px" disableds="true"></inputs>
              </li>
              <li>
                <p>赵亮 2019-09-01 12:23:23</p>
                <inputs class="inputs" width="744px" height="40px" disableds="true"></inputs>
              </li> -->
            </ul>
          </div>
          <div class="setionLast">
            <div class="lookTitle">
              <p>评论内容</p>
              <button class="fadeInBtn" @click="publish()">发表</button>
            </div>
            <div class="lookMain">
              <el-input type="textarea" v-model="publishcontent"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {chapterCommentFindChapterCommentByChapterId,chapterCommentInsertComment,permissionQueryPermisson,pageofficeGetChapterJson,pageofficeLockChapter,pageofficeUnlockChapter,queryAdminPermisson} from 'http/formalDeclaration'
import {permissionQueryDocPermisson,pageofficeChapterDetial} from 'http/formalDeclaration'
import {mapGetters} from 'vuex';
import inputs from "../../../components/common/input.vue";
import datePicker from "../../../components/common/datePicker.vue";
import documentLeftMenu from "./component/documentLeftMenu.vue";
import TableCommon from "../../../components/common/TableCommon.vue";
import PaginationCommon from "../../../components/common/PaginationCommon.vue";
import declareTable from "../../../components/common/declareTable.vue";
export default {
  name: "document",
  components: {
    inputs,
    datePicker,
    documentLeftMenu,
    TableCommon,
    PaginationCommon,
    declareTable
  },
  computed: {
    ...mapGetters({
      loginInforma:'gs_Home_loginInforma',
    }),
  },
  data() {
    return {
      //评论内容
      publishcontent:'',
      publishlist:[],
      publishshow:false,
      //章节内容
      name:'',
      //上锁人
      lockName:'',
      //上锁时间
      lockDatetime:'',
      //锁定状态
      state:'',
      // 文档模板id
      documentTemplateId:'',
      //章节id
      chapterId:'',
      //左侧菜单
      LeftMenu:false,
      //左侧模板数据
      documentData:'',
      //左侧模板配置
      defaultProps:{
        children: "childList",
        label: "name"
      },
      // 分页器所需字段
      // 总条数
      total: 0,
      // 每页条数
      pageSize: 10,
      // 总页数
      pageNum: 1,
      currentPage: 1,
      allJurisdiction:'',

      //查看权限
      See:'',
      //编辑权限
      edit:'',
      //上锁解锁权限
      operation:"",
      //账号信息
      account:'',
      //锁定人账号
      lockaccount:''
    };
  },
  mounted(){
    // console.log(this.$route.query)
    if(window.sessionStorage.stateStr == '新增'){
      if(window.sessionStorage.jump == 'ok'){
        console.log('有')
        this.declareId = this.$route.query.declareId;
      }else{
        console.log('没有')
        this.$message({
          message: "请先填写基本信息",
          type: "error"
        });
        this.$router.push({
					path:'/formalDeclaration/createDeclaration/projectInformation',
					query:this.$route.query
				})
        return
      }
      this.documentTemplateId = this.$route.query.declareId
    }else{
      this.documentTemplateId = this.$route.query.id
    }
    if(this.$route.query.docChapterId){
      this.chapterId = this.$route.query.docChapterId;

      pageofficeChapterDetial({
        id:this.chapterId
      }).then(res=>{
        console.log(res)
        this.clickData(res.data.list[0])
      })
    }
    
    this.getLeftMenu();
    this.getqueryAdminPermisson();
    this.account = this.loginInforma.account;
    console.log(this.loginInforma)
  },
  methods: {
    //判断权限
    getqueryAdminPermisson(){
      queryAdminPermisson({
        relationId:this.documentTemplateId,
			  type:'DECLARE'
      }).then(res=>{
        if(res.data == 'ADMIN'){
          this.allJurisdiction = true;
          this.See = true;
          this.edit = true;
          this.operation = true
        }else{
          this.allJurisdiction = false
        }
      })
    },
    //获取左侧菜单
    getLeftMenu(){
      // console.log(this.documentTemplateId)
      pageofficeGetChapterJson({
        relationId:this.documentTemplateId,
        relationType:'DECLARE'
      }).then(res=>{
        this.documentData = res.data
        this.LeftMenu = true
      })
    },
    // 左侧菜单点击
    clickData(data){
      if(!this.allJurisdiction){
          permissionQueryDocPermisson({
          docChapterId:data.id
        }).then(res=>{
          if(res.data == 'DOC'){
            this.See = true;
            this.edit = true;
            this.operation = true
          }else if(res.data == 'READ'){
            this.See = true;
            this.edit = false;
            this.operation = false
          }
        })
      }
      this.lockaccount = data.lockAccount;
      console.log(data)
      if(data.lockStatus == 'UNLOCK'){
        this.name = data.name;
        this.state = data.lockStatus;
        this.chapterId = data.id
      }else{
        this.name = data.name;
        this.state = data.lockStatus;
        this.chapterId = data.id;
        this.lockName = data.lockName;
        this.lockDatetime = data.lockDate
      }
      this.getpublish()
    },
    //上锁
    lockUp(){
      pageofficeLockChapter({
        id:this.chapterId
      }).then(res=>{
        if(res.result == 'SUCCESS'){
          this.getLeftMenu();
          this.state = 'LOCK';
          this.lockDatetime = res.data.date;
          this.lockName = res.data.user.name;
          this.$message({
            message: "上锁成功",
            type: "success"
          });

        }else{
          this.$message({
            message: "上锁失败",
            type: "error"
          });
        }
      })
    },
    //解锁
    Unlock(){
      pageofficeUnlockChapter({
        id:this.chapterId
      }).then(res=>{
        if(res.result == 'SUCCESS'){
          this.getLeftMenu();
          this.state = 'UNLOCK';
          this.$message({
            message: "解锁成功",
            type: "success"
          });
        }else{
          this.$message({
            message: "解锁失败",
            type: "error"
          });
        }
      })
    },
    // 总览
    documentPreview() {
      console.log(this.documentTemplateId)
      POBrowser.openWindowModeless('http://192.168.1.247:9080/component/document/openDocumentReadOnly?relation_type=DECLARE&relation_id='+this.documentTemplateId,'width=1200px;height=800px;')
    },
    //文档编辑
    documentEdit(){
      POBrowser.openWindowModeless('http://192.168.1.247:9080/component/document/editDocumentModel?relation_type=DECLARE&relation_id='+this.documentTemplateId,'width=1200px;height=800px;')
    },
    //编辑章节
    editChapter(){
      POBrowser.openWindowModeless('http://192.168.1.247:9080/component/pageoffice/openChapterDetial?id='+this.chapterId,'width=1200px;height=800px;')
    },
    // 查看章节
    seeChapter(){
      POBrowser.openWindowModeless('http://192.168.1.247:9080/component/pageoffice/openReadOnlyChapterDetial?id='+this.chapterId,'width=1200px;height=800px;')
    },
    // 获取评论
    getpublish(){
      chapterCommentFindChapterCommentByChapterId({
        chapterId:this.chapterId
      }).then((res)=>{
        this.publishshow = true
        if(res.result == 'SUCCESS' ){
          this.publishlist = res.data
        }
      })
    },
    // 发表评论
    publish(){
      // console.log(this.loginInforma.name)
      chapterCommentInsertComment({
        chapterId:this.chapterId,
        account:this.loginInforma.name,
        comments:this.publishcontent
      }).then(res=>{
        console.log(res)
        if(res.result == 'SUCCESS'){
          this.getpublish()
          this.$message({
            message: "评论成功",
            type: "success"
          });
        }
      })
    },
    // 返回
    goBack() {
      window.history.go(-1);
    },
    getTemplatePick(row) {
      console.log(row);
    },
    // 修改每页显示条数
    modifypageSize(value) {
      this.pageSize = value;
      // this.getthemelist(this.currentPage,this.pageSize)// 获取主题列表
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.currentPage = v;
      // this.queryDataList();// 查询
    },
    deleteItem(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="scss" scoped>
.pageWarpper {
  width: 990px;
  height: auto;
  background-color: #f5f5f5;
  // position: relative;
  padding-bottom: 40px;
  .fadeInBtn {
    width: 88px;
    height: 30px;
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    margin-left: 20px;
    border: none;
    float: right;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
  }
  .wrapperMain {
    width: 980px;
    box-sizing: border-box;
    background-color: #fff;
    // padding: 20px 0px 0px 0px;
    overflow: hidden;
    margin: 0 10px;
    .editItem {
      display: flex;
      padding: 0 20px 20px;
      justify-content: space-between;
      font-size: 16px;
      color: #666;
      .editCenter {
        display: flex;
        align-items: center;
        .editName {
          text-align: end;
          padding-right: 10px;
          display: flex;
          flex-direction: column;
          span {
            font-size: 12px;
          }
        }
        .editContent {
          display: flex;
          align-items: center;
          span {
            padding: 0 10px;
          }
          .el-select {
            width: 280px !important;
          }
        }
        .editArea {
          display: flex;
          align-items: center;
        }
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      .section {
        width: 820px;
        background-color: #f5f5f5;
        .sectionItem {
          background-color: #fff;
          padding: 20px 10px 20px 0;
          .documentTitle {
            padding: 0 0 10px 0;
            display: flex;
          }
          .documentMain {
            height: 276px;
            margin-left: 10px;
            border: 1px solid #ccc;
            padding: 0 20px 20px 20px;
            position: relative;
            ul > li {
              padding-top: 20px;
              h1 {
                font-weight: normal;
                font-size: 24px;
              }
              p {
                padding-top: 20px;
                span {
                  font-size: 18px;
                  padding-right: 30px;
                }
              }
            }
            .mainBtn {
              width: 808px;
              position: absolute;
              left: 50%;
              bottom: 20px;
              margin-left: -404px;
              display: flex;
              justify-content: center;
            }
          }
        }
        .lookTitle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 18px;
            color: #666;
          }
        }
        .setionArea {
          background-color: #fff;
          margin-top: 10px;
          padding: 20px 20px 40px 20px;
          ul > li {
            padding-bottom: 10px;
            p {
              padding: 10px 0 8px 0;
              font-size: 14px;
              color: #666;
            }
          }
        }
        .setionLast {
          margin-top: 10px;
          background-color: #fff;
          padding: 20px;
          .lookMain {
            height: 140px;
            padding: 16px 0;
            .el-textarea {
              height: 140px;
            }
          }
        }
      }
    }
  }
  .dialogWrapper {
    position: absolute;
    top: 0;
    width: 990px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    .dialogTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px 16px;
      p {
        font-size: 18px;
        color: #666;
        font-weight: bold;
      }
    }
    .historyBox {
      width: 736px;
      height: 386px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background: #fff;
      border-radius: 10px;
      // padding:30px 0;
      z-index: 99;
      display: flex;
      flex-direction: column;
      .historySearch {
        width: 660px;
        border: 2px solid #b5b5b5;
        margin: 0 auto;
        display: flex;
        border-radius: 6px;
        padding: 30px 0;
        flex-direction: column;
        padding-right: 20px;
        .editItem {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          color: #666;
          padding-bottom: 25px;
          font-size: 14px;
          .editCenter {
            display: flex;
            align-items: center;
            .editName {
              text-align: end;
              padding-right: 10px;
              display: flex;
              flex-direction: column;
              width: 102px;
              span {
                font-size: 12px;
              }
            }
            .editContent {
              display: flex;
              align-items: center;
            }
          }
        }
      }
      .historyMain {
        width: 680px;
        margin: 20px auto;
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
      }
    }
  }
}
</style>