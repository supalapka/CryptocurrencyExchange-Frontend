<template>
<div class="balance-section">
  <div class="balance-info">
    <span class="balance-label">Balance:</span>
    <span class="balance-amount">{{ this.usdtBalance }} USDT</span>
  </div>
  <div class="leverage-info">
    <span class="leverage-label">Leverage:</span>
    <input v-model="leverage" type="range" min="1" max="100"  class="leverage-slider">
    <span class="leverage-value">{{ leverage }}x</span>
  </div>
  <div class="trade-info">
    <span class="trade-label">Margin:</span>
    <input v-model="margin" type="number" class="trade-input" min="0" :max="usdtBalance">
    <span class="trade-currency">USDT</span>
  </div>
  <div class="action-buttons">
    <button @click="createLongPosition" class="long-button">Long {{ this.symbol }}</button>
    <button @click="createShortPosition" class="short-button">Short {{ this.symbol }}</button>
  </div>
</div>

</template>

<script>
    import axios from 'axios';

    export default{
        data(){
            return{
                leverage: 1,
                margin: 0,
                usdtBalance: 0,
                position: {
                 Long: 0,
                 Short: 1,
                },
            }
        },
        props:{
            symbol:{
                type: String,
                required: true,
            },
            price:{
                type: Number,
                required: true,
            }
        },

         created(){
            this.updateUsdtBalance();
         },

        methods: {
          updateUsdtBalance(){
                 axios.get('https://cryptocurrencyexchange.azurewebsites.net/auth/coin-amount/usdt')
                    .then(response => {
                        this.usdtBalance = response.data.toFixed(2);
                    });
            },

            createLongPosition(){
              const position = this.position.Long;
              this.createFuture(position);
            },

            createShortPosition(){
              const position = this.position.Short;
              this.createFuture(position);
            },

            createFuture(positionParam){
              axios.post('https://cryptocurrencyexchange.azurewebsites.net/futures/create',{
                Symbol: this.symbol,
                Margin: this.margin,
                Leverage: this.leverage,
                EntryPrice: this.price,
                Position: positionParam
                }, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

               setTimeout(() => { //time set because future be not applied yet 
                this.updateUsdtBalance();
                this.$emit('updatePositions');
              }, 1000);
            },
            
        },
    }
</script>

<style scoped>
.balance-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1c1e23;
  border-radius: 20px;
  padding-top: 50px;
  height: 170px;
  margin-top: 8px;
  margin-left: 4px;
  border-radius: 10px;
  border: 1px solid #575656;
}

.balance-info, .leverage-info, .trade-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.balance-label, .leverage-label, .trade-label {
  margin-right: 10px;
  color: #fff;
  font-size: 20px;
}

.balance-amount {
  font-weight: bold;
  color: #fff;
}

.leverage-slider {
  width: 100px;
  margin-left: 10px;
}

.leverage-value {
  margin-left: 5px;
  color: #fff;
}

.trade-input {
  width: 100px;
  margin-left: 10px;
  background-color: #414141;
  color: #fff;
}

.trade-currency {
  margin-left: 5px;
  color: #fff;
}

.action-buttons {
  display: flex;
  justify-content: center;
}

.long-button, .short-button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  margin: 10px;
  margin-left: 30px;
  margin-right: 30px;
  width: 120px;
}

.short-button {
  background-color: #f44336;
}

</style>
