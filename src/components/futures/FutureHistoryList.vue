<template>
    <div id="history" class="tabcontent">
        <h2>History</h2>
        <div class="history-table">
            <div class="positions-table">
                <div class="positions-row header">
                    <div class="position-cell">Trading Pair</div>
                    <div class="position-cell">Position</div>
                    <div class="position-cell">Entry Price</div>
                    <div class="position-cell">Mark Price</div>
                    <div class="position-cell">Margin</div>
                    <div class="position-cell">PNL</div>
                    <div class="position-cell">Action</div>
                </div>

                <div class="positions-row" v-for="position in historyPositions" :key="position.id">
                    <div class="position-cell">{{ position.symbol }}</div>
                    <div class="position-cell">
                        <span :class="position.position == 'Long' ? 'positive' : 'negative'">{{ position.position }}</span>
                        <span class="leverage">{{ position.leverage }}x</span>
                    </div>
                    <div class="position-cell">${{ position.entryPrice }}</div>
                    <div class="position-cell">${{ position.markPrice }}</div>
                    <div class="position-cell">{{ position.margin }} USDT</div>
                    <div
                        :class="parseFloat(position.percentChange) > 0 ? 'position-cell positive' : 'position-cell negative'">
                        {{ position.usdtPNL }}$ ({{ position.percentChange }}%)
                    </div>
                    <div class="position-cell">{{ position.action }}</div>
                </div>
                <div class="show-more-container" @click="showMore">
                <div class="show-more-text">
                    Show more
                </div>
                <div class="show-more-line"></div>
                <div class="show-more-glow"></div>
            </div>
                <p>Score for last {{ historyPositions.length }} positions: <span
                        :class="parseFloat(totalProfit) > 0 ? 'positive' : 'negative'"> {{ totalProfit.toFixed(2)
                        }}$
                    </span></p>
            </div>
           
        </div>
    </div>
</template>
    

<script>
import { calculatePercentChange } from "./futuresUtils.js"
import axios from 'axios'
import { baseUrl } from '@/utils/utils';
export default {

    data() {
        return {
            historyPositions: [],
            totalProfit: 0,
            page: 1,

        }
    },

    created() {
        this.updateHistoryByPage();
    },

    methods: {
        async showMore() {
            if (this.historyPositions.length % 5 != 0) // 5 is page size
                return;

            this.page++;
            await this.updateHistoryByPage();
        },

        async updateHistoryByPage() {
            await axios.get(`${baseUrl}/futures/history/${this.page}`)
                .then(
                    response => {
                        response.data.map(position => {
                            if (position.position === 0)
                                position.position = 'Long'
                            else
                                position.position = 'Short'

                            if (position.isLiquidated) {
                                position.percentChange = -100;
                                position.action = 'Liquidated';
                            }
                            else {
                                position.percentChange = calculatePercentChange(position.markPrice, position.entryPrice,
                                    position.leverage, position.position);
                                position.action = 'Closed';
                            }
                            position.usdtPNL = (position.margin * (position.percentChange / 100)).toFixed(2);
                            this.totalProfit += parseFloat(position.usdtPNL);

                            this.historyPositions.push(position);
                        })
                    }
                );
        },
    }
}

</script>


<style scoped>
.show-more-container { 
    margin-top: 10px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 35px;
    border-radius: 20px;
    overflow: hidden;
    background-color: #191919;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
    cursor: pointer;
}

.show-more-text {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    z-index: 2;
}

.show-more-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #3a3c52;
    z-index: 1;
    transition: width 0.3s ease-out;
}

.show-more-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 120px;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    background-color: #36374d;
    opacity: 0.5;
    filter: blur(30px);
    z-index: 0;
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.show-more-container:hover .show-more-line {
    width: 100%;
}

.show-more-container:hover .show-more-glow {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
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

h2 {
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

.leverage {
    color: rgb(207, 207, 21);
    font-size: 15px;
}

.positions-row {
    border-bottom: 1px solid #34383e;
}

.positions-row .position-cell {
    display: table-cell;
    padding: 10px;
}
</style>