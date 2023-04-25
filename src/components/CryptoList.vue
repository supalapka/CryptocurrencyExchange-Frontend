<template>
<div class="telegram-theme">
  <div class="header">
    <h1>Market</h1>
  </div>
  <ul class="cryptocurrency-list">
    <div class="list-header">
      <div class="header-item name">Name</div>
      <div class="header-item change"><a @click="sortByChanges">24h Changes </a></div>
      <div class="header-item price"> <a @click="sortByPrice">Price </a></div>
    </div>

    <div v-for="coin in updatedCoins" :key="coin.s" >
   <CryptoItem :coin="coin"/>
  </div>

  </ul>
</div>
</template>

<script>
     import CryptoItem from './CryptoItem.vue';
     import { cryptoSymbol } from 'crypto-symbol'
     const { nameLookup } = cryptoSymbol({})

export default{
    data(){
      return {
        connection: null,
        updatedCoins: [],
        isChangesSorted : false,
        isPriceSorted : false,
      };
    },

    created() {

      if ( localStorage.getItem('cryptoList') != null){
      const cryptoList = localStorage.getItem('cryptoList');
      this.updatedCoins = JSON.parse(cryptoList);
      }
      this.connectToWebSocket();
  },

  beforeUnmount () {
    this.connection.close();
    this.connection = null; // to prevent memory leacking

    const cryptoList = JSON.stringify(this.updatedCoins); 
    localStorage.setItem('cryptoList', cryptoList); 

  },

  methods: {
    connectToWebSocket() {
      this.connection = new WebSocket("wss://stream.binance.com:9443/ws/" +
               "btcusdt@ticker" +
               "/dogeusdt@ticker" +
               "/ethusdt@ticker" +
               "/avaxusdt@ticker" +
               "/solusdt@ticker" +
               "/ltcusdt@ticker" +
               "/bnbusdt@ticker" +
               "/adausdt@ticker" +
               "");
    
      this.connection.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        data.name = nameLookup(data.s.slice(0,-4), { exact: true })
        const cryptoIndex = this.updatedCoins.findIndex(coin => coin.s === data.s);
        if (cryptoIndex !== -1) {
          const crypto = this.updatedCoins[cryptoIndex];
          crypto.c = data.c;
          crypto.P = data.P;
        }
        else {
              this.updatedCoins.push(data);
            }
        }

      this.connection.onopen = () => {
        console.log("Successfully connected to websocket server...");
      };

      this.connection.onclose = (event) => {
        console.log('Connection closed with code', event.code);
      };
    },

    closeWebSocket(){
      this.connection.close();
    },

    sortByChanges(){
        if(!this.isChangesSorted){
           this.updatedCoins.sort((a, b) => b.P - a.P);
           this.isChangesSorted = true
         }
      else {
          this.updatedCoins.sort((a, b) => a.P - b.P);
          this.isChangesSorted = false;
        }
        this.isPriceSorted = false; //reset price sort
    },

    sortByPrice(){
        if(!this.isPriceSorted){
            this.updatedCoins.sort((a, b) => b.p - a.p);
            this.isPriceSorted = true
          }
        else{
            this.updatedCoins.sort((a, b) => a.p - b.p);
            this.isPriceSorted = false;
        }
        this.isChangesSorted = false; //reset changes sorted
     }
  },
  components: { CryptoItem },
};

</script>

<style scoped>
  .telegram-theme {
    color: #fff;
    font-family: sans-serif;
    text-align: center;
  }
.cryptocurrency-list {
    width: 700px;
    list-style: none;
    margin: 0;
    padding: 0;
    display: inline-block;
  }
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #292b42;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  margin-bottom: 10px;
}

.header-item {
  flex: 1;
  text-align: center;
}

.header-item.name {
  flex: 2;
  text-align: left;
  padding-left: 100px;
}

.header-item.change {
  color: #00ff00;
  padding-right: 50px;
}

.header-item.price {
  color: #ffff00;
  margin-right: -35px;
}


</style>