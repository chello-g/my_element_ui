import Vue from 'vue'
import ElContainer from './components/container'
import ElHeader from './components/header'
import ElMain from './components/main'
import ElFooter from './components/footer'
import App from './App.vue'

Vue.config.productionTip = false
Vue.component('MyElContainer',ElContainer);
Vue.component('MyElHeader',ElHeader);
Vue.component('MyElMain',ElMain);
Vue.component('MyElFooter',ElFooter);


new Vue({
  render: h => h(App),
}).$mount('#app')
