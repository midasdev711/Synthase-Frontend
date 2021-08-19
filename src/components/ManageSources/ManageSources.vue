<template>
  <div>
    <div class="section_container shadow-lg">
      <div class="header">
        <h1>Add Sources</h1>
      </div>
      <div class="textarea_div">
        <textarea
          name="tor_input_box"
          class="torbox"
          rows="10"
          :placeholder="placeholder_text"
          :disabled="is_disabled"
        />
      </div>
      <div class="bottom_container">
        <div class="dropdown_container">
          <v-select
            ref="select"
            v-model="source"
            class="select-row"
            :options="sources"
            :clearable="false"
            :searchable="false"
          />
        </div>
        <div class="btn_container">
          <button
            class="btn"
            @click="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="section_container shadow-lg">
			<h1 class="help-h1">How do I use the input box container thing?.</h1>
			<p class="help-paragraph">
				Don't ask me, I'm just the frontend guy. I type things and shit appears on screen.
			</p>
		</div> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ManageSources',
  data () {
    return {
      sources: ['Tor', 'Telegram'],
      source: 'Tor',
      placeholder: ''
    }
  },
  computed: {
    placeholder_text () {
      if (this.source == 'Tor') {
        return 'abcxyz.onion/path/goes/here'
      } else if (this.source == 'Telegram') {
        return 'some kind of telegram link'
      }
    },
    is_disabled () {
      if (this.source != null) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    submit () {}
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';

.header {
	display: flex;
}

.textarea_div {
	position: relative;
	margin: auto;
	margin-top: 1em;
	margin-bottom: 2em;
}

.select-row {
	margin-bottom: 2rem;
	min-width: 10vw;
}

.torbox {
	width: 100%;
	position: relative;
	border-radius: 30px;
	border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-right: 30px solid transparent;
    border-left: 30px solid transparent;
	outline: none;
	resize: none;
	color: $white;
	background-color: $primary-darker;
}

.section_container{
	a:link{
		color: #7dbfe8;
		text-decoration: none;
	}

	a:visited{
		color: #7dbfe8;
		text-decoration: none;
	}

	a:hover{
		color: #7dbfe8;
		text-decoration: underline;
	}
	margin: auto;
	margin-bottom: 2rem;
	margin-top: 4rem;
	width: 75%;
	max-width: 1500px;
	border-radius: 30px;
	background-color: $primary;
	padding: 2%;
	padding-top: 0.5%;
	line-height: $leading;
}

.dropdown_container {
	position: relative;
	padding-left: 2em;
}

.btn_container {
	position: absolute;
	right: 0;
	padding-right: 2em;
}

.bottom_container {
	position: relative;
	display: flex;
	margin: auto;
}

</style>
