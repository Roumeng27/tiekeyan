<template>
    <div>
        <ul class="list">
            <li v-for="(item,index) in menuList" :key="index" :class="activeClass == index ? 'active':''" @click="addClassFun(index,item)">
                <span>{{item.name}}</span>
            </li>
        </ul> 
    </div>
</template>

<script>
    export default {
        props:["menuList","activeClass"],
        data(){
            return {
                
            }
        },
        methods:{
            addClassFun(index,item){
                this.$router.push({
                    path: item.path, 
                })   
            },
        }
    }
</script>

<style lang="scss" scoped>
.list{
    // width: 980px;
    margin: 0px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background:#fff;
    display: flex;
    padding-top: 10px;
    border-bottom:1px solid #E7E7E7;
    li{
        padding:2px 10px;
        height: 52px;
        background: #E7E7E7;
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap:wrap;
        font-size: 18px;
        color: #666;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        cursor: pointer;
        span{
            display: flex;
            justify-content: center;
            width:126px;
        }
    } 
    .active{
        font-size: 18px;
        background: #C2D7F5;
        color:#3F82E1;
        font-weight: bold;
    }
}

</style>