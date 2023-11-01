const state = {
    transaction: {
        id: null,
        state: null,
        bankId: null,
        bank: null,
        userId: null,
        user: null,
        requestAmount: null,
        requestCurrency: null,
        amount: null,
        totalAmount: null,
        commissionAmount: null,
        currencyAmount: null,
        commissionPercent: null,
        currencySourceId: null,
        currencyId: null,
        partnerId: null,
        cardNumber: null,
        cardExpiry: null,
        createdDate: null,
        editedDate: null,
        transactionNumber: null,
        refNum: null,
        humoGuid: null,
        humoPaymentId: null,
        humoGateStatus: null,
        svGateStatus: null,
        paymentDescription: null,
        isUniversalP2P: null,
        paymentSystem: null,
    },
    transactions: {
        columnTotals: [{
            amountTotal: 0,
            commissionAmountTotal: 0,
            requestAmountTotal: 0,
            totalAmountTotal: 0,
        }],
        data: [{
            id: null,
            state: null,
            bankId: null,
            bank: null,
            userId: null,
            user: null,
            requestAmount: null,
            requestCurrency: null,
            amount: null,
            totalAmount: null,
            commissionAmount: null,
            currencyAmount: null,
            commissionPercent: null,
            currencySourceId: null,
            currencyId: null,
            partnerId: null,
            cardNumber: null,
            cardExpiry: null,
            createdDate: null,
            editedDate: null,
            transactionNumber: null,
            partnerTransactionId: null,
            refNum: null,
            humoGuid: null,
            humoPaymentId: null,
            humoGateStatus: null,
            svGateStatus: null,
            paymentDescription: null,
            isUniversalP2P: null,
            paymentSystem: null,
        }],
        totalCount: 0,
        hasExcel: false,
        excelPath: null,
    },
    currencies: [
        {}
    ],
    transactionDate: new Date(),
    transactionMonth: 0,
    transactionYear: new Date().getFullYear(),
    fromUzbekistan: false,
};
const getters = {
    transaction: state => state.transaction,
    transactions: state => state.transactions,
    transactionDate: state => state.transactionDate,
    transactionMonth: state => state.transactionMonth,
    transactionYear: state => state.transactionYear,
    fromUzbekistan: state => state.fromUzbekistan
};
const mutations = {
    setTransaction: (state, item) => state.transaction = item,
    setTransactions: (state, item) => state.transactions = item,
    setTransactionDate: (state, item) => state.transactionDate = item,
    setTransactionMonth: (state, item) => state.transactionMonth = item,
    setTransactionYear: (state, item) => state.transactionYear = item,
    setFromUzbekistan: (state, item) => state.fromUzbekistan = item,
};
const actions = {
    async transactionsPagination({commit}, payload) {
        try {
            await this._vm.$api.post('Transactions/TransactionsPagination', payload).then(data => {
                if (data.success) {
                    commit('setTransactions', data);
                }
            }).catch(error => {
                console.log('error on getting roles')
            }).finally(() => {
            })
        } catch (e) {
            console.log(e)
        }
    },
    async transactionDetail({commit}, transactionId) {
        console.log(' calling me');
        try {
            await this._vm.$api.get('Transactions/TransactionById?transactionId=' + transactionId).then(data => {
                if (data.success) {
                    commit('setTransaction', data.model);
                }
            }).catch(error => {
                console.log('transaction detail error: ' + error)
            }).finally(() => {
            })
        } catch (e) {
            console.log(e)
        }
    },
    async transactionStatus({commit, dispatch}, model) {
        commit('setLoading', true, {root: true})
        await this._vm.$api.post('Transactions/StatusAdmin', model).then(response => {
            dispatch('transactionDetail', model.transactionId);
        }).catch(error => {
            this._vm.errorNotification("Something went wrong");
        }).finally(item => {
            commit('setLoading', false, {root: true})
        })
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}
