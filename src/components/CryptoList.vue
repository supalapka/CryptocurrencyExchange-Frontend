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
        <CryptoItem :coinProps="coin" />
      </div>
    </ul>

    <div class="pagination">
      <button @click="decrementPage()" class="prev-btn">&lt;</button>
      <button @click="incrementPage" class="next-btn">&gt;</button>
    </div>

  </div>
</template>

<script>
import { fillWebSocketUrl, handleMessage } from '@/utils/wsUtils.js';
import { allCryptoSymbols, sortByChanges, sortByPrice } from '@/utils/utils.js';
import CryptoItem from './CryptoItem.vue';

export default {
  data() {
    return {
      connection: null,
      updatedCoins: [],
      sortOptions: {
        isChangesSorted: false,
        isPriceSorted: false,
      },
      page: 1,
      coinSymbols: [],
      coinSymbolsByPage: [],
      maxCoinsPerPage: 6,
    };
  },


  async created() {
    const urlData = Object.fromEntries(new URL(window.location).searchParams.entries());
    if (urlData.page)
      this.page = urlData.page

    this.coinSymbols = allCryptoSymbols;
    await this.connectToWebSocket();

  },


  beforeUnmount() {
    this.connection.close();
    this.connection = null; // to prevent memory leacking
  },

  methods: {
    incrementPage() {
      if(this.coinSymbols.slice((this.page - 1) * this.maxCoinsPerPage, this.page * this.maxCoinsPerPage).length != this.maxCoinsPerPage)
        return;
      this.page++;
      this.afterPageChanged();
    },


    async decrementPage() {
      if (this.page == 1)
        return;
      this.page--;
      await this.afterPageChanged();
    },


    async afterPageChanged() {
      this.closeWebSocket();
      await this.connectToWebSocket();
      this.changeUrl();
    },


    changeUrl() {
      window.history.pushState(null, "cryptolistpage", `${window.location.pathname}?page=${this.page}`)
    },

    updateCoins() {
      this.updatedCoins = [];
      this.coinSymbolsByPage = this.coinSymbols.slice((this.page - 1) * this.maxCoinsPerPage, this.page * this.maxCoinsPerPage);
      const coins = this.coinSymbolsByPage.map(item => ({ s: item }));
      this.updatedCoins = [...this.updatedCoins, ...coins];
    },

    async connectToWebSocket() {
      this.updateCoins();
      console.log(this.updatedCoins);
      let url = fillWebSocketUrl(
        this.coinSymbols.slice((this.page - 1) * this.maxCoinsPerPage, this.page * this.maxCoinsPerPage)
      );

      return new Promise((resolve, reject) => {
        this.connection = new WebSocket(url);

        this.connection.onmessage = async (event) => {
          handleMessage(JSON.parse(event.data), this.updatedCoins);
        };

        this.connection.onopen = () => {
          console.log("Successfully connected to websocket " + url);
          resolve(this.connection);
        };

        this.connection.onerror = (error) => {
          console.log("WebSocket error: " + error);
          reject(error);
        };

        this.connection.onclose = (event) => {
          console.log('Connection closed with code', event.code + ' url -> ' + url);
        };
      });
    },


    closeWebSocket() {
      if(this.connection != null){
      this.connection.close();
      this.connection = null
      }
    },

    sortByChanges() {
      sortByChanges(this.sortOptions, this.updatedCoins);
    },

    sortByPrice() {
      sortByPrice(this.sortOptions, this.updatedCoins);
      console.log(this.sortOptions.isPriceSorted);
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