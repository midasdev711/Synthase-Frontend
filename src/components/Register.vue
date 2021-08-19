<template>
  <div>
    <div class="register_section shadow-lg">
      <div class="register_fields_container">
        <img
          class="register__logo"
          src="static/logo.svg"
        >
        <div
          class="register__input-container register__input--pass"
          :class="{password_is_compliant: password_compliant}"
        >
          <font-awesome-icon
            class="register__icon"
            :class="{active: pass_focus}"
            :icon="['fas', 'lock']"
            size="lg"
          />
          <input
            v-model="password"
            class="register__input"
            type="password"
            placeholder="Password"
            @focus="pass_focus = true"
            @blur="pass_focus = false"
          >
        </div>
        <div
          class="register__input-container register__input--pass"
          :class="{passwords_match: !submit_disabled}"
        >
          <font-awesome-icon
            class="register__icon"
            :class="{active: confirm_focus}"
            :icon="['fas', 'lock']"
            size="lg"
          />
          <input
            v-model="confirm_password"
            class="register__input"
            :class="{}"
            type="password"
            placeholder="Confirm Password"
            @focus="confirm_focus = true"
            @blur="confirm_focus = false"
            @keyup.enter="submit"
          >
        </div>
        <div class="register__input-container register__input--otp">
          <font-awesome-icon
            class="otp__icon"
            :class="{active: otp_focus}"
            :icon="['fas', 'id-badge']"
            size="lg"
          />
          <input
            v-model="otp"
            class="register__input"
            type="text"
            placeholder="Two-Factor Authentication Code"
            @focus="otp_focus = true"
            @blur="otp_focus = false"
            @keyup.enter="submit"
          >
        </div>
        <button
          class="register__submit"
          :disabled="submit_disabled"
          @click="submit"
        >
          submit
        </button>
      </div>
      <div class="qr_code_container">
        <p> Please scan before continuing. </p>
        <img :src="qr_code">
      </div>
    </div>
    <div class="register_text_section shadow-lg">
      <p>
        Passwords must contain the following:
        <br>
        <br>
        <ul>
          <li
            class="password_requirement"
            :class="{one_upper: one_upper_exists}"
          >
            At least one upper case letter
          </li>
          <li
            class="password_requirement"
            :class="{eight_char: eight_char_exists}"
          >
            At least 8 characters
          </li>
          <li
            class="password_requirement"
            :class="{one_number: one_number_exists}"
          >
            At least one number
          </li>
          <li
            class="password_requirement"
            :class="{one_special: one_special_exists}"
          >
            At least one special character
          </li>
        </ul>
        <br>
        The "Password" field will turn green when all the bullet point requirements are met.
        <br>
        <br>
        The "Confirm Password" field will turn green when it matches the "Password" field.
        <br>
        <br>
        The QR code must be scanned by a 2FA authentication app, such as
        <a href="https://authy.com/">Authy</a> or
        <a
          display-inline
          href="https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345"
        >Google Authenticator</a>.
        Once scanned, please enter the 6-digit code into the "Two-Factor Authentication Code" field before submitting.
      </p>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import axios from 'axios'

axios.defaults.withCredentials = true

