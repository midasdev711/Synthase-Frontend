<template>
  <div class="info">
    <SearchBar />
    <Dashboard />
  </div>
</template>

<script>
import AppNav from '@/components/SearchBar'
import SearchBar from '@/components/Dashboard/Dashboard'

export default {
  name: 'App',
  components: {
    AppNav,
    SearchBar
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
    @import '~@/assets/scss/app';

    .info {
        position: absolute;
        top: 50%; left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }

</style>
