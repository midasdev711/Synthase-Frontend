<template lang="html">
  <span :class="sentiment_category"> {{ sentiment_category.replace('_', ' ') }}</span>
</template>

<script>
export default {
  name: 'Sentiment',
  props: ['score'],
  computed: {
    // position() {
    // 	return (((this.score - (-1)) * 100) / (1 - (-1)));
    // },
    sentiment_category () {
      if (this.score < -0.6) {
        return 'very_negative'
      } else if (this.score >= -0.6 && this.score < -0.2) {
        return 'mostly_negative'
      } else if (this.score >= -0.2 && this.score < 0.2) {
        return 'mixed'
      } else if (this.score >= 0.2 && this.score < 0.6) {
        return 'mostly_positive'
      } else if (this.score >= 0.6) {
        return 'very_positive'
      }
    }
  }
}
</script>

<style lang="scss">
	@import '~@/assets/scss/global/variables';

	.very_negative {
		color: #de6161;
		text-transform: capitalize;
	}

	.mostly_negative {
		color: #dd9361;
		text-transform: capitalize;
	}

	.mixed {
		color: #FDFC47;
		text-transform: capitalize;
	}

	.mostly_positive {
		color: #a5ef37;
		text-transform: capitalize;
	}

	.very_positive {
		color: #38ef7d;
		text-transform: capitalize;
	}

	.result-sentiment {

		&__gradient {
			position: relative;
			width: 80%;
			max-width: 625px;
			height: 24px;
			background: linear-gradient(90deg, #de6161 10%, #FDFC47 50%, #38ef7d 90%);
		}

		&__indicator {
			content: "";
			border: 1px solid rgba(black, 1);
			position: absolute;
			top: 0;
			left: 0;
			width: 4px;
			height: 100%;
			background-color: rgba(white, 1);
		}
	}
</style>
