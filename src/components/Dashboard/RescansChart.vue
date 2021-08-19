<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: ['data', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options)
  }
}
</script>
