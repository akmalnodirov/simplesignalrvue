<template>
  <div class="bg-full-screen-image blank-page menu-collapsed">
    <div class="app-content content">
      <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body">
          <section class="row flexbox-container">
            <div class="col-xl-8 col-11 d-flex justify-content-center">
              <div class="card bg-authentication rounded-0 mb-0">
                <div class="row m-0">
                  <div class="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0">
                    <img src="../../public/vuesax/images/pages/login.png"
                         alt="branding logo">
                  </div>
                  <div class="col-lg-6 col-12 p-0">
                    <div class="card rounded-0 mb-0 px-2">
                      <div class="card-header pb-1">
                        <div class="card-title">
                          <h4 class="mb-0">Login</h4>
                        </div>
                      </div>
                      <p class="px-2">Welcome back, please login to your account.</p>
                      <p class="px-2" v-if="errorMes" style="color: red">{{ errorMes }}</p>
                      <div class="card-content">
                        <div class="card-body pt-1">
                          <form>
                            <fieldset
                              class="form-label-group form-group position-relative has-icon-left">
                              <input type="text" class="form-control" id="user-name"
                                     placeholder="Username" v-model="request.userName">
                              <div class="form-control-position">
                                <i class="feather icon-user"></i>
                              </div>
                              <label for="user-name">Username</label>
                            </fieldset>

                            <fieldset
                              class="form-label-group position-relative has-icon-left">
                              <input type="password" class="form-control"
                                     id="user-password" placeholder="Password"
                                     v-model="request.password">
                              <div class="form-control-position">
                                <i class="feather icon-lock"></i>
                              </div>
                              <label for="user-password">Password</label>
                            </fieldset>
                            <button class="btn btn-primary float-right btn-inline"
                                    @click.prevent="loginToSystem">Login
                            </button>
                          </form>
                        </div>
                      </div>
                      <div class="login-footer">
                        <div class="divider">
                        </div>
                        <div class="footer-btn d-inline">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TokenService from "../services/tokenService";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      request: {
        userName: '',
        password: '',
      },
      errorMes: '',
      authError: '',
      errorStatus: false,
    }
  },
  methods: {
    loginToSystem() {
      this.loading = true;
      this.$api.post('Authorization/login', this.request).then(data => {
        if (!data.error) {
          console.log(data)
          TokenService.saveToken(data.result.token);
          window.location.href = '/';
        }
        if (data.error) {
          this.errorMes = data.error.message;
        }
      }).catch(error => {
        this.errorMes = error.response.data.errors;
        this.errorStatus = true;
      }).finally(() => {
      })
    },
  }
}
</script>

<style scoped>
.bg-full-screen-image {
  background: url("../../public/vuesax/images/pages/vuesax-login-bg.jpg") no-repeat center center;
  -webkit-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  direction: ltr;
}

.blank-page .content {
  margin-left: 0;
}

.blank-page .content.app-content {
  overflow: overlay;
  overflow-x: hidden;
}

.blank-page .content-wrapper {
  padding: 0 !important;
  margin-top: 0;
}

.blank-page .content-wrapper .flexbox-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100vh;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
