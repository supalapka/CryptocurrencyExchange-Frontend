<template>
<button @click="handleClick" class="timeframe-btn dark">
  {{ text }}
</button>
</template>

<script>
    export default{
        props:{
            text: {
                type : String,
                required : true, 
            }
        },

        methods: {
      handleClick() {
        this.$emit('timeFrameChanged', this.text);
    }
    },
    }

    
</script>


<style>
.timeframe-btn {
  border: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.timeframe-btn.dark {
  background-color: #2f2f2f;
  color: #ffffff;
}

</style>