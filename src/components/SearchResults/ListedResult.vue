<template>
  <div>
    <p
      v-if="cutoff_length != -1"
      class="result-label"
    >
      {{ label }}:
      <br>
      <span
        v-for="item in get_result"
        :key="item"
        class="result-entry"
      >
        {{ get_item_text(item) }}
        <br>
      </span>
      <span
        v-if="result.length > cutoff_length && use_cutoff"
        class="result-entry-continue"
        @click="use_cutoff = !use_cutoff"
      >
        <br>
        Show {{ result.slice(cutoff_length, -1).length + 1 }} more {{ cutoff_text }}...
      </span>
      <span
        v-else-if="result.length > cutoff_length && !use_cutoff"
        class="result-entry-continue"
        @click="use_cutoff = !use_cutoff"
      >
        <br>
        Hide {{ result.slice(cutoff_length, -1).length + 1 }} {{ cutoff_text }}...
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ListedResult',
  props: ['label', 'result', 'cutoff_text', 'cutoff_length', 'text_length'],
  data () {
    return {
      use_cutoff: true
    }
  },
  computed: {
    get_result () {
      console.log('Getting result')
      if (this.cutoff_length != -1 && this.use_cutoff) {
        return this.result.slice(0, this.cutoff_length)
      } else {
        return this.result
      }
    }
  },
  methods: {
    get_item_text (item) {
      if (this.text_length != -1 && this.use_cutoff) {
        if (item.length > this.text_length) {
          return item.slice(0, this.text_length) + '...'
        } else {
          return item
        }
      } else {
        return item
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/global/variables';
    .result-label {
        color: $secondary;
        font-weight: 700;
        margin-bottom: 1rem;
        letter-spacing: 1px;

        &--url {
            @extend .result-label;
            word-break: break-all;
        }

        &--language {
            @extend .result-label;
            margin-bottom: 0;
        }
    }

    .result-entry {
        color: $grey_1;
        font-weight: 400;
        word-wrap: break-word;
    }

    .result-entry-continue {
        color: $grey_6;
        cursor: pointer;
        &:hover {
            color: $link;
            text-decoration: underline;
        }
    }
</style>
