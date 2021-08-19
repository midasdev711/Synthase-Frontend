<template>
  <div
    class="navigation shadow-md"
    :class="{ isOpen: isOpen }"
  >
    <button
      class="nav-hide py-3 pl-3 flex items-center"
      @click="toggle"
    >
      <!-- <div class="hide_text" v-if="isOpen">
				<p> Hide </p>
			</div> -->
      <i class="material-icons mr-3">{{ "menu" }}</i>
      <!-- <font-awesome-icon
			 	class="material-icons mr-3"
				:icon="['fas', 'file-export']"/> -->
      <p
        class="text utility ml-2"
        :class="{ isOpen: !isOpen }"
      >
        {{ "" }}
      </p>
    </button>
    <router-link
      v-for="link of links"
      :key="link.name"
      class="nav-link py-3 pl-3 flex items-center"
      :to="link.url"
      tag="div"
    >
      <i class="material-icons mr-3">{{ link.icon }}</i>
      <p
        class="text utility ml-2"
        :class="{ isOpen: !isOpen }"
      >
        {{ link.name }}
      </p>
    </router-link>
    <button
      class="nav-export py-3 pl-3 flex items-center"
      @click="export_results"
    >
      <i class="material-icons mr-3">{{ "share" }}</i>
      <p
        class="text utility ml-2"
        :class="{ isOpen: !isOpen }"
      >
        {{ "Export" }}
      </p>
    </button>
    <button
      class="nav-logout py-3 pl-3 flex items-center"
      @click="logout"
    >
      <i class="material-icons mr-3">{{ "exit_to_app" }}</i>
      <p
        class="text utility ml-2"
        :class="{ isOpen: !isOpen }"
      >
        {{ "Logout" }}
      </p>
    </button>
    <!-- <button class="btn btn--export" @click="export_results">
			 <font-awesome-icon
			 	class="navigation__logout-icon"
				:icon="['fas', 'file-export']"/>
			<a v-if="isOpen">Export</a>
		</button>
		<button class="btn btn--logout" @click="logout">
			 <font-awesome-icon
			 	class="navigation__logout-icon"
				:icon="['fas', 'sign-out-alt']"/>
			<a v-if="isOpen">logout</a>
		</button> -->
  </div>
</template>

<script>
import axios from 'axios'
import { saveAs } from 'file-saver'

export default {
  name: 'AppNav',
  data () {
    return {
      isOpen: false,
      links: [
        { url: '/dashboard', name: 'Dashboard', icon: 'assessment' },
        { url: '/manage-threats', name: 'Manage Threats', icon: 'device_hub' },
        { url: '/manage-sources', name: 'Manage Sources', icon: 'label' },
        { url: '/advanced-search', name: 'Advanced Search', icon: 'search' },
        { url: '/help', name: 'Help', icon: 'help' }
      ]
    }
  },
  computed: {
    query () {
      return this.$store.state.current_query
    }
  },
  methods: {
    // hide_nav() {
    // 	var elem = document.getElementById('navigation');
    		// 	elem.parentNode.removeChild(elem);
    // 	document.getElementById("navigation").style.display="none";
    // },
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    toggle () {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    },
    logout () {
      this.$emit('authenticated', false)
      // this.$router.replace({name: 'login'});
      const url = `${this.$store.getters.api_url}/logout/`
      axios.get(url).then(res => {
        this.$router.push({ name: 'login' })
      }).catch(err => {
        console.log(err)
      })
    },
    export_results () {
      if (this.query) {
        const url = `${this.$store.getters.api_url}/search/export/`
        const data = {
          is_basic: this.query.basic,
          amount: -1,
          query: this.query.term
        }

        axios({
          url: url,
          data: JSON.stringify(data),
          method: 'POST',
          responseType: 'blob'
        }).then(res => {
          const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8' })
          saveAs(blob, 'export.csv')
        }).catch(err => {
			  			const warning = alert('Please submit a query first before attempting to export intelligence.')
        })
      } else {
        const warning = alert('Please submit a query first before attempting to export intelligence.')
      }
    }
  }
}
</script>

