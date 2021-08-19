<style src="./styles.scss" lang="scss"></style>
<template src="./template.html" />

<script>
import Sentiment from '../Sentiment'
import axios from 'axios'

export default {
  name: 'ResultDetails',
  components: { Sentiment },
  filters: {
    epoch (time) {
      const date = new Date(Math.round(time * 1000)).toGMTString()
      return date
    }
  },
  props: ['result'],
  data () {
    return {
    }
  },
  computed: {
    current_query () {
      return this.$store.state.current_query
    }
  },
  methods: {
    get_flag (language) {
      switch (language) {
        case 'English':
          return 'us'
          break
        default:
          return 'us'
      }
    },
    add_filter (type, val) {
      const url = `${this.$store.getters.api_url}/search/advanced/`
      const data = {
        page: 1,
        general: this.current_query.basic
          ? this.current_query.term
          : this.current_query.post_data.general
      }

      if (type == 'topic') {
        data.page_topics = [{ topic: val }]

        axios.post(url, JSON.stringify(data)).then(res => {
          const update = {
            data: res.data,
            page: 1,
            query: {
              page: 1,
              post_data: data,
              basic: false
            }
          }
          this.$store.commit('update_results', update)
          this.$router.push({ name: 'results' })
          this.$emit('close_details')
        }).catch(err => {
          console.log(err)
        })
      } else {
        data.threats_and_indicators = { indicators: [{ name: val }] }

        axios.post(url, JSON.stringify(data)).then(res => {
          const update = {
            data: res.data,
            page: 1,
            query: {
              page: 1,
              post_data: data,
              basic: false
            }
          }
          this.$store.commit('update_results', update)
          this.$router.push({ name: 'results' })
          this.$emit('close_details')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>
