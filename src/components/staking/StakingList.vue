<template>
    <div class="staking-table">
        <table>
            <thead>
                <tr>
                    <th>Coin</th>
                    <th>Amount</th>
                    <th>Period</th>
                    <th>Rate Per Year</th>
                    <th>Profit Per Period</th>
                </tr>
            </thead>

            <tbody v-for="staking in stakings" :key="staking.id">
                <tr>
                    <td>
                        <img :src="staking.logo">
                        <span><a @click="goToCoin(staking.stakingCoin.symbol)">{{ staking.name }}</a></span>
                        <span class="asset-symbol">({{ staking.stakingCoin.symbol }})</span>
                    </td>
                    <td>{{ staking.amount }}</td>
                    <td>{{ staking.durationInMonth }}
                        <span v-if="staking.durationInMonth == 1">Month</span>
                        <span v-else>Months</span>
                    </td>
                    <td>{{ (staking.stakingCoin.ratePerMonth * 12).toFixed(2) }}%</td>
                    <td class="positive">{{ (staking.stakingCoin.ratePerMonth * staking.durationInMonth).toFixed(2) }}%
                        ({{ (staking.amount / 100 * (staking.stakingCoin.ratePerMonth *
                            staking.durationInMonth).toFixed(4)) }} {{ staking.stakingCoin.symbol }})
                    </td>
                </tr>
            </tbody>

        </table>
    </div>
</template>
  
<script>
export default {
    props: {
        stakings: [],
    },


    methods: {
        goToCoin(symbol) {
            this.$router.push('/market/' + symbol);
        }
    }
};
</script>
  
<style scoped>
.staking {
    margin: 20px;
    font-family: Arial, sans-serif;
    color: #fff;
    background-color: #1d1e2e;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.staking-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #292a3a;
    border-bottom: 1px solid #1d1e2e;
}

.staking-header h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
}


.staking-table {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

thead {
    background-color: #292a3a;
}

thead th {
    padding: 15px 20px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    border-right: 1px solid #1d1e2e;
}

thead th:last-child {
    border-right: none;
}

tbody tr {
    border-bottom: 1px solid #1d1e2e;
}

tbody tr:last-child {
    border-bottom: none;
}

tbody td {
    padding: 15px 20px;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    border-right: 1px solid #1d1e2e;
}

tbody td:last-child {
    border-right: none;
}



td:first-child {
    display: flex;
}

td img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}


td span {
    margin-right: 5px;
}

.asset-symbol {
    font-size: 12px;
    font-weight: 400;
    color: #b3b3b3;
}
</style>