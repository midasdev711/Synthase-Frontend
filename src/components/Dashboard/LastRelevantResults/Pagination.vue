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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Pagination',
  props: ['total'],
  data () {
    return {
      base_url: `${this.$store.getters.api_url}/dashboard/`
    }
  },
  computed: {
    recent_query () {
      return this.$store.state.dash_current_query
    },
    results () {
      return this.$store.state.dashboard.last_relevant_crawled
    }
  },
  methods: {
    page_prev () {
      if (this.recent_query.page > 1) {
        const url = `${this.base_url}?page=${this.recent_query.page - 1}`
        axios.get(url).then(res => {
          const update = res.data
          update.query = {
            term: this.recent_query.term,
            page: this.recent_query.page - 1,
            basic: true
          }
          this.$store.commit('update_dashboard', update)
          document.querySelector('#app').scrollTop = 500
        }).catch(err => {
          console.log(err)
        })
      }
    },
    page_next () {
      if (this.recent_query.page < Math.ceil(this.total / 10)) {
        const url = `${this.base_url}?page=${this.recent_query.page + 1}`
        axios.get(url).then(res => {
          const update = res.data
          update.query = {
            term: this.recent_query.term,
            page: this.recent_query.page + 1,
            basic: true
          }
          this.$store.commit('update_dashboard', update)
          document.querySelector('#app').scrollTop = 500
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';

	.pagination {
		display: flex;
		justify-content: space-between;
		border-top: 2px solid $secondary;
		&__btn {
			display: block;
			box-sizing: border-box;
			width: 50%;
			border: none;

			&:first-child {
				border-right: 2px solid $secondary;
			}
		}
	}
</style>
