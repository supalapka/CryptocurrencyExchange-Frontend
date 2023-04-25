<template>
    <div class="app">
      <CoinPage />

</div>

</template>

<script>
import CoinPage from "@/components/CoinPage.vue";

export default{
    components:{
    CoinPage
},

    methods: {
        goToMain() {
      this.$router.push('/')
    }
  },
}
</script>

<style>

</style>