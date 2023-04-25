<template>
<div class="promo-block">
        <div class="promo-text-container">
          <h2 class="promo-heading">Attention crypto traders!</h2>
          <p class="promo-text">Take advantage of our limited time offer and transfer crypto between accounts with <span class="promo-highlight">0% commission!</span></p>
          <p class="promo-subtext">No matter what type of crypto you hold, you can transfer it instantly and securely using just the recipient's ID.</p>
          <button @click="routeToTransfer" class="promo-btn">Try it now!</button>
        </div>
        <div class="promo-image-container">
          <img src="https://img.freepik.com/premium-vector/transfer-of-money-online-through-bank-mobile-applications_514879-211.jpg" 
          alt="Promotional Image" class="promo-image">
        </div>
      </div>
</template>

<script>
export default{
  methods:{
    routeToTransfer(){
      this.$router.push('/profile/transfer');
    }
  },
}
</script>

<style scoped>
.promo-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px 10px 30px;
  background-color: #292a3a;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}
h2{
  margin-block-start: 0.23em;
}
.promo-text-container {
  width: 60%;
  color: #fff;
}

.promo-heading {
  font-size: 32px;
  margin-bottom: 20px;
}

.promo-text {
  font-size: 24px;
  margin-bottom: 20px;
}

.promo-highlight {
  color: #5cd65c;
  font-weight: bold;
}

.promo-subtext {
  font-size: 18px;
  margin-bottom: 20px;
}

.promo-btn {
  padding: 12px 24px;
  font-size: 24px;
  font-weight: bold;
  background-color: #49a149;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.promo-btn:hover {
  background-color: #246b24;
}

.promo-image-container {
  width: 40%;
}

.promo-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
}
</style>