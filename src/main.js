// import "promise-polyfill"; //add polyfill
import 'es6-promise/auto'


import Vue from 'vue'
import App from './App.vue'
import router from './router/router';
import store from './store/store';
import { sync } from 'vuex-router-sync'


// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// require("normalize.css"); 
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require("./style/app.css");





var vm = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});


// vm.$mount("#app")
