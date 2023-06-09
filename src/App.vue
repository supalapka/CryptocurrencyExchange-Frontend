<template >
    <div class="app">
      <SuperHeader :isLoggedIn="isLoggedIn" :userEmail="userEmail"  />
      <table>
     <tr>
    <td style="width: auto;"></td>
    <td style="width: 1300px;">
      <RouterView  @loggedInUser="updateLoginStatus" @logout="logout" ></RouterView>
    </td>
    <td style="width: auto;"></td>
  </tr>
</table>

<MyFooter/>
</div>

</template>

<script>
import axios from "axios"
import SuperHeader from "@/components/SuperHeader.vue"
import MyFooter from "@/components/MyFooter.vue"
export default{
    components:{
    SuperHeader,MyFooter
},
    data(){
        return{
          isLoggedIn: false,
          userEmail: '',
      }
    },

   async created() {
    this.tryToLogin();
    },

    methods: {
      tryToLogin(){
        const jwt = localStorage.getItem('jwt');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;

      },

    updateLoginStatus(email) {
      this.isLoggedIn = true;
      this.userEmail = email
    },

    logout(data) {
      console.log("logout");
      this.isLoggedIn = data;
    },
  },
}
</script>

<style>
* {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.positive {
  color: #00d395;
}

.negative {
  color: #f44336;
}

table {
  width: 100%;
  border-collapse: collapse;
}

/* td {
  border: 1px solid rgb(255, 255, 255);
} */

body {
  background-color: #191f2d;
  color: #fff;
  font-family: Arial, sans-serif;
  margin: 0px;
  
}

a:hover {
  cursor: pointer;
}

hr{
  box-shadow: 0 3px 6px rgba(255, 255, 255, 0.733);
}
    
</style>