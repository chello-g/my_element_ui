import Vue from 'vue'

import ElContainer from './components/container'
import ElHeader from './components/header'
import ElMain from './components/main'
import ElFooter from './components/footer'
import ELButton from './components/button'
import ELLink from './components/link'
import 'element-theme-chalk';
import App from './App.vue'

Vue.config.productionTip = false

Vue.component(ElContainer.name,ElContainer);
Vue.component(ElHeader.name,ElHeader);
Vue.component(ElMain.name,ElMain);
Vue.component(ElFooter.name,ElFooter);
Vue.component(ELButton.name,ELButton);
Vue.component(ELLink.name,ELLink);


new Vue({
  render: h => h(App),
}).$mount('#app')
