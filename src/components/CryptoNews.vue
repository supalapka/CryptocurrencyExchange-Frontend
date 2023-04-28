<template>

    <div class="news-block">
   <h2 class="news-heading">Latest News</h2>
   <div class="news-container" v-for="news in newsList" :key="news.key">
 
     <div class="news-item">
       <div class="news-image">
         <img :src="news.imagePath" alt="News Image">
       </div>
       <div class="news-details">
         <h3 class="news-title">{{news.title}}</h3>
         <p class="news-date">{{news.time}}</p>
         <p class="news-description">{{news.body}}</p>
         <a :href="news.link" style="font-size: 12px;">Read More</a>
       </div>
     </div>
   
   </div>
 </div>
 
 
 </template>
 
 <script>
 import axios from 'axios';
 export default {
   data() {
     return {
       newsList:[],
     }
   },
 
   created() {
     axios.get('https://cryptocurrencyexchange.azurewebsites.net/get-news').then((response) => {
       this.newsList = response.data;
 
       this.newsList.forEach(element => {
         const date = new Date(element.time)
     const options = { year: 'numeric', month: 'long', day: 'numeric' }
     element.time = date.toLocaleDateString('en-US', options)
       });
      
     });
  }
 }
 </script>
 
 <style scoped>
 .news-container {
   max-width: 800px;
   margin: 0 auto;
 }

 .news-heading{
  margin-left: 30px;
 }

 a{
   color: aliceblue ;
 }
 
 .news-item {
   display: flex;
   margin-bottom: 20px;
   border-bottom: 1px solid #ddd;
   padding-bottom: 20px;
   margin:8px;
 }
 
 .news-image {
   width: 30%;
   margin-right: 20px;
   border-radius: 12px;
 }
 
 .news-image img {
   height: 160px;
   width: 220px;
   object-fit: cover; 
 }

 .news-title {
   font-size: 16px;
   font-weight: bold;
   margin-top: 0;
   margin-bottom: 10px;
 }
 
 .news-description {
   font-size: 14px;
   line-height: 1.3;
   margin-bottom: 10px;
 }
 
 .news-date {
   font-size: 12px;
   color: #999;
 }
 
 </style>