import Vue from 'vue'
import Vuex from 'vuex'
import user from './Modules/user';
import partners from './Modules/partners';
import transactions from './Modules/transactions';
import options from './Modules/options';
import {mixin} from '../services/mixins.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        partners,
        transactions,
        options
    }
})
