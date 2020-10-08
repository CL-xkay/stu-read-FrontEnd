import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//全局引入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';

//全局引入echarts
import echarts from "echarts";
Vue.prototype.echarts = echarts
Vue.use(echarts);

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
