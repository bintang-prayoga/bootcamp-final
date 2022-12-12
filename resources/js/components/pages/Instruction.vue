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
                        <tr v-for="(value, index) in form.costs">
                          <th>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Enter Description"
                              v-model="form.costs[index].description"
                            />
                          </th>
                          <td>
                            <input
                              type="number"
                              min="0"
                              class="form-control"
                              placeholder="Enter QTY"
                              v-model="form.costs[index].qty"
                            />
                          </td>
                          <td>
                            <select class="form-select" v-model="form.costs[index].uom">
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
                              type="number"
                              step="0.001"
                              min="0"
                              class="form-control"
                              placeholder="Enter Unit Price"
                              v-model="form.costs[index].unit_price"
                            />
                          </td>
                          <td>
                            <input type="number" class="form-control" min="0" max="100" v-model="form.costs[index].discount"/>
                          </td>
                          <th>
                            <input type="number" class="form-control" min="0" max="100" v-model="form.costs[index].vat"/>
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
                              disabled
                              v-model="form.costs[index].vat_ammount"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.00"
                              class="form-control"
                              disabled
                              v-model="form.costs[index].sub_total"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              step="0.00"
                              class="form-control"
                              disabled
                              v-model="form.costs[index].total"
                            />
                          </td>
                          <td>
                            <select class="form-select" v-model="form.costs[index].charge_to">
                              <option value="Customer">Customer</option>
                              <option value="Inosoft">Inosoft</option>
                            </select>
                          </td>
                          <td>
                            <button type="button" class="btn btn-secondary" @click="removeCost(index)">
                              <i class="fa fa-minus" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="6"></td>
                          <td class="fs-4">USD (Total)</td>
                          <td class="fs-4" id="total-of-vat">{{ total.vat }}</td>
                          <td class="fs-4" id="total-of-subtotal">{{ total.sub }}</td>
                          <td class="fs-4" id="total-of-total">{{ total.total }}</td>
                          <td colspan="2">
                            <div id="button" class="float-end">
                              <div id="button_container_1">
                                <button type="button" class="btn btn-info" @click="addCost()">
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
    },

    costs: function() {
      return JSON.stringify(this.form.costs);
    },

    total: function() {
      return {
        sub: this.form.costs.reduce((current, previous) => {return current + parseFloat(previous.sub_total ?? 0)}, 0).toFixed(2),
        vat: this.form.costs.reduce((current, previous) => {return current + parseFloat(previous.vat_ammount ?? 0)}, 0).toFixed(2),
        total: this.form.costs.reduce((current, previous) => {return current + parseFloat(previous.total ?? 0)}, 0).toFixed(2)
      }
    }
  },
  methods: {
    ...mapActions(["fetchVendors", "fetchInvoiceTargets", "fetchCustomers", "fetchTransactionsForSI", "fetchTransactionsForLI"]),

    addCost(){
      this.form.costs.push({});
    },

    removeCost(index){
      this.form.costs.splice(index, 1);
    },

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
    },
    costs: {
      deep:true,
      handler(newValueSerialize, oldValueSerialize) {
        let newValue = JSON.parse(newValueSerialize);
        let oldValue = JSON.parse(oldValueSerialize);

        for(let i = 0; i < newValue.length; i++) {
          if(!!newValue[i].qty && !!newValue[i].unit_price) {
            if(newValue[i].qty != oldValue[i].qty || newValue[i].unit_price != oldValue[i].unit_price || newValue[i].discount != oldValue[i].discount){
              let subTotal = newValue[i].qty * newValue[i].unit_price
              if(!!newValue[i].discount){
                subTotal -= subTotal * (newValue[i].discount/100);
              }
              newValue[i]['sub_total'] = subTotal;
            }
          }

          if(!!newValue[i].sub_total){
            if(newValue[i].vat != oldValue[i].vat){
                let vatAmmount = (newValue[i].vat/100) * newValue[i].sub_total;
                newValue[i]['vat_ammount'] = vatAmmount;
            }
          }

          if((!!newValue[i].sub_total && !!newValue[i].vat_ammount) && (newValue[i].sub_total != oldValue[i].sub_total || newValue[i].vat_ammount != oldValue[i].vat_ammount)) {
            let total = newValue[i].sub_total + newValue[i].vat_ammount;
            newValue[i]['total'] = total;
          }
        }

        if(JSON.stringify(this.form.costs) != JSON.stringify(newValue)){
            this.form.costs = newValue;
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
