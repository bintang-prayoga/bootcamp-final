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
            <div class="row justify-content-between">
              <div class="col-md-3 justify-content-start">
                <select
                  class="form-select fs-4"
                  name="type"
                  v-model="form.type"
                >
                  <option value="LI" selected>
                    <i class="fa-solid fa-truck"></i>
                    Logistic Instruction
                  </option>
                  <option value="SI">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    Service Instruction
                  </option>
                </select>
              </div>
              <div class="col-md-6 text-end">
                <button class="btn-draft" disabled>Draft</button>
              </div>
            </div>

            <div class="form-group row mt-5">
              <div class="col-2">
                <Select id="vendors" :items="vendors" :field="'assigned_vendor'" data-key="name"  label="Assigned Vendor" placeholder="Enter Vendor"></Select>
              </div>
              <Input
                id="attention-of"
                column="col-2"
                label="Attention Of"
                placeholder="Enter Attention Of"
                field="attention_of"
              />
              <Input
                id="quotation-no"
                column="col-2"
                label="Quotation No."
                placeholder="Enter Quotation"
                field="quotation_no"
              />
              <div class="col-2">
                <Select id="invoice-to" :items="invoiceTargets" :field="'invoice_to'" data-key="name" label="Invoice To" placeholder="Select an Option"></Select>
              </div>
              <div class="col-2">
                <Select id="customer" :items="customers" :field="'customer'" data-key="name" label="Customer Contract" placeholder="Select Customer"></Select>
              </div>
            </div>

            <div class="form-group row mt-5">
              <div class="col-10">
                <Select id="vendor-address" :items="vendorAddresses" :field="'vendor_address'" label="Vendor Address" placeholder="Enter Vendor Address"></Select>
              </div>
              <Input
                id="customer-po-no"
                column="col-2"
                label="Customer PO No."
                placeholder="Enter Customer PO"
                field="customer_po_no"
              />
            </div>

            <div class="form-group mt-5">
              <!-- Card Table -->
              <div class="card">
                <h4 class="card-title p-4">
                  <span class="fw-bold">Cost Detail</span>
                </h4>
                <div class="card-body">
                  <div id="table">
                    <TableCost :total="total" :as-form="true" />
                  </div>
                  <div class="mt-5">
                    <div class="row mt-5">
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
                          rows="3"
                          style="resize: none"
                          v-model="form.note"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group mt-5">
              <div class="card mt-5 p-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-3">
                      <Select :is-required="false" id="transactions" :items="transactions" :field="'link_to'" data-key="no" label="Link To" placeholder="Select Item"></Select>
                    </div>
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
      "fetchTransactionsForSI",
      "fetchTransactionsForLI",
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
            this.$store.dispatch("fetchTransactionsForSI");
          } else if(newValue.type === "LI") {
            this.form.link_to = ""
            this.$store.dispatch("fetchTransactionsForLI");
          }
        }

        if(newValue.assigned_vendor != oldValue.assigned_vendor){
            let vendorIndex = document.getElementById('vendors').selectedIndex;
            if(vendorIndex !== 0) {
                this.form.vendor_address = '';
                this.vendorAddresses = this.vendors[vendorIndex - 1].addresses;
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
</style>
