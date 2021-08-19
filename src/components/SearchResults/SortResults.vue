<template lang="html">
  <!-- <div v-if="results"> -->
  <div
    v-if="results"
    class="results-sort"
  >
    <div class="sort-by">
      <h3 class="mr-2">
        Sort By
      </h3>
      <i class="material-icons">sort</i>
    </div>
    <p
      v-for="item of options"
      class="results-sort__item flex items-center"
      :class="{active: item == sort || item == 'Relevance' && sort == ''}"
      @click="sort_results(item)"
    >
      {{ item }}
      <i
        v-if="item == sort && !reversed"
        class="material-icons ml-2"
      >arrow_drop_down</i>
      <i
        v-else-if="item == sort && reversed"
        class="material-icons ml-2"
      >arrow_drop_up</i>
      <i
        v-else-if="item == 'Relevance' && sort == ''"
        class="material-icons ml-2"
      >arrow_drop_down</i>
    </p>
  </div>
  <!-- <div class="results-pagination">
			<div class="flex">
				<div class="results-pagination__back"></div>
				<div class="results-pagination__forward"></div>
			</div>
		</div> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: 'SortResults',
  props: ['options'],
  data () {
    return {
      sort: '',
      reversed: false
    }
  },
  computed: {
    results () {
      return this.$store.state.search_results
    },
    page () {
      return this.$store.state.current_query.page
    }
  },
  methods: {
    sort_results (val) {
      if (this.sort == val) { this.reversed = !this.reversed } else if (this.sort == '' && val == 'Relevance') { this.reversed = !this.reversed } else if (this.sort !== val && this.reversed == true) { this.reversed = !this.reversed }
      this.sort = val
      this.$emit('sortselect', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/global/variables';

.page_display {
	// float: right;
}

.results-side-bar {
	// position: sticky;
	position: relative;
	top: 80px;
	cursor: default;
	// background-color: $primary_dark;
}

.sort-by {
	display: flex;
	padding: 1rem;
	margin-left: 1rem;
	border-right: 1px solid white;
}

.results-sort {
	float: left;
	position: relative;
	display: inline-flex;
}

.results-sort__item {
	padding: 1rem;
	cursor: pointer;
	margin-left: 1rem;
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
