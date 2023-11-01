<template>
  <div class="itsmebaby">
    <sidebar-menu></sidebar-menu>
    <div class="app-content content">
      <navbar-header ></navbar-header>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <notifications group="admin" position="top right" :width="300"/>
  </div>
</template>

<script>

import SidebarMenu from './SidebarMenu'
import TokenService from "../services/tokenService";
import VueJwtDecode from 'vue-jwt-decode';
import NavbarHeader from "./NavbarHeader";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "MainLayout",
  components: {
    'sidebar-menu': SidebarMenu,
    'navbar-header': NavbarHeader,
  },
  computed: {
    ...mapGetters(['user', 'authUser']),
  },
  methods: {
    ...mapMutations(['setAuthUser']),
  },
  created() {
    let hasToken = !!TokenService.getToken();
    if (hasToken) {
      let decodedAuth = VueJwtDecode.decode(TokenService.getToken());
      if (decodedAuth) {
        let user = {
          userName: decodedAuth.UserName,
          roleCode: decodedAuth.RoleCode,
          userId: decodedAuth.UserId,
        }
        this.setAuthUser(user);
      }
    }
  },
  mounted() {
    console.log('main layot')
  }
}
</script>


<style scoped>
</style>

<style>
::-webkit-scrollbar {
  height: 5px;
  width: 5px;
  background: #F8F8F8;
  scroll-behavior: smooth;
}

::-webkit-scrollbar-thumb:horizontal {
  background: #7367F0;
  border-radius: 10px;
  scroll-behavior: smooth;
}

::-webkit-scrollbar-thumb:vertical {
  background: #7367F0;
  border-radius: 10px;
  scroll-behavior: smooth;
}

.vue-notification {
  font-size: 16px !important;
  padding: 10px;
  margin: 0 5px 5px;
  color: #fff !important;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
}

.vue-notification.success {
  background: #7367F0 !important;
}
</style>

