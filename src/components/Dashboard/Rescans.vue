<style src="./styles.scss" lang="scss"></style>

<script>
import axios from 'axios'
export default {
  name: 'Rescans',
  computed: {
    rescans () {
      return this.$store.state.dashboard.rescans
    }
  }
}
</script>

<template lang="html">
  <div class="rescans-row shadow-md w-1/4">
    <h3 class="rescans-title">
      Rescans
    </h3>
    <hr>
    <div class="flex justify-between">
      <p class="rescans-title">
        Max Rescans: {{ rescans.max_rescans }}
      </p>
    </div>
    <div class="flex justify-between">
      <p class="rescans-title">
        Remaining Rescans: {{ rescans.rescans_available }}
      </p>
    </div>
  </div>
</template>
