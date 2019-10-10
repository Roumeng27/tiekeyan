<template>
    <div>
        <button class="saveBtn" :width="width" :height="height" ref="btn">保存</button>     
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
.saveBtn{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #3f82e1;
    color: #fff;
    margin-left: 20px;
    border: none;
    float: right;
    border-radius: 3px; 
    font-size: 18px;
    color:#fff;
}
</style>