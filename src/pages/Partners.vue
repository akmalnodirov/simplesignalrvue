<template>
  <div class="content-body">
    <!-- Dashboard Analytics Start -->
    <div class="row" id="table-hover-row">
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Partners</h4>
            <fieldset class="form-group mb-0">
              <select class="form-control" id="basicSelect" v-model="reestrRequest.partnerId" @change="partnerChange"
                      v-if="authUser.roleCode === 'admin'">
                <option :value="null">Select partner - all</option>
                <option :value="partner.id" v-for="partner in partners">{{ partner.name }}</option>
              </select>
            </fieldset>
          </div>
          <div class="card-content">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center text-center">
                <div class="d-flex align-items-center text-center">
                  <date-picker
                      style="margin-bottom: 0 !important; margin-top: 0 !important;"
                      :input-class="'transaction-date-picker-class-range'"
                      :placeholder="'Find transactions between dates'"
                      @change="rangeDateChange"
                      class="range_datepicker mr-1" format="YYYY-MM-DD"
                      range
                      ref="myRangeDatePicker"
                      v-model="betweenDates">
                  </date-picker>
                  <date-picker
                      style="margin-bottom: 0 !important; margin-top: 0 !important;"
                      :input-class="'transaction-date-picker-class-range'"
                      :placeholder="'Поиск по дате'"
                      @change="singleDateChange"
                      class=" single_datepicker"
                      format="YYYY-MM-DD"
                      ref="mySingleDatePicker"
                      v-model="singleDate">
                  </date-picker>
                  <div class="ml-1 align-items-center text-center mr-1">

                    <div class="vs-checkbox-con vs-checkbox-primary">
                      <input type="checkbox" v-model="reestrRequest.toMail">
                      <span class="vs-checkbox">
                      <span class="vs-checkbox--check">
                        <i class="vs-icon feather icon-check"></i>
                      </span>
                    </span>
                      <span class="">Mail</span>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn btn-outline-success cursor-pointer mr-1"
                       v-if="result.model.reestrPathsList && result.model.reestrPathsList.length > 0"
                       @click="downloadReestr">
                    DOWNLOAD
                  </div>
                  <div class="btn btn-outline-primary cursor-pointer" @click="getReestr">
                    <span v-if="!gettingReport">REPORT</span>
                    <span v-else>WAIT...</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p v-if="authUser.roleCode === 'admin'">Bu yerda transfer bilan ishlayotgan partnerlar haqida malumotlarni
                korish va tahrirlash mumkin</p>
            </div>
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                <tr class="text-center">
                  <th>Name</th>
                  <th>MaxAmount</th>
                  <th>MinAmount</th>
                  <th>HumoTid</th>
                  <th>HumoMid</th>
                  <th>UzcardTerminalId</th>
                  <th>UzcardMerchantId</th>
                  <th>UsingUniversalP2P</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="partner in partners">
                  <th>{{ partner.name }}</th>
                  <td>{{ partner.maxAmount }}</td>
                  <td>{{ partner.minAmount }}</td>
                  <td>{{ partner.humoTid }}</td>
                  <td>{{ partner.humoMid }}</td>
                  <td>{{ partner.terminalId }}</td>
                  <td>{{ partner.merchantId }}</td>
                  <td>{{ partner.commissionAmount }}</td>
                  <td>{{ partner.isUniversalP2P }}</td>
                  <td>{{ partner.currencySource }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Dashboard Analytics end -->
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Partners",
  data() {
    return {
      gettingReport: false,
      dateCleared: false,
      reestrRequest: {
        fromDate: this.$moment(new Date()).format('YYYY-MM-DD'),
        toDate: null,
        partnerId: null,
        toMail: false
      },
      result: {
        model: {
          excelReestr: false,
          excelReestrPath: false,
        }
      },
      betweenDates: null,
      singleDate: new Date(),
    }
  },
  computed: {
    ...mapGetters(['partners', 'authUser']),
  },
  methods: {
    ...mapActions(['getPartners']),
    getReestr() {
      try {
        this.gettingReport = true;
        this.$api.post('transactions/reestr', this.reestrRequest).then(data => {
          this.gettingReport = false;
          if (data.success) {
            this.result = data;
          } else {
            this.errorNotification('Something happened!')
          }
        }).catch(error => {
          this.errorNotification('Error happens')
          this.gettingReport = false;
        }).finally(() => {
          this.gettingReport = false;
        })
      } catch (e) {
        this.gettingReport = false;
        console.log(e)
      }
    },
    rangeDateChange(date) {
      this.reestrRequest.fromDate = this.$moment(date[0]).format('YYYY-MM-DD');
      this.reestrRequest.toDate = this.$moment(date[1]).format('YYYY-MM-DD');
      this.resetRequestModel();
      /*      this.$refs.mySingleDatePicker.clear();*/
    },
    singleDateChange(date) {
      this.reestrRequest.fromDate = this.$moment(date).format('YYYY-MM-DD');
      this.reestrRequest.toDate = null;
      this.resetRequestModel();
      this.$refs.myRangeDatePicker.clear();
    },
    partnerChange() {
      this.resetRequestModel();
    },
    resetRequestModel() {
      this.result.model.excelReestr = false;
      this.result.model.excelReestrPath = false;
    },
    downloadReestr() {

      for (let x in this.result.model.reestrPathsList) {
        window.open(
            this.$api.mainUrl() + 'StaticFiles/' + this.result.model.reestrPathsList[x],
            '_blank' // <- This is what makes it open in a new window.
        );
      }

      this.result.model.reestrPathsList = null;
    },
  },
  created() {
    this.getPartners();
  }
}
</script>

<style>
.transaction-date-picker-class-range {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100% !important;
  height: 38px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
}

.range_datepicker {
  width: 410px;
  margin: 0;
}

.single_datepicker {
  width: 205px;
}
</style>
