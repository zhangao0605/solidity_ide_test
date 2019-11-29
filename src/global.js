import Vue from 'vue'
import lan from '@/Framework/Language'
import Permission from './components/Permission'
import Header from './components/header'

// 全局方法
Vue.prototype.$lan = lan

// 全局组件
Vue.component('Permission', Permission)
Vue.component('Header', Header)