export default {
  name: 'Register',
  data () {
    return {
      qr_code: null,
      password: '',
      confirm_password: '',
      otp: '',
      pass_focus: false,
      confirm_focus: false,
      register_success: false,
      otp_focus: false
    }
  },
  computed: {

    submit_disabled () {
      const empty = this.password == '' && this.confirm_password == ''
      const match = this.password == this.confirm_password
      return empty || !match
    },
    one_upper_exists () {
            	return /[A-Z]/.test(this.password)
    },
    eight_char_exists () {
            	return this.password.length >= 8
    },
    one_number_exists () {
            	return /[0-9]/.test(this.password)
    },
    one_special_exists () {
            	return /[~`!@#$%^&*()\-_+=\[\]{}\\|;:\'\"<,>.?/]/.test(this.password)
    },
    password_compliant () {
            	return (this.one_upper_exists && this.eight_char_exists && this.one_number_exists && this.one_special_exists)
    }
  },
  mounted () {
    this.set_qr_code()
  },
  methods: {
    submit () {
      const url = `${this.$store.getters.api_url}/register/`
      axios.post(url, { password: this.password, otp: this.otp, uuid: this.$route.query.id }).then(res => {
        this.register_success = true
        setTimeout(() => {
          this.$router.push({ name: 'login' })
        }, 3000)
      }).catch(err => {
        if (err.response.status == 403) {
          var warning = alert('Your password does not meet the requirements.')
        } else if (err.response.status == 400) {
          var warning = alert('Please submit a valid 2FA code.')
        } else {
          var warning = alert('Something went wrong with the submission. Please contance support@unit221b.com immediately for assistance.')
        }
      })
    },
    async set_qr_code () {
            	const _self = this
      const response = await axios.post(`${this.$store.getters.api_url}/get_qr_code/`, { uuid: this.$route.query.id }, { responseType: 'arraybuffer' }).catch(err => {
        _self.$router.push({ name: 'login' })
      })
      const b64 = Buffer.from(response.data, 'binary').toString('base64')
      this.qr_code = 'data:image/jpeg;base64,' + b64
    }
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';

	.password_requirement{
		color: $soft_red;

		&.one_upper{
			color: $soft_green;
		}
		&.eight_char{
			color: $soft_green;
		}
		&.one_number{
			color: $soft_green;
		}
		&.one_special{
			color: $soft_green;
		}
	}

	.register_section {
		margin: auto;
		width: 50%;
		display: flex;
		margin-top: 50px;
        // border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 30px;
		background-color: $primary;
		padding: 25px;
	}

	.register_text_section {
		/*display: flex;*/
		margin: auto;
		width: 50%;
		margin-top: 30px;
        // border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 30px;
		background-color: $primary;
		padding: 2%;
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
	}

    .register__title {
        text-align: center;
        margin-bottom: 12px;
        padding-bottom: 12px;
    }

	.register__logo {
		margin-top: 15px;
		opacity: 1;
	}

	.qr_code_container {
		display: inline-block;
		margin: auto;
		margin-top: 50px;
		width: 300px;
		height: 300px;
	}

	.register_fields_container {
		margin-left: 25px;
		margin-right: 25px;
		display: inline-block;
		width: 40%;
	}

	.register__input-container {
		margin-top: 25px;
		display: flex;
		width: 100%;
		align-items: center;
		border: 2px solid rgba(255, 255, 255, 0.9);
		border-radius: 30px;
		height: 60px;
		padding: 0 12px;

		&.register__input--pass {
			padding-left: 20px;
			border-color: $soft_red;
			&.password_is_compliant {
				border-color: $soft_green;
			}

			&.passwords_match {
				border-color: $soft_green;
			}

			.register__input {
				margin-left: 14px;
			}
		}

		&.register__input--otp {
			padding-left: 20px;

			.register__input {
				margin-left: 14px;
			}
		}
	}

	.register__input {
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

	.register__icon {
		opacity: 0.5;
		transition: opacity 300ms;

		&.active {
			opacity: 1;
		}
	}

	.otp__icon {
		opacity: 0.5;
		color: #9be7ff;
		transition: opacity 300ms;

		&.active {
			opacity: 1;
			color: #9be7ff;
		}
	}

	.register__submit {
		margin: auto;
		margin-top: 25px;
		margin-bottom: 30px;
		width: 100%;
		color: white;
		border-radius: 30px;
		line-height: 60px;
		padding: 0 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 2px;
		background-color: $secondary;
		opacity: 0.7;
		transition: opacity 300ms;

		&:hover {
			opacity: 1;
		}
	}
</style>
