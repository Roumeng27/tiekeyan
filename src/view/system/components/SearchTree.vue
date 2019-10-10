<template>
    <div class="userMansgeBox">
        <div class="searchInput">
            <el-input
            placeholder="输入部门名称"
            v-model="filterText">
            </el-input>
        </div>
        <el-tree
            class="filter-tree"
            :data="unitData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            node-key="id"
            ref="tree">
        </el-tree>
    </div>
</template>

<script>
    export default {
        props:['unitData','defaultProps'],
        data(){
            return {
                 filterText: '',
            }
        },
         watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },

        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            handleNodeClick(data){
                this.$emit('getTreeData',data)
            }
        },
    }
</script>

<style lang="scss" scoped>
.searchInput{
    margin-top: 21px;
}

</style>