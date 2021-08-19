<script>
import { PolarArea } from 'vue-chartjs'
// import ChartjsPluginDoughnutlabel from 'chartjs-plugin-doughnutlabel'

export default {
  extends: PolarArea,
  props: ['data', 'options', 'title'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.get_data(), this.get_config().options)
  },

  methods: {
    get_data () {
      let background_opacity = 0.9
      const chart_data = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          borderWidth: []
        }]
      }
      const count = Object.keys(this.data).length
      let opacity_decrease = 0
      if (count <= 5) {
        opacity_decrease = 0.2
      } else {
        opacity_decrease = 0.08
      }
      for (const label in this.data) {
        chart_data.labels.push(label)
        chart_data.datasets[0].data.push(this.data[label])
        const color = 'rgb(100, 181, 246, ' + background_opacity.toString() + ')'
        chart_data.datasets[0].backgroundColor.push(color)
        chart_data.datasets[0].borderWidth.push(0)
        background_opacity -= opacity_decrease
      }

      return chart_data
    },

    get_config () {
      return {
        options: {
          title: {
            display: true,
            text: this.title,
            fontColor: '#E0E0E0',
            fontFamily: 'Lato',
            fontSize: 20,
            padding: 5
          },
          scale: {
            gridLines: {
              color: 'rgba(0, 0, 0, 0.6)'
            },
            ticks: {
              showLabelBackdrop: false,
              fontColor: '#E0E0E0'
            }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              fontColor: 'white',
              fontFamily: 'Lato',
              fontSize: 12
            }
          },
          tooltips: {
            enabled: true
          }
        }
      }
    }
  }
}
</script>
