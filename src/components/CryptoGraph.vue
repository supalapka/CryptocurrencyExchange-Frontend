    <script>
    import CanvasJSChart from "@/components/CanvasJSVueComponent.vue"
    import TimeFrameButton from "@/components/UI/TImeFrameButton.vue"
    import {baseUrl } from '@/utils/utils.js';
    import axios from 'axios';
    export default {
        components: {
        CanvasJSChart, TimeFrameButton,
        },
        props: {
            symbol:{
               type: String,
               required: true,
              },
              graphWidth :{
                type: String,
                required: true,
              },
              graphHeight: {
                type: String,
                required: true,
              },
            },

        data() {
          return {
              gottenDataPoints: [],
              chart: null,
              options: {
              animationEnabled: true,
              theme: "dark1", // "light1", "light2", "dark1", "dark2"
              exportEnabled: true,
              axisX: {
                  interval: 1,
                  intervalType: "month",
                  valueFormatString: "MMM"
              },
              axisY: {
                  prefix: "$",
                  title: "Price in USD"
              },
              toolTip: {
                  content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
              },
              data: [{
                  type: "candlestick",
                  risingColor:"#32a86d",
                  fallingColor: "#ed0c0c",
                  yValueFormatString: "$##0.00",
                  xValueFormatString: "DD MMM YYYY",
                  dataPoints: [],
              }]
              },
              styleOptions: {
              width: this.graphWidth,
              height: this.graphHeight,
              }
          }
        },

        watch: {
          symbol: {
            handler() {
              this.updateTimeFrame("1w");
            },
          }
        },

        methods:{
            async updateTimeFrame(timeFrame){
              console.log(this.symbol);
                const url = `${baseUrl}/candles?Symbol=${ this.symbol}&Timeframe=${timeFrame}&Limit=200`;

               const response = await axios.get(url);
                this.options.data[0].dataPoints = response.data.map((data) => ({
                x: new Date(data.openTime), //date
                y: [parseFloat(data.open), parseFloat(data.high), parseFloat(data.low), parseFloat(data.close)],
                }));
            }
        }

        }
    </script>
    
    <template>
       <div class="chart-container">
    <div class="button-container">
      <TimeFrameButton text="1h" @timeFrameChanged="updateTimeFrame"/> 
      <TimeFrameButton text="4h" @timeFrameChanged="updateTimeFrame"/> 
      <TimeFrameButton text="1d" @timeFrameChanged="updateTimeFrame"/> 
      <TimeFrameButton text="3d" @timeFrameChanged="updateTimeFrame"/> 
      <TimeFrameButton text="1w" @timeFrameChanged="updateTimeFrame"/> 
      <TimeFrameButton text="1M" @timeFrameChanged="updateTimeFrame"/> 
    </div>

    <CanvasJSChart ref="chart" 
      @chart-ref="handleChartRef"
      :options="options"
      :style="styleOptions"
    />
  </div>
    </template>  


<style scoped>
.chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 4px;
  }

</style>


