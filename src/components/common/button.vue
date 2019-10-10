<template>
    <div>
        <button class="fadeInBtn" :width="width" :height="height" ref="btn" v-if="type=='fadeIn'" @click="handleBtn">{{btnMsg}}</button> 
        <button class="fadeOutBtn" :width="width" :height="height" ref="btn" v-else-if="type=='fadeOut'" @click="handleBtn">{{btnMsg}}</button>        
    </div>
</template>

<script>
    export default {
        props: ["width", "height","type","btnMsg"],
        mounted(){
            this.$refs.btn.style.width = this.width;
            this.$refs.btn.style.height = this.height;
        },
        methods:{
            handleBtn(){
                this.$emit('handleBtn')
            }
        }
    }
</script>

<style lang="scss" scoped>
.fadeInBtn{
    margin: 0px 10px;
    box-sizing: border-box;
    background-color: #fff;
    // margin-top: 21px;
    border: none;
    float: right;
    border-radius: 3px;
    color:#3f82e1;
    border:1px solid #3f82e1;
}
.fadeOutBtn{
    
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    margin-left: 20px;
    border: none;
    float: right;
    border-radius: 3px; 
    color:#fff;
}
</style>