<template>
<table>
    <tbody>
        <tr>
            <td style="width: 70%; background-color: #1c1e23; margin: 4px; ">
                <CryptoGraph :symbol="this.symbol" graph-width="900px" graph-height="600px"/>
            </td>
            
            <td style="width: 30%;">
                <FuturesList  @selectCoin="selectCoin"/>
                <div style="height: 240px; ">
                    <FuturesInput ref="ihateprogramming2" @updatePositions="updatePositions" :symbol="symbol" :price="price"/>
                </div>
            </td>
        </tr>
    </tbody>
</table>

<div class="futures-positions">
    <PositionsList @closePosition="updateBalance" ref="ihateprogramming" />
</div>

</template>


<script>
import FuturesList from "@/components/futures/FuturesList.vue"
import FuturesInput from "@/components/futures/FuturesInput.vue"
import CryptoGraph from "@/components/CryptoGraph.vue"
import PositionsList from "@/components/futures/PositionsList.vue"
import axios from 'axios'
import { baseUrl } from '@/utils/utils'
export default{
    components:{
    FuturesList,
    CryptoGraph,
    FuturesInput,
    PositionsList
},

    data(){
        return{
            symbol: 'BTCUSDT',
            price: '',
        }
    },
     
    async created(){
        const response = await axios.get(`${baseUrl}/market/price/${this.symbol}`)
        this.price = response.data;
    },

    methods:{

        selectCoin(coin){
           this.symbol = coin.s;
           this.price = coin.c;
        },

        updatePositions(){
            this.$refs.ihateprogramming.updatePositions();
        },

        updateBalance(){
            this.$refs.ihateprogramming2.updateUsdtBalance();
        },

    },
   
}
</script>


<style scoped>
.futures-positions{
    height: 300px;
    
}

::-webkit-scrollbar {
  background-color: #39393a;
}

::-webkit-scrollbar-track {
  background-color: #323233;
}

::-webkit-scrollbar-thumb {
  background-color: #7d7d7e;
  border-radius: 10px;
}

::-webkit-scrollbar-button {
  display: none;
}
</style>