<template>
  <div
    class="toggle"
    :class="{active: active}"
    @click="toggle_switch"
  />
</template>

<script>
export default {
  name: 'SynthaseToggle',
  props: {
    default: false,
    init_state: Boolean
  },
  data () {
    return {
      active: this.init_state
    }
  },
  methods: {
    toggle_switch () {
      this.active = !this.active
      this.$emit('switch', this.active)
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';

	.toggle {
		position: relative;
		width: 60px;
		height: 30px;
		background-color: $primary-light;
		border-radius: 15px;
		cursor: pointer;
		transition: background-color 200ms;

		&:after {
			content: "";
			background-color: white;
			width: 24px;
			height: 24px;
			border-radius: 50%;
			position: absolute;
			top: 3px;
			left: 3px;
			transition: left 200ms;
		}

		&.active {
			background-color: $secondary;
			&:after {
				left: calc(50% + 2px);
			}
		}
	}
</style>
