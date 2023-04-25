<template>
    <div class="notification" v-if="notification.message">
      <div class="notification-content">
        {{ notification.message }}
        <button class="close-button" @click="closeNotification">&times;</button>

      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default{
    data(){
      return{
        notification: [],
      }
    },
  
    created(){
      this.getLastNotification();
    },
  
    methods:{
      getLastNotification(){
        axios.get('https://localhost:7156/auth/notifications/last')
        .then(response =>{
          this.notification = response.data;
        });
      },
  
      closeNotification() {
        axios.get('https://localhost:7156/auth/notifications/read/'+ this.notification.id);
        this.notification = [];
      }
    },
  }
  </script>
  
  <style scoped>
  .notification{
    background-color: rgb(92, 61, 39);
    padding: 5px;
    color: rgb(230, 230, 15);
    border-radius: 10px;
    margin-bottom: 8px;
  }
  
  .notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    padding: 0;
    margin-right: 10px;
  }
  </style>
  