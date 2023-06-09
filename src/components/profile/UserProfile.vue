<template>
    <table>
        <tr>
        <td style="width: 200px;">
        
            <nav>
		<ul>
			<li><a @click="routeToWallet">Wallet</a></li>
			<li><a @click="routeToStaking">Staking</a></li>
			<li><a @click="routeToTransfer">Transfer </a></li>
			<br> <br>
			<li><a href="#">Deposit</a></li>

			<li class ="logout"><a @click="logout">Log out</a></li>
		</ul>
	</nav></td>
	<td style="width:auto; vertical-align: top;">
		<router-view></router-view>
		<!-- <UserWallet/> -->
	</td>
    </tr>
    </table>

</template>

<script>
import axios from "axios";
export default {
	methods:{
		routeToWallet(){
			this.$router.push('/profile/wallet')
		},

		routeToTransfer(){
			this.$router.push('/profile/transfer')
		},

		routeToStaking(){
			this.$router.push('/profile/staking')
		},

		logout(){
			this.$router.go('/main');
			localStorage.removeItem('jwt');
			this.$emit('logout', false);
			delete axios.defaults.headers.common['Authorization'];
		}
	}
}
</script>

<style scoped>
		nav {
			background-color: #292a3a;
			color: #fff;
			width: 200px;
            height: 93vh;
			left: 0;
			top: 0;
		}
		nav ul {
			list-style-type: none;
            margin-block-start: 0em;
            padding-top: 30px;

		}
		nav li {
			margin-bottom: 10px;
		}
		nav a {
			color: #fff;
			text-decoration: none;
			font-size: 18px;
			font-weight: bold;
		}

		nav li.logout {
    position: absolute;
    bottom: 10px;
}

	</style>