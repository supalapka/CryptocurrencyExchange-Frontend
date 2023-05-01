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
          <td>{{ coin.s }}</td>
          <td>${{ parseFloat(coin.c) }}</td>
          <td :class="parseFloat(coin.P) > 0 ? 'positive' : 'negative'"> {{ parseFloat(coin.P).toFixed(2) }}%</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>


<script>
import { handleMessage, fillWebSocketUrl } from '@/utils/wsUtils.js';
import { allCryptoSymbols } from '@/utils/utils.js';

export default {

  data() {
    return {
      updatedCoins: [],
    }
  },

  created() {
    this.updateCoins();
    this.connectToWebSocket();
  },

  unmounted() {
    this.closeWebSocket();
  },

  methods: {
    selectCoint(coin) {
      this.$emit("selectCoin", coin);
    },

    updateCoins() {
      this.coinSymbolsByPage = allCryptoSymbols.slice(0, 12);
      const coins = this.coinSymbolsByPage.map(item => ({ s: item }));
      this.updatedCoins = [...this.updatedCoins, ...coins];
    },

    connectToWebSocket() {
      const url = fillWebSocketUrl(allCryptoSymbols.slice(0, 12))
      this.connection = new WebSocket(url);

      this.connection.onmessage = async (event) => {
        handleMessage(JSON.parse(event.data), this.updatedCoins)
      }

      this.connection.onopen = () => {
        console.log("Successfully connected to websocket futures server...");
      };

      this.connection.onclose = (event) => {
        console.log('Connection closed with code', event.code);
      };
    },

    closeWebSocket() {
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

tbody td,
tbody th {
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