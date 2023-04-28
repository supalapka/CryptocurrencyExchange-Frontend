<template>
  <div>
    <div class="crypto-block">
  <div class="crypto-header">
    <h2>{{coin.name }} ({{ coinSymbol }})</h2>
    <div class="crypto-price">
      <p> Price</p>
      <span>${{parseFloat(this.coin.c)}}</span>
    </div>
  </div>

  <div class="crypto-chart">
    <CryptoGraph class="graph" :symbol="coin.s" graph-width="1340px" graph-height="680px"/>
  </div>

  <div class="crypto-data">
    <div class="crypto-data-item">
      <h4>24h Price Change</h4>
      <p :class="parseFloat(this.coin.P) > 0 ? 'positive' : 'negative'">{{parseFloat(this.coin.P).toFixed(2)}}%</p>
    </div>

    <div class="crypto-data-item">
      <h4>24h High</h4>
      <p class="">${{parseFloat(this.coin.h)}} </p>
    </div>

    <div class="crypto-data-item">
      <h4>24h Low</h4>
      <p>${{ parseFloat(this.coin.l) }}</p>
    </div>

  </div>
  <div class="crypto-action">
    <div class="crypto-buy">
      <label>Available {{ availableUSDT }} USDT</label><br>
      <input type="number" v-model="buyInput" placeholder="Enter in USDT">
      <button @click="buy">Buy</button>
    </div>
    <div class="crypto-sell">
      <label>Available {{ availableCoins }} {{this.coin.name}}</label><br>
      <input type="number" v-model="sellInput" placeholder="Enter coins">
      <button @click="sell">Sell</button>
    </div>
  </div>
</div>


  </div>
</template>

<script>
import axios from 'axios'
 import { cryptoSymbol } from 'crypto-symbol'
     const { nameLookup } = cryptoSymbol({})
import CryptoGraph from "@/components/CryptoGraph.vue"
export default {
  name: 'CryptoPage',
  components: {
    CryptoGraph,
},

 data (){
  return {
    coinSymbol: '',
    coin:{type : Object},
    buyInput: '',
    sellInput: '',

    availableUSDT: 0,
    availableCoins: 0,
  }
 },

 created(){
    this.coinSymbol = this.$route.params.symbol;
    this.coinSymbol = this.coinSymbol.toLowerCase();
    this.connectToWebSocket();
    this.updateBalances();
 },

 methods: {
    connectToWebSocket() {
          this.connection = new WebSocket("wss://stream.binance.com:9443/ws/" + this.coinSymbol + "usdt@ticker");
        
          this.connection.onmessage = async (event) => {
            this.coin = JSON.parse(event.data);
            this.coin.name = nameLookup(this.coin.s.slice(0,-4), { exact: true })
            }

          this.connection.onopen = () => {
            console.log("Successfully connected to websocket server " + this.coinSymbol);
          };

          this.connection.onclose = (event) => {
            console.log('Connection ' + this.coin.name + ' closed with code', event.code);
          };
        },

        async buy(){
         await axios.post('https://cryptocurrencyexchange.azurewebsites.net/auth/buy', {
                    coinSymbol: this.coin.s.slice(0,-4),
                    amount: this.buyInput,
                }).catch(error => {
            if (error.response.status === 401) {
              this.$router.push('/login');
            }});

                this.updateBalances();
        },

        async sell(){
         await axios.post('https://cryptocurrencyexchange.azurewebsites.net/auth/sell', {
                    coinSymbol: this.coin.s.slice(0,-4),
                    amount: this.sellInput,
                }).catch(error => {
            if (error.response.status === 401) {
              this.$router.push('/login');
            }});

                this.updateBalances();
        },

         async updateBalances(){
          axios.get('https://cryptocurrencyexchange.azurewebsites.net/auth/coin-amount/' + this.coinSymbol)
          .then(response => {
            this.availableCoins = response.data.toFixed(2);
          });

          axios.get('https://cryptocurrencyexchange.azurewebsites.net/auth/coin-amount/usdt')
          .then(response => {
            this.availableUSDT = response.data.toFixed(4);
          });
        }
    }
}
</script>


<style scoped>
 .crypto-block {
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 20px;
  width: 1300px;
    margin: 0 auto;

}

.crypto-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.crypto-price {
  font-size: 20px;
}

.crypto-chart {
  height: 710px;
  margin-bottom: 20px;
}

label{
  margin: 8px;
}

.crypto-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.crypto-data-item {
  background-color: #333;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px;
  width: calc(50% - 10px);
  margin-bottom: 10px;
}

.crypto-data-item h4 {
  margin: 0;
  font-size: 16px;
}

.crypto-data-item p {
  margin: 5px 0 0 0;
  font-size: 18px;
}

.crypto-action {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.crypto-buy input,
.crypto-sell input {
  background-color: #333;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  width: 200px;
  margin-right: 10px;
  font-size: 16px;
}

.crypto-sell button {
  background-color: #be0a0a;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 200px;

}
.crypto-buy button {
  background-color: #3CB371;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 200px;
}

.crypto-buy button:hover {
  background-color: #2E8B57;
}
.crypto-sell button:hover {
  background-color: #970e0e;
}


.positive {
  color: #1de9b6;
}

.negative {
  color: #ff5252;
}
</style>