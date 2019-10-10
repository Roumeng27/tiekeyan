<template>
  <div>
    <div class="date">
      <div class="cen" ref="date" @click="yearswitch()">
        <div>{{date}}</div>
      </div>
      <div v-if="show" style="float:left;width:0px;height:0px;overflow: hidden;">
        <el-date-picker
          v-model="date"
          type="date"
          ref="mark"
          value-format="yyyy-MM-dd"
          @change="change"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div v-if="!show" style="float:left;width:0px;height:0px;overflow: hidden;">
        <el-date-picker
          v-model="date"
          type="datetime"
          ref="mark"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          @change="change"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  data() {
    return {
      date: this.msg,
      pickerOptions: {
        disabledDate:(time)=> {
          var newdate = new Date() * 1;
          return time.getTime() < newdate - (24*60*60*1000) 
        }
      },
      show:true
    };
  },

  model: {
    prop: "msg",
    event: "date"
  },
  watch:{
    mindate:function(val){
      console.log(val)
    }
  },
  props: ["msg", "width", "height", "disableds", "mindate", "maxdate" ,"type"],

  mounted() {
    if(this.type == 'datetime'){
      this.show = false
    }
    
    // if (this.mindate&&this.maxdate) {
    //   var date = new Date();
    //   var y = date.getFullYear();
    //   var m = date.getMonth()+1;
    //   if(m<10)m="0"+m;
    //   var d = date.getDate();
    //   if(d<10)d="0"+d;
    //   var time = y +'-'+ m + '-' + d;
    //   var mindate = new Date(this.mindate) * 1;
    //   var newdate = new Date(time) * 1;
      
    //   if (mindate < newdate) {
    //     this.pickerOptions = {
    //       disabledDate:(time)=> {
    //         var newdate = new Date() * 1;
    //         var maxdate = new Date(this.maxdate) * 1;
    //         return time.getTime() < newdate - (24*60*60*1000) || time.getTime() > maxdate
    //       }
    //     };
    //   }else{
    //     this.pickerOptions = {
    //       disabledDate:(time)=> {
    //         var mindate = new Date(this.mindate) * 1;
    //         var maxdate = new Date(this.maxdate) * 1;
    //         return time.getTime() < mindate - (24*60*60*1000)|| time.getTime() > maxdate
    //       }
    //     };
    //   }
      
    // }
    
    this.$refs.date.style.width = this.width;
    this.$refs.date.style.height = this.height;
    if (this.disableds) {
      this.$refs.date.backgroundColor = "#ccc";
    }
  },
  methods: {
    yearswitch() {
      if (!this.disableds) {
        this.$refs.mark.$el.querySelector("input").focus();
      }
    },
    change() {
      this.$emit("date", this.date);
    }
  }
};
</script>

<style lang="scss" scoped>
.cen {
  width: 170px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-indent: 5px;
}
</style>