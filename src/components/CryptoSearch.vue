<template>
  <div class="search">
    <input v-model="searchQuery" @input="handleInputChange" type="text" placeholder="Search...">
    <div class="filtered-items-container">
      <a :href="'/market/' + item" class="filtered-item" v-for="item in searchResults" :key="item">
        {{ item }}
      </a>
    </div>
  </div>
</template>

<script>
import { allCryptoSymbols } from '@/utils/utils.js';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: ['BTC', 'ETH', 'LTC', 'DOGE'],
    }
  },

  methods: {
    handleInputChange() {
      console.log("changed");
      this.searchResults = allCryptoSymbols.filter((item) => {
        return item.toLowerCase().slice(0, -4).includes(this.searchQuery.toLowerCase());
      }).slice(0, 4);
      this.searchResults = this.searchResults.map(symbol => symbol.slice(0, -4));
    },
  }

}
</script>


<style scoped>
.filtered-items-container {
  display: flex;
  box-shadow: 0 4px 6px rgba(32, 33, 36, 0.28);
  font-size: 17px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.664);
  width: 200px;
}

.filtered-item {
  font-size: 14px;
  font-weight: 1000;
  background-color: #54617cd8;
  cursor: pointer;
  border-radius: 0.375rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 0.25rem;
  text-decoration: none;
  color: #ffffff;

}

.search {
  width: 500px;
}

.search input[type="text"] {
  padding: 8px 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #1d1e2e;
  color: #ffffff;
  font-size: 16px;
  width: 180px;
}
</style>