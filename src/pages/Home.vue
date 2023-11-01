<template>
  <div>
    <loading :active="loading" :color="'#7367F0'" :is-full-page="false"></loading>
    <div class="content-body">
      <div class="card">
        <div class="card-content">


          <div class="col-md-3 col-12">
            <div class="text-bold-600 font-medium-2">
              Select device
            </div>
            <fieldset class="form-group">
              <select class="form-control" id="basicSelect" v-model="selectedDeviceId" @change="deviceSelected">
                <option :value="device.id" v-for="device in partners">{{ device.name }}</option>
              </select>
            </fieldset>
          </div>

          <div class="card-body">
            <ul class="list-unstyled">
              <li class="d-inline-block mr-2" :value="metric.id" v-for="metric in metrics" :key="metric.id">
                <fieldset>
                  <div class="vs-checkbox-con vs-checkbox-primary">
                    <input type="checkbox" checked="false" :value="metric.id" v-model:is="selectedMetrics">
                    <span class="vs-checkbox vs-checkbox-lg">
                                                            <span class="vs-checkbox--check">
                                                                <i class="vs-icon feather icon-check"></i>
                                                            </span>
                                                        </span>
                    <span class="">{{ metric.name }}</span>
                  </div>
                </fieldset>
              </li>
            </ul>
          </div>

          <div class="card-body">
            <line-chart :categories="lineChartData.categories" :series="lineChartData.series"
                        :chart-title="lineChartTitle"></line-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LineChart from "../components/LineChart";
import {mapActions, mapGetters} from "vuex";
import {connection} from "@/services/metricsHub";

export default {
  name: "Home",
  components: {LineChart},
  data() {
    return {
      storedMetrics: [],
      buttonDisabled: true,
      selectedMetrics: [],
      selectedDeviceId: 1,
      devices: [],
      metrics: [],
      loading: false,
      lineChartData: {
        series: [],
        categories: []
      },
      lineChartTitle: 'Metrics Data',
    }
  },
  computed: {
    ...mapGetters(['partners']),
  },
  methods: {
    ...mapActions(['getPartners']),
    deviceSelected() {
      this.metrics = this.partners.flatMap(device => device.metrics.filter(metric => metric.deviceId === this.selectedDeviceId));
      this.selectedMetrics = [];
      this.lineChartData.categories = [];
      this.lineChartData.series = [];
    },

    oldValuesChange(updatedValues) {
      this.$store.commit('setPartners', "");
    }
  },
  async mounted() {

    let self = this;

    connection.on('mounted', function (newCall) {
      console.log(newCall + " mounted");
      this.connectionId = newCall;
      this.connected = true;
      console.log(this.connectionId, 'im ')
    });

    connection.on('exchanger', function (newCall) {
      console.log(newCall + ' exchanger');
    });

    connection.on('refresh', function (newData) {
      let updatedMetrics = JSON.parse(newData);

      console.log(' im changed', updatedMetrics)

      let oldValues = [];

      for (let i = 0; i < self.lineChartData.series.length; i++) {
        oldValues[i] = self.lineChartData.series[i];
      }

      self.lineChartData.series = oldValues;

      for (let i = 0; i < updatedMetrics.length; i++) {
        let metric = self.metrics.find(m => m.name === updatedMetrics[i].Name);
        if (metric) {
          let online = self.lineChartData.categories.indexOf(metric.name);
          if (online !== -1) {
            self.lineChartData.series[online] = updatedMetrics[i].Value;
            console.log(self.lineChartData.series[online], ' im here', updatedMetrics[i].Value, online)
          }
        }

        let oldValue = self.storedMetrics.find(d => d.id === updatedMetrics[i].DeviceId);
        if (oldValue) {
          let oldMetric = oldValue.metrics.find(m => m.id === updatedMetrics[i].Id)

          if (oldMetric)
            oldMetric.value = updatedMetrics[i].Value;
        }
      }

    });

    connection.on('onDisconnect', function () {
      this.connected = false;
      console.log('disc')
    })


  },
  watch: {
    selectedMetrics: {


      handler(newSelectedIds, oldSelectedIds) {
        this.buttonDisabled = newSelectedIds.length <= 0;
        this.lineChartData.categories = [];
        this.lineChartData.series = [];
        if (newSelectedIds.length > 0) {
          const selectedMetrics = this.metrics.filter(metric => newSelectedIds.includes(metric.id));
          for (const item of selectedMetrics) {
            this.lineChartData.categories.push(item.name);
            this.lineChartData.series.push(item.value);
          }

          let data = {
            DeviceId: this.selectedDeviceId,
            MetricsId: this.selectedMetrics
          };

          connection.invoke("ClientChangedData", JSON.stringify(data)).catch(err => console.error(err));


        } else {
          this.lineChartData.categories = [];
          this.lineChartData.series = [];
        }

      },
      deep: true
    }
  },
  async created() {
    await this.getPartners();
    this.storedMetrics = this.partners;
    this.deviceSelected();
  }
}
</script>
