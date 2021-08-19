<template>
  <div
    id="login"
    class="shadow-lg"
  >
    <img
      class="login__logo"
      src="static/logo_with_motto.svg"
    >
    <div class="login__input-container">
      <font-awesome-icon
        class="login__icon"
        :class="{active: user_focus}"
        :icon="['far', 'user-circle']"
        size="2x"
      />
      <input
        v-model="email"
        class="login__input"
        type="text"
        placeholder="Email Address"
        @focus="user_focus = true"
        @blur="user_focus = false"
        @keyup.enter="submit"
      >
    </div>
    <div class="login__input-container login__input--pass">
      <font-awesome-icon
        class="login__icon"
        :class="{active: pass_focus}"
        :icon="['fas', 'lock']"
        size="lg"
      />
      <input
        v-model="password"
        class="login__input"
        type="password"
        placeholder="Password"
        @focus="pass_focus = true"
        @blur="pass_focus = false"
        @keyup.enter="submit"
      >
    </div>
    <div class="login__input-container login__input--pass">
      <font-awesome-icon
        class="otp__icon"
        :class="{active: otp_focus}"
        :icon="['fas', 'id-badge']"
        size="lg"
      />
      <input
        v-model="otp"
        class="login__input"
        type="text"
        placeholder="Two-Factor Authentication Code"
        @focus="otp_focus = true"
        @blur="otp_focus = false"
        @keyup.enter="submit"
      >
    </div>
    <button
      class="login__submit"
      @click="submit"
    >
      submit
    </button>
  </div>
</template>

<script>
import anime from 'animejs'
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: 'jamal@recluselaboratories.com',
      password: 'Test123!@#',
      otp: '',
      user_focus: false,
      pass_focus: false,
      otp_focus: false
    }
  },
  beforeCreate () {
        	const _self = this
        	axios.get(`${this.$store.getters.api_url}/login_heartbeat/`).then(res => {
      		}).catch(err => {
      			if (err.response.status == 403) {
        			_self.$router.push({ name: 'dash' })
      			}
        	})
  },
  mounted () {
    anime({
      targets: '.login__logo',
      opacity: 1,
      easing: 'easeOutCubic',
      duration: 3000,
      delay: 500
    })
  },
  methods: {
    submit () {
      // this.$emit("authenticated", true);
      // this.$router.push({name: 'dash'});
      const url = `${this.$store.getters.api_url}/login/`
      const data = { email: this.email, password: this.password, otp: this.otp }
      console.log(data)
      axios.post(url, data).then(res => {
        this.$emit('authenticated', true)
        this.$router.push({ name: 'dash' })
      }).catch(err => {
        if (err.response.status == 403) {
          alert('The credentials submitted were invalid. Please retry.')
          this.password = ''
          this.otp = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';

	#login {
		position: absolute;
		top: 50%;
		left: 50%;
		// border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 30px;
		transform: translate(-50%, -50%);
		width: 400px;
		background-color: $primary;
		padding: 30px;
	}

	.login__logo {
		left: 0;
		bottom: calc(100% + 20px);
		width: 600px;
		opacity: 0;
    max-width: 100%;
	}

	.login__input-container {
		margin-top: 30px;
		display: flex;
		align-items: center;
		border: 2px solid rgba(255, 255, 255, 0.9);
		border-radius: 30px;
		height: 60px;
		padding: 0 12px;
		margin-bottom: 24px;

		&.login__input--pass {
			padding-left: 20px;

			.login__input {
				margin-left: 18px;
			}
		}
	}

	.login__input {
		padding: 12px;
		margin-left: 12px;
		width: 100%;
		height: 100%;
		background-color: transparent;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		border: none;
	}

	::-webkit-input-placeholder { /* Chrome/Opera/Safari */
	  color: rgba(255, 255, 255, 0.9);
	  font-weight: 700;
	}

	.login__icon {
		opacity: 0.5;
		// transition: opacity 300ms;

		&.active {
			opacity: 1;
		}
	}

	.otp__icon {
		opacity: 0.5;
		color: #9be7ff;
		// transition: opacity 300ms;

		&.active {
			opacity: 1;
		}
	}

	.login__submit {
		margin-top: 1rem;
		position: relative;
		width: 50%;
		left: 25%;
		color: white;
		border-radius: 30px;
		line-height: 60px;
		padding: 0 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 2px;
		background-color: $secondary;
		opacity: 0.7;
		// transition: opacity 300ms;

		&:hover {
			opacity: 1;
		}
	}
</style>
