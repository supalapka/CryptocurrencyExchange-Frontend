<template>
    <header>
      <nav>
        
        <div class="logo">
          <button class="header-btn" @click="goToMain">Crypto Exchange</button>
        </div>
       <crypto-search/>
        <div class="list">
         <button class="header-btn" @click="goToMarket">Market</button>
        </div>

        <div class="list">
         <button class="header-btn" @click="goToFutures">Futures</button>
        </div>

        <div class="login">
          <span  v-if="!this.isLoggedInMain" ><a @click="goToLogin">Login</a> / <a @click="goToRegister">Register</a> </span>
          <div class="user-email" v-else>
            <a @click="goToProfile">{{this.email}}</a>
          </div>
        </div>
      </nav>
    </header>
  
  </template>
  
  
  <script>
import axios from 'axios'
import {baseUrl } from '@/utils/utils.js';
import CryptoSearch from './CryptoSearch.vue';
  export default{
    components:{CryptoSearch},
    data(){
      return{
        email: '',
        isLoggedInMain: false,
      }
    },
     props: {
          isLoggedIn: {
          type: Boolean,
        },
        userEmail: {
          type: String,
          default: ''
        },
      },

      async created(){
        await axios.get(`${baseUrl}/email`) //try to authorize user with jwt when site is loaded
            .then(responce =>{
              this.email = responce.data;
              this.isLoggedInMain = true;
            });
          },

          watch: {
            userEmail(newValue) {
                this.email = newValue;
              },

              isLoggedIn(newValue) {
                this.isLoggedInMain = newValue;
              },
            },

    methods: {

      goToMarket() {
      this.$router.push('/market')
    },

    goToMain() {
      this.$router.push('/main')
    },

    goToRegister() {
      this.$router.push('/register')
    },

    goToLogin() {
      this.$router.push('/login')
    },

    goToProfile() {
      this.$router.push('/profile/wallet')
    },

    goToFutures() {
      this.$router.push('/futures')
    },

  },
}
  </script>
  
  <style scoped>
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: sans-serif;
    font-size: 16px;
  }
  
  header {
    background-color: #292a3a;
    color: #fff;
    height: 60px;
    padding: 0 20px;

    padding-top: 36px;
    padding-bottom: 36px;

    
    display: flex;   
    justify-content: center; 
  }
  
  nav {
    display: flex;
    align-items: center;
    height: 100%;
    width: 50%;
    /* justify-content: space-between; */

    display: flex;
  }
  
  .logo button {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    margin-left: -200px;
    width: 300px;
  }
  
  

  .user-email{
    font-size: 20px;
  }
  
  .login a {
    color: #fff;
    text-decoration: none;
  }

  a:hover {
  color: #aeafaf;
  cursor: pointer;
}

  .header-btn{
    color: #fff;
    border:none;
    background:none;
    cursor:pointer;
    font-size: 18px;
  }

  .list{
    padding-left: 30px;
  }

.login{
 padding-left: 200px;
 width: 500px;
font-size: 18px;
}
  
  </style>