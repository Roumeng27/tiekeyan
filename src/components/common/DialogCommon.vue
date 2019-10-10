<template>
    <div>
        <div class="dialogWrapper" v-if="type == 'warning'">
            <div class="dialogBox">
                <div class="dialogTitle">提示</div>
                <div class="dialogContent">
                    <p>{{msg}}</p>
                </div>
                <div class="dialogBtn">
                    <el-button @click="unselect">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </div>
            </div>
        </div>
        <div class="dialogWrapper" v-if="type == 'success'" @click="successUnselect">
            <div class="successBox">
                <div class="successContent">
                    <img src="../../assets/img/components/successIcon.png" alt="">
                    <p>{{msg}}</p>
                </div>
            </div>
        </div>
        <div class="dialogWrapper" v-if="type == 'error'" @click="errorUnselect">
            <div class="successBox">
                <div class="successContent">
                    <img src="../../assets/img/components/errorIcon.png" alt="">
                    <p>{{msg}}</p>
                </div>
            </div>
        </div>
        <div class="dialogWrapper" v-if="type == 'detail'" >
            <div class="detailBox">
                <div class="detailTitle">
                    <p>审批详情</p>
                    <i class="el-icon-circle-close" @click="closeDetail"></i>
                </div>
                <div class="detailMain">
                     <div class="detailContent" v-for="(item,index) in detailList" :key="index">
                        <div class="detailItem">
                            <div class="areaList">
                                <div class="area">
                                    <p>审批时间 ： </p>
                                    <span>{{item.approvalDatetime}}</span>
                                </div>
                                <div class="area">
                                    <p>审批人 ： </p>
                                    <span>{{item.approver}}</span>
                                </div>
                                <div class="area">
                                    <p>审批单位 ： </p>
                                    <span>{{item.companyCode}}</span>
                                </div>
                                <div class="area">
                                    <p>审批结果 ： </p>
                                    <span class="result">{{item.approvalStatus}}</span>
                                </div>
                            </div>
                            <div class="areaLast">
                                <div class="area">
                                    <p>审批意见 ： </p>
                                    <span>{{item.approvalComment}}</span>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>  
    </div>
</template>

<script>
    export default {
        props: ["msg","type","detailList"],
        created(){
          
        },
        data() {
            return {
            };
        },
        methods:{
            unselect(){
                this.$emit('unselect')
            },
            confirm(){
                this.$emit('confirm')
            },
            successUnselect(){
                this.$emit('successUnselect')
            },
            errorUnselect(){
                this.$emit('errorUnselect')
            },
            closeDetail(){
                this.$emit('closeDetail')
            }
        }
    }
</script>

<style lang="scss" scoped>
.dialogWrapper{
    // position: fixed;
    // left:0;
    // right:0;
    // bottom:0;
    // top:0;
    position: absolute;
    top: 0;
    width: 1000px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:9999;
    .dialogBox{
        width:492px;
        height:232px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 10px;
        padding-bottom: 10px;
        z-index:99;
        .dialogTitle{
            padding: 20px 0 30px 0;
            font-size: 24px;
            color:#666;
            text-align: center;
        }
        .dialogContent{
            padding:0 90px;
            p{
                font-size: 18px;
            }
        }
        .dialogBtn{
            display: flex;
            justify-content: center;
            padding-top:40px;
        }
    }
    .successBox{
        width:492px;
        height:182px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 10px;
        padding-bottom: 10px;
        z-index:99;
        .successContent{
            display: flex;
            align-items: center;
            line-height: 182px;
            img{
                width: 40px;
                height: 40px;
                padding-left: 110px;
                padding-right: 40px;
            }
            p{
                font-size: 24px;
                color:#666;
            }
        }
    }
    .detailBox{
        width:900px;
        height:237px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #fff;
        border-radius: 10px;
        padding: 10px 20px;
        z-index:99;
        display: flex;
        flex-direction: column;
        .detailTitle{
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #666;
            p{
                font-size: 18px;
            }
            i{
                font-size: 28px;
                color:  #b5b5b5;
            }
        }
        .detailMain{
            width: 100%;
            height: 100%;
            display: flex;
            flex: 1;
            overflow: hidden;
            overflow-y: scroll;
            flex-direction: column;
            .detailContent{
                .detailItem{   
                    width: 100%;
                    height: auto; 
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    box-sizing: border-box;
                    padding:0 10px ;
                    margin-bottom: 10px;
                    .areaList{
                        display: flex;
                        justify-content: space-between;
                        .area{
                            display: flex;
                            line-height: 34px;
                            p{
                                font-size: 12px;
                                color:#666;
                            }
                            span{
                                font-size: 14px;
                                color:#4d4d4d;
                                font-weight: bold;
                            }
                            .result{
                                color: #5a92e4;
                            }
                        }
                    }
                    .areaLast{
                        display: flex;
                        .area{
                            display: flex;
                            line-height: 34px;
                            p{
                                font-size: 12px;
                                color:#666;
                                width: 150px;
                            }
                            span{
                                font-size: 14px;
                                color:#4d4d4d;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
        
        
    }
}

</style>