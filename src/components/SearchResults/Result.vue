<template>
  <div>
    <div
      class="result-row shadow-lg"
      :class="result_class(result)"
    >
      <h3
        v-if="result.title"
        class="text-secondary pb-4"
      >
        Page Title:
        <span class="text-white p"> {{ result.title }}</span>
        <img
          class="label-img"
          :src="result_class(result)"
        >
      </h3>
      <h3
        v-if="result.origin_username"
        class="text-secondary pb-4"
      >
        Username:
        <span class="text-white p"> {{ result.origin_username }}</span>
        <img
          class="label-img"
          :src="result_class(result)"
        >
      </h3>
      <div class="inner_div flex">
        <div class="w-1/2">
          <p
            v-if="result.url && result.doc_type == 'onions'"
            class="result-label--url w-3/4"
          >
            <!-- <font-awesome-icon class="login__icon" :icon="['fas', 'link']"/> -->
            URL:
            <span class="result-entry result-url"> {{ result.url }}</span>
          </p>
          <!-- <p v-if="result.origin_id" class="result-label--url w-3/4">
                        Origin ID:
                        <span class="result-entry result-url"> {{ result.origin_id }}</span>
                    </p> -->
          <p
            v-if="result.last_crawl"
            class="result-label w-3/4"
          >
            <!-- <font-awesome-icon class="login__icon" :icon="['fas', 'barcode']"/> -->
            Last Crawl:
            <span class="result-entry"> {{ result.last_crawl | epoch }}</span>
          </p>
          <p
            v-if="result.origin_title"
            class="result-label"
          >
            Origin Title:
            <span class="result-entry">{{ result.origin_title }}</span>
          </p>
          <p
            v-else-if="result.sender_username"
            class="result-label"
          >
            Sender Username:
            <span class="result-entry">{{ result.sender_username }}</span>
          </p>
          <p
            v-if="result.message_timestamp"
            class="result-label w-3/4"
          >
            <!-- <font-awesome-icon class="login__icon" :icon="['fas', 'barcode']"/> -->
            Message Timestamp:
            <span class="result-entry"> {{ result.message_timestamp | epoch }}</span>
          </p>
          <div
            v-if="result.languages"
            class="result-languages flex items-center"
          >
            <p class="result-label--language">
              Languages:
              <span
                v-for="language of result.languages"
                :key="language.name"
                class="result-entry"
              >
                {{ language.name }} {{ language.score + "%" }}
                <span
                  v-if="result.languages.length > 1"
                  class="text-primary-dark"
                >|</span>
              </span>
            </p>
          </div>
          <p
            v-if="result.website_type"
            class="result-label"
          >
            Page Type:
            <span class="result-entry">{{ result.website_type }}</span>
          </p>
          <p
            v-if="result.origin_type"
            class="result-label"
          >
            Origin Type:
            <span class="result-entry">{{ result.origin_type[0].toUpperCase() + result.origin_type.slice(1) }}</span>
          </p>
          <div
            v-if="result.sentiment"
            class="result-sentiment-row"
          >
            <p class="result-label">
              Sentiment:
              <Sentiment :score="result.sentiment" />
            </p>
          </div>
          <p
            v-if="result.extremism_score"
            class="result-label"
          >
            Sunni Extremism Score:
            <span class="result-entry">{{ Math.round(result.extremism_score*100) }}/100</span>
          </p>
          <ListedResult
            v-if="result.origins"
            label="Origins"
            :result="result.origins"
            cutoff_text="origins"
            cutoff_length="5"
            text_length="-1"
          />
          <p
            v-if="result.doc_type == 'onions'"
            class="result-label"
          >
            Deanonymized:
            <span class="result-entry">
              <template v-if="result.has_deanon == 1">Yes</template>
              <template v-else>No</template>
            </span>
          </p>
          <p
            v-if="result.doc_type == 'telegram'"
            class="result-label"
          >
            Is Public:
            <span class="result-entry">
              <template v-if="result.origin_is_public == 1">Yes</template>
              <template v-else>No</template>
            </span>
          </p>
        </div>
        <div class="w-1/2">
          <!-- <p v-if="result.sender_id" class="result-label">Sender ID:
                        <span class="result-entry">{{ result.sender_id }}</span>
                    </p> -->
          <p
            v-if="result.indicators"
            class="chips"
          >
            <span class="result-label">Indicators:</span>
            <span
              v-for="indicator of result.indicators"
              :key="indicator"
              class="result-entry"
            >
              <InteractiveTerm
                :term="indicator"
                type="indicator"
                @add_term="pass_on_event"
              />
              <!-- {{ indicator }} -->
              <!-- <span class="text-primary-dark" v-if="result.matched_indicators.length > 1">|</span> -->
            </span>
          </p>
          <p
            v-if="result.topics"
            class="chips"
          >
            <span class="result-label"> Page Topics:</span>
            <span
              v-for="topic of result.topics"
              :key="topic"
              class="result-entry"
            >
              <InteractiveTerm
                :term="topic"
                type="topic"
                @add_term="pass_on_event"
              />
              <!-- {{ topic }}
                            <span class="text-primary-dark" v-if="result.topic_modeling.length > 1">|</span> -->
            </span>
          </p>
          <p
            v-if="result.file_name"
            class="result-label"
          >
            File Name:
            <span class="result-entry">{{ result.file_name }}</span>
          </p>
          <p
            v-if="result.mime_type"
            class="result-label"
          >
            MIME Type:
            <span class="result-entry">{{ result.mime_type }}</span>
          </p>
          <p
            v-if="result.media_type"
            class="result-label"
          >
            Media Type:
            <span class="result-entry">{{ result.media_type[0].toUpperCase() + result.media_type.slice(1) }}</span>
          </p>
          <p
            v-if="result.page_type"
            class="result-label"
          >
            Website Type:
            <span class="result-entry">{{ make_page_type(result.page_type) }}</span>
          </p>
          <p
            v-if="result.url && result.doc_type == 'telegram'"
            class="result-label--url w-3/4"
          >
            <!-- <font-awesome-icon class="login__icon" :icon="['fas', 'link']"/> -->
            URL:
            <span class="result-entry result-url"> {{ result.url }}</span>
          </p>
          <p class="result-label">
            Permalink:
            <span class="result-entry result-url"> https://synthase.io/search/perma?id={{ result._id }}</span>
          </p>
        </div>
      </div>
      <div v-if="result.doc_type == 'telegram'">
        <br>
        <p
          v-if="result.page_title"
          class="result-label"
        >
          Webpage Title:
          <br><br>
          <span class="result-entry">{{ result.page_title }}</span>
        </p>
        <p
          v-if="result.page_description"
          class="result-label"
        >
          Webpage Description:
          <br><br>
          <span class="result-entry">{{ result.page_description }}</span>
        </p>
        <p
          v-if="result.body"
          class="result-label"
        >
          Message Content:
          <br><br>
          <span class="result-entry">{{ result.body }}</span>
        </p>
      </div>
      <div
        v-if="more_results_available()"
        class="inner_div--text"
      >
        <ShowHideBtn @show-more="show_more = !show_more" />
      </div>
      <div
        v-if="more_results_available() && show_more"
        class="inner_div flex"
      >
        <div class="w-1/2">
          <p
            v-if="result.server_version"
            class="result-label"
          >
            Server Info:
            <span class="result-entry result-url"> {{ result.server_version }}</span>
          </p>
          <ListedResult
            v-if="result.ip_addresses"
            label="IP Addresses"
            :result="result.ip_addresses"
            cutoff_text="ip addresses"
            cutoff_length="5"
            text_length="75"
          />
          <ListedResult
            v-if="result.ssh_key_fingerprints"
            label="SSH Key Fingerprints"
            :result="result.ssh_key_fingerprints"
            cutoff_text="ssh key fingerprints"
            cutoff_length="5"
            text_length="75"
          />
        </div>
        <div class="w-1/2">
          <ListedResult
            v-if="result.email_addresses"
            label="Email Addresses"
            :result="result.email_addresses"
            cutoff_text="email addresses"
            cutoff_length="5"
            text_length="75"
          />
          <ListedResult
            v-if="result.pgp_public_keys"
            label="PGP Public Keys"
            :result="result.pgp_public_keys"
            cutoff_text="public keys"
            cutoff_length="5"
            text_length="75"
          />
          <ListedResult
            v-if="result.rsa_private_keys"
            label="RSA Private Keys"
            :result="result.rsa_private_keys"
            cutoff_text="private keys"
            cutoff_length="5"
            text_length="75"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sentiment from './Sentiment'
