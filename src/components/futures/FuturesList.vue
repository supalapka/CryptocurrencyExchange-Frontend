<template>
    <div class="cryptocurrencies">
  <table>
    <thead>
      <tr>
        <th>Cryptocurrency</th>
        <th>Price</th>
        <th>Change</th>
      </tr>
    </thead>
    <tbody>

      <tr class="coins-list" v-for="coin in updatedCoins" :key="coin.s" @click="selectCoint(coin)">
        <td>{{coin.name}}</td>
        <td>${{parseFloat(coin.c)}}</td>
        <td :class="parseFloat(coin.P) > 0 ? 'positive' : 'negative'"> {{parseFloat(coin.P).toFixed(2)}}%</td>
      </tr>
  
    </tbody>
  </table>
</div>
</template>


<script>
   import { cryptoSymbol } from 'crypto-symbol'
   const { nameLookup } = cryptoSymbol({})

export default{

  data(){
    return{
      updatedCoins:[],

    }
  },

  created(){
      if ( localStorage.getItem('futuresList') != null){
      const cryptoList = localStorage.getItem('futuresList');
      this.updatedCoins = JSON.parse(cryptoList);
      }
    this.connectToWebSocket();
  },

  unmounted(){
    const cryptoList = JSON.stringify(this.updatedCoins); 
    localStorage.setItem('futuresList', cryptoList); 
      this.closeWebSocket();
  },

  methods:{
    selectCoint(coin){
      this.$emit("selectCoin", coin);
    },

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
               "/shibusdt@ticker" +
               "/etcusdt@ticker" +
               "/luncusdt@ticker" +
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
        console.log("Successfully connected to websocket futures server...");
      };

      this.connection.onclose = (event) => {
        console.log('Connection closed with code', event.code);
      };
    },

    closeWebSocket(){
      this.connection.close();
    },
  },
}
</script>

<style scoped>
.cryptocurrencies {
  max-width: 400px;
  max-height: 400px;
  overflow: auto;
  background-color: #1c1e23;
  border-radius: 10px;
  border: 1px solid #575656;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

thead th {
  font-weight: bold;
  border-bottom: 1px solid #34383e;
}

tbody td, tbody th {
  padding: 10px;
  border-bottom: 1px solid #34383e;
}

.coins-list:hover {
  background-color: #575656;
}


::-webkit-scrollbar {
  background-color: #39393a;
}

/* Цвет трека (области, где может перемещаться скроллбар) */
::-webkit-scrollbar-track {
  background-color: #323233;
}

/* Цвет самого скроллбара */
::-webkit-scrollbar-thumb {
  background-color: #7d7d7e;
  border-radius: 10px;
}

/* Стиль кнопок вверх и вниз */
::-webkit-scrollbar-button {
  display: none;
}
</style>