<style lang="scss">
	@import '~@/assets/scss/global/variables';

	.navigation {
		position: sticky;
		top: 0;
		left: 0;
		width: $nav-width * .18;
		transition: width 100ms;
		// height: 100%;
		height: 100vh;
		// border-right: 1px solid $border;
		// background: $primary;
		// display: none;
		// transform: translateX(-100%);
  		// transition: transform 10s ease(out-cubic);

		&.isOpen {
			// display: initial;
			// transform: translateX(0);
			width: $nav-width;
			$nav-width: 264px;
			transition: width 100ms;
		}
	}

	.text {
		transition: font-size 85ms;

		&.isOpen {
			font-size: 0;
			transition: font-size 85ms;
		}
	}

	.nav-link {
		text-decoration: none;
		color: $secondary;
		transition: color 300ms, background-color 300ms;
		box-sizing: border-box;
		padding-right: .75rem;
		cursor: pointer;

		&:hover {
			background-color: $secondary;
			color: $primary;
		}

		p {
			white-space: nowrap;
		}
	}

	.nav-export {
		color: $soft_green;
		width: 100%;
		transition: color 300ms, background-color 300ms;
		box-sizing: border-box;
		cursor: pointer;
		outline: none;
		padding-right: .75rem;

		&:hover {
			background-color: $primary_light;
		}

		p {
			white-space: nowrap;
		}
	}

	.nav-logout {
		outline: 0;
		text-decoration: none;
		color: $soft_red;
		width: 100%;
		transition: color 300ms, background-color 300ms;
		box-sizing: border-box;
		cursor: pointer;
		padding-right: .75rem;

		&:hover {
			background-color: $primary_light;
		}

		p {
			white-space: nowrap;
		}
	}

	.nav-hide {
		outline: none;
		text-decoration: none;
		text-align: center;
		width: 100%;
		color: $white;
		transition: color 300ms, background-color 300ms;
		box-sizing: border-box;
		padding-right: .75rem;
		cursor: pointer;

		&:hover {
			background-color: $primary_light;
		}

		p {
			white-space: nowrap;
		}
	}

	// .btn_text{
		// display: inline;
		// display: none;
		// transition: display 200ms;
		// &.isOpen {
		// 	display: initial;
		// }
	// }
	// .hide_btn {
		// position: relative;
		// outline: none !important;
		// padding: 0 12px;
		// font-weight: 700;
		// line-height: 60px;
		// min-width: 150px;
		// text-transform: uppercase;
		// letter-spacing: 2px;
		// position: sticky;
		// top: 60px;
		// box-sizing: border-box;
		// width: 100%;
		// padding: 10px;
		// background-color: $primary-light;
		// border: none;
		// border-bottom: 2px solid $primary;
		// color: $white;
		// transition: all 300ms;

		// &:hover {
			// color: $white;
			// background-color: $primary;
		// }
	// }

	// .hide_text {
	// 	display: flex;
	// 	text-align: center;
	// }

	// .btn--logout {
	// 	position: absolute;
	// 	bottom: 0px;
	// 	width: 100%;
	// 	background-color: $primary-light;
	// 	border: none;
	// 	color: $primary-dark;
	// 	transition: all 300ms;

	// 	&:hover {
	// 		color: lighten($white, 50%);
	// 		background-color: darken($soft_red, 10%);
	// 	}
	// }

	// .btn--export {
	// 	position: absolute;
	// 	bottom: 60px;
	// 	width: 100%;
	// 	background-color: $primary-light;
	// 	border: none;
	// 	border-bottom: 2px solid $primary;
	// 	color: $primary-dark;
	// 	transition: all 300ms;

	// 	&:hover {
	// 		color: lighten($white, 50%);
	// 		background-color: darken($secondary, 10%);
	// 	}
	// }
</style>
