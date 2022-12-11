<template>
  <div>
    <navbar></navbar>
    <ModalInvoice></ModalInvoice>
    <div class="container-fluid mt-5">
      <h2>3rd Party Instruction</h2>
      <p>
        Vendor Management
        <span class="text-success">> 3rd Party Instruction</span>
      </p>
      <div class="container mt-5 p-5">
        <div class="">
          <form v-on:submit.prevent="submitForm" method="post">
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
                <select-view id-name="vendors" :items="vendors" :field="'assigned_vendor'" data-key="name"  label="Assigned Vendor" placeholder="Enter Vendor"></select-view>
              </div>
              <text-input
                column="col-2"
                label="Attention Of"
                placeholder="Enter Attention Of"
                field="attention_of"
              />
              <text-input
                column="col-2"
                label="Quotation No."
                placeholder="Enter Quotation"
                field="quotation_no"
              />
              <div class="col-2">
                <select-view id-name="invoice-to" :items="invoiceTargets" :field="'invoice_to'" data-key="name" label="Invoice To" placeholder="Select an Option"></select-view>
              </div>
              <div class="col-2">
                <select-view id-name="customer" :items="customers" :field="'customer'" data-key="name" label="Customer Contract" placeholder="Select Customer"></select-view>
              </div>
            </div>

            <div class="form-group row mt-5">
              <div class="col-10">
                <select-view id-name="vendor-address" :items="vendorAddresses" :field="'vendor_address'" label="Vendor Address" placeholder="Enter Vendor Address"></select-view>
              </div>
              <text-input
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
                    <table class="table table-responsive">
                      <thead>
                        <th scope="col" class="fs-4">Description</th>
                        <th scope="col" class="fs-4">QTY</th>
                        <th scope="col" class="fs-4">UOM</th>
                        <th scope="col" class="fs-4">Unit Price</th>
                        <th scope="col" class="fs-4">Discount(%)</th>
                        <th scope="col" class="fs-4">VAT(%)</th>
                        <th scope="col" class="fs-4">Currency</th>
                        <th scope="col" class="fs-4">VAT Amount</th>
                        <th scope="col" class="fs-4">Sub Total</th>
                        <th scope="col" class="fs-4">Total</th>
                        <th scope="col" class="fs-4">Charge To</th>
                        <th scope="col" class="fs-4"></th>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter Description"
                              v-model="form.costs[0].description"
                            />
                          </th>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter QTY"
                              v-model="form.costs[0].qty"
                            />
                          </td>
                          <td>
                            <select class="form-select" v-model="form.costs[0].uom">
                              <option value="SHP">SHP</option>
                              <option value="BILL">BILL</option>
                              <option value="HRS">HRS</option>
                              <option value="MEN">MEN</option>
                              <option value="PCS">PCS</option>
                              <option value="TRIP">TRIP</option>
                              <option value="MT">MT</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter Unit Price"
                              v-model="form.costs[0].unit_price"
                            />
                          </td>
                          <td>
                            <input type="number" class="form-control" min="0" v-model="form.costs[0].discount"/>
                          </td>
                          <th>
                            <input type="number" class="form-control" min="0" v-model="form.costs[0].vat"/>
                          </th>
                          <td>
                            <input
                              type="text"
                              value="USD"
                              class="form-control"
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.00"
                              class="form-control"
                              v-model="form.costs[0].vat_ammount"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.00"
                              class="form-control"
                              v-model="form.costs[0].sub_total"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.00"
                              class="form-control"
                              v-model="form.costs[0].total"
                            />
                          </td>
                          <td>
                            <select class="form-select" v-model="form.costs[0].charge_to">
                              <option value="Customer">Customer</option>
                              <option value="Inosoft">Inosoft</option>
                            </select>
                          </td>
                          <td>
                            <button type="button" class="btn btn-secondary">
                              <i class="fa fa-minus" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="6"></td>
                          <td class="fs-4">USD(Total)</td>
                          <td class="fs-4">0.00</td>
                          <td class="fs-4">0.00</td>
                          <td class="fs-4">0.00</td>
                          <td colspan="2">
                            <div id="button" class="float-end">
                              <div id="button_container_1">
                                <button type="button" class="btn btn-info">
                                  <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div class="mt-5">
                    <div class="row mt-5">
                      <div class="col-md-6">
                        <label class="form-label fs-3">Attachment</label><br />
                        <label class="btn btn-info">
                          <i class="fa fa-plus" aria-hidden="true"></i>
                          Add Attachment
                          <input type="file" hidden />
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
                      <select-view :is-required="false" id-name="transactions" :items="transactions" :field="'link_to'" data-key="no" label="Link To" placeholder="Select Item"></select-view>
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
// import Dropdown from "../partials/Dropdown.vue";
// import { mapFields } from "../../helpers";
import SelectView from "../partials/SelectView.vue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      vendorAddresses: [],
    }
  },
  components: { SelectView },
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
    }
  },
  methods: {
    ...mapActions(["fetchVendors", "fetchInvoiceTargets", "fetchCustomers", "fetchTransactionsForSI", "fetchTransactionsForLI"]),
    submitForm(){
      axios.post('/api/instructions', this.form, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchVendors");
    this.$store.dispatch("fetchInvoiceTargets");
    this.$store.dispatch("fetchCustomers");

    if(this.$route.params.type === 'SI') {
      this.form.type = 'SI';
    } else {
      this.form.type = 'LI';
    }
  },
  updated() {
    if(this.form.vendor_address == '' && document.getElementById('vendor-address').selectedIndex != 0){
      document.getElementById('vendor-address').selectedIndex = 0;
    }

    if(this.form.link_to == '' && document.getElementById('transactions').selectedIndex != 0){
      document.getElementById('transactions').selectedIndex = 0;
    }
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
    }
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
