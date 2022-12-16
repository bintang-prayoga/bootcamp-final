<template>
  <div>
    <navbar></navbar>
    <div class="container-fluid mt-5">
      <h2>3rd Party Instruction</h2>
      <p>
        Vendor Management
        <span class="text-success">> 3rd Party Instruction</span>
      </p>
      <div class="container mt-5 p-0">
        <div>
          <form v-on:submit.prevent="$store.dispatch('postFormInstruction', form)" method="post">
            <div class="form-group mt-5">
              <!-- Card Table -->
              <div class="card">
                <div class="card-body">
                  <div class="row my-3 justify-content-between">
                    <div class="col-3">
                      <button type="button" class="btn btn-default dropdown-toggle shadow-none w-auto select-picker text-capitalize fs-4" id="type" data-bs-toggle="dropdown" aria-expanded="false">
                        <span v-if="form.type == 'LI'">
                            <font-awesome-icon
                              icon="fa-solid fa-truck"
                              class="text-info fs-3 me-3"
                            />
                            Logistic Instruction
                        </span>
                        <span v-else>
                          <font-awesome-icon
                            icon="fa-solid fa-user"
                            class="text-info fs-3 me-3"
                          />
                          Service Instruction
                        </span>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="type">
                        <li><a class="dropdown-item" data="LI" @click="(event) => {handleSelect(event)}">Logistic Instruction</a></li>
                        <li><a class="dropdown-item" data="SI" @click="(event) => {handleSelect(event)}">Service Instruction</a></li>
                      </ul>
                    </div>
                    <div class="col"></div>
                    <div class="col-1">
                      <span class="badge rounded-pill text-dark bg-black bg-opacity-10 w-100 border border-secondary border-opacity-25">Draft</span>
                    </div>
                  </div>
                  <div class="row m-2 pb-5 justify-content-end gx-5 border-bottom border-secondary border-opacity-50">
                    <div class="col-8 pb-3 border-end border-secondary border-opacity-50">
                      <div class="row mb-5">
                          <Select
                            @handleSelect="handleSelect"
                            @handleSearch="searchVendors"
                            column="col-3"
                            id="vendors"
                            :items="vendors"
                            :field="'assigned_vendor'"
                            data-key="name"
                            label="Assigned Vendor"
                            placeholder="Enter Vendor">
                          </Select>
                          <Input
                            id="attention-of"
                            column="col-3"
                            label="Attention Of"
                            placeholder="Enter Attention Of"
                            field="attention_of"
                          />
                          <Input
                            id="quotation-no"
                            column="col-3"
                            label="Quotation No."
                            placeholder="Enter Quotation"
                            field="quotation_no"
                          />
                        <Select
                          @handleSelect="handleSelect"
                          @handleSearch="searchInvoices"
                          column="col-3"
                          id="invoice-to"
                          :items="invoiceTargets"
                          :field="'invoice_to'"
                          data-key="name"
                          label="Invoice To"
                          placeholder="Select an Option">
                        </Select>
                      </div>
                      <div class="row">
                        <Select
                          @handleSelect="handleSelect" column="col-12" id="vendor-address" :items="vendorAddresses" :field="'vendor_address'" label="Vendor Address" placeholder="Enter Vendor Address"></Select>
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="row mb-5">
                        <Select
                          @handleSelect="handleSelect"
                          @handleSearch="searchCustomers"
                          column="col-11"
                          id="customer"
                          :items="customers"
                          :field="'customer'"
                          data-key="name"
                          label="Customer Contract"
                          placeholder="Select Customer">
                        </Select>
                      </div>
                      <div class="row">
                        <Input
                          id="customer-po-no"
                          column="col-11"
                          label="Customer PO No."
                          placeholder="Enter Customer PO"
                          field="customer_po_no"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row my-3 pt-2">
                    <label class="form-label text-dark fs-3 fw-bolder">Card Title</label>
                    <div id="table">
                      <TableCost :total="total" :as-form="true" />
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col-md-6">
                      <label class="form-label fs-3">Attachment</label><br />
                        <Attachments :attachments="form.attachments" @handleRemove="removeFile" />
                      <label class="btn btn-info">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        Add Attachment
                        <input
                          type="file"
                          hidden
                          @change="handleFile"
                          multiple
                        />
                      </label>
                    </div>
                    <div class="col-md-6">
                      <label for="notes" class="form-label fs-3">Notes</label>
                      <textarea
                        class="form-control"
                        id="notes"
                        rows="5"
                        style="resize: none"
                        v-model="form.note"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group mt-5">
              <div class="card mt-5 p-4">
                <div class="card-body">
                  <div class="row">
                    <Select
                      @handleSelect="handleSelect"
                      column="col-3"
                      :is-required="false"
                      id="transactions"
                      :items="transactions"
                      :field="'link_to'"
                      data-key="no"
                      label="Link To"
                      placeholder="Select Item">
                    </Select>
                    <div v-if="!!form.link_to" class="col-5 opacity-75 align-self-end" @click="removeLink">
                      <button type="button" class="btn btn-danger text-white">
                        Remove Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group mt-5">
              <div class="card">
                <div class="card-body d-flex justify-content-end">
                  <button type="button" class="btn btn-light me-3">
                    Cancel
                  </button>
                  <button type="button" class="btn btn-secondary me-3">
                    Save as Draft
                  </button>
                  <button type="submit" class="btn btn-info">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "../partials/Select.vue";
