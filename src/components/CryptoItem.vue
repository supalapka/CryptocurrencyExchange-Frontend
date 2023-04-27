<template>
  <table class="fixed-table" @click="routeToCoin">
    <thead>
      <tr class="cryptocurrency">
        <th style="width: 50px;">
          <img :src="image" alt="Bitcoin logo">
        </th>
        <th style="width: 300px;">
          <p class="cryptocurrency-name">{{ this.coin.name }}</p>
        </th>
        <th style="width: 110px;">
          <p :class="parseFloat(this.coin.P) > 0 ? 'cryptocurrency-change positive' : 'cryptocurrency-change negative'">
            {{ parseFloat(this.coin.P).toFixed(2) }}%</p>
        </th>
        <th style="width: 200px;">
          <p class="cryptocurrency-price">${{ parseFloat(this.coin.c) }}</p>
        </th>
      </tr>
    </thead>
  </table>
</template>
  
<script>
import { cryptoSymbol } from 'crypto-symbol'
const { nameLookup } = cryptoSymbol({})

export default {

  created() {
    this.coin = this.coinProps;
    this.coin.name = nameLookup(this.coinProps.s.slice(0, -4), { exact: true });
    const imagePath = 'https://cryptologos.cc/logos/' + this.coin.name.toLowerCase() + '-' + this.coin.s.slice(0, -4).toLowerCase() + '-logo.png';
    this.image = imagePath;
  },

  props: {
    coinProps: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      coin: {
        type: Object,
      },

    }
  },

  methods: {
    routeToCoin() {
      this.$router.push('/market/' + this.coin.s.slice(0, -4));
    },
  }
}
</script>
  
<style scoped>
.cryptocurrency {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #292b42;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.cryptocurrency:hover {
  background-color: #3e2583;
}

.cryptocurrency img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  margin-left: 15px;
}

.cryptocurrency-name {
  flex: 1;
  font-size: 20px;
  margin-right: 150px;
}

.cryptocurrency-price {
  font-size: 18px;
  margin-left: 90px;
}

.cryptocurrency-change {
  margin-left: 60px;
}

.positive {
  color: #1de9b6;
}

.negative {
  color: #ff5252;
}
</style>