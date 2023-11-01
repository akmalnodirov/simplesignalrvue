const state = {
	user: {
		callbackUrl: null,
		createdBy: null,
		firstName: null,
		isActive: false,
		lastName: null,
		partnerId: null,
		phone: null,
		userName: null,
		updatedBy: null,
		roleId: null,
		roleCode: null,
		roleName: null,
		password: null,
		passwordRepeat: null,
		userId: null,
	},
	authUser: {
		callbackUrl: null,
		createdBy: null,
		firstName: null,
		isActive: false,
		lastName: null,
		partnerId: null,
		phone: null,
		userName: null,
		updatedBy: null,
		roleId: null,
		roleCode: null,
		roleName: null,
		password: null,
		passwordRepeat: null,
		userId: null,
	},
	roles: [],
	users: [{
		callbackUrl: null,
		createdBy: null,
		firstName: null,
		isActive: false,
		lastName: null,
		partnerId: null,
		phone: null,
		userName: null,
		updatedBy: null,
		roleId: null,
		password: null,
		passwordRepeat: null,
	}]
};
const getters = {
	user: state => state.user,
	roles: state => state.roles,
	users: state => state.users,
	authUser: state => state.authUser
};
const mutations = {
	setUser: (state, item) => state.user = item,
	setUsers: (state, item) => state.users = item,
	setRoles: (state, item) => state.roles = item,
	setAuthUser: (state, item) => state.authUser = item,
};
const actions = {
	async getRoles({commit}) {
		try {
			await this._vm.$api.get('List/Roles').then(data => {
				if (data.success) {
					commit('setRoles', data.data);
				}
			}).catch(error => {
				console.log('error on getting roles')
			}).finally(() => {
			})
		} catch (e) {
			console.log(e)
		}
	},
	async getUsers({commit}, payload) {
		try {
			await this._vm.$api.get('List/Users', payload).then(data => {
				if (data.success) {
					commit('setUsers', data.data);
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
	actions,
	mutations
}
