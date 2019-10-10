<template>
    <div>
        <button class="backBtn" :width="width" :height="height" ref="btn">返回</button>     
    </div>
</template>

<script>
    export default {
        props: ["width", "height"],
        mounted(){
            this.$refs.btn.style.width = this.width;
            this.$refs.btn.style.height = this.height;
        }
    }
</script>

<style lang="scss" scoped>
.backBtn{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    color: #fff;
    border: none;
    float: right;
    border-radius: 3px; 
    font-size: 18px;
    color:#3f82e1;
    border:1px solid #3f82e1;
}
</style>