<template>
  <div>
    <!-- BEGIN: Header-->
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <nav class="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow">
      <div class="navbar-wrapper">
        <div class="navbar-container content">
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";

export default {
  name: "NavbarHeader",
  data() {
    return {
      user: {
        userName: null,
        type: null,
      },
      userTypes: [],
      singleDate: new Date(),
    }
  },
  computed: {
    ...mapGetters({
      fromUzbekistan: 'fromUzbekistan',
      authUser: 'authUser',
      transactionDateModel: 'transactionDate',
      transactionMonthModel: 'transactionMonth',
      transactionYearModel: 'transactionYear'
    }),
    transactionMonth: {
      get() {
        return this.transactionMonthModel
      },
      set(newValue) {
        this.setTransactionMonth(newValue);
        return newValue;
      }
    },
    transactionYear: {
      get() {
        return this.transactionYearModel
      },
      set(newValue) {
        this.setTransactionYear(newValue);
        return newValue;
      }
    },
  },
  methods: {
    ...mapMutations(['setFromUzbekistan', 'setTransactionMonth', 'setTransactionDate', 'setTransactionYear']),
    logoutBaby() {
      this.logout()
    },
    singleDateChange(date) {
      this.$store.commit('setTransactionDate', this.$moment(date).format('YYYY-MM-DD'))
    },
    transactionsToUzbekistan() {
      this.setFromUzbekistan(false)
    },
    transactionsFromUzbekistan() {
      this.setFromUzbekistan(true)
    },
  },
}
</script>

<style scoped>

</style>
