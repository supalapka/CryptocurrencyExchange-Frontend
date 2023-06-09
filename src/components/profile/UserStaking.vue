<template>
    <div class="staking">
        <div class="staking-header">
            <h2>Your Stakings</h2>
        </div>
        <staking-list :stakings="activeStakings"/>
    </div>

    <hr style="margin:50px;" />

    <div class="staking">
        <div class="staking-header">
            <h2>Completed Stakings</h2>
        </div>
        <staking-list :stakings="completedStakings"/>
    </div>

</template>
  
<script>
import axios from 'axios';
import { cryptoSymbol } from 'crypto-symbol'
import { baseUrl } from '@/utils/utils.js';
import StakingList from '../staking/StakingList.vue';

const { nameLookup } = cryptoSymbol({})
export default {
    data() {
        return {
            activeStakings: [],
            completedStakings: [],
        }
    },

    components: {
        StakingList,
    },


    async created() {
        await axios.get(`${baseUrl}/staking/user-coins`)
            .then(
                response => {
                    response.data.map(async staking => {
                        console.log(staking);
                        staking.name = nameLookup(staking.stakingCoin.symbol, toString(), { exact: true });
                        staking.logo = 'https://cryptologos.cc/logos/' + staking.name.toLowerCase() + '-' + staking.stakingCoin.symbol.toLowerCase() + '-logo.png';

                        if (staking.isCompleted === false)
                            this.activeStakings.push(staking);
                        else
                            this.completedStakings.push(staking);
                    })
                });
    },

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

</style>