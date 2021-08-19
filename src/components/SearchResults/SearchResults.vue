<style src="./styles.scss" lang="scss"></style>
<template src="./template.html" />

<script>
import ResultDetails from './ResultDetails/ResultDetails'
import SortResults from './SortResults'
import Pagination from './Pagination'
import Result from './Result'
import FilterChip from './FilterChip'
import axios from 'axios'

export default {
  name: 'SearchResults',
  components: {
    ResultDetails,
    SortResults,
    Pagination,
    Result,
    FilterChip
  },
  filters: {
    epoch (time) {
      const date = new Date(Math.round(time * 1000)).toGMTString()
      return date
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Dashboard',
      sort_by: ['Relevance', 'Page Title', 'Page Type', 'Last Scan'],
      selected_result: null,
      selected_sort: 'Default',
      show_more_id: null,
      show_pagination: true,
      reverse: false,
      telegram_result: false,
      filters: this.$store.state.current_query.terms,
      base_url: `${this.$store.getters.api_url}/search/`,
      cat_to_post_field: {
        topic: 'page_topics',
        'page type': 'page_types',
        language: 'languages',
        general: 'general',
        deanonymized: 'deanonymized',
        date: 'last_crawl_range',
        'extremism score': 'extremism_score',
        'sentiment score': 'sentiment_score'
      }
    }
  },
  computed: {
    results () {
      if (this.$route.name == 'perma') {
        this.show_pagination = false
      } else {
        this.show_pagination = true
      }
      console.log(this.$store.state.current_query)
      console.log(this.$store.state.search_results)
      return this.$store.state.search_results
    },
    test () {
      console.log('Closing')
    },
    recent_query () {
      return this.$store.state.current_query
    }
  },
  mounted () {
    if (this.$route.name == 'perma') {
      const url = `${this.$store.getters.api_url}${this.$route.fullPath}`
      const id = this.$route.query.id
      axios.get(url).then(res => {
        const update = {
          data: res.data,
          query: {
            term: res.data.query,
            page: res.data.found > 0 ? 1 : 0,
            basic: false
          }
        }
        this.$store.commit('update_results', update)
        this.show_pagination = false
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.show_pagination = true
    }
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  updated () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.filters = this.$store.state.current_query.terms
  },
  methods: {
    result_class (result) {
      if (result.url.indexOf('telegram') !== -1) {
        return '/static/telegram.png'
      } else {
        return '/static/onion.png'
      }
    },
    sentiment_value (category, get_end) {
      switch (category) {
        case 'Very Negative':
          return !get_end ? -1 : -0.599999999999999999
          break
        case 'Mostly Negative':
          return !get_end ? -0.6 : -0.199999999999999999
          break
        case 'Mixed':
          return !get_end ? -0.2 : 0.199999999999999999
          break
        case 'Mostly Positive':
          return !get_end ? 0.2 : 0.599999999999999999
          break
        case 'Very Positive':
          return !get_end ? 0.6 : 1
          break
      }
    },
    build_post_request () {
      const data = {
        page: 1,
        all: {},
        onions: {},
        telegram: {}
      }
    	for (const filter of this.filters) {
      	if (filter[0] == 'indicator') {
          if (!data.onions.indicators) {
            data.onions.indicators = []
          }
          data.onions.indicators.push(filter[1])
        } else if (filter[0] == 'threat') {
          if (!data.onions.threats) {
            data.onions.threats = []
          }
          data.onions.threats.push(filter[1])
        } else if (filter[0] == 'date') {
          data.all.last_crawl_range = {}
          const start_and_end = filter[1].split(' to ')
          data.all.last_crawl_range.start = start_and_end[0]
          data.all.last_crawl_range.end = start_and_end[1]
        } else if (filter[0] == 'extremism score') {
          data.onions.extremism_score = {}
          const start_and_end = filter[1].split(' to ')
          data.onions.extremism_score.start = parseInt(start_and_end[0]).toFixed(1) / 100
          data.onions.extremism_score.end = parseInt(start_and_end[1]).toFixed(1) / 100
        } else if (filter[0] == 'sentiment score') {
          data.onions.sentiment_score = {}
          const start_and_end = filter[1].split(' to ')
          data.onions.sentiment_score.start = this.sentiment_value(start_and_end[0], false)
          data.onions.sentiment_score.end = this.sentiment_value(start_and_end[1], true)
        } else if (filter[0] == 'general') {
          if (!data.all.general) {
            data.all.general = []
          }
          data.all.general.push(filter[1])
        } else if (filter[0] == 'deanonymized') {
          data.onions.deanonymized = (filter[1] === 'true')
        } else if (filter[0] == 'username') {
          if (!data.telegram.sender) {
            data.telegram.sender = []
          }
          data.telegram.sender.push(filter[1])
        } else if (filter[0] == 'media_type') {
          if (!data.telegram.media_type) {
            data.telegram.media_type = []
          }
          data.telegram.media_type.push(filter[1])
        } else if (filter[0] == 'mime_type') {
          if (!data.telegram.mime_type) {
            data.telegram.mime_type = []
          }
          data.telegram.mime_type.push(filter[1])
        } else if (filter[0] == 'tel_webpage_type') {
          if (!data.telegram.page_type) {
            data.telegram.page_type = []
          }
          data.telegram.page_type.push(filter[1])
        } else if (filter[0] == 'tel_webpage_url') {
          if (!data.telegram.url) {
            data.telegram.url = []
          }
          data.telegram.url.push(filter[1])
        } else if (filter[0] == 'tel_webpage_title') {
          if (!data.telegram.page_title) {
            data.telegram.page_title = []
          }
          data.telegram.page_title.push(filter[1])
        } else if (filter[0] == 'tel_webpage_description') {
          if (!data.telegram.page_description) {
            data.telegram.page_description = []
          }
          data.telegram.page_description.push(filter[1])
        } else if (filter[0] == 'file_name') {
          if (!data.telegram.file_name) {
            data.telegram.file_name = []
          }
          data.telegram.file_name.push(filter[1])
        } else if (filter[0] == 'contact_name') {
          if (!data.telegram.contact_name) {
            data.telegram.contact_name = []
          }
          data.telegram.contact_name.push(filter[1])
        } else if (filter[0] == 'phone_number') {
          if (!data.telegram.phone_number) {
            data.telegram.phone_number = []
          }
          data.telegram.phone_number.push(filter[1])
        } else if (filter[0] == 'origin_type') {
          if (!data.telegram.origin_type) {
            data.telegram.origin_type = []
          }
          data.telegram.origin_type.push(filter[1])
        } else if (filter[0] == 'geotag_latitude') {
          if (!data.telegram.geotag_latitude) {
            data.telegram.geotag_latitude = []
          }
          data.telegram.geotag_latitude.push(filter[1])
        } else if (filter[0] == 'geotag_longitude') {
          if (!data.telegram.geotag_longitude) {
            data.telegram.geotag_longitude = []
          }
          data.telegram.geotag_longitude.push(filter[1])
        } else if (filter[0] == 'total_amount') {
          if (!data.telegram.total_amount) {
            data.telegram.total_amount = []
          }
          data.telegram.total_amount.push(filter[1])
        } else if (filter[0] == 'invoice_description') {
          if (!data.telegram.invoice_description) {
            data.telegram.invoice_description = []
          }
          data.telegram.invoice_description.push(filter[1])
        } else if (filter[0] == 'invoice_title') {
          if (!data.telegram.invoice_title) {
            data.telegram.invoice_title = []
          }
          data.telegram.invoice_title.push(filter[1])
        } else if (filter[0] == 'venue_title') {
          if (!data.telegram.venue_title) {
            data.telegram.venue_title = []
          }
          data.telegram.venue_title.push(filter[1])
        } else if (filter[0] == 'venue_provider') {
          if (!data.telegram.venue_provider) {
            data.telegram.venue_provider = []
          }
          data.telegram.venue_provider.push(filter[1])
        } else if (filter[0] == 'question') {
          if (!data.telegram.question) {
            data.telegram.question = []
          }
          data.telegram.question.push(filter[1])
        } else if (filter[0] == 'poll_options') {
          if (!data.telegram.poll_options) {
            data.telegram.poll_options = []
          }
          data.telegram.poll_options.push(filter[1])
        } else if (filter[0] == 'poll_results') {
          if (!data.telegram.poll_results) {
            data.telegram.poll_results = []
          }
          data.telegram.poll_results.push(filter[1])
        } else {
          if (!data.onions[this.cat_to_post_field[filter[0]]]) {
            data.onions[this.cat_to_post_field[filter[0]]] = []
          }
          data.onions[this.cat_to_post_field[filter[0]]].push(filter[1])
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
      return data
    },
    get_keys (json_object) {
      const keys = []
      for (const key in json_object) {
        keys.push(key)
      }
      return keys
    },
    removeChip (term) {
      this.$store.commit('remove_term', term)
      const data = this.build_post_request()
      this.get_filtered_results(data)
    },
    add_to_terms (term) {
      for (const existing_term of this.filters) {
        if (term[0] == existing_term[0] && term[1] == existing_term[1]) {
          return
        }
      }
      this.$store.commit('add_to_terms', term)
      const data = this.build_post_request()
      this.get_filtered_results(data)
    },
    get_filters () {
      return this.filters
    },
    get_filtered_results (data) {
      const url = `${this.$store.getters.api_url}/search/advanced/`
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
        const message = 'An error occurred.'
        const warning = alert(message)
      })
    },
    sort_results (sort) {
      if (sort == this.selected_sort) {
        this.reverse = !this.reverse
      } else {
        this.reverse = false
      }
      this.selected_sort = sort
      switch (sort) {
        case 'Relevance':
          this.$store.commit('sort', { sort_by: 'relevance', reverse: this.reverse })
          break
        case 'Page Title':
          this.$store.commit('sort', { sort_by: 'title', reverse: this.reverse })
          break
        case 'Page Type':
          this.$store.commit('sort', { sort_by: 'website_type', reverse: this.reverse })
          break
        case 'Last Scan':
          this.$store.commit('sort', { sort_by: 'last_crawl', reverse: this.reverse })
          break
      }
    },
    sort_title (reverse) {
      let results_copy = []
      if (reverse) {
        results_copy = this.results.hits.sort((a, b) => {
          return a.title < b.title ? 1 : -1
        })
      } else {
        results_copy = this.results.hits.sort((a, b) => {
          return a.title > b.title ? 1 : -1
        })
      }

      return results_copy
    }
  }
}
</script>
