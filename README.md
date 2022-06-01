# demo

## 1. 项目启动
```
npm install
npm run serve
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 2. 项目介绍
* 本项目所有组件全拷贝于ElementUI源码，只为测试阅读学习ElementUI源码
* 步骤：
1. 将ElementUI 组件拷贝放到此项目测src/components下，如container\footer\main\header组件
2. 在此项目根路径的main.js中引入container\footer\main\header组件并注册
```js
// 引入组件
import ElContainer from './components/container'
import ElHeader from './components/header'
import ElMain from './components/main'
import ElFooter from './components/footer'
// 全局注册组件
Vue.component(ElContainer.name,ElContainer);
Vue.component(ElHeader.name,ElHeader);
Vue.component(ElMain.name,ElMain);
Vue.component(ElFooter.name,ElFooter);
```
## 3. 安装ElementUI的样式库
```js
// 安装
cnpm i element-theme-chalk -S
// 在main.js中引入
import 'element-theme-chalk';
```