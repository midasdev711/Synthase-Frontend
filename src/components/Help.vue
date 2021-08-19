<template>
  <div class="root_container">
    <div class="section_container_prime shadow-lg">
      <h2>Help Contents</h2>
      <p class="help-paragraph">
        <ul>
          <li><a href="#expectations">What can I expect to gain from SYNTHASE?</a></li>
          <li><a href="#how_to_use">How do I use SYNTHASE?</a></li>
          <li><a href="#create_threat">How do I Create a Threat?</a></li>
          <li><a href="#create_indicator">How do I Create an Indicator?</a></li>
          <li><a href="#assign_indicator">How do I assign Indicators to Threats?</a></li>
          <li><a href="#artifacts">What is an Artifact?</a></li>
          <li><a href="#immediate_results">Why don’t I see immediate results from the Indicators I put in?</a></li>
          <li><a href="#speed_of_collection">How long does it typically take for Artifacts to be found for the Indicators I added?</a></li>
          <li><a href="#how_many_threats">How many Threats can I have?</a></li>
          <li><a href="#how_many_indicators">How many Indicators can I have for a Threat?</a></li>
          <li><a href="#help_identifying_source">Can you help me with identifying the source/IP address of the artifacts for my Threat?</a></li>
          <li><a href="#errors">I received an error on ‘xxx’ screen of SYNTHASE and reported ‘yyy’ error.</a></li>
          <li><a href="#exporting_data">How do I export data from SYNTHASE to another application?</a></li>
          <li><a href="#finding_more_artifacts">How do I see more of the Artifacts for my Indicator(s)?</a></li>
          <li><a href="#more_help">What do I do if I have a question not listed here? Or if I have encountered a bug?</a></li>
        </ul>
      </p>
    </div>
    <div
      id="expectations"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        What can I expect to gain from SYNTHASE?
      </h1>
      <p class="help-paragraph">
        SYNTHASE is NOT a threat data feed.  The purpose of SYNTHASE is to help the threat investigator/analyst move from investigating unknown unknowns to known knowns with specific threat artifacts.
      </p>
    </div>
    <div
      id="how_to_use"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How do I use SYNTHASE?
      </h1>
      <p class="help-paragraph">
        The most effective use of SYNTHASE is to first create a Threat. Your Threat should have elements that identify characteristics of the Threat – we refer to these are Indicators.  Once you have assigned Indicators to your Threat, SYNTHASE will start to crawl the DarkNet for your Indicators and will be reported back to your Threat as soon as they are found.  You can expect to receive results to your Indicators.
      </p>
    </div>
    <div
      id="create_threat"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How do I Create a Threat?
      </h1>
      <p class="help-paragraph">
        Navigate to the Threats page. At the bottom of the page there is an input box labeled Add Threat.  Enter your Threat name in the input box and hit the return key.  Your Threat will now be displayed amongst your existing Threats. You can create as many Threats as you need.  In the example below, we are creating a Threat called Drugs.
      </p>
      <br>
      <p class="help-paragraph">
        Think of a Threat as a folder containing all the Indicators you would like associated with that particular Threat. An Indicator is a specific identifier/search criteria that you would like SYNTHASE to crawl the Darknet in search of.
      </p>
    </div>
    <div
      id="create_indicator"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How do I Create an Indicator?
      </h1>
      <p class="help-paragraph">
        Navigate to the Threats and Indicators page. You must have already created a Threat.  Find your Threat; there will be a green + sign and a red X to the right of your Threat name.  Click on the green + sign; a drop down window will appear which is your input area for your new indicator.
      </p>
      <br>
      <p class="help-paragraph">
        Once the Indicator Xanax has been entered, hit the enter key. It shows up under the selected Threat. SYNTHASE will now begin to crawl the Darknet/Darkweb for all instances of this new Indicator.
      </p>
      <br>
      <p class="help-paragraph">
        You can enter any number of Indicators for a single Threat.  Expert Advice: try to limit the number of indicators for a Threat to 10 or fewer as the artifacts returned from your Indicators can get large.
      </p>
    </div>
    <div
      id="assign_indicator"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How do I assign Indicators to Threats?
      </h1>
      <p class="help-paragraph">
        See <a href="#create_indicator">"How do I Create an Indicator?"</a>
      </p>
    </div>
    <div
      id="artifacts"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        What is an Artifact?
      </h1>
      <p class="help-paragraph">
        An Artifact is a set of information resulting from a search/crawl of the Darknet/Darkweb for the specific search word(s) entered. The Artifact will contain the following information about what was found for your Indicator:
        <br>
        <br>
        <ul>
          <li>Page Title: this is title of the page that was scanned on the Darkweb</li>
          <li>URL: The URL associated with the scanned Darkweb page. Expert Advice: You can highlight and copy the URL into the Advance Search to identify all instances of the URL.</li>
          <li>Last Scan Date: The last date that SYNTHASE scanned that Darkweb for that URL page.</li>
          <li>Languages used on the page were the Indicator was found</li>
          <li>A Sentiment score from Negative to Positive</li>
          <li>A Deanonymized result: yes or no</li>
          <li>Page Type</li>
          <li>Indicators</li>
          <li>Page Topics</li>
        </ul>
      </p>
    </div>
    <div
      id="immediate_results"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        Why don’t I see immediate results from the Indicators I put in?
      </h1>
      <p class="help-paragraph">
        SYNTHASE crawls the Darknet/Dartweb constantly.  When it encounters an Indicator on a page that it is processing, it will immediately report back the results to you in your Indicator. Due to the size of the Darknet, it may take upwards of 1 week to find an Artifact for your Indicator.
      </p>
    </div>
    <div
      id="speed_of_collection"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How long does it typically take for Artifacts to be found for the Indicators I added?
      </h1>
      <p class="help-paragraph">
        SYNTHASE crawls the DarkNet constantly.  When it encounters an Indicator on a page that it is processing, it will immediately report back the results to you in your Indicator. Due to the size of the Darknet, it may take upwards of 1 week to find an Artifact for your Indicator.
      </p>
    </div>
    <div
      id="how_many_threats"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How many Threats can I have?
      </h1>
      <p class="help-paragraph">
        SYNTHASE allows you to store as many Threats as you need.
      </p>
    </div>
    <div
      id="how_many_indicators"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How many Indicators can I have for a Threat?
      </h1>
      <p class="help-paragraph">
        SYNTHASE allows you to store as many Indicators as you need for your Threat.
      </p>
    </div>
    <div
      id="help_identifying_source"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        Can you help me with identifying the source/IP address of the artifacts for my Threat?
      </h1>
      <p class="help-paragraph">
        Recluse Laboratories is staffed with experts who can help you with identifying/clarifying the artifacts you have uncovered for you Indicators/Threats.  Typically this is a quick Help call.  If it is determined that the request will require additional time, we will provide an estimate to you for what we expect the request to take.
      </p>
    </div>
    <div
      id="errors"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        I received an error on ‘xxx’ screen of SYNTHASE and reported ‘yyy’ error.
      </h1>
      <p class="help-paragraph">
        Please report any errors to the Help Desk immediately.
      </p>
    </div>
    <div
      id="exporting_data"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How do I export data from SYNTHASE to another application?
      </h1>
      <p class="help-paragraph">
        On the lower left portion of your screen, click on the EXPORT button.
        <br>
        <br>
        Immediately the current Artifacts you have searched will be exported to a local hard drive to the file export.csv and will display in your browser like this:
        <br>
        <br>
        The csv file will contain the following columns of information:
        <br>
        <br>
        <ul>
          <li>website_type</li>
          <li>title</li>
          <li>url</li>
          <li>sentiment</li>
          <li>last_crawl</li>
          <li>extremism_model</li>
          <li>topic_modeling</li>
          <li>has_deanon</li>
          <li>matched_indicators</li>
          <li>email_addresses</li>
          <li>md5</li>
          <li>ip_addresses</li>
          <li>pgp_public_keys</li>
          <li>rsa_private_keys</li>
          <li>shodan_keys</li>
        </ul>
      </p>
    </div>
    <div
      id="finding_more_artifacts"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        How do I see more of the Artifacts for my Indicator(s)?
      </h1>
      <p class="help-paragraph">
        When you have entered a Search or Advanced Search in SYNTHASE you will see a message just under the SYNTHASE banner that says “Displaying page 1 of X”. Underneath the display you will see two blue arrows –pointing in opposite directions.  Click the right arrow to go forwards (next 10 results) and click the left arrow to go backwards (previous 10 results).
      </p>
    </div>
    <div
      id="more_help"
      class="section_container shadow-lg"
    >
      <h1 class="help-h1">
        What do I do if I have a question not listed here? Or if I have encountered a bug?
      </h1>
      <p class="help-paragraph">
        Please contact us at <a href="mailto:helpdesk@synthase.io">helpdesk@synthase.io</a> and we will get back to you as soon as possible.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Help',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/global/variables';

	.help-h1 {
		line-height: 50px;
	    margin-top: 0.67em;
    	margin-bottom: 0.67em;
	}

	.help-paragraph {
		font-size: 18px;
	}

/*	margin-top: 2rem;
	background-color: $primary-dark;
	padding: 0 24px 24px 24px;
	border-radius: 15px;*/

	.root_container {
		// display: flex;
		// flex-grow: 1;
		position: relative;
		width: 100%;
	}

	.section_container_prime {
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

		ul{
			list-style-type: none;
		}

		li{
			margin-bottom: 8px;
		}

		h2 {
			text-align: center;
			line-height: 50px;
		    margin-top: 0.67em;
	    	margin-bottom: 0.67em;
		}
		p {
			font-size: 22px;
			line-height: $leading;
		}

		margin: auto;
		margin-bottom: 60px;
		margin-top: 4rem;
		width: 75%;
		max-width: 1500px;
		// border: 2px solid $border;
		border-radius: 30px;
		background-color: $primary;
		padding: 2%;
		padding-top: 0.5%;
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
		margin-top: 15px;
		width: 75%;
		max-width: 1500px;
		// border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 30px;
		background-color: $primary;
		padding: 2%;
		padding-top: 0.5%;
		line-height: $leading;
	}

	.help_image {
		margin: auto;
		display: flex;
		width: 600px;
	}

	.smaller_image {
		margin: auto;
		display: flex;
		width: 450px;
	}

</style>
