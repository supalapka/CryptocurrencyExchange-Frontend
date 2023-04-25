<template>


<div class="positions-block">

  <h3  @click="changeTab">Positions</h3> 
  <h3 @click="changeTab">History</h3> 

  <div v-if="!isHistiryTabActivated" id="positions" class="tabcontent active">
    <h2>Positions</h2>
    <div class="positions-table">
      <div class="positions-row header">
        <div class="position-cell">Trading Pair</div>
        <div class="position-cell">Position</div>
        <div class="position-cell">Entry Price</div>
        <div class="position-cell">Current Price</div>
        <div class="position-cell">PNL</div>
        <div class="position-cell">Margin</div>
        <div class="position-cell">Action</div>
      </div>

      <div class="positions-row" v-for="position in positions" :key="position.id">
        <div class="position-cell">{{position.symbol}}</div>
        <div class="position-cell">
          <span :class="position.position == 'Long' ? 'positive' : 'negative'">{{position.position}}</span>
          <span class="leverage">{{ position.leverage }}x</span>
        </div>
        <div class="position-cell">${{position.entryPrice}}</div>
        <div class="position-cell">${{position.currentPrice}}</div>
        <div :class="parseFloat(position.percentChange) > 0 ? 'position-cell positive' : 'position-cell negative'">
          {{position.usdtPNL}}$ ({{ position.percentChange}}%)
        </div>
        <div class="position-cell">{{position.margin}} USDT</div>

        <button @click="closePosition(position.id, position.usdtPNL, position.currentPrice)" class="position-cell close-btn">
          Close
        </button>
      </div>
    </div>
  </div>

  <div v-else id="history" class="tabcontent">
    <h2>History</h2>
    <div class="history-table">
      <div class="positions-table">
      <div class="positions-row header">
        <div class="position-cell">Trading Pair</div>
        <div class="position-cell">Position</div>
        <div class="position-cell">Entry Price</div>
        <div class="position-cell">Mark Price</div>
        <div class="position-cell">Margin</div>
      </div>

      <div class="positions-row" v-for="position in historyPositions" :key="position.id">
        <div class="position-cell">{{position.symbol}}</div>
        <div class="position-cell">
          <span :class="position.position == 'Long' ? 'positive' : 'negative'">{{position.position}}</span>
          <span class="leverage">{{ position.leverage }}x</span>
        </div>
        <div class="position-cell">${{position.entryPrice}}</div>
        <div class="position-cell">${{position.markPrice}}</div>
        <div class="position-cell">{{position.margin}} USDT</div>
        <div :class="parseFloat(position.percentChange) > 0 ? 'position-cell positive' : 'position-cell negative'">
          {{position.usdtPNL}}$ ({{ position.percentChange}}%)
        </div>
      </div>
      <p >Total: <span :class="parseFloat(totalProfit) > 0 ? 'positive' : 'negative'"> {{ totalProfit.toFixed(2) }}$ </span></p>
    </div>
    </div>
  </div>
</div>

</template>


<script>
import axios from 'axios';

