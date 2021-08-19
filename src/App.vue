<template>
  <div
    class="main"
    @authenticated="setAuthenticated"
  >
    <div class="search">
      <SearchBar />
    </div>
    <div class="app">
      <AppNav />
      <div
        class="router-view"
        :class="login"
      >
        <router-view @authenticated="setAuthenticated" />
      </div>
    </div>
  </div>
</template>

<script>
import AppContainer from '@/components/AppContainer'
import AppNav from '@/components/AppNav'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import SavedSearch from '@/components/SavedSearch'
axios.defaults.WithCredentials = true
export default {
  name: 'App',
  components: {
    AppNav,
    SearchBar,
    SavedSearch
  },
  data () {
    return {
      authenticated: false
    }
  },
  computed: {
    login () {
      const match = this.$route.name == 'login' || this.$route.name == 'register'
      return { login: match }
    }
  },
  mounted () {
    // this.$store.dispatch('init').then(() => {
    // 	this.$router.push({name: 'results'});
    // });
  },
  methods: {
    setAuthenticated (status) {
      console.log('Setting auth...')
      this.authenticated = status
    }
  }
}
</script>

<style lang="scss">
	@import '~@/assets/scss/app';

	.main {
		font-family: $font-family
	}

	.search {
		position: relative;
		color: $grey_3;
		// min-width: 1200px;
		overflow: auto;
		background-color: $primary;
	}

	.app {
		display: flex;
		position: relative;
		color: $grey_3;
		// min-width: 1200px;
		// height: 100vh;
		// overflow: auto;
		background-color: $primary_dark;
	}

	.router-view {
		position: relative;
		// display: flex;
		// flex-grow: 1;
		// top: calc(64px + 2rem);
		// width: calc(100% - (#{$nav-width} + 2rem));
		width: 100%;
		// height: 100%;
		// left: calc(#{$nav-width} + 1rem);
		// margin: 0 auto;

		&.login {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			margin: 0;
			z-index: 1;
			background-color: $primary_dark;
		}
	}
</style>
