<template>
  <div class="staking-block">
    <h2 class="staking-block-title">List of available coins to stake</h2>

    <form @submit.prevent="stake(coin)" v-for="coin in coins" :key="coin.id">

      <div class="coin">

        <div class="coin-logo">
          <a style="text-decoration: none; color: white;" :href="'market/' + coin.symbol">
            <img :src=coin.logo>
            <h3 class="coin-name">{{ coin.symbol }}</h3>
            <h4 class="coin-rate">{{ (coin.ratePerMonth * 12).toFixed(2) }}%</h4>
          </a>
        </div>

        <p class="coin-info">{{ coin.description }}</p>
        <div class="staking-input">
          <label>Amount to stake:</label>
          <input type="number" v-model="coin.amount" placeholder="Enter amount" required :min="coin.minimun" step="any">

          <period-radio-buttons-vue :symbol="coin.symbol" @durationSelected="durationSelected" />

          <label>You have {{ this.userStateCoinsBalacne[coin.symbol] }} {{ coin.name }} in your
            wallet</label>

        </div>
        <button class="staking-button" type="submit">Stake</button>
      </div>
    </form>

  </div>
</template>

<script>
import { baseUrl } from '@/utils/utils.js';
import axios from 'axios';
import { cryptoSymbol } from 'crypto-symbol'
const { nameLookup } = cryptoSymbol({})

import PeriodRadioButtonsVue from '@/components/staking/PeriodRadioButtons.vue';

export default {
  data() {
    return {
      coins: [],
      logourl: '',
      userStateCoinsBalacne: {},
      selectedDurations: {},
      minimunUsdToStake: 10,
    }
  },

  components: {
    PeriodRadioButtonsVue,
  },


  async created() {
    await axios.get(`${baseUrl}/staking/available-coins`)
      .then(
        response => {
          response.data.map(async coin => {

            coin.name = nameLookup(coin.symbol, { exact: true });
            coin.logo = 'https://cryptologos.cc/logos/' + coin.name.toLowerCase() + '-' + coin.symbol.toLowerCase() + '-logo.png';

            await axios.get(`${baseUrl}/market/price/${coin.symbol}`).then(response => { //set $10 minimun to stake
              const price = response.data;
              let tmp = price / this.minimunUsdToStake;
              coin.minimun = (1 / tmp).toFixed(4);

            });
            this.coins.push(coin);

            await axios.get(`${baseUrl}/auth/coin-amount/${coin.symbol}`)
              .then(response => {
                this.userStateCoinsBalacne[coin.symbol] = response.data;
              })
              .catch(error => {
                console.log(error);
              });
          })
        });
  },

  methods: {
    stake(coin) {
      console.log(coin.amount);
      if (coin.amount == undefined || coin.amount == '' || this.selectedDurations[coin.symbol] == undefined) {
        console.log("Fill the data");
        return;
      }
      axios.post(`${baseUrl}/staking/create`, {
        stakingCoinId: coin.id,
        amount: coin.amount,
        durationInMonth: this.selectedDurations[coin.symbol]
      });
    },

    durationSelected(symbol, durationValue) {
      this.selectedDurations[symbol] = durationValue;
    },

  }

}
</script>


<style scoped>
* {
  text-shadow: 0 3px 6px rgba(2, 2, 2, 0.568);
}

.radio-container {
  display: flex;
  align-items: center;
}

.staking-block {
  padding: 20px;
  border-radius: 10px;
}

.staking-block-title {
  font-size: 24px;
  margin-bottom: 20px;
  margin-left: 20px;
}

.coin {
  background-color: #292a3a;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  border-radius: 20px;

  display: flex;
  align-items: center;
}

.coin-name {
  font-size: 20px;
  margin-bottom: 10px;
}

.coin-rate {
  color: rgb(8, 196, 8);
}

.coin-info {
  font-size: 18px;
  margin-bottom: 10px;
}

.staking-input {
  margin: 10px;
}

.staking-input label {
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
}

.staking-input input {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #969696;
  background-color: #1d1e2e;
  color: #d4d4d4;
  border-radius: 4px;
  width: 200px;
  margin-bottom: 8px;
  ;
}

.staking-button {
  height: 120px;
  margin-left: 10px;
  background-color: #3b3e55;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.staking-button:hover {
  background-color: #20212b;
}

.coin-logo {
  margin-right: 20px;
  width: 50px;
}

.coin-logo img {
  max-width: 100%;
  height: auto;
}
</style>
