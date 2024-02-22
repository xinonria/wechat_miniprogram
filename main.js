// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'

import {
	$http
} from '@escook/request-miniprogram'

uni.$http = $http

$http.baseUrl = 'https://api-hmugo-web.itheima.net'

$http.beforeRequest = function (options) {
  uni.showLoading({
  	title: "正在加载中..."
  })
}

$http.afterRequest = function (options) {
	uni.hideLoading();
}

uni.$showMsg = function (title = '出现错误', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif