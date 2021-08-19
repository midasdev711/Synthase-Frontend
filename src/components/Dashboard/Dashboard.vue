<style  src="./styles.scss"   lang="scss">
  @import '~@/assets/scss/global/variables';
</style>

<template src="./template.html" />

<script>
import LastRelevantCrawled from './LastRelevantResults/LastRelevantCrawled'
import TopThreatsChart from './TopThreatsChart'
import InteractiveTerm from '../SearchResults/InteractiveTerm'
import OtherChart from './OtherChart'
import DataCollectionChart from './DataCollectionChart'
import RescansChart from './RescansChart'
import Rescans from './Rescans'
import SavedSearchesTable from './SavedSearchesTable'
import VueSlider from 'vue-slider-component'
import Cookie from 'js-cookie'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
    LastRelevantCrawled,
    DataCollectionChart,
    TopThreatsChart,
    OtherChart,
    RescansChart,
    Rescans,
    SavedSearchesTable,
    VueSlider,
    InteractiveTerm
  },
  data () {
    return {
      date_values: ['One Week'],
      date_marks: ['One Day', 'One Week', 'Two Weeks', 'Three Weeks', 'Four Weeks'],
      telegram_dash: false
    }
  },
  computed: {
    telegram_results () {
      console.log(this.$store.state.dashboard_telegram)
      return this.$store.state.dashboard_telegram
    },
    onion_results () {
      console.log(this.$store.state.dashboard_onions)
      return this.$store.state.dashboard_onions
    },
    chart_styles () {
      return {
        responsive: true,
        maintainAspectRatio: true,
        padding: '12px',
        backgroundColor: '#1f292e'
      }
    },
    data_collection_style () {
      return {
        responsive: true,
        maintainAspectRatio: true,
        padding: '12px',
        backgroundColor: '#1f292e'
      }
    },
    // rescans_data() {
    //   let data = {
    //     labels: [],
    //     datasets: [
    //       {
    //         data: [],
    //         backgroundColor: [
    //           'rgba(100, 181, 246, 1)',
    //         ],
    //       },
    //       {
    //         data: [],
    //         backgroundColor: [
    //           'rgba(100, 181, 246, 0.5)',
    //         ],
    //       }
    //     ]
    //   }
    //   for (let key in this.results.rescans) {
    //     switch (key) {
    //       case "max_rescans":
    //         data.labels.push('MaxRescans')
    //         data.datasets[0].data.push(this.results.rescans[key]);
    //         break;
    //       case "rescans_available":
    //         data.datasets[1].data.push(this.results.rescans[key]);
    //         break;
    //       default:
    //     }
    //   }

    //   return data;
    // },

    // rescans_config() {
    //   return {
    //     data: this.rescans_data,
    //     options: {
    //       title: {
    //           display: true,
    //           text: "Rescans",
    //           fontColor: "#000",
    //           fontSize: 24
    //         },
    //       scales: {
    //           xAxes: [{
    //               stacked: true
    //           }],
    //           yAxes: [{
    //               stacked: true
    //           }]
    //       },
    //       legend: {
    //           display: false,
    //       },
    //       responsive: true,
    //       categoryPercentage: 0.1
    //     }
    //   }
    // },
    top_threats_1d_data () {
      const data = {
        labels: ['foobar.onion'],
        datasets: [{
          data: [2500, 10000],
          backgroundColor: [],
          borderWidth: [0, 0, 0, 0]
        }]
      }
      const arrays = {
        test: [],
        MaxRescans: []
      }

      // for (let threat in this.results.top_threats[1]) {
      //   if (this.results.top_threats[1].length > 0) {
      //     data.labels.push(this.results.top_threats[1][threat][0]);
      //     data.datasets[0].data.push(this.results.top_threats[1][threat][1]);
      //     data.datasets[0].backgroundColor.push(this.getRandomColor())
      //   }
      // }
      data.datasets[0].backgroundColor.push('#64b5f6')
      data.datasets[0].backgroundColor.push('rgba(0, 0, 0, 0.3)')
      return data
    },

    top_threats_1d_config () {
      return {
        data: this.top_threats_1d_data,
        options: {
          // scale: { gridLines: { color: "rgba(255, 255, 255, 0.2)" } },
          legend: {
            display: false,
            labels: {
              fontColor: 'white'
            }
          },
          tooltips: {
            enabled: false
          },
          cutoutPercentage: 75,
          rotation: -3.1415926535898,
          // circumference: 3.1415926535898 + 3.1415926535898/2,

          // title: {
          //     display: true,
          //     text: "24 Hours",
          //     fontColor: "#FAFAFA",
          //     fontSize: 24
          //   }
          plugins: {
            doughnutlabel: {
              labels: [
                {
                  text: '2.5K',
                  font: {
                    size: '24',
                    family: 'Lato'
                  },
                  color: 'white'
                }
              ]
            }
          }
        }
      }
    },
    top_threats_7d_data () {
      const data = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          borderWidth: [0, 0, 0, 0]
        }]
      }
      const arrays = {
        test: [],
        MaxRescans: []
      }

      // for (let threat in this.results.top_threats[7]) {
      //   if (this.results.top_threats[7].length > 0) {
      //     data.labels.push(this.results.top_threats[7][threat][0]);
      //     data.datasets[0].data.push(this.results.top_threats[7][threat][1]);
      //     data.datasets[0].backgroundColor.push(this.getRandomColor())
      //   }
      // }
      return data
    },

    top_threats_7d_config () {
      return {
        data: this.top_threats_7d_data,
        options: {
          scale: { gridLines: { color: 'rgba(255, 255, 255, 0.2)' } },
          legend: {
            labels: {
              fontColor: 'white'
            }
          },
          title: {
            display: true,
            text: '7 Days',
            fontColor: '#FAFAFA',
            fontSize: 24
          }
        }
      }
    },
    // top_threats_30d_data() {
    //   let data = {
    //     labels: [],
    //     datasets: [{
    //       data: [],
    //       backgroundColor: [],
    //       borderWidth: [0,0,0,0]
    //     }]
    //   },
    //   arrays = {
    //     test: [],
    //     MaxRescans: [],
    //   }

    //   for (let threat in this.results.top_threats[30]) {
    //     if (this.results.top_threats[30].length > 0) {
    //       data.labels.push(this.results.top_threats[30][threat][0]);
    //       data.datasets[0].data.push(this.results.top_threats[30][threat][1]);
    //       data.datasets[0].backgroundColor.push(this.getRandomColor())
    //     }
    //   }
    //   return data;
    // },

    // top_threats_30d_config() {
    //   return {
    //     data: this.top_threats_30d_data,
    //     options: {
    //       scale: { gridLines: { color: "rgba(255, 255, 255, 0.2)" } },
    //       legend: {
    //           labels: {
    //             fontColor: "white",
    //           },
    //       },
    //       title: {
    //           display: true,
    //           text: "30 Days",
    //           fontColor: "#FAFAFA",
    //           fontSize: 24
    //         }
    //     }
    //   }
    // },
    // top_threats_365d_data() {
    //   let data = {
    //     labels: [],
    //     datasets: [{
    //       data: [],
    //       backgroundColor: [],
    //       borderWidth: [0,0,0,0]
    //     }]
    //   },
    //   arrays = {
    //     test: [],
    //     MaxRescans: [],
    //   }

    //   for (let threat in this.results.top_threats[365]) {
    //     if (this.results.top_threats[365].length > 0) {
    //       data.labels.push(this.results.top_threats[365][threat][0]);
    //       data.datasets[0].data.push(this.results.top_threats[365][threat][1]);
    //       data.datasets[0].backgroundColor.push(this.getRandomColor())
    //     }
    //   }
    //   return data;
    // },

    // top_threats_365d_config() {
    //   return {
    //     data: this.top_threats_365d_data,
    //     options: {
    //       scale: { gridLines: { color: "rgba(255, 255, 255, 0.2)" } },
    //       legend: {
    //           labels: {
    //             fontColor: "white",
    //           },
    //       },
    //       title: {
    //           display: true,
    //           text: "Year",
    //           fontColor: "#FAFAFA",
    //           fontSize: 24
    //         }
    //     }
    //   }
    // },
    data_collection_data () {
      const data = {
        labels: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [{
          data: [400, 600, 800, 850, 750, 1000, 1200],
          label: 'Numer of Results',
          pointBackgroundColor: ['#64b5f6', '#64b5f6', '#64b5f6', '#64b5f6', '#64b5f6', '#64b5f6', '#64b5f6'],
          pointBorderColor: ['#FAFAFA', '#FAFAFA', '#FAFAFA', '#FAFAFA', '#FAFAFA', '#FAFAFA', '#FAFAFA'],
          borderColor: 'rgba(255, 255, 255, 0.8)',
          backgroundColor: 'rgba(100, 181, 246, 0.6)',
          fill: true
        }]
      }
      // let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      // let previous_day = ""
      // for (let data_point in this.results.document_history) {
      //   if (this.results.document_history.length > 0) {
      //     let x = days[(new Date(this.results.document_history[data_point].x * 1000)).getDay()]
      //     if(x != previous_day) {
      //       data.labels.push(x)
      //       previous_day = x
      //     }
      //     else {
      //       data.labels.push("")
      //     }
      //     data.datasets[0].data.push(this.results.document_history[data_point].y);
      //     data.datasets[0].pointBackgroundColor.push("#64b5f6");
      //     data.datasets[0].pointBorderColor.push("#FAFAFA");
      //   }
      // }
      return data
    },
    data_collection_config () {
      return {
        data: this.data_collection_data,
        options: {
          scales: {
            labels: {
              color: 'white'
            },
            xAxes: [{
              gridLines: {
                color: 'rgba(255, 255, 255, 0.2)'
              },
              ticks: {
                fontFamily: 'Lato',
                fontColor: 'rgba(255, 255, 255, 0.8)'
              }
            }],
            yAxes: [{
              gridLines: {
                color: 'rgba(255, 255, 255, 0.2)'
              },
              ticks: {
                fontFamily: 'Lato',
                fontColor: 'rgba(255, 255, 255, 0.8)'
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            titleFontFamily: 'Lato',
            bodyFontFamily: 'Lato'
          },
          title: {
            display: true,
            text: 'Number of Results within Last 7 Days',
            fontColor: 'rgba(255, 255, 255, 0.8)',
            fontSize: 24,
            fontFamily: 'Lato'
          }
        }
      }
    }
  },
  mounted () {
		  this.$store.dispatch('init')
  },
  methods: {
    hexToRGB (hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
      } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'
      }
    },
    getRandomColor () {
      const letters = '0123456789ABCDEF'
      let color = '#7F'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return this.hexToRGB(color, 0.8)
    }
  }
}
</script>
