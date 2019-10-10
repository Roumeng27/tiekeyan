<template>
    <div>
        <div class="dialogWrapper" :dialogVisible="dialogVisible">
            <div class="dialogBox">
                <div class="dialogContent">
                    <img src="" alt="">
                    <p>{{msg}}</p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["title", "dialogVisible","msg"],
        created(){
           
        },
        data() {
            return {
                
            };
        },
        methods:{
            
        }
    }
</script>

<style lang="scss" scoped>
.dialogWrapper{
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    top:0;
    opacity: .5;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:9;
    .dialogBox{
        width:492px;
        height:182px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 10px;
        padding-bottom: 10px;
        z-index:99;
        display: flex;
        justify-content: center;
        align-items: center;
        .dialogContent{
            display: flex;
            align-items: center;
            img{
                
            }
            p{
                font-size: 18px;
            }
        }
    }
}
</style>