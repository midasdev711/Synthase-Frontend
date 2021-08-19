<template>
  <div class="chip">
    <span class="chip_text"><span class="filter_cat">{{ term[0] }}:</span> {{ term[1] }} </span>
    <button
      class="material-icons chip_btn"
      @click="send_term()"
    >
      {{ "close" }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterChip',
  props: {
    term: Array
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    send_term () {
      this.$emit('remove_chip', this.term)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/global/variables';

    .chip {
        display: inline-flex;
        padding: 0.5rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
        background-color: $primary;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        transition: all 300ms;
    }

    .filter_cat {
        color: $secondary;
    }
    .chip_text {
        font-size: 1.2rem;
        margin-left: 0.5rem;
    }

    .chip_btn {
        color: white;
        margin-left: 0.5rem;
        &:hover{
            color: $soft_red;
        }
    }
</style>
