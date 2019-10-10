<template>
  <div class="documentLeft_box">
    <el-tree
      :data="documentData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      default-expand-all
      
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: "documentLeftMenu",
  components: {},
  props: {},
  data() {
    return {
      // documentLeft_data: [
      //   {
      //       docTempId: 502,
      //       indexNo: 1,
      //       childList: [
      //           {
      //               docTempId: 502,
      //               childList: [
      //                   {
      //                       docTempId: 502,
      //                       childList: [],
      //                       id: 4,
      //                       parentChapterId: 2,
      //                       templateChapterName: "研究方法"
      //                   },
      //                   {
      //                       docTempId: 502,
      //                       childList: [
      //                           {
      //                               docTempId: 502,
      //                               childList: [],
      //                               id: 6,
      //                               parentChapterId: 5,
      //                               templateChapterName: "经济指标"
      //                           },
      //                           {
      //                               docTempId: 502,
      //                               childList: [
      //                                   {
      //                                       docTempId: 502,
      //                                       childList: [],
      //                                       id: 8,
      //                                       parentChapterId: 7,
      //                                       templateChapterName: "其他"
      //                                   }
      //                               ],
      //                               id: 7,
      //                               parentChapterId: 5,
      //                               templateChapterName: "预期目标"
      //                           }
      //                       ],
      //                       id: 5,
      //                       parentChapterId: 2,
      //                       templateChapterName: "国内外现状"
      //                   }
      //               ],
      //               id: 2,
      //               parentChapterId: 1,
      //               templateChapterName: "主要研究内容"
      //           },
      //           {
      //               docTempId: 502,
      //               childList: [],
      //               id: 3,
      //               parentChapterId: 1,
      //               templateChapterName: "关键技术"
      //           }
      //       ],
      //       id: 1,
      //       parentChapterId: -1,
      //       templateChapterName: "章节名称测试"
      //   }
      // ],
      // defaultProps: {
      //   children: "childList",
      //   label: "templateChapterName"
      // }
    };
  },
  props:['documentData','defaultProps'],
  watch: {},
  computed: {},
  methods: {
    handleNodeClick(data) {
      this.$emit('clickData',data)
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.documentLeft_box {
  width: 162px;
  height: 100%;
  border-right: 1px solid #ccc;
  .el-tree {
    width: 162px;
    padding: 20px 0px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>