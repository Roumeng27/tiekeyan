<template>
    <div>
        <el-tree :data="data" accordion @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
    export default {
        props:["data"],
        methods:{
            handleNodeClick (data) {
                this.$emit('getTreeData',data)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>