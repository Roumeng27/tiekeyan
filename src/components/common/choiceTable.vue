<template>
    <div>
        <div class="tableBox" v-if="type=='choise'">
            <el-table :data="tableData" stripe size="mini" fit highlight-current-row  @selection-change="handleSelectionChange"  >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column v-for="(th, key) in tableHeader"
                    :key="key"
                    :prop="th.prop"
                    :label="th.label"
                    :fixed="th.fixed"
                    :min-width="th.minWidth" align="center">
                    <template slot-scope="scope">
                        {{ scope.row[th.prop] }}</span>     
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div  class="tableBox" v-else-if="type=='delete'">
            <div class="tableLeft">
                <el-table :data="tableData" stripe size="mini" fit highlight-current-row  @selection-change="handleSelectionChange" >
                    <el-table-column v-for="(th, key) in tableHeader"
                        :key="key"
                        :prop="th.prop"
                        :label="th.label"
                        :fixed="th.fixed"
                        :min-width="th.minWidth" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row[th.prop] }}</span>     
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="tableRight">
                <div v-for="(item,key) in tableData"  :key="key" >
                    <Button width="80px" height="30px" ref="btn" type="fadeIn" btnMsg='删除'></Button> 
                </div>
            </div>
        </div>  
        
    </div>
</template>

<script>
import Button from './button'
    export default {
        props:['tableData','tableHeader','type'] ,
        data(){
            return {
                
            }
        } ,
        components:{
            Button
        },
        methods:{
            // 多选框选中数据
            handleSelectionChange(val){
                this.$emit('handleSelectionChange',val)
            }
        }
    }
</script>

<style lang="scss" scoped>
.tableBox{
    // padding: 0 10px;
    display: flex;
}
.tableRight{
    margin-top: 42px;
    div{
        height:58px;
        display: flex;
        align-items: center;
        padding:0 10px;
    }
}
.handleIcon{
    cursor: pointer;
    font-size:20px;
}
.handleIcon:hover{
    color: #3F82E1;
}
.handelBox{
    background: #9FCAF5;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    dl{
        width:50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
        color:#fff;
        cursor: pointer;
        dt{
            font-size: 18px;
            padding-right: 16px;
        }
        dd{
            font-size:16px;
        }
    }
    .active{
        color:#3F82E1;
        cursor: pointer;
    }
}

</style>