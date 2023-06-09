import { createRouter, createWebHistory } from 'vue-router';
import CryptoList from "@/components/CryptoList.vue";
import MainPage from "@/components/home_page/MainPage.vue";
import CoinPage from "@/Views/CoinPage.vue";
import JustRegister from "@/Views/JustRegister"
import JustLogin from "@/Views/JustLogin"
import UserProfile from "@/components/profile/UserProfile"
import UserWallet from "@/components/profile/UserWallet"
import UserStaking from "@/components/profile/UserStaking"
import TransferCrypto from "@/components/profile/TransferCrypto"
import FuturesPage from "@/Views/FuturesPage"
import StakingPage from "@/Views/StakingPage"

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/market',
    component: CryptoList
  },
  {
    path: '/market/:symbol',
    component: CoinPage
  },
  {
    path: '/register',
    component: JustRegister
  },
  {
    path: '/staking',
    component: StakingPage
  },
  {
    path: '/login',
    component: JustLogin
  },

  {
    path: '/futures/',
    component: FuturesPage
  },
  {
    path: '/profile',
    component: UserProfile,
    children: [
      {
        path: 'wallet',
        component: UserWallet
      },
      {
        path: 'transfer',
        component: TransferCrypto
      },
      {
        path: 'staking',
        component: UserStaking
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
