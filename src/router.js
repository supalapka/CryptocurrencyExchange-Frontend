import { createRouter, createWebHistory } from 'vue-router';
import CryptoList from "@/components/CryptoList.vue";
import MainPage from "@/Views/MainPage.vue";
import CoinPage from "@/Views/CoinPage.vue";
import JustRegister from "@/Views/JustRegister"
import JustLogin from "@/Views/JustLogin"
import UserProfile from "@/components/profile/UserProfile"
import UserWallet from "@/components/profile/UserWallet"
import TransferCrypto from "@/components/profile/TransferCrypto"
import FuturesPage from "@/Views/FuturesPage"

const routes = [
  {
    path: '/main',
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
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
