<style src="./styles.scss" lang="scss"></style>
<template src="./template.html" />

<script>
import ResultDetails from './ResultDetails/ResultDetails'
import SortResults from './SortResults'
import Pagination from './Pagination'
import Sentiment from './Sentiment'

export default {
  name: 'LastRelevantCrawled',
  components: {
    ResultDetails,
    Sentiment,
    SortResults,
    Pagination
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
      sort_by: ['Page Title', 'Page Type', 'Last Scan'],
      selected_result: null,
      reverse: false
    }
  },
  computed: {
    results () {
      console.log(this.$store.state.dashboard.last_relevant_crawled)
      return this.$store.state.dashboard.last_relevant_crawled
    }
  },
  methods: {
    sort_results (sort) {
      if (sort == this.selected_sort) {
        this.reverse = !this.reverse
      } else {
        this.reverse = false
      }
      this.selected_sort = sort
      switch (sort) {
        case 'Page Title':
          this.$store.commit('sort_dash', { sort_by: 'title', reverse: this.reverse })
          break
        case 'Page Type':
          this.$store.commit('sort_dash', { sort_by: 'website_type', reverse: this.reverse })
          break
        case 'Last Scan':
          this.$store.commit('sort_dash', { sort_by: 'last_crawl', reverse: this.reverse })
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
    },
    get_flag (language) {
      switch (language) {
        case 'English':
          return 'us'
          break
        default:
          return 'us'
      }
    }
  }
}
</script>
