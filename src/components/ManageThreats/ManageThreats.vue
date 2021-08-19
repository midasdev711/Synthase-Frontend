<style src="./styles.scss" lang="scss"></style>
<template src="./template.html" />

<script>
import axios from 'axios'
import AutocompleteItem from './AutocompleteItem'

export default {
  name: 'ManageThreats',
  filters: {
    title (str) {
      str = str.toLowerCase().split(' ')
      for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
      }
      return str.join(' ')
    },
    lowered_threat (str) {
      return str.toLowerCase()
    }
  },
  data () {
    return {
      threat_input: '',
      global_indicator_input: '',
      indicator_input: '',
      indicators: [],
      editing_threat: null,
      user_feedback: '',
      threat_search: '',
      indicator_search: '',
      url: this.$store.getters.api_url
    }
  },
  computed: {
    threats () {
      return this.$store.state.threats
    },
    threats_filtered () {
      if (this.threat_search != '' && this.$store.state.threats) {
        const threats_filtered = this.threats.filter(threat => {
          const search = this.threat_search.toLowerCase()
          const name = threat.name.toLowerCase()
          return name.includes(search)
        })
        if (this.indicator_search != '') {
          const indicators_filtered = threats_filtered.filter(threat => {
            const search = this.indicator_search.toLowerCase()
            const indicators = threat.indicators.join(' ')
            return indicators.includes(search)
          })
          return indicators_filtered
        } else {
          return threats_filtered
        }
      } else if (this.indicator_search != '') {
        const indicators_filtered = this.threats.filter(threat => {
          const search = this.indicator_search.toLowerCase()
          const indicators = threat.indicators.join(' ')
          return indicators.includes(search)
        })
        return indicators_filtered
      } else {
        return this.threats
      }
    }
  },
  mounted () {
    this.$store.dispatch('fetch_threats')
  },
  methods: {
    add_threat (threat) {
      const url = `${this.url}/threats/add/`
      const data = {
        threats: [this.threat_input]
      }

      axios.post(url, data).then(res => {
        this.user_feedback = 'Successfully added threat'
        this.threat_input = ''
        this.$store.dispatch('fetch_threats')
      }).catch(err => {
        console.log(err)
        this.threat_input = 'Something went wrong. Try again.'
      })
    },
    add_pair () {
      if (this.editing_threat.name == 'UNCATEGORIZED') {
        const url = `${this.url}/threats/indicators/add/`
        const data = { indicators: [this.indicator_input] }

        axios.post(url, data).then(res => {
          this.indicator_input = ''
          this.user_feedback = 'Successfully added indicator'
          this.$store.dispatch('fetch_threats')
        }).catch(err => {
          console.log(err)
          this.user_feedback = 'Something went wrong. Try again.'
        })
      } else {
        const url = `${this.url}/threats/pairs/add/`
        const data = {
          pairs: [{ name: this.editing_threat.name, indicators: [this.indicator_input] }]
        }
        axios.post(url, data).then(res => {
          this.indicator_input = ''
          this.user_feedback = 'Successfully added indicator'
          this.$store.dispatch('fetch_threats')
        }).catch(err => {
          console.log(err)
          this.user_feedback = 'Something went wrong. Try again.'
        })
      }
    },
	  	delete_threat (threat) {
      const url = `${this.url}/threats/delete/`
      const data = { threat: threat.name }
      axios.post(url, data).then(res => {
        this.user_feedback = 'Successfully removed threat'
        this.$store.dispatch('fetch_threats')
      }).catch(err => {
        console.log(err)
        const warning = alert('This threat has already been removed by another user. Please refresh to see the changes.')
      })
    },
    remove_indicator (threat, indicator) {
      if (threat.name == 'UNCATEGORIZED') {
			  const message = 'Deleting an uncategorized indicator will delete the indicator from your view of the database. You will no longer be able to search for this indicator. Are you sure you wish to continue?'
			  const warning = confirm(message)
			  if (warning == true) {
			    const url = `${this.url}/threats/indicators/delete/`
				  const data = {
					  indicator: indicator
				  }
				  axios.post(url, data).then(res => {
					  this.user_feedback = 'Successfully added indicator'
					  this.$store.dispatch('fetch_threats')
				  }).catch(err => {
					  console.log(err)
					  const warning = alert('This indicator has already been removed by another user. Please refresh to see the changes.')
				  })
			  }
      } else {
        const url = `${this.url}/threats/indicators/remove/`
        const data = {
          pairs: [{ name: threat.name, indicators: [indicator] }]
        }
        axios.post(url, data).then(res => {
          this.user_feedback = 'Successfully added indicator'
          this.$store.dispatch('fetch_threats')
        }).catch(err => {
          console.log(err)
          const warning = alert('This indicator may have already been removed by another user. Please refresh to see the changes.')
        })
      }
    },
    threat_class (threat) {
      return { 'threat-card--active': this.editing_threat == threat }
    },
    active_threat (threat) {
      this.$refs[`threat_${threat.name.toLowerCase()}`][0].focus()
      this.editing_threat = this.editing_threat == threat ? null : threat
    },
    autocomplete_label (item) {
      return item.name
    },
    filter_indicators (indicators) {
      if (this.indicator_search != '') {
        const new_list = []
        for (const indicator_index in indicators) {
          if (indicators[indicator_index].includes(this.indicator_search.toLowerCase())) {
            new_list.push(indicators[indicator_index])
          }
        }
        return new_list
      } else {
        return indicators
      }
    }
  }
}
</script>
