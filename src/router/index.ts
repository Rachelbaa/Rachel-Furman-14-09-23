import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
import WeatherPage from '../pages/Weather-page.cmp.vue';
import FavoritesPage from '../pages/Favorites-page.cmp.vue';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'weatherPage',
    component: WeatherPage
  },
  {
    path: '/favorites',
    name: 'favoritesPage',
    component: FavoritesPage
  }
]


const router = new VueRouter({
  routes
})

export default router
