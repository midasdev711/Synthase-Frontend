<template>
  <div class="pagination">
    <button
      class="pagination__btn btn"
      @click="page_prev"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <button
      class="pagination__btn btn"
      @click="page_next"
    >
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </button>
    <p class="p-4">
      Page {{ page }} of {{ Math.ceil(results.found / 10) }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Pagination',
  props: ['total'],
  data () {
    return {
      base_url: `${this.$store.getters.api_url}/search/`
    }
  },
  computed: {
    recent_query () {
      return this.$store.state.current_query
    },
    results () {
      return this.$store.state.search_results
    },
    page () {
      return this.$store.state.current_query.page
    }
  },
  methods: {
    page_prev () {
      if (this.recent_query.page > 1) {
        if (this.recent_query.basic) {
          console.log(this.recent_query.terms.join(' '))
          console.log(this.recent_query.terms)
          const terms = []
          for (const term of this.recent_query.terms) {
            terms.push(term[1])
          }
          const url = `${this.base_url}basic?q=${terms.join(' ')}&page=${this.recent_query.page - 1}`
          axios.get(url).then(res => {
            const update = {
              data: res.data,
              query: {
                terms: this.recent_query.terms,
                page: this.recent_query.page - 1,
                basic: true
              }
            }
            this.$store.commit('update_results', update)
            console.log('Scrolling')
            // document.querySelector("#results_page").scrollTop = 0;
							 document.body.scrollTop = 0
							 document.documentElement.scrollTop = 0
          }).catch(err => {
            console.log(err)
          })
        } else {
          const url = `${this.base_url}advanced/`
          const data = { ...this.recent_query.post_data }
          data.page--
          axios.post(url, data).then(res => {
            const update = {
              data: res.data,
              query: {
                terms: this.recent_query.terms,
                page: data.page,
                post_data: data,
                basic: false,
                advanced_query: res.data.query
              }
            }
            this.$store.commit('update_results', update)
            console.log('Scrolling')
            // document.querySelector("#results_page").scrollTop = 0;
							 document.body.scrollTop = 0
							 document.documentElement.scrollTop = 0
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    page_next () {
      if (this.recent_query.page < Math.ceil(this.total / 10)) {
        if (this.recent_query.basic) {
          const terms = []
          for (const term of this.recent_query.terms) {
            terms.push(term[1])
          }
          const url = `${this.base_url}basic?q=${terms.join(' ')}&page=${this.recent_query.page + 1}`
          axios.get(url).then(res => {
            const update = {
              data: res.data,
              query: {
                terms: this.recent_query.terms,
                page: this.recent_query.page + 1,
                basic: true
              }
            }
            this.$store.commit('update_results', update)
            console.log('Scrolling')
            // document.querySelector("#results_page").scrollTop = 0;
							 document.body.scrollTop = 0
							 document.documentElement.scrollTop = 0
          }).catch(err => {
            console.log(err)
          })
        } else {
          const url = `${this.base_url}advanced/`
          const data = { ...this.recent_query.post_data }
          data.page++
          axios.post(url, data).then(res => {
            const update = {
              data: res.data,
              query: {
                terms: this.recent_query.terms,
                page: data.page,
                post_data: data,
                basic: false,
                advanced_query: res.data.query
              }
            }
            this.$store.commit('update_results', update)
            // document.querySelector("#results_page").scrollTop = 0;
							 document.body.scrollTop = 0
							 document.documentElement.scrollTop = 0
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';

	.pagination {
		// float: right;
		position: relative;
		display: flex;
		float: right;
		// justify-content: space-between;
		margin-bottom: 2rem;
		margin-right: 1rem;

		// border-top: 2px solid $secondary;
		&__btn {
			// right: 100;
			display: block;
			box-sizing: border-box;
			border-radius: 0px 10px 10px 0px;
			// width: 50%;
			border: none;

			&:first-child {
				border-right: 3px solid $primary_dark;
				border-radius: 10px 0px 0px 10px;
				// margin-right: 3px;
			}
		}
	}
</style>
