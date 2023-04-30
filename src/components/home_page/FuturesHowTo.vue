<template>
<div class="how-to">
  <h2>How to trade futures</h2>
  <div class="step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Choose a futures contract</h3>
      <p>Select the futures contract that best fits your trading strategy and goals.</p>
      <img src="@/images/1_step.png" alt="Futures contract">
    </div>
  </div>
  <div class="step">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Analize chart</h3>
      <p>Take a look at chart and make sure that your strategy is right for current situation on market.</p>
      <img src="@/images/2_step.png" alt="Futures trading account">
    </div>
  </div>
  <div class="step">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Open a position</h3>
      <p>Enter the USDT amount you want and select leverage.</p>
      <img src="@/images/3_step.png" alt="Trading plan">
    </div>
  </div>
  <div class="step">
    <div class="step-number">4</div>
    <div class="step-content">
      <h3>Close the position</h3>
      <p>Monitor the markets and use technical analysis to identify time for close position.</p>
      <img src="@/images/4_step.png" alt="Market analysis">
    </div>
  </div>
  <button @click="this.$router.push('/futures')" class="button">Try trading futures</button>
</div>
</template>


<style scoped>
.how-to {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.how-to h2 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
}

.step {
  display: inline-block;
  width: 45%;
  margin: 20px;
}

.step-number {
  background-color: #37394e;
  color: #fff;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  font-size: 36px;
  font-weight: bold;
  line-height: 70px;
  margin: 0 auto 20px;
}

.step-content h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.step-content p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.step-content img {
  display: block;
  margin: 20px auto;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.3);
  height: 300px;
}

.button {
  display: inline-block;
  background-color: #292a3a;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 30px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px;
  border: none;
}

.button:hover {
  background-color: #3d3e4e;
}

</style>