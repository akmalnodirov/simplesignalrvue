<template>
  <div class="content-body">
    <!-- Dashboard Analytics Start -->
    <div class="row" id="table-hover-row">
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Spec persons</h4>
          </div>
          <div class="card-content card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                <tr>
                  <th>FullNameLatin</th>
                  <th>FullNameCyrill</th>
                  <th>PassportData</th>
                  <th>Address</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="person in specs">
                  <th>{{ person.firstNameLatin }} {{ person.lastNameLatin }} {{ person.middleNameLatin }}</th>
                  <th>{{ person.firstNameCyrill }} {{ person.lastNameCyrill }} {{ person.middleNameCyrill }}</th>
                  <th>{{ person.passportSerial }} {{ person.passportNumber }}</th>
                  <th>{{ person.placeOfResidence }}</th>
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
  name: "Specs",
  computed: {
    ...mapGetters(['specs']),
  },
  methods: {
    ...mapActions(['getSpecs']),
  },
  created() {
    this.getSpecs();
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
  width: 510px;
  margin: 0;
}

.single_datepicker {
  width: 265px;
}
</style>
