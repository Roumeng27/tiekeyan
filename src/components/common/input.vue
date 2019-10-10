<template>
  <input type="text" ref="input" @blur="blurSum"  @input="$emit('input', $event.target.value)" :placeholder="placeholder">
</template>

<script>
export default {
  name: "inputs",
  data() {
    return {
			
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
    blurSum(){
      this.$emit("sumAdd");
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