import TableCost from '../partials/TableCost';
import { mapGetters, mapActions } from "vuex";
// import _ from 'lodash';

export default {
  data() {
    return {
      vendorAddresses: [],
    }
  },
  components: { Select, TableCost },
  computed: {
    ...mapGetters({
      vendors: "getVendors",
      invoiceTargets: "getInvoiceTargets",
      customers: "getCustomers",
      transactions: "getTransactions",
      form: "getForm"
    }),

    formCopy: function() {
      return Object.assign({}, this.form);
    },

    total: function() {
      if(!!this.form.costs){
        return {
          sub: this.form.costs.reduce((current, previous) => {return current + parseFloat(previous.sub_total ?? 0)}, 0).toFixed(2),
          vat: this.form.costs.reduce((current, previous) => {return current + parseFloat(previous.vat_ammount ?? 0)}, 0).toFixed(2),
          total: this.form.costs.reduce((current, previous) => {return current + parseFloat(previous.total ?? 0)}, 0).toFixed(2)
        }
      } else {
        return {
          sub: (0).toFixed(2),
          vat: (0).toFixed(2),
          total: (0).toFixed(2)
        }
      }
    }
  },
  methods: {
    ...mapActions([
      "fetchVendors",
      "fetchInvoiceTargets",
      "fetchCustomers",
      "fetchTransactions",
      "setFormInstruction",
      "postFormInstruction",
      "saveFile",
    ]),

    handleFile(event) {
      Array.from(event.target.files).forEach(file => {
        this.form.attachments.push(file);
      })
    },

    removeFile(index) {
      this.form.attachments.splice(index, 1);
    },

    removeLink() {
      this.form.link_to = '';
    },

    handleSelect(event, field = 'type') {
        console.log(event);
      this.form[field] = event.target.attributes.data.value;
    },

    searchVendors(event) {
        this.$store.dispatch("fetchVendors", {search: event.target.value});
    },

    searchInvoices(event) {
        this.$store.dispatch("fetchInvoiceTargets", {search: event.target.value});
    },

    searchCustomers(event) {
        this.$store.dispatch("fetchCustomers", {search: event.target.value});
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchVendors");
    this.$store.dispatch("fetchInvoiceTargets");
    this.$store.dispatch("fetchCustomers");

    const type = this.$route.params.type === 'SI' ? 'SI' : 'LI';
    this.$store.dispatch("setFormInstruction", {type: type});
  },
  watch: {
    formCopy: {
      deep:true,
      handler(newValue, oldValue) {
        if(newValue.type != oldValue.type) {
          if(newValue.type === "SI") {
            this.form.link_to = ""
            this.$store.dispatch("fetchTransactions", {type: 'SI'});
          } else if(newValue.type === "LI") {
            this.form.link_to = ""
            this.$store.dispatch("fetchTransactions", {type: 'LI'});
          }
        }

        if(newValue.assigned_vendor != oldValue.assigned_vendor){
          let vendorIndex = 0
          if(!!newValue.assigned_vendor) {
            vendorIndex = document.querySelector("a[data='" + this.form.assigned_vendor + "']").attributes[1].value ?? 0;
          }
            if(vendorIndex !== 0) {
                this.form.vendor_address = '';
                this.vendorAddresses = this.vendors[vendorIndex].addresses;
            }
        }
      }
    },
  }
};
</script>

<style>
.btn-draft {
  border: none;
  height: 35px;
  width: 150px;
  border-radius: 20px;
}
option {
  cursor: pointer;
}
.select-picker {
  overflow: hidden;
  width: 100%;
}
.dropdown-toggle::after {
  vertical-align: middle !important;
}
.dropdown-item {
  cursor: pointer;
}
</style>
