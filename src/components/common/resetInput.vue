<template>
  <input type="text" ref="input" @blur="blurSum"  v-model="input_value" :placeholder="placeholder">
</template>

<script>
export default {
  name: "inputs",
  data() {
    return {
			input_value:'',
		};
	},
  props:['width','height','placeholder','disableds'],
  mounted() {
    this.$refs.input.style.width = this.width;
    this.$refs.input.style.height = this.height;
    if(this.disableds){
      this.$refs.input.disabled = true;
    }
	},
  methods: {
    blurSum(e){
      this.$emit("input",e.target.value);
    },
    resetList(){
      this.input_value = "";
    }
  }
};
</script>

<style lang="scss" scoped>
input{
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  text-indent: 5px;
}
</style>