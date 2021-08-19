<template lang="html">
  <div
    v-if="dashboard"
    class="saved-search shadow-lg"
    :class="{'saved-search--active': active}"
  >
    <div
      class="saved-search__bookmark"
      @click="bookmark_click"
    >
      <font-awesome-icon :icon="['far', 'bookmark']" />
    </div>
    <div class="bookmark-header">
      <h3>Saved Searches</h3>
      <div
        class="saved-search__entry-add-btn"
        @click="set_active()"
      >
        <font-awesome-icon :icon="['fas', 'plus-square']" />
      </div>
    </div>
    <input
      :ref="`add_saved_search_input_box`"
      v-model="add_edit_input"
      class="saved-search__input--add"
      :class="{active: add_edit_active}"
      type="text"
      @keyup.enter="add_search"
    >

    <div class="saved-search__list shadow-lg">
      <div
        v-for="(search, index) of searches"
        class="saved-search__entry"
        :class="{active: selected_edit == search}"
      >
        <div class="saved-search__entry-header">
          <p>{{ search.name }}</p>
          <div class="flex">
            <!-- 						<font-awesome-icon class="saved-search__entry-edit-btn"
							:icon="['fas', 'edit']"
							@click="selected_edit = search"/> -->
            <font-awesome-icon
              class="saved-search__entry-delete-btn"
              :icon="['fas', 'times']"
              @click="delete_search(search)"
            />
          </div>
        </div>
        <!-- 				<div class="saved-search__entry-edit">
					<input class="saved-search__input"
						type="text"
						:value="search.query"
						@input="pin_query($event,search)"
						@keyup.enter="edit_search(search)">
				</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      active: false,
      selected_edit: null,
      edits: [],
      add_edit_active: false,
      add_edit_input: ''
    }
  },
  computed: {
    dashboard () {
      return { ...this.$store.state.dashboard }
    },
    searches () {
      return this.dashboard.saved_searches
    }
  },
  methods: {
    set_active () {
      this.add_edit_active = !this.add_edit_active
      this.$refs.add_saved_search_input_box.focus()
    },
    add_search () {
      this.add_edit_active = !this.add_edit_active
      const url = `${this.$store.getters.api_url}/search/save_query/`
      axios.post(url, JSON.stringify({ name: this.add_edit_input, query: '' })).then(res => {
        this.$store.dispatch('fetch_dashboard')
      }).catch(err => {
        console.log(err)
      })
      this.add_edit_input = ''
    },
    edit_search (search) {
      const url = `${this.$store.getters.api_url}/search/edit_query/`

      const current = this.edits.filter(edit => {
        return edit.name == search.name
      })[0]

      if (current) {
        axios.post(url, JSON.stringify(current)).then(res => {
          this.$store.dispatch('fetch_dashboard')
        }).catch(err => {
          console.log(err)
        })
      }
    },
    delete_search (search) {
      const url = `${this.$store.getters.api_url}/search/delete_query/`

      axios.post(url, JSON.stringify({ name: search.name })).then(res => {
        this.$store.dispatch('fetch_dashboard')
      }).catch(err => {
        console.log(err)
      })
    },

    pin_query ($event, search) {
      const input = $event.target.value

      if (input != '' && input.length > 1) {
        const current = this.edits.filter(edit => {
          return edit.name == search.name
        })[0]

        if (current) {
          const index = this.edits.indexOf(current)
          const new_search = {
            name: current.name,
            query: input
          }
          this.$set(this.edits, index, new_search)
        } else {
          this.edits.push(search)
        }
      }
    },
    bookmark_click () {
      this.active = !this.active
      this.selected_edit = null
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';
	.saved-search {
		position: fixed;
		justify-content: flex-end;
		align-items: center;
		top: 60px;
		right: -400px;
		width: 400px;
		height: 60px;
		transition: right 300ms;

		&.saved-search--active {
			right: 0;

			.saved-search__bookmark {
				background-color: darken($secondary, 10%);
			}
		}

		&__bookmark {
			position: absolute;
			top: 0;
			right: 100%;
			font-size: 40px;
			width: 60px;
			height: 100%;
			padding: 9px 15px;
			background-color: $secondary;
			transition: background-color 300ms;
			cursor: pointer;

			&:hover {
				background-color: darken($secondary, 10%);
			}
		}

		&__input {
			display: block;
			width: 100%;
			padding: 0;
			padding-left: 12px;
			border: none;
			box-sizing: border-box;
			height: 60px;
			transition: width 300ms;

			&:first-child {
				margin-bottom: 12px;
			}

			&--add {
				@extend .saved-search__input;
				height: 0;
				transition: height 200ms;
				&.active {
					height: 60px;
				}
			}
		}

		&__list {
			border: 6px solid $primary-dark;
			background-color: $primary-light;
		}

		&__entry {
			&.active {
				.saved-search__entry-edit {
					height: 60px;
				}
			}
		}

		&__entry-header {
			display: flex;
			justify-content: space-between;
			padding: 12px;
			transition: background-color 300ms;
			border-bottom: 1px solid rgba(white, 0.5);

			&:hover {
				background-color: darken($primary-light, 10%);
			}

			&:last-child {
				border: none;
			}
		}

		&__entry-edit-btn {
			cursor: pointer;
		}

		&__entry-delete-btn {
			margin-left: 12px;
			color: $soft_red;
			cursor: pointer;
		}

		&__entry-add-btn {
			padding: 6px 8px;
			padding-bottom: 4px;
			font-size: 20px;
			border-radius: 4px;
			margin-right: 12px;
			color: $soft_green;
			background-color: white;
			cursor: pointer;
			transition: all 200ms;

			&:hover {
				color: white;
				box-shadow: 0 0 6px 2px rgba(0,0,0,0.25);
				background-color: $soft_green;
			}

		}

		&__entry-edit {
			background-color: $secondary;
			height: 0;
			overflow: hidden;
			transition: height 300ms;
		}

	}

	.bookmark-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 60px;
		background-color: $secondary;

		h3 {
			margin-left: 0.5rem;
		}
	}

</style>
