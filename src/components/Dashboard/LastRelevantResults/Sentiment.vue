<template lang="html">
  <div class="result-sentiment">
    <div class="flex justify-between">
      <p class="result-sentiment__label-negative">
        Negative
      </p>
      <p class="result-sentiment__label-positive">
        Positive
      </p>
    </div>
    <div class="result-sentiment__gradient">
      <div
        class="result-sentiment__indicator"
        :style="position"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sentiment',
  props: ['score'],
  computed: {
    position () {
      return `left: ${(((this.score - (-1)) * 100) / (1 - (-1)))}%`
    }
  }
}
</script>

<style lang="scss">
	@import '~@/assets/scss/global/variables';

	.result-sentiment {
		&__gradient {
			position: relative;
			width: 100%;
			height: 24px;
			background: linear-gradient(90deg, #de6161 25%, #FDFC47 50%, #38ef7d 100%);
		}

		&__indicator {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 4px;
			height: 100%;
			background-color: rgba(white, 0.5);
		}
	}
</style>
