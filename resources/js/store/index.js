import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {router} from "../app.js";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        form: {},
        vendors: null,
        invoiceTargets: null,
        customers: null,
        transactions: null,
        details: null,
    },
    getters: {
        getVendors: (state) => state.vendors,
        getInvoiceTargets: (state) => state.invoiceTargets,
        getCustomers: (state) => state.customers,
        getTransactions: (state) => state.transactions,
        getForm: (state) => state.form,
        getDetails: (state) => state.details,
    },
    actions: {
        async fetchVendors({ commit }, payload) {
            try {
                let data;
                if(payload ?? false){
                    data = await axios.get("/api/vendors?search=" + payload.search);
                } else {
                    data = await axios.get("/api/vendors");
                }
                commit("SET_VENDORS", data.data.data);
            } catch (error) {
                commit("SET_VENDORS", {});
                console.log(error);
            }
        },
        async fetchInvoiceTargets({ commit }, payload) {
            try {
                let data;
                if(payload ?? false){
                    data = await axios.get("/api/invoice-targets?search=" + payload.search);
                } else {
                    data = await axios.get("/api/invoice-targets");
                }
                commit("SET_INVOICETARGETS", data.data.data);
            } catch (error) {
                commit("SET_INVOICETARGETS", {});
                console.log(error);
            }
        },
        async fetchCustomers({ commit }, payload) {
            try {
                let data;
                if(payload ?? false){
                    data = await axios.get("/api/customers?search=" + payload.search);
                } else {
                    data = await axios.get("/api/customers");
                }
                commit("SET_CUSTOMERS", data.data.data);
            } catch (error) {
                commit("SET_CUSTOMERS", {});
                console.log(error);
            }
        },
        async fetchTransactions({ commit }, payload) {
            try {
                let queryParams = {
                    instructionType: payload.type
                };

                if(payload.search ?? false) queryParams['search'] = payload.search

                const params = new URLSearchParams(queryParams);
                const data = await axios.get('/api/transactions', {
                    params: params
                });
                commit("SET_TRANSACTIONS", data.data.data);
            } catch (error) {
                commit("SET_TRANSACTIONS", {});
                console.log(error);
            }
        },
        async fetchDetails({ commit }, id) {
            try {
                const data = await axios.get("api/instructions/" + id);
                commit("SET_DETAILS", data.data.data);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async setFormInstruction({commit}, payload) {
            let defaultForm = {
                type: payload.type,
                assigned_vendor: '',
                attention_of: '',
                quotation_no: '',
                vendor_address: '',
                invoice_to: '',
                customer: '',
                customer_po_no: '',
                costs: [{
                    vat_ammount: 0,
                    sub_total: 0,
                    total: 0
                }],
                attachments: [],
                note: '',
                link_to: '',
            };

            if(Object.keys(payload).length > 1) {
                defaultForm.assigned_vendor = payload.assigned_vendor;
                defaultForm.attention_of = payload.attention_of;
                defaultForm.quotation_no = payload.quotation_no;
                defaultForm.vendor_address = payload.vendor_address;
                defaultForm.invoice_to = payload.invoice_to;
                defaultForm.customer = payload.customer;
                defaultForm.customer_po_no = payload.customer_po_no;
                defaultForm.costs = payload.costs;
                if(!!payload.attachments) defaultForm.attachments = payload.attachments;
                if(!!payload.note) defaultForm.note = payload.note;
                if(!!payload.link_to) defaultForm.link_to = payload.link_to;
            }

            commit('SET_FORM', defaultForm);
        },
        async postFormInstruction({commit}, payload) {
            const formData = new FormData();
            for(const [key, value] of Object.entries(payload)){
                if(Array.isArray(value)) {
                    value.forEach((element, index) => {
                        if(key == 'attachments'){
                            formData.append(`${key}[${index}]`, element);
                        } else {
                            for(const [subKey, subValue] of Object.entries(element)){
                                formData.append(`${key}[${index}][${subKey}]`, subValue);
                            }
                        }
                    })
                } else {
                    formData.append(key, value);
                }
            }

            axios.post('/api/instructions', formData, {
                headers: {
                  'Accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
    mutations: {
        SET_VENDORS(state, vendors) {
            state.vendors = vendors;
        },
        SET_INVOICETARGETS(state, invoiceTargets) {
            state.invoiceTargets = invoiceTargets;
        },
        SET_CUSTOMERS(state, customers) {
            state.customers = customers;
        },
        SET_TRANSACTIONS(state, transactions) {
            state.transactions = transactions;
        },
        SET_DETAILS(state, details) {
            state.details = details;
        },
        SET_FORM(state, form) {
            state.form = form;
        }
    },
    modules: {},
});
