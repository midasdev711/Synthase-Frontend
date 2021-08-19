<template>
  <div v-if="item">
    <span>{{ item.name }}</span>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>
