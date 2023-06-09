<template>
  <div class="radio-container">
    <div>
      <label class="radio-label">
        <input type="radio" v-model="selectedDuration" value="1" required />
        <span class="custom-button" :class="{ 'active': selectedDuration === '1' }">1 Month</span>
      </label>
      <label class="radio-label">
        <input type="radio" v-model="selectedDuration" value="3" required />
        <span class="custom-button" :class="{ 'active': selectedDuration === '3' }">3 Months</span>
      </label>
    </div>

    <div>
      <label class="radio-label">
        <input type="radio" v-model="selectedDuration" value="6" required />
        <span class="custom-button" :class="{ 'active': selectedDuration === '6' }">6 Months</span>
      </label>
      <label class="radio-label">
        <input type="radio" v-model="selectedDuration" value="12" required />
        <span class="custom-button" :class="{ 'active': selectedDuration === '12' }">1 Year</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    symbol: String,
  },
  data() {
    return {
      selectedDuration: '',
    }
  },
  watch: {
    selectedDuration() {
      this.$emit('durationSelected', this.symbol, this.selectedDuration);
    }
  },
}

</script>


<style scoped>
.radio-label {
  display: inline-block;
  margin-right: 10px;
}

.custom-button {
  width: 55px;
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #3b3e55;
  cursor: pointer;
}

.custom-button.active {
  background-color: #20212b;
  color: white;
}

input[type="radio"] {
  display: none;
}
</style>