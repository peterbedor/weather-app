import Vue from 'vue';
import axios from 'axios';
import VuejsDialog from 'vuejs-dialog';
import Notifications from 'vue-notification';
import { sync } from 'vuex-router-sync';

import App from './App';
import router from './router';
import store from './store';

const unsync = sync(store, router); // eslint-disable-line

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(VuejsDialog);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: '<App/>',
}).$mount('#app');
