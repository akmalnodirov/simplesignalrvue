import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueAxios from 'vue-axios';
import router from './router';
import Api from './services/api.js';
import Notifications from 'vue-notification';
import Vuelidate from 'vuelidate';
import TokenService from "./services/tokenService.js";
import axios from "axios/index";
import Moment from 'vue-moment';
import VueJwtDecode from 'vue-jwt-decode';
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import velocity from 'velocity-animate'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueMask from 'v-mask'
import VueApexCharts from 'vue-apexcharts';
import Paginate from 'vuejs-paginate';
import mixin from './services/mixins';

Vue.use(VueApexCharts);
Vue.component('paginate', Paginate);


Vue.config.productionTip = false;

/*axios.interceptors.response.use(res => res, error => {
    if (error.response && error.response.status === 401) {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        router.push({name: 'login'});
    }
    return Promise.reject(error)
});*/

window.axios = axios;
Vue.use(VueAxios, axios);
Vue.use(Api);
Vue.use(Notifications, {velocity});
Vue.use(VueToast);
Vue.use(Vuelidate);
Vue.use(Moment);
Vue.use(VueJwtDecode);
Vue.use(VModal, {dynamicDefault: {draggable: true, resizable: true}});
Vue.use(VueMask);
Vue.component('loading', Loading,);
Vue.component('DatePicker', DatePicker);
Vue.component('apexchart', VueApexCharts)

window.transfer = new Vue({
    router,
    store,
    mixins: mixin,
    render: h => h(App),
}).$mount('#app');

