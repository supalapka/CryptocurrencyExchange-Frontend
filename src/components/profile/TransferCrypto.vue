<template>
<div class="transfer-container">
  <h2 class="transfer-title">Cryptocurrency transfer</h2>
  <h4 class="">Your pay id - {{ this.coins[0].userId }}</h4>
  <form class="transfer-form">
    <label class="transfer-label">Select cryptocurrency:</label>
    <select class="transfer-select" v-model="selectedSymbol">
        <option v-for="coin in coins" :value="coin.symbol" :key="coin.id">
          {{coin.name}} <span class="coin-amount">({{ coin.amount }})</span>
        </option>
      </select>
    <label class="transfer-label">Enter the amount of coins:</label>
    <input v-model="symbolAmount" class="transfer-input"
     type="number" min="0" step="0.00000000001">
    <label class="transfer-label">Enter the recipient pay id:</label>
    <input v-model="receiverId" class="transfer-input" type="text">
    <button class="transfer-button" @click.prevent="send">Send</button>
  </form>
</div>

</template>

<script>
  import axios from 'axios';
  import { cryptoSymbol } from 'crypto-symbol'
  const { nameLookup } = cryptoSymbol({})
  import {baseUrl } from '@/utils/utils.js';

export default{

  data(){
    return{
      coins:[],
      selectedSymbol: '',
      symbolAmount: '',
      receiverId: '',
    }
  },

  methods:{
    async send(){
      await axios.post(`${baseUrl}/auth/send`,{
        symbol: this.selectedSymbol,
        amount: this.symbolAmount,
        receiver: this.receiverId,
      }).catch(error =>{
        console.log(error);
      });
    },

      async getCoins(){
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
                });

      }
  },

  created(){
    this.getCoins();
  }
}

</script>

<style scoped >
.transfer-container {
  background-color: #1f2937;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  margin: auto;
  margin-top: 30px;
}

.transfer-title {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
}

.transfer-form {
  display: flex;
  flex-direction: column;
}

.transfer-label {
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
}

.transfer-select,
.transfer-input {
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
  font-size: 16px;
}

.transfer-select {
  background-color: #2d4059;
  color: #fff;
  width: 100%;
}

.coin-amount {
  font-size: 14px;
  margin-left: 10px;
  color: #aaa;
}

.transfer-input {
  background-color: #2d4059;
  color: #fff;
  width: 96.5%;
}

.transfer-button {
  background-color: #404261;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.transfer-button:hover {
  background-color: #2c2f4d;
}


</style>