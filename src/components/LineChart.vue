<template>
  <div>
    <apexchart type="bar" height="350" :options="chartOptions" :series="chartSeries" ref="realtimeChart"></apexchart>
  </div>
</template>

<script>
export default {
  name: "LineChart",
  props: {
    series: {
      type: Array
    },
    categories: {
      type: Array
    },
    transactionsDate: {
      type: Date,
      default: () => new Date()
    },
    chartTitle: {
      type: String,
      default: 'Transactions',
    }
  },
  data() {
    return {
      chartSeries: [{
        name: 'protoone',
        data: [10, 20, 30]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: this.chartTitle,
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [],
        }
      },
    }
  },
  methods: {
    refreshValues() {


      this.chartOptions = {
        ...this.chartOptions, ...{
          xaxis: {
            categories: this.categories
          }
        }
      }

    },
  },
  watch: {
    series: {
      deep: true,
      handler() {

        console.log(' im inside chart')

        this.chartSeries = [{
          data: this.series
        }]
        this.chartOptions.xaxis.categories = this.categories;
        this.$refs.realtimeChart.refresh();

      }
    },
  }
}
</script>

<style scoped>

</style>
