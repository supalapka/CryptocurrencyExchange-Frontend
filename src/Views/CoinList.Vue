<template>
    <div class="app">
      <CryptoList />
      <button @click="goToMain">Go to Main</button>

</div>

</template>

<script>
import CryptoList from "@/components/CryptoList.vue"

export default{
    components:{
       CryptoList,
        SuperHeader,
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