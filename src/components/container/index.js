import Container from './src/main';

/* istanbul ignore next */
// Vue官网介绍的添加插件的方法，使用一个install
Container.install = function(Vue) {
  // Vue.component注册全局组件。
  Vue.component(Container.name, Container);
};

export default Container;

// 在vue官网中有介绍Vue.use：Vue.use( plugin )
// 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
// 该方法需要在调用 new Vue() 之前被调用。(在项目的main.js中Vue.use()要写上new Vue前面)
// 当 install 方法被同一个插件多次调用，插件将只会被安装一次。Vue.use 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。

// 插件使用的时候，通过全局方法 Vue.use() 使用插件。
// 如ElmentUI在使用的时候，可以在main.js全局引入
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);