<template>
  <table >
    <tbody>

      <tr style="height: 10px;">
      </tr>
      <tr >
        <td class="notification">
            <UserNotification/>
        </td>
      </tr> 

      <tr >
      <td class="crypto-news-td" >
        <div class="crypto-news-div"  >
        <CryptoNews />
      </div>
      </td>
      
      <td>
        <Ad_promotion style="margin-left: 12px;"/>
      </td>
    </tr>

    </tbody>
  </table>
  <futures-how-to/>

</template>

<script>
import CryptoNews from '@/components/home_page/CryptoNews.vue';
import Ad_promotion from '@/components/home_page/Ad_promotion.vue';
import UserNotification from '@/components/home_page/UserNotification.vue';
import FuturesHowTo from '@/components/home_page/FuturesHowTo.vue';

export default{
  components:{
    CryptoNews,
    Ad_promotion,
    UserNotification,
    FuturesHowTo,
}
}
</script>

<style scoped>

.crypto-news-td{
 background-color:#292a3a;
 width:800px;
 border-radius: 5px;
  }
.crypto-news-div{
  height: 450px; 
  width: 800px;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  background-color: #292b42;
}

/* Цвет трека (области, где может перемещаться скроллбар) */
::-webkit-scrollbar-track {
  background-color: #353855;
}

/* Цвет самого скроллбара */
::-webkit-scrollbar-thumb {
  background-color: #515680;
  border-radius: 10px;
}

/* Стиль кнопок вверх и вниз */
::-webkit-scrollbar-button {
  display: none;
}

</style>