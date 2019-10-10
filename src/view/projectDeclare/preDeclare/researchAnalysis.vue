<template>
    <div class="pageWrapper">
        <topTitle Title='申报信息'></topTitle>
        <changeTab :menuList="menuList" :activeClass="1"></changeTab>
        <div class="wrapperSearch">
            <div class="editItem">
				<div class="editComment">
					<div class="centerArea">
						<div class="editName">章节标题</div>
						<div class="editContent">
							<inputs class="inputs" width='864px' v-model="input" height='30px'></inputs>
						</div>
					</div>
				</div>
			</div>
            <div class="editItem" style="margin-top:20px;">
				<div class="editComment">
					<div class="centerArea">
						<div class="editName">章节内容</div>
						<div class="editContent">
							<inputs class="inputs" width='864px' v-model="input" height='300px'></inputs>
						</div>
					</div>
				</div>
			</div>
            <div class="editBtn">
                <button class="backBtn">返回</button> 
                <button class="saveBtn">保存</button> 
            </div>
        </div>
    </div>
</template>

<script>
    import topTitle from '../../../components/common/topTitle.vue';
    import changeTab from '../../../components/common/changeTab.vue'
    import inputs from '../../../components/common/input.vue'
    export default {
        components:{
            topTitle,
            inputs,
            changeTab
        },
        data(){
            return {
                input:'',
                menuList:[{
                    name:'项目基本信息',
                    path:'/preDeclare/declarationInformation/projectbasicInfo'
                },{
                    name:'研究背景及技术经济分析',
                    path:'/preDeclare/declarationInformation/researchAnalysis'
                }]
            }
        },
        created(){

        },
        methods:{
            goBack(){
                console.log(111111111111)
                $router.back(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
.pageWrapper{
	width: 1000px;
	height: auto;
    background-color: #f5f5f5;
    .wrapperSearch{
        width: 980px;
        height:auto !important;
        margin: 0px 10px;
        box-sizing: border-box;
        background-color: #fff;
        height: 72px;
        border-radius: 5px;
        display: flex;
        align-items:center;
        padding:20px;
        flex-direction: column;
        .editItem{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .editCenter{
                display: flex;
                align-items: center;
                
            }
            .editName{
                font-size: 14px;
                color: #666;
                padding-right: 10px;
            }
            .centerArea{
                display: flex;
                align-items: center;
            }
            .editComment{
                display: flex;
                align-items: center;
            }
        }
        .editBtn{
            margin-top:100px;
            display: flex;
            justify-content: center;
            align-items: center;
            .backBtn{
				width: 100px;
				height: 46px;
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
			.saveBtn{
				width: 100px;
				height: 46px;
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
        }
    }
}
</style>