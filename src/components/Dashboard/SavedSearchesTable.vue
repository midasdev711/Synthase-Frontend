<template>
  <b-table
    striped
    hover
    :items="items"
  />
</template>

<script>
import { Table } from 'bootstrap-vue/esm/components'

const items = [
  { test: 'Testing 1 2 3' }
]
export default {
  data () {
    return {
      items: items
    }
  }
}
</script>
