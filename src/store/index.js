import Vue from 'vue'
import Vuex from 'vuex'
import encuesta from '../modules/encuesta'
import graficas from '../modules/graficas'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        encuesta,
        graficas
    }
})