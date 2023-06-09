<template>
<footer>
  <div class="footer-container">
    <div class="footer-col">
      <h3>About Us</h3>
      <p>Our crypto exchange is focused on providing platform for buying, trading, and staking cryptocurrencies. </p>
      <hr>
      <ul>
        <li><a href="#">Company</a></li>
        <li><a href="#">Team</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Services</h3>
      <ul>
        <li><a href="#">Cryptocurrency Trading</a></li>
        <li><a href="#">Deposit Funds</a></li>
        <li><a href="#">Withdraw Funds</a></li>
        <li><a href="#">API</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Help</h3>
      <ul>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">User Guides</a></li>
        <li><a href="#">Technical Support</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Subscribe to Our Newsletter</h3>
      <p>Stay up-to-date with our latest news and promotions</p>
      <form>
        <input type="email" placeholder="Enter your email address">
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>
</footer>

</template>

<script>

</script>


<style scoped>
*{
  text-shadow: 0 3px 6px rgba(2, 2, 2, 0.568);
}

footer {
  background-color: #292a3a;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}

.footer-col {
  width: 25%;
  padding: 0 15px;
}

.footer-col h3 {
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
}

.footer-col p {
  margin-bottom: 20px;
}

.footer-col ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-col ul li a {
  color: #fff;
  text-decoration: none;
}

.footer-col hr {
  border-color: #555;
  margin-top: 20px;
  margin-bottom: 20px;
}

@media screen and (max-width: 767px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .footer-col {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .footer-col:last-child {
    margin-bottom: 0;
  }
  
  .footer-col h3 {
    font-size: 20px;
  }
  
  .footer-col hr {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  
  .footer-col ul li {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
  .footer-col ul li:last-child {
    margin-right: 0;
  }
}

button[type="submit"] {
  background-color: #383b5c;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button[type="submit"]:hover {
  background-color: #1d1f33;
}

input[type="email"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 12px;
}

input[type="email"]:focus {
  outline: none;
  border-color: #292b42;
  box-shadow: 0px 0px 5px 0px rgba(41, 43, 66, 0.5);
}

.text-center {
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
}



</style>