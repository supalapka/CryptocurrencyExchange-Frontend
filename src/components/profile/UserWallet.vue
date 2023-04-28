<template>
  <div class="balances">
    <div class="balances-header">
      <h2>Your Wallet</h2>
    </div>
    <div class="balances-table">
      <table>
    <thead>
      <tr>
        <th>Coin</th>
        <th>Amount</th>
        <th style="text-align: right;">USD Value</th>
      </tr>
    </thead>
    <tbody v-for="coin in coins" :key="coin.id">
      
      <tr>
        <td>
          <img :src="coin.image" >
          <span><a @click="goToCoin(coin.symbol)">{{coin.name}}</a></span>
          <span class="asset-symbol">({{coin.symbol}})</span>
        </td>
        <td>{{coin.amount}}</td>
        <td style="text-align: right;">${{(coin.price * coin.amount).toFixed(2)}}</td>
      </tr>
   
    </tbody>
  </table>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { cryptoSymbol } from 'crypto-symbol'
import {baseUrl } from '@/utils/utils.js';
const { nameLookup } = cryptoSymbol({})
export default {
      data(){
      return {
        coins: [],
      }
    },


   async created(){
      await axios.get(`${baseUrl}/auth/get-wallet`)
          .then(response => {
            this.coins = response.data;
          },
          error => {
            if (error.response.status === 401) {
              this.$router.push('/login');
            }});

          this.coins.forEach(async coin => {
            coin.name = nameLookup(coin.symbol,toString(), { exact: true });
            const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym='+coin.symbol.toString()+'&tsyms=USD');
            coin.price  = response.data.USD;
            coin.image = 'https://cryptologos.cc/logos/' + coin.name.toLowerCase() + '-' + coin.symbol + '-logo.png';
          });
          
    },

    methods:{
      goToCoin(symbol){
        this.$router.push('/market/' + symbol);
      }
    }
};
</script>

<style scoped>
.balances {
  margin: 20px;
  font-family: Arial, sans-serif;
  color: #fff;
  background-color: #1d1e2e;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.balances-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #292a3a;
  border-bottom: 1px solid #1d1e2e;
}

.balances-header h2 {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}


.balances-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

thead {
  background-color: #292a3a;
}

thead th {
  padding: 15px 20px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  border-right: 1px solid #1d1e2e;
}

thead th:last-child {
  border-right: none;
}

tbody tr {
  border-bottom: 1px solid #1d1e2e;
}

tbody tr:last-child {
  border-bottom: none;
}

tbody td {
  padding: 15px 20px;
  font-size:18px;
  font-weight: 400;
  text-align: left;
  border-right: 1px solid #1d1e2e;
}

tbody td:last-child {
  border-right: none;
}

td:first-child {
  display: flex;
}

td img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}


td span {
  margin-right: 5px;
}

.asset-symbol {
  font-size: 12px;
  font-weight: 400;
  color: #b3b3b3;
}

</style>