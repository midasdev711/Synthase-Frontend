<style src="./styles.scss" lang="scss"></style>
<template src="./template.html" />

<script>
import axios from 'axios'
import store from '@/store/'
import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'

export default {
  name: 'AdvancedSearch',
  components: {
    VueSlider
  },
  data () {
    return {
      query: '',
      selectedDate: {
        start: null,
        end: null
      },
      filters: [],
      extremism_values: [0, 100],
      sentiment_values: ['Very Negative', 'Very Positive'],
      extremism_marks: [0, 25, 50, 75, 100],
      sentiment_data: ['Very Negative', 'Mostly Negative', 'Mixed', 'Mostly Positive', 'Very Positive'],
      use_extremism_score: false,
      use_sentiment_score: false,
      is_public: true,
      threats: [],
      indicators: [],
      page_topics: [],
      usernames: [],
      options: {
        page_types: [
          'wiki',
          'forum',
          'marketplace',
          'other'
        ],
        origin_types: [
          'Chat',
          'Channel'
        ],
        languages: [
          'English',
          'Polish',
          'Russian',
          'Italian',
          'Chinese'
        ],
        media_types: [
          'Any',
          'Photo',
          'Document',
          'Website',
          'Contact',
          'Geotag',
          'Invoice',
          'Venue',
          'Poll'
        ],
        threats: []
      },
      photo_checked: false,
      document_checked: false,
      website_checked: false,
      contact_checked: false,
      geotag_checked: false,
      invoice_checked: false,
      venue_checked: false,
      poll_checked: false,
      page_types: [],
      languages: [],
      media_type: 'Any',
      mime_type: [],
      tel_webpage_type: [],
      tel_webpage_url: [],
      tel_webpage_title: [],
      tel_webpage_description: [],
      file_name: [],
      contact_name: [],
      // contact_user_id: null,
      phone_number: [],
      vcard: [],
      origin_type: [],
      geotag_latitude: [],
      geotag_longitude: [],
      total_amount: [],
      invoice_description: [],
      invoice_title: [],
      currency: [],
      shipping_address: [],
      venue_title: [],
      venue_address: [],
      venue_provider: [],
      venue_latitude: [],
      venue_longitude: [],
      question: [],
      poll_options: [],
      // is_closed: false,
      poll_results: [],
      deanonymized: false,
      use_tor: true,
      use_telegram: true
      // extremism_score: {
      // 	start: null,
      // 	end: null
      // },
      // sentiment_score: {
      // 	start: null,
      // 	end: null
      // }
    }
  },
  computed: {
    get_indicators () {
      if (!this.$store.state.threats) {
        return []
      } else {
			      	const pulled_indicators = []
        for (const threat of this.$store.state.threats) {
          for (const indicator of threat.indicators) {
						  pulled_indicators.push(indicator)
          }
        }
        return pulled_indicators.sort()
      }
    },
    get_threats () {
      if (!this.$store.state.threats) {
        return []
      } else {
        const pulled_threats = []
        for (const threat of this.$store.state.threats) {
          pulled_threats.push(threat.name)
        }
        return pulled_threats.sort()
      }
    }
  },
  mounted: function () {
        	this.$store.dispatch('fetch_threats')
  },
  methods: {
    set_deanon (val) {
      this.deanonymized = val
    },
    set_tor (val) {
      this.use_tor = val
    },
    format_date (date) {
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      return `${date.getFullYear()}-${month}-${day}`
    },
    sentiment_value (category, get_end) {
      switch (category) {
        case 'Very Negative':
          return !get_end ? -1 : -0.59
          break
        case 'Mostly Negative':
          return !get_end ? -0.6 : -0.19
          break
        case 'Mixed':
          return !get_end ? -0.2 : 0.19
          break
        case 'Mostly Positive':
          return !get_end ? 0.2 : 0.59
          break
        case 'Very Positive':
          return !get_end ? 0.6 : 1
          break
      }
    },
    search () {
      const url = `${this.$store.getters.api_url}/search/advanced/`
      const data = this.make_data()
      axios.post(url, data).then(res => {
        const update = {
          data: res.data,
          page: 1,
          query: {
            terms: this.filters,
            page: res.data.found > 0 ? 1 : 0,
            post_data: data,
            basic: false,
            advanced_query: res.data.query
          }
        }
        this.$store.commit('update_results', update)
        this.$router.push({ name: 'results' })
      }).catch(err => {
        const message = 'Query cannot be empty.'
		  			const warning = alert(message)
      })
    },
    get_keys (json_object) {
      const keys = []
      for (const key in json_object) {
        keys.push(key)
      }
      return keys
    },
    make_data () {
      const data = {
        all: {},
        onions: {},
        telegram: {},
        page: 1
      }
      if (this.threats.length) {
        data.onions.threats = []
        for (const threat of this.threats) {
          const filter = ['threat']
          filter.push(threat)
          this.filters.push(filter)
          data.onions.threats.push(threat.toLowerCase())
        }
      }
      if (this.indicators.length) {
        data.onions.indicators = []
        for (const indicator of this.indicators) {
          const filter = ['indicator']
          filter.push(indicator)
          this.filters.push(filter)
          data.onions.indicators.push(indicator.toLowerCase())
        }
      }
      if (this.page_topics.length) {
        data.onions.page_topics = []
        for (const topic of this.page_topics) {
          const filter = ['topic']
          filter.push(topic)
          this.filters.push(filter)
          data.onions.page_topics.push(topic)
        }
      }

      if (this.page_types.length) {
        data.onions.page_types = []
        for (const type of this.page_types) {
          const filter = ['page type']
          filter.push(type)
          this.filters.push(filter)
          data.onions.page_types.push(type)
        }
      }

      if (this.languages.length) {
        data.onions.languages = []
        for (const language of this.languages) {
          const filter = ['language']
          filter.push(language)
          this.filters.push(filter)
          data.onions.languages.push(language)
        }
      }

      if (this.query) {
        const filter = ['general']
        filter.push(this.query)
        this.filters.push(filter)
        data.all.general = this.query
      }

      if (this.selectedDate.start && this.selectedDate.end) {
        data.all.last_crawl_range = {}
        data.all.last_crawl_range.start = this.format_date(this.selectedDate.start)
        data.all.last_crawl_range.end = this.format_date(this.selectedDate.end)
        const filter = ['date']
        filter.push(data.all.last_crawl_range.start + ' to ' + data.all.last_crawl_range.end)
        this.filters.push(filter)
      }

      if (this.use_extremism_score) {
        const filter = ['extremism score']
        filter.push(String(this.extremism_values[0]) + ' to ' + String(this.extremism_values[1]))
        this.filters.push(filter)
        data.onions.extremism_score = {}
        data.onions.extremism_score.start = this.extremism_values[0].toFixed(1) / 100
        data.onions.extremism_score.end = this.extremism_values[1].toFixed(1) / 100
      }

      if (this.use_sentiment_score) {
        const filter = ['sentiment score']
        filter.push(this.sentiment_values[0] + ' to ' + this.sentiment_values[1])
        this.filters.push(filter)
        data.onions.sentiment_score = {}
        data.onions.sentiment_score.start = this.sentiment_value(this.sentiment_values[0], false)
        data.onions.sentiment_score.end = this.sentiment_value(this.sentiment_values[1], true)
        console.log(this.sentiment_values[0])
        console.log(this.sentiment_values[1])
        console.log(this.sentiment_value(this.sentiment_values[0], false))
        console.log(this.sentiment_value(this.sentiment_values[1], true))
        console.log(data.onions.sentiment_score.start)
        console.log(data.onions.sentiment_score.end)
      }

      if (this.deanonymized) {
        const filter = ['deanonymized']
        filter.push(String(this.deanonymized))
        this.filters.push(filter)
        data.onions.deanonymized = true
      }
      if (this.usernames.length) {
        data.telegram.sender = this.usernames
        for (const username of this.usernames) {
          this.add_filter('username', username)
        }
      }
      if (this.photo_checked) {
        if (!data.telegram.media_type) {
          data.telegram.media_type = []
        }
        data.telegram.media_type.push('photo')
        this.add_filter('media_type', 'photo')
      }
      if (this.document_checked) {
        if (!data.telegram.media_type) {
          data.telegram.media_type = []
        }
        data.telegram.media_type.push('document')
        this.add_filter('media_type', 'document')
      }
      if (this.website_checked) {
        if (!data.telegram.media_type) {
          data.telegram.media_type = []
        }
        data.telegram.media_type.push('website')
        this.add_filter('media_type', 'website')
      }
      if (this.contact_checked) {
        if (!data.telegram.media_type) {
          data.telegram.media_type = []
        }
        data.telegram.media_type.push('contact')
        this.add_filter('media_type', 'contact')
      }
      if (this.geotag_checked) {
        if (!data.telegram.media_type) {
          data.telegram.media_type = []
        }
        data.telegram.media_type.push('geotag')
        this.add_filter('media_type', 'geotag')
      }
      if (this.invoice_checked) {
        if (!data.telegram.media_type) {
          data.telegram.media_type = []
        }
        data.telegram.media_type.push('invoice')
        this.add_filter('media_type', 'invoice')
      }
      if (this.venue_checked) {
        if (!data.telegram.media_type) {
          data.telegram.media_type = []
        }
        data.telegram.media_type.push('venue')
        this.add_filter('media_type', 'venue')
      }
      if (this.poll_checked) {
        if (!data.telegram.media_type) {
          data.telegram.media_type = []
        }
        data.telegram.media_type.push('poll')
        this.add_filter('media_type', 'poll')
      }
      if (this.mime_type.length) {
        data.telegram.mime_type = this.mime_type
        for (const mime_type of this.mime_type) {
          this.add_filter('mime_type', mime_type)
        }
      }
      if (this.tel_webpage_type.length) {
        data.telegram.page_type = this.tel_webpage_type
        for (const tel_webpage_type of this.tel_webpage_type) {
          this.add_filter('tel_webpage_type', tel_webpage_type)
        }
      }
      if (this.tel_webpage_url.length) {
        data.telegram.url = this.tel_webpage_url
        for (const tel_webpage_url of this.tel_webpage_url) {
          this.add_filter('tel_webpage_url', tel_webpage_url)
        }
      }
      if (this.tel_webpage_title.length) {
        data.telegram.page_title = this.tel_webpage_title
        for (const tel_webpage_title of this.tel_webpage_title) {
          this.add_filter('tel_webpage_title', tel_webpage_title)
        }
      }
      if (this.tel_webpage_description.length) {
        data.telegram.page_description = this.tel_webpage_description
        for (const tel_webpage_description of this.tel_webpage_description) {
          this.add_filter('tel_webpage_description', tel_webpage_description)
        }
      }
      if (this.file_name.length) {
        data.telegram.file_name = this.file_name
        for (const file_name of this.file_name) {
          this.add_filter('file_name', file_name)
        }
      }
      if (this.contact_name.length) {
        data.telegram.contact_name = this.contact_name
        for (const contact_name of this.contact_name) {
          this.add_filter('contact_name', contact_name)
        }
      }
      if (this.phone_number.length) {
        data.telegram.phone_number = this.phone_number
        for (const phone_number of this.phone_number) {
          this.add_filter('phone_number', phone_number)
        }
      }
      // if(this.vcard){
      // 	data.telegram.vcard = this.vcard;
      // 	this.add_filter("vcard", this.vcard)
      // }
      if (this.origin_type.length) {
        data.telegram.origin_type = []
        for (const origin_type of this.origin_type) {
          data.telegram.origin_type.push(origin_type.toLowerCase())
          this.add_filter('origin_type', origin_type.toLowerCase())
        }
      }
      if (this.geotag_latitude.length) {
        data.telegram.latitude = this.geotag_latitude
        for (const geotag_latitude of this.geotag_latitude) {
          this.add_filter('geotag_latitude', geotag_latitude)
        }
      }
      if (this.geotag_longitude.length) {
        data.telegram.longitude = this.geotag_longitude
        for (const geotag_longitude of this.geotag_longitude) {
          this.add_filter('geotag_longitude', geotag_longitude)
        }
      }
      if (this.total_amount.length) {
        data.telegram.total_amount = this.total_amount
        for (const total_amount of this.total_amount) {
          this.add_filter('total_amount', total_amount)
        }
      }
      if (this.invoice_description.length) {
        data.telegram.invoice_description = this.invoice_description
        for (const invoice_description of this.invoice_description) {
          this.add_filter('invoice_description', invoice_description)
        }
      }
      if (this.invoice_title.length) {
        data.telegram.invoice_title = this.invoice_title
        for (const invoice_title of this.invoice_title) {
          this.add_filter('invoice_title', invoice_title)
        }
      }
      // if(this.currency){
      // 	data.invoice_title = this.invoice_title;
      // 	this.add_filter("invoice_title", this.invoice_title)
      // }
      // if(this.shipping_address){
      // 	data.invoice_title = this.invoice_title;
      // 	this.add_filter("invoice_title", this.invoice_title)
      // }
      if (this.venue_title.length) {
        data.telegram.venue_title = this.venue_title
        for (const venue_title of this.venue_title) {
          this.add_filter('venue_title', venue_title)
        }
      }
      if (this.venue_address.length) {
        data.telegram.venue_address = this.venue_address
        for (const venue_address of this.venue_address) {
          this.add_filter('venue_address', venue_address)
        }
      }
      if (this.venue_provider.length) {
        data.telegram.venue_provider = this.venue_provider
        for (const venue_provider of this.venue_provider) {
          this.add_filter('venue_provider', venue_provider)
        }
      }
      // if(this.venue_latitude){}
      // if(this.venue_longitude){}
      if (this.question.length) {
        data.telegram.poll_question = this.question
        for (const question of this.question) {
          this.add_filter('question', question)
        }
      }
      if (this.poll_options.length) {
        data.telegram.poll_options = this.poll_options
        for (const poll_options of this.poll_options) {
          this.add_filter('poll_options', poll_options)
        }
      }
      if (this.poll_results.length) {
        data.telegram.poll_results = this.poll_results
        for (const poll_results of this.poll_results) {
          this.add_filter('poll_results', poll_results)
        }
      }
      for (const data_key in data) {
        if (data_key != 'page') {
          if (this.get_keys(data[data_key]).length == 0) {
            // keys_to_remove.push(data_key)
            delete data[data_key]
          }
        }
      }
      console.log('Finished data')
      console.log(data)
      // for(let del_key of keys_to_remove){
      // 	delete data[del_key]
      // }
      return data
    },
    add_filter (label, data) {
      const filter = [label]
      filter.push(data)
      this.filters.push(filter)
    }
    // construct_filters(data){
    // 	let filters = []
    // 	for (let threat of this.threats) {
    // 		let filter = ["threat"]
    // 		filter.push(threat)
    // 		filters.push(filter)
    // 	}
    // 	for (let indicator of this.indicators) {
    // 		let filter = ["indicator"]
    // 		filter.push(indicator)
    // 		filters.push(filter)
    // 	}

    // }
  }
}
</script>
