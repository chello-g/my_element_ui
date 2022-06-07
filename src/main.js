import Vue from 'vue'

import ElContainer from './components/container'
import ElHeader from './components/header'
import ElMain from './components/main'
import ElFooter from './components/footer'
import ELButton from './components/button'
import ELLink from './components/link'
import ELRadio from './components/radio'
import ELRadioButton from './components/radio-button'
import ELRadioGroup from './components/radio-group'
import 'element-theme-chalk';
import App from './App.vue'

Vue.config.productionTip = false

Vue.component(ElContainer.name,ElContainer);
Vue.component(ElHeader.name,ElHeader);
Vue.component(ElMain.name,ElMain);
Vue.component(ElFooter.name,ElFooter);
Vue.component(ELButton.name,ELButton);
Vue.component(ELLink.name,ELLink);
Vue.component(ELRadio.name,ELRadio);
Vue.component(ELRadioButton.name,ELRadioButton);
Vue.component(ELRadioGroup.name,ELRadioGroup);


new Vue({
  render: h => h(App),
}).$mount('#app')
