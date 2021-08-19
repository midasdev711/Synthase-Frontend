<script>
import { Doughnut } from 'vue-chartjs'
import ChartjsPluginDoughnutlabel from 'chartjs-plugin-doughnutlabel'

export default {
  extends: Doughnut,
  props: ['data', 'options'],
  data () {
    return {
      title: null,
      count: null,
      num1: Math.floor((Math.random() * 10000) + 1),
      num2: 10000
    }
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.get_data(), this.get_config().options)
  },

  methods: {
    format_num (old_num) {
      if (old_num < 1000) {
        return old_num
      } else if (old_num >= 1000 && old_num <= 1000000) {
        return (old_num / Math.pow(10, 3)).toFixed(1) + 'K'
      } else if (old_num >= 1000000 && old_num <= 1000000000) {
        return (old_num / Math.pow(10, 4)).toFixed(1) + 'M'
      }
    },
    get_data () {
      const chart_data = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: ['#64b5f6', 'rgba(0, 0, 0, 0.3)'],
          borderWidth: [0, 0]
        }]
      }
      this.count = this.data.count
      chart_data.datasets[0].data.push(this.count)
      chart_data.datasets[0].data.push(237730)
      return chart_data
    },

    get_config () {
      return {
        options: {
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
          plugins: {
            doughnutlabel: {
              labels: [
                {
                  text: this.format_num(this.count),
                  font: {
                    size: '24',
                    family: 'Lato'
                  },
                  color: '#E0E0E0'
                }
              ]
            }
          }
        }
      }
    }
  }
}
</script>
