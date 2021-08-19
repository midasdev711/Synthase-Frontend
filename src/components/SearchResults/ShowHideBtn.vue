<template>
  <span
    class="show_hide"
    @click="set_bool(); $emit('show-more')"
  > {{ get_label() }} </span>
</template>

<script>
export default {
  name: 'ShowHideBtn',
  data () {
    return {
      show: false
    }
  },
  methods: {
    get_label () {
      if (!this.show) {
        return 'Show more...'
      } else {
        return 'Hide...'
      }
    },
    set_bool () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/global/variables';
    .show_hide {
        text-align: center;
        color: $grey_6;
        font-weight: 700;
        cursor: pointer;
        &:hover {
            color: $link;
            text-decoration: underline;
        }
    }
</style>