export default{
    data(){
        return{
            positions:[],
            historyPositions:[],
            isHistiryTabActivated: false,
            totalProfit: 0,
        }
    },

    async created(){
      await this.updatePositions();
    },

    methods:{
      closePosition(id, pnl, markPrice){
        axios.get('https://localhost:7156/futures/close?id='+ id + '&pnl=' + pnl + '&markPrice=' + markPrice)
        .catch(error =>{
          console.log(error);
        });
        this.removePositionFromList(id);
        setTimeout(() => { //time set because future can be not closed yet 
                this.$emit('closePosition');
              }, 1000);
      },

      changeTab(){
        this.isHistiryTabActivated = !this.isHistiryTabActivated;
        this.updateHistory();
      },

      async updateHistory(){
        this.totalProfit = 0;
        await axios.get('https://localhost:7156/futures/history')
        .then(
          response =>{
            this.historyPositions = response.data;
          }
        );
        
        this.historyPositions.forEach(position =>{
          if(position.position === 0)
             position.position = 'Long'
          else
             position.position = 'Short'
          position.percentChange = this.calculatePercentChange(position.markPrice, position.entryPrice,
          position.leverage, position.position);
          position.usdtPNL = (position.margin * (position.percentChange / 100)).toFixed(2);
          this.totalProfit += parseFloat(position.usdtPNL);
      })},

      async updatePositions(){
        await axios.get('https://localhost:7156/futures/list')
        .then(response =>{
            this.positions = response.data;
        });

        await this.connectToWebSocketPrices();
      },


      calculatePercentChange(currentPrice, entryPrice, leverage, position) {
          let percentChange = (((currentPrice - entryPrice) / entryPrice) * 100).toFixed(2);
          percentChange = (percentChange * leverage).toFixed(2);
          if (position === 'Short') {
            percentChange = percentChange * -1;
          }
          return percentChange;
        },


        checkIfLiquidated(percentChange, id, markPrice){
            if(percentChange <= -100)
            this.luquidatePosition(id, markPrice);
        },


        luquidatePosition(id, markPrice){
            axios.get('https://localhost:7156/futures/liquidate/?id=' + id + '&markPrice=' + markPrice)   
            this.removePositionFromList(id);
        },


        removePositionFromList(id){
          let index = this.positions.findIndex(item => item.id === id);
              if (index !== -1) {
                this.positions.splice(index, 1);
              }
        },


        fillUrl(){
          let url = 'wss://stream.binance.com:9443/ws';
        const symbols = new Set();

        this.positions.forEach(position => {
          symbols.add(position.symbol.toLowerCase());
        });

        symbols.forEach(symbol => {
          url += '/' + symbol + '@ticker';
        });
        return url;
        },


      async connectToWebSocketPrices(){
       let url = this.fillUrl();

      this.connection = new WebSocket(url);
    
      this.connection.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            const cryptoIndexes = this.positions
              .filter(coin => coin.symbol === data.s)
              .map(position => this.positions.indexOf(position));

              cryptoIndexes.forEach(index => {
                let position = this.positions.at(index);
                if(position.position == 0)
                  position.position = 'Long'
                  else if(position.position == 1)
                  position.position = 'Short'
                  position.currentPrice = parseFloat(data.c);
                  position.percentChange =this.calculatePercentChange(position.currentPrice, position.entryPrice, position.leverage, position.position);
                  position.usdtPNL = (position.margin * (position.percentChange / 100)).toFixed(2);
                  this.checkIfLiquidated(position.percentChange, position.id, position.currentPrice);
              });
          }

              this.connection.onopen = () => {
                console.log("Successfully connected to websocket future positions server...");
              };

              this.connection.onclose = (event) => {
                console.log('Future positions connection closed with code', event.code);
              };
            },


      mounted() {
          this.$parent.$on('updatePositions', this.updatePositions);
      },
      beforeDestroy() {
          this.$parent.$off('updatePositions');
      },
      }
    }
</script>


<style scoped>

h3{
  border-bottom: 1px solid #575656;
  display: inline-block;
  margin-right: 24px; /* можно настроить отступ между элементами */
}
h3:hover{
  cursor: pointer;
}


.positions-block {
  margin-top: 8px;
  background-color: #1c1e23;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border: 1px solid #575656;

   overflow: auto;
  max-height: 270px;
}

.positions-row .position-cell.positive {
  color: #00d395;
}

.positions-row .position-cell.negative {
  color: #f44336;
}

.positions-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}
h2{
  margin-block-start: 8px;
    margin-block-end: 8px;

}
.positions-row {
  display: table-row;
}

.header {
  font-weight: bold;
  color: #a3a3a3;
}

.leverage{
    color: rgb(207, 207, 21);
    font-size: 15px;
}

/* .header .position-cell {
  padding: 10px;
  border-bottom: 1px solid #34383e;
} */

.positions-row{
  border-bottom: 1px solid #34383e;
}

.positions-row .position-cell {
  display: table-cell;
  padding: 10px;
}

.close-btn{
  color: rgb(207, 207, 21);
  background-color: transparent;
  border: none;
  font-size: 16px;
}
.close-btn:hover{
  cursor: pointer;
}
</style>