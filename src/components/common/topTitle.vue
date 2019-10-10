<template>
  <div class="wrapperTitle">
			{{Title}}
		</div>
</template>

<script>
export default {
  name: "topTitle",
  data() {
    return {
			
		};
	},
  props:['Title'],
  mounted() {
    
    
	},
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.wrapperTitle{
	margin-top: 16px;
	width: 1000px;
	height: 60px;
	text-indent: 60px;
	line-height: 60px;
	font-size: 18px;
	color: #666;
	font-weight: 500;
}
</style>