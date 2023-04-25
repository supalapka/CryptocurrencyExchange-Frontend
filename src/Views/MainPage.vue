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


    <tr style="height:200px;">
        12312213
    </tr>


    </tbody>
  </table>

</template>

<script>
import CryptoNews from '@/components/CryptoNews.vue';
import Ad_promotion from '@/components/Ad_promotion.vue';
import UserNotification from '@/components/UserNotification.vue';

export default{
  components:{
    CryptoNews,
    Ad_promotion,
    UserNotification
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