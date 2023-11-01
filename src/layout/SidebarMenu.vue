<template>
  <div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item mr-auto">
          <a class="navbar-brand">
            <div class="brand-logo"></div>
            <h2 class="brand-text mb-0">Prototype</h2>
          </a>
        </li>
        <li class="nav-item nav-toggle">
          <a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
            <i class="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"></i>
            <i class="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary"
               data-ticon="icon-disc"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content">
      <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
        <li class=" nav-item" @click="goto('home')" :class="$route.name === 'home' ? 'active' : ''">
          <a>
            <i class="feather icon-home"></i>
            <span class="menu-title">Dashboard</span>
          </a>
        </li>
        <li class=" nav-item has-sub" :class="{}">
          <a href="#">
            <i class="feather icon-settings"></i>
            <span class="menu-title" data-i18n="Ecommerce">Settings</span>
          </a>
          <ul class="menu-content">
            <li @click="goto('settings')" class=" nav-item" :class="$route.name === 'settings' ? 'active' : ''"
                v-if="authUser.roleCode === 'admin'">
              <a>
                <i class="feather icon-credit-card"></i>
                <span class="menu-item" data-i18n="Shop">Settings</span>
              </a>
            </li>
          </ul>
        </li>
        <li class=" nav-item" @click="logout">
          <a><i class="feather icon-alert-circle"></i>
            <span class="menu-title">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import roles from '../services/roles'

export default {
  name: "SidebarMenu",
  methods: {
    goto(route) {
      this.$router.push({name: route})
    }
  },
  computed: {
    ...mapGetters(['transactions', 'partners', 'users', 'authUser']),
  },
}
</script>

<style scoped>

</style>
