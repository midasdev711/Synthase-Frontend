/*
So the store holds a bunch of global variables (within state) and functions that work
across the entire project. Any component can import the store and use the functions
defined here, or access the state.
*/

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import {
  resolve
} from 'url'

Vue.use(Vuex)

axios.defaults.withCredentials = true

export default new Vuex.Store({
  strict: true,
  state: {
    logged_in: false,
    search_results: null,
    qr_code: null,
    threats: null,
    indicators: null,
    current_query: null,
    // dashboard: null,
    dashboard_onions: null,
    dashboard_telegram: null,
    dash_current_query: null,
    prod_url: '/api',
    dev_url: '/api'
  },
  mutations: {
    update_results (state, res) {
      console.log(res)
      state.search_results = res.data
      state.current_query = res.query
    },
    update_threats (state, data) {
      state.threats = data.threats
    },
    // update_dashboard(state, data) {
    //   state.dashboard = data;
    //   if (typeof data.query == 'undefined'){
    //     state.dash_current_query = {
    //       page: 1
    //     }
    //   }
    //   else {
    //     state.dash_current_query = data.query
    //   }
    // },
    update_dashboard_onions (state, data) {
      state.dashboard_onions = data
      console.log(data)
    },
    update_dashboard_telegram (state, data) {
      state.dashboard_telegram = data
      console.log(data)
    },
    remove_term (state, term) {
      if (state.current_query.terms.length > 1) {
        const index = state.current_query.terms.indexOf(term)
        state.current_query.terms.splice(index, 1)
      }
    },
    add_to_terms (state, term) {
      if (state.current_query.terms.indexOf(term) == -1) {
        state.current_query.terms.push(term)
      }
    },
    sort_title (state, reverse) {
      if (reverse) {
        return state.search_results.hits.sort((a, b) => {
          return a.title < b.title ? 1 : -1
        })
      } else {
        return state.search_results.hits.sort((a, b) => {
          return a.title > b.title ? 1 : -1
        })
      }
    },
    sort (state, config) {
      if (config.reverse) {
        return state.search_results.hits.sort((a, b) => {
          return a[config.sort_by] < b[config.sort_by] ? 1 : -1
        })
      } else {
        return state.search_results.hits.sort((a, b) => {
          return a[config.sort_by] > b[config.sort_by] ? 1 : -1
        })
      }
    },
    sort_dash (state, config) {
      if (config.reverse) {
        return state.dashboard.last_relevant_crawled.hits.sort((a, b) => {
          return a[config.sort_by] < b[config.sort_by] ? 1 : -1
        })
      } else {
        return state.dashboard.last_relevant_crawled.hits.sort((a, b) => {
          return a[config.sort_by] > b[config.sort_by] ? 1 : -1
        })
      }
    }
  },
  actions: {
    fetch_threats ({ commit, getters }) {
      const url = `${getters.api_url}/threats/manage`
      axios.get(url).then(res => {
        commit('update_threats', res.data)
      }).catch(err => {
        // router.push({name: 'login'});
      })
    },
    fetch_dashboard ({ commit, getters }) {
      const onions_url = `${getters.api_url}/dashboard/?source=onions`
      axios.get(onions_url).then(res => {
        commit('update_dashboard_onions', res.data)
      }).catch(err => {
        // router.push({name: 'login'});
      })
      const telegram_url = `${getters.api_url}/dashboard/?source=telegram`
      axios.get(telegram_url).then(res => {
        commit('update_dashboard_telegram', res.data)
      }).catch(err => {
        // router.push({name: 'login'});
      })
      // let url = `${getters.api_url}/dashboard`;
      // axios.get(url).then(res => {
      //   commit('update_dashboard', res.data);
      // }).catch(err => {
      //   // router.push({name: 'login'});
      // });
    },
    init_session ({ commit, getters }) {
      const url = `${getters.api_url}/dashboard/initialize_session/`
      axios.get(url).then(res => {
        const onions_url = `${getters.api_url}/dashboard/?source=darkweb`
        axios.get(onions_url).then(res => {
          commit('update_dashboard_onions', res.data)
        }).catch(err => {
          // router.push({name: 'login'});
        })
      }).catch(err => {
        router.push({ name: 'login' })
      })
    },
    init ({ commit }) {
      return new Promise((resolve, reject) => {
        this.dispatch('init_session'),
        // this.dispatch('fetch_dashboard'),
        this.dispatch('fetch_threats')
      })
    }
  },
  getters: {
    saved_searches: state => {
      return state.dashboard ? state.dashboard.saved_searches : []
    },
    api_url: state => {
      return process.env.NODE_ENV == 'development' ? state.dev_url : state.prod_url
    }
  }
})
