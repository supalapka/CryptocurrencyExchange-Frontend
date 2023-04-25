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

      <div v-for="coin in updatedCoins" :key="coin.s">
        <CryptoItem :coin="coin" />
      </div>

    </ul>

    <div class="pagination">
      <button @click="decrementPage()" class="prev-btn">&lt;</button>
      <button v-on:click="incrementPage" class="next-btn">&gt;</button>
    </div>

  </div>
</template>

<script>
import CryptoItem from './CryptoItem.vue';
import { cryptoSymbol } from 'crypto-symbol'
const { nameLookup } = cryptoSymbol({})

export default {
  data() {
    return {
      connection: null,
      updatedCoins: [],
      isChangesSorted: false,
      isPriceSorted: false,
      page: 1,
      coinSymbols: [],
      wsMessageQueue: []
    };
  },

  async created() {
    const urlData = Object.fromEntries(new URL(window.location).searchParams.entries());
    if(urlData.page)
    this.page = urlData.page

    await this.fillSymbols();

    if (localStorage.getItem('cryptoList') != null) {
      const cryptoList = localStorage.getItem('cryptoList');
      this.updatedCoins = JSON.parse(cryptoList);
    }
    this.connectToWebSocket();
  },


  beforeUnmount() {
    this.connection.close();
    this.connection = null; // to prevent memory leacking

    const cryptoList = JSON.stringify(this.updatedCoins);
    localStorage.setItem('cryptoList', cryptoList);

  },

  methods: {
    incrementPage() {
      this.page++;
      this.afterPageChanged();
    },

    decrementPage() {
      if (this.page == 1)
        return;
      this.page--;
      this.afterPageChanged();
    },

    afterPageChanged(){
      this.closeWebSocket();
      this.connectToWebSocket();
      this.changeUrl();
    },

    changeUrl(){
      window.history.pushState(null,"cryptolistpage",`${window.location.pathname}?page=${this.page}`)
    },


    async fillSymbols() {
      await fetch(`https://localhost:7156/market/list`)
        .then(response => response.json())
        .then(data => {
          this.coinSymbols = data;
        })
    },


    fillUrl() {
      let url = 'wss://stream.binance.com:9443/ws';

      const start = (this.page - 1) * 6;
      const end = this.page * 6 + 1;
      console.log(start + " - end" + end)

      console.log(this.coinSymbols);
      let pageSymbols = this.coinSymbols.slice(start, end);
      pageSymbols.forEach(symbol => {
        url += '/' + symbol.toLowerCase() + '@ticker';
      });
      return url;
    },


    processNextMessage() {
      const message = this.wsMessageQueue.shift();
      if (message) {
        this.handleMessage(message);
      }
    },


    connectToWebSocket() {
      this.updatedCoins = [];
      let url = this.fillUrl();
      this.connection = new WebSocket(url);

      this.connection.onmessage = async (event) => {
        const data = JSON.parse(event.data);
           this.wsMessageQueue.push(data);
      this.processNextMessage();
      }

      this.connection.onopen = () => {
        console.log("Successfully connected to websocket " + url);
      };

      this.connection.onclose = (event) => {
        console.log('Connection closed with code', event.code + ' url -> ' + url);
      };
    },

    handleMessage(data){
      const cryptoIndex = this.updatedCoins.findIndex(coin => coin.s === data.s);
        if (cryptoIndex !== -1) {
          const crypto = this.updatedCoins[cryptoIndex];
          crypto.c = data.c;
          crypto.P = data.P;
        }
        else {
          data.name = nameLookup(data.s.slice(0, -4), { exact: true })
          this.updatedCoins.push(data);
        }
    },

    closeWebSocket() {
      this.connection.close();
    },

    sortByChanges() {
      if (!this.isChangesSorted) {
        this.updatedCoins.sort((a, b) => b.P - a.P);
        this.isChangesSorted = true
      }
      else {
        this.updatedCoins.sort((a, b) => a.P - b.P);
        this.isChangesSorted = false;
      }
      this.isPriceSorted = false; //reset price sort
    },

    sortByPrice() {
      if (!this.isPriceSorted) {
        this.updatedCoins.sort((a, b) => b.p - a.p);
        this.isPriceSorted = true
      }
      else {
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.prev-btn,
.next-btn {
  color: white;
  background-color: #292b42;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.prev-btn:hover,
.next-btn:hover {
  background-color: #3e2583;
}

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