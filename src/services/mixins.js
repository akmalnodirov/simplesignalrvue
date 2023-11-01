import Vue from "vue";

Vue.mixin({
  data() {
    return {
      hostname: null,
    }
  },
  methods: {
    logout() {
      this.$api.post('api/auth/logout').finally(() => {
        localStorage.clear();
        this.$router.push({name: 'login'});
      });
    },
    successNotification(message) {
      this.$notify({
        group: 'admin',
        title: 'Success!',
        text: message,
        type: 'success',
        closeOnClick: true,
        duration: 3000
      });
    },
    errorNotification(message) {
      this.$notify({
        group: 'admin',
        title: 'Error',
        text: message,
        type: 'error',
        width: 500,
        closeOnClick: true,
        duration: 1000
      });
    },
    successAndRedirect(message, routeName) {
      try {
        this.successNotification(message);
        setTimeout(() => {
          window.perfectumAdmin.$router.push({name: routeName});
        }, 300);
      } catch (e) {
        console.log(e, error)
      }
    },
    successAndRedirectParams(message, routeName, params) {
      try {
        this.successNotification(message);
        setTimeout(() => {
          window.perfectumAdmin.$router.push({name: routeName, params: {id: params}});
        }, 300);
      } catch (e) {
        console.log(e, error)
      }
    },
    setLoading(loadingState = true) {
      this.$store.commit('setLoading', loadingState)
    },
    async deleteImageMixin(imageName) {
      let params = {};
      params.image = imageName;
      return this.$api.post('delete-image', params).then(res => {
        if (res) {
          return res;
        } else {
          return false;
        }
      }).catch(error => {
        return false;
      }).finally(item => {
        ///
      });
    },
    async imageUploadMixin(formData) {
      return this.$api.post('store-image', formData).then(res => {
        if (res) {
          return res;
        } else {
          this.errorNotification('Error on uploading a photo. Please try again')
          return false;
        }
      }).catch(error => {
        this.errorNotification('Error on uploading a photo. Please try again')
        return false;
      }).finally(item => {
        ///
      });
    },
    exceptionHandling(error) {
      let errorMessage = '';
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          errorMessage = errorMessage + ' ' + error.response.data.message + '<br>'
        }

        if (error.response.data.errors) {
          for (let x in error.response.data.errors) {
            errorMessage = errorMessage + ' ' + x + '<br>'
          }
        }
      }
      this.errorNotification(errorMessage);
    },
    apiErrorHandling(error) {
      let errorMessage = '';
      for (let x in error) {
        errorMessage = errorMessage + ' ' + error[x] + '<br>'
      }
      this.errorNotification(errorMessage);
    },
    async scrollToFirstClass(className) {
      let collection = await this.$el.getElementsByClassName(className);
      if (collection && collection[0]) {
        collection[0].scrollIntoView();
      }
    },
  }
})
;
