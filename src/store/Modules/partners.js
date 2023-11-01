const state = {
    partner: null,
    partners: [],
};
const getters = {
    partner: state => state.partner,
    partners: state => state.partners
};
const mutations = {
    setPartner: (state, item) => state.partner = item,
    setPartners: (state, item) => state.partners = item,
};
const actions = {
    async getPartners({commit}) {
        try {
            await this._vm.$api.get('Hub/devices').then(data => {
                commit('setPartners', data);
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
    actions,
    mutations
}
