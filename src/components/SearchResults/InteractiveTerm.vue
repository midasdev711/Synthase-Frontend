<template>
  <div class="chip">
    <span
      class="chip_text"
      @click="$emit('add_term', [type, term])"
    > {{ term }} </span>
  </div>
</template>

<script>
export default {
  name: 'InteractiveTerm',
  props: ['term', 'type'],
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/global/variables';

    .chip {
        display: inline-flex;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        // padding-right: 0.3rem;
        // padding-bottom: 0.3rem;
        padding: 0.2rem;
        // border: 1px solid rgba(255, 255, 255, 0.1);
        // border: 1px solid $primary-light;
        background-color: rgba(255, 255, 255, 0.08); //used to be 0.03
        border-radius: 5px;
        &:hover {
            cursor: pointer;
            display: inline-flex;
            // padding: 0.05rem;
            background-color: $secondary-dark;
            // border: 1px solid $secondary-dark;
            // color: $secondary;
            // border-radius: 10px;
            transition: all 150ms;
        }
    }

    .chip_text {
        // font-size: 1.2rem;
        // margin-left: 0.5rem;
    }
</style>
