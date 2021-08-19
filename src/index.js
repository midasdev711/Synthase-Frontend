// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// axios

import axios from 'axios'
// axios.defaults.baseURL = ""

// Components
import SynthaseToggle from '@/components/SynthaseToggle'

// Vendor
import vSelect from 'vue-select'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'

// Font Awesome
import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

axios.defaults.withCredentials = true
Vue.component('SynthaseToggle', SynthaseToggle)

Vue.component('VSelect', vSelect)
Vue.use(VCalendar)
Vue.use(Autocomplete)

FontAwesomeLibrary.add(far)
FontAwesomeLibrary.add(fas)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
