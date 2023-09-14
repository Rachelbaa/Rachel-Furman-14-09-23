import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueDebounce from 'vue-debounce';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
export const EventBus = new Vue();


//STYLES
import "./styles/styles.scss"

Vue.use(ElementUI);
Vue.use(vueDebounce)
Vue.use(PerfectScrollbar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

