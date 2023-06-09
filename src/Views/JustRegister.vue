<template >
  <div style="height: 700px;">
    <div class="container">
      <h1>Registration</h1>
      <form @submit.prevent="register">

        <label for="email">Email</label>
        <input type="email" v-model="email" required maxlength="32"/>
        <br>
        <br>
        <label for="password">Password</label>
        <input type="password" v-model="password" required minlength="6"/>

        <label for="password">Confirm Password</label>
        <input type="password" v-model="confirmPassword" required minlength="6" />

        <button class="button" type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {baseUrl } from '@/utils/utils.js';
export default{
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    }
  },

  methods :{
      async register(){
        if(this.password === this.confirmPassword){
          const response = await axios.post(`${baseUrl}/register`, {
                    email: this.email,
                    password: this.password,
                });
                if (response.status === 200) {
                console.log(response.data);
                const responselogin = await axios.post(`${baseUrl}/login`, {
                    email: this.email,
                    password: this.password,
                });
                this.jwt = responselogin.data;
                localStorage.setItem('jwt',this.jwt);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
                this.$router.push('/main')
                 this.$emit('loggedInUser', this.email)
                this.$router.push('/main');
                }
        }
      }
  }
}
</script>

<style scoped>
.button {
  display: block;
  margin: 0 auto;
  background-color: #3566af;
  border: none;
  color: #fff;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: #2b4a9e;
  cursor: pointer;
}

.container {
  position: relative;
  top: 100px;
  width: 500px;
  margin: 0 auto;
  padding: 50px;
  background-color: #2c2e47;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(163, 5, 5, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2rem;
  text-shadow: 2px 2px #000;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  background-color: #1d1e2e;
  color: #ffffff;
  font-size: 1.1rem;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  box-shadow: 0 0 3px #051a29;
}



a {
  color: #060f14;
  text-decoration: none;
  border-bottom: 1px solid #3498db;
}

</style>