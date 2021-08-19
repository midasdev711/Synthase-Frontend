<template>
  <div
    id="search-bar"
    class="shadow-md"
  >
    <input
      ref="search_input"
      v-model="query"
      :class="{active: search_active}"
      class="search-bar__input"
      type="text"
      placeholder="General Search"
      @keyup.enter="collapse_and_search"
    >
    <i
      class="material-icons search-bar__icon"
      :class="{active: search_active}"
      @click="collapse_and_search"
    >search</i>
    <img
      class="search-bar__logo"
      src="/static/logo.svg"
    >
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchBar',
  data () {
    return {
      query: '',
      search_active: false
    }
  },
  methods: {
    toggle_search () {
      this.search_active = !this.search_active
      if (this.search_active) {
					 this.$refs.search_input.focus()
      }
    },
    search () {
      if (!this.search_active && this.query != '') {
        console.log(this.query)
        const url = `${this.$store.getters.api_url}/search/basic?q=${this.query}&page=1`
        const filters = []
        for (const term of this.query.trim().split(' ')) {
          const cat_term = ['general', term]
          filters.push(cat_term)
        }
        axios.get(url).then(res => {
          const update = {
            data: res.data,
            query: {
              terms: filters,
              page: res.data.found > 0 ? 1 : 0,
              basic: true
            }
          }
          this.$store.commit('update_results', update)
          this.$router.push({ name: 'results' })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    collapse_and_search () {
      this.toggle_search()
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';

	#search-bar {
		//orig
		// position: absolute;
		// display: flex;
		// align-items: center;
		// top: 0;
		// left: $nav-width;
		// flex-grow: 1;
		// width: 100%;
		// height: 64px;
		// background-color: $secondary_dark;
		// overflow: hidden;

		//display hidden approach
		position: sticky;
		top: 0;
		display: flex;
		width: 100%;
		background-color: $secondary_dark;
		height: 64px;
		align-items: center;
	}

	.search-bar__icon {
		float: left;
		position: relative;
		display: block;
		padding: 20px;
		overflow: hidden;
		cursor: pointer;

		&:before,
		&:after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			transition: transform 275ms;
		}

		&:before {
			border-top: 2px solid $white;
			border-bottom: 2px solid $white;
			transform: skewX(65deg);
		}

		&:after {
			border-left: 2px solid $white;
			border-right: 2px solid $white;
			transform: skewY(65deg);
		}

		&:hover,
		&.active {
			&:before {
				transform: skewX(0);
			}

			&:after {
				transform: skewY(0);
			}
		}
	}

	.search-bar__logo {
		display: block;
		position: absolute;
		width: $nav-width;
		left: 50%;
		transform: translateX(-50%);

		@media (max-width: 68rem) {
			left: auto;
			// position: relative;
			// float: right;
			right: 24px;
			transform: none;
		}

		@media (max-width: 44rem){
			display: none;
		}
	}

	.search-bar__input {
		display: block;
		width: 0;
		height: 100%;
		border: none;
		border-radius: 0;
		padding: 0;
		transition: width 100ms;

		&.active {
			width: 300px;
			padding-left: 24px;
		}
	}
</style>