import ListedResult from './ListedResult'
import ShowHideBtn from './ShowHideBtn'
import InteractiveTerm from './InteractiveTerm'
export default {
  name: 'Result',
  components: {
    Sentiment,
    ListedResult,
    ShowHideBtn,
    InteractiveTerm
  },
  filters: {
    epoch (time) {
      const date = new Date(Math.round(time * 1000)).toGMTString()
      return date
    }
  },
  props: ['result'],
  data () {
    return {
      show_more: false
    }
  },
  computed: {},
  methods: {
    result_class (result) {
      console.log(result.index)
      if (result.doc_type == 'telegram') {
        return '/static/telegram.png'
      } else {
        return '/static/onion.png'
      }
    },
    pass_on_event (term) {
      console.log('Checking type')
      console.log(term)
      this.$emit('add_term', term)
    },
    more_results_available () {
      if (this.result.server_version) {
        return true
      } else if (this.result.ssh_key_fingerprints) {
        return true
      } else if (this.result.ssh_key_fingerprints) {
        return true
      } else if (this.result.email_addresses) {
        return true
      } else if (this.result.pgp_public_keys) {
        return true
      } else if (this.result.rsa_private_keys) {
        return true
      } else {
        return false
      }
    },
    make_page_type (text) {
      const text_array = text.split('_')
      let new_text = ''
      for (const word of text_array) {
        new_text += word[0].toUpperCase() + word.slice(1) + ' '
      }
      return new_text.trim()
    },
    sort_results (sort) {
      if (sort == this.selected_sort) {
        this.reverse = !this.reverse
      } else {
        this.reverse = false
      }
      this.selected_sort = sort
      switch (sort) {
        case 'Page Title':
          this.$store.commit('sort', { sort_by: 'title', reverse: this.reverse })
          break
        case 'Page Type':
          this.$store.commit('sort', { sort_by: 'website_type', reverse: this.reverse })
          break
        case 'Last Scan':
          this.$store.commit('sort', { sort_by: 'last_crawl', reverse: this.reverse })
          break
      }
    },
    sort_title (reverse) {
      let results_copy = []
      if (reverse) {
        results_copy = this.results.hits.sort((a, b) => {
          return a.title < b.title ? 1 : -1
        })
      } else {
        results_copy = this.results.hits.sort((a, b) => {
          return a.title > b.title ? 1 : -1
        })
      }

      return results_copy
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/global/variables';
    .sort_pagination {
        position: relative;
        display: inline;
        margin-bottom: 2rem;
    }

    .separator {
        clear: both;
    }

    .inner_div {
        padding-top: 1rem;
        &--text {
            padding-top: 1rem;
            padding-bottom: 1rem;
	    }
    }

    .search-column {
        // width: 100%;
        // max-width: 1300px;
        margin-top: 2rem;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        // &.no_pagination {
        // 	width: 90%;
        // 	max-width: 1300px;
        // 	margin: auto;
        // }
    }

    .result-left-col {
        // border-right: 1px solid $secondary;
        // margin-right: 1rem;
        // padding-right: 1rem;
    }

    .result-row {
        padding: 1rem;
        // max-width: 1250px;
        margin-bottom: 2rem;
        border-radius: 15px;
        background-color: $primary;
        // border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 30px;
        padding: 2%;
        // cursor: pointer;
        transition: all 300ms;
        overflow: hidden;

        &.tor_result {
            // background-color: $primary;
        }

        &.telegram_result {
            // background-color: $primary;

        }
        // &:hover {
            // background-color: $telegram_result_heightened;
            // border-color: transparent; /* remove the border's colour */
            // box-shadow: 0 0 0 2px $telegram-result; /* emulate the border */
        // }
    }

    .result-header {
        display: inline;
    }

    .text-secondary {
        // float: right;
    }

    .label-img {
        float: right;
    }

    .result-sentiment-row {
        margin-bottom: 1rem;

        .result-label {
            margin-bottom: 0.5rem;
            letter-spacing: 1px;
        }
    }

    .result-url {
        word-wrap: break-word;
    }

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

        &--chips-below {
            @extend .result-label;
        }
    }

    .chips {
        margin-bottom: 1rem;
    }

    .result-ssh {
        margin: auto;
        display: block;
        color: white;
        font-weight: 400;
        word-wrap: break-word;
        // width: 1000px;
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

    .result-languages {
        margin-bottom: 1rem;
    }

    .result-flag {
        margin-left: 12px;
        margin-right: 6px;
    }

    .details-fade-enter-active, .details-fade-leave-active {
    transition: opacity .5s;
    }
    .details-fade-enter, .details-fade-leave-to {
    opacity: 0;
    }

    .border_top {
        border-top: 1px solid $secondary;
        margin-top: 2rem;
        padding-top: 2rem;
    }

    .result-details {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        background-color: rgba(0,0,0,0.4);
        z-index: 1;

        &__content {
            position: absolute;
            top: 100px;
            left: 50%;
            border-radius: 10px;
            transform: translateX(-50%);
            padding: 2rem;
            background-color: $primary-light;
        }

        &__title {
            text-align: center;
            line-height: 1.5;
            margin-bottom: 2rem;
        }

        &__close {
            position: absolute;
            top: 0;
            right: 0;
            padding: 7px 12px;
            border-radius: 0px 10px 0px 10px;
            background-color: $secondary;
            transition: 300ms;
            cursor: pointer;

            &:hover {
                background-color: $secondary-dark;
            }
        }

        &__deanon {
            border-top: 1px solid $secondary;
            margin-top: 2rem;
            padding-top: 2rem;
            text-align: center;
        }

        .result-entry--link {
            cursor: pointer;
            &:hover {
                color: $secondary-light;
            }
        }
    }
</style>
