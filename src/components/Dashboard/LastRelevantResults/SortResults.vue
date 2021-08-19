<template lang="html">
  <div v-if="results">
    <div class="results-sort">
      <p class="p-4 bg-primary-light">
        Most Recently Crawled, Page {{ page }} of {{ Math.ceil(results.found / 10) }}
      </p>
      <div class="sort-by">
        <h3 class="mr-2">
          Sort By
        </h3>
        <i class="material-icons">sort</i>
      </div>
      <p
        v-for="item of options"
        class="results-sort__item flex items-center"
        :class="{active: item == sort}"
        @click="sort_results(item)"
      >
        {{ item }}
        <i
          v-if="item == sort"
          class="material-icons ml-2"
        >arrow_drop_down</i>
      </p>
    </div>
    <div class="results-pagination">
      <div class="flex">
        <div class="results-pagination__back" />
        <div class="results-pagination__forward" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortResults',
  props: ['options'],
  data () {
    return {
      sort: ''
    }
  },
  computed: {
    results () {
      return this.$store.state.dashboard.last_relevant_crawled
    },
    page () {
      return this.$store.state.dash_current_query.page
    }
  },
  methods: {
    sort_results (val) {
      this.sort = val
      this.$emit('sortselect', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/global/variables';
.results-side-bar {
	position: sticky;
	top: 80px;
	cursor: default;
	background-color: $primary_dark;
}

.sort-by {
	display: flex;
	padding: 1rem;
	border-bottom: 1px solid white;
}

.results-sort__item {
	padding: 1rem;
	cursor: pointer;

	&:hover {
		background-color: $secondary_dark;
	}

	&.active {
		background-color: $secondary_dark;
	}
}

.result-left-col {
	border-right: 1px solid $secondary;
	margin-right: 1rem;
	padding-right: 1rem;
}
</style>
