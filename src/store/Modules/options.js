const state = {
    loading: false,
    specs: false,
    settings: false,
};
const getters = {
    loading: state => state.loading,
    specs: state => state.specs,
    settings: state => state.settings,
};
const mutations = {
    setLoading: (state, item) => state.loading = item,
    setSpecs: (state, item) => state.specs = item,
    setSettings: (state, item) => state.settings = item,
};
const actions = {
    async getSpecs({commit}) {
        try {
            await this._vm.$api.get('List/SpecPersons').then(data => {
                if (data.success) {
                    commit('setSpecs', data.data);
                }
            }).catch(error => {
                console.log('error on getting roles')
            }).finally(() => {
            })
        } catch (e) {
            console.log(e)
        }
    },
    async getSettings({commit}) {
        try {
            await this._vm.$api.get('List/Settings').then(data => {
                if (data.success) {
                    commit('setSettings', data.data);
                }
            }).catch(error => {
                console.log('error on getting roles')
            }).finally(() => {
            })
        } catch (e) {
            console.log(e)
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
