<template>
  <div>
    <navbar></navbar>

    <div class="container-fluid mt-3">
      <h2>3rd Party Instruction</h2>
      <p>
        Vendor Management
        <span class="text-success">> 3rd Party Instruction</span>
      </p>
      <modal
        id="modal-terminate"
        :header="{ title: { value: 'Reason Of Cancellation' } }"
        :body="[
          {
            type: 'text',
            label: 'Cancelled By',
            value: name,
          },
          {
            type: 'text-area',
            field: 'reason',
            label: 'Description',
            placeholder: 'Enter Description',
          },
          {
            type: 'file',
            field: 'attachments',
            label: 'Attachments',
            placeholder: 'Enter Attachments',
          },
        ]"
        @handleSave="handleTerminate"
      >
      </modal>
      <div class="row w-50 ms-auto justify-content-end">
        <div class="col-md-3 my-2">
          <a
            href="#"
            class="btn btn-secondary my-2"
            v-show="details.status === 'In Progress'"
          >
            <font-awesome-icon
              icon="fas fa-paper-plane"
              class="text-info"
              aria-hidden="true"
            />
            <span class="text-muted fw-bold"> Send Email</span>
          </a>

          <button
            v-show="details.status === 'In Progress'"
            class="btn btn-secondary my-2"
            data-bs-toggle="modal"
            data-bs-target="#modal-terminate"
          >
            <font-awesome-icon
              icon="fas fa-ban"
              class="text-danger"
              aria-hidden="true"
            />
            <span class="text-muted fw-bold"> Terminate</span>
          </button>
        </div>

        <div class="col-md-4 my-2">
          <a href="#" @click="exportPdf()" class="btn btn-secondary my-2">
            <font-awesome-icon
              icon="fas fa-file"
              class="text-info"
              aria-hidden="true"
            />
            <span class="text-muted fw-bold"> Export</span>
          </a>
          <router-link
            v-show="
              details.status === 'In Progress' || details.status === 'Draft'
            "
            class="btn btn-secondary my-2"
            :to="{
              name: 'Edit',
              params: { id: this.details.id },
            }"
          >
            <font-awesome-icon
              icon="fas fa-pen"
              class="text-info"
              aria-hidden="true"
            />
            <span class="text-muted fw-bold"> Modify</span>
          </router-link>
        </div>
      </div>

      <div class="container mt-5">
        <div class="form-group row mt-5">
          <div class="col-2">
            <label class="text-muted fs-5 fw-light">Type</label>
            <p class="fs-4 fw-bold" v-if="this.details.type === 'LI'">
              <font-awesome-icon
                icon="fa-solid fs-3 fa-truck"
                class="text-muted"
              />&nbsp;
              <span> Logistic Instruction </span>
            </p>
            <p class="fs-4 fw-bold" v-else>
              <font-awesome-icon
                icon="fa-solid fs-3 fa-user"
                class="text-muted"
              />&nbsp;
              <span> Service Instruction </span>
            </p>
          </div>
          <div class="col-2">
            <label class="text-muted fs-5 fw-light">Instruction ID</label>
            <p class="fs-3 fw-bold">{{ this.details.no }}</p>
          </div>
          <div class="col-2">
            <label class="text-muted fs-5 fw-light">Transfer No.</label>
            <p class="fs-3 fw-bold">{{ this.details.link_to }}</p>
          </div>
          <div class="col-2">
            <label class="text-muted fs-5 fw-light">Customer</label>
            <p class="fs-3 fw-bold">{{ this.details.customer }}</p>
          </div>
          <div class="col-2">
            <label class="text-muted fs-5 fw-light">Customer Po.</label>
            <p class="fs-3 fw-bold">{{ this.details.customer_po_no }}</p>
          </div>
          <div class="col-2">
            <label>Status</label>
            <status-badge :status="this.details.status" />
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-2">
            <label class="text-muted fs-5 fw-light">Attention Of</label>
            <p class="fs-3 fw-bold">{{ this.details.attention_of }}</p>
          </div>
          <div class="col-2">
            <label class="text-muted fs-5 fw-light">Assigned Vendor</label>
            <p class="fs-3 fw-bold">{{ this.details.assigned_vendor }}</p>
          </div>
          <div class="col-2">
            <label class="text-muted fs-5 fw-light">Vendor Quotation No.</label>
            <p class="fs-3 fw-bold">{{ this.details.quotation_no }}</p>
          </div>
          <div class="col-5">
            <label class="text-muted fs-5 fw-light">Vendor Address</label>
            <p class="fs-3 fw-bold">
              {{ this.details.vendor_address }}
            </p>
          </div>
        </div>

        <div class="row mt-5">
          <p class="fs-3 fw-bold">Cost Detail</p>
          <table class="table fs-4">
            <thead>
              <tr class="bg-secondary text-white fw-bolder fs-5">
                <th scope="col">Description</th>
                <th scope="col">Qty</th>
                <th scope="col">UOM</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Discount (%)</th>
                <th scope="col">VAT(%)</th>
                <th scope="col">Currency</th>
                <th scope="col">VAT Amount</th>
                <th scope="col">Sub Total</th>
                <th scope="col">Total</th>
                <th scope="col">Charge To</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in details.costs" :key="index">
                <td>
                  <p>{{ item.description }}</p>
                </td>
                <td>
                  <p>{{ item.qty }}</p>
                </td>
                <td>
                  <p>{{ item.uom }}</p>
                </td>
                <td>
                  <p>{{ item.unit_price }}</p>
                </td>
                <td>
                  <p>{{ item.discount }}%</p>
                </td>
                <td>{{ item.vat }}%</td>
                <td>
                  <p>AED (Total)</p>
                </td>
                <td>{{ item.vat_ammount.toFixed(2) }}</td>
                <td>{{ item.sub_total.toFixed(2) }}</td>
                <td>{{ item.total.toFixed(2) }}</td>
                <td>{{ item.charge_to }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="row mt-5 d-flex justify-content-between">
          <div class="w-50">
            <p class="fs-3 fw-bold">Attachment</p>
            <div class="mt-2">
              <Attachments :attachments="details.attachments" />
              <label class="btn btn-info">
                <i class="fa fa-plus" aria-hidden="true"></i>
                Add Attachment
                <input type="file" hidden @change="handleFile" multiple />
              </label>
            </div>
          </div>

          <div class="w-50">
            <p class="fs-3 fw-bold">Notes</p>
            <p class="fs-4 fw-bold">{{ this.details.note }}</p>
          </div>

          <div class="my-3">
            <div class="d-flex justify-content-between">
              <p class="fs-3 fw-bold">Vendor Invoice</p>
              <button class="btn btn-info">
                <font-awesome-icon icon="fa-solid fa-plus" /> Add Invoices
              </button>
            </div>
          </div>
        </div>

        <div class="row my-5" v-if="details.vendor_invoices.length != 0">
          <table class="table fs-4">
            <thead>
              <tr class="bg-secondary text-white fw-bolder fs-5">
                <th scope="col">Invoice No.</th>
                <th scope="col">Invoice Attachments</th>
                <th scope="col">Supporting Documents</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in details.vendor_invoices" :key="index">
                <td>
                  <p>{{ item.no }}</p>
                </td>
                <td>
                  <p>{{ item.attachments }}</p>
                </td>
                <td v-if="item.supporting_documents.length === 0">
                  <p>0</p>
                </td>
                <td
                  v-else
                  v-for="(item, index) in item.supporting_documents"
                  :key="index"
                >
                  <p>{{ item.name }}</p>
                </td>
                <td>
                  <font-awesome-icon
                    icon="fa-solid fa-edit"
                    class="text-info"
                  />
                  <font-awesome-icon
                    icon="fa-solid fa-trash"
                    class="text-danger"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div
            class="w-50 d-flex mx-auto align-items-center"
            v-if="this.details.status === 'In Progress'"
          >
            <p class="mx-2 mt-3">
              Click the button if all vendor invoices have been received
            </p>
            <button
              class="btn btn-info"
              width="50"
              height="50"
              @click="patchVendorInvoice()"
            >
              All Received
            </button>
          </div>

          <div class="w-50 d-flex mx-auto" v-else></div>
        </div>

        <div class="row w-100 bg-dark-gray">
          <p class="my-2 ms-4 text-white fs-3 fw-bold">For Internal Only</p>
        </div>

        <div class="row mt-5 d-flex justify-content-between">
          <div class="w-50">
            <p class="fs-3 fw-bold">Attachment</p>
            <div class="mt-2">
              <Attachments
                :attachments="internal.attachments"
                @handleRemove="handleRemoveInternal"
              />
              <label class="btn btn-info">
                <i class="fa fa-plus" aria-hidden="true"></i>
                Add Attachment
                <input type="file" hidden @change="handleFileInternal" />
              </label>
            </div>
          </div>
          <div class="w-50">
            <p class="fs-3 fw-bold">Notes</p>
            <div
              class="note-cont"
              v-for="(item, index) in internal.notes"
              :key="index"
            >
              <p class="fs-4 fw-bold">
                {{ item.note }}
              </p>
              <p>By. {{ item.noted_by }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../partials/Modal.vue";
import StatusBadge from "../partials/StatusBadge.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: { StatusBadge, Modal },
  props: ["type"],
  computed: {
    ...mapGetters({
      form: "getForm",
    }),
  },
  data() {
    return {
      details: {},
      internal: {
        attachments: [],
      },
    };
  },
  methods: {
    getUser() {
      const user = localStorage.getItem("user");
      return (this.name = user);
    },

    exportPdf() {
      this.url = "/api/instructions/" + this.$route.params.id + "/exported-pdf";
      window.open(this.url, "_blank");
    },

    patchVendorInvoice() {
      axios
        .post(
          "/api/instructions/" + this.$route.params.id + "/receive",
          {
            no: this.no,
            attachments: this.attachments,
            supporting_documents: this.supporting_documents,
          },
          {
            params: {
              _method: "patch",
            },
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.getDetails();
          this.no = "";
          this.attachments = "";
          this.supporting_documents = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDetails() {
      axios
        .get("/api/instructions/" + this.$route.params.id)
        .then((response) => {
          this.details = response.data.data;
          this.internal = response.data.data.internal;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    removeFile(index) {
      if (typeof this.form.attachments[index] === "string") {
        this.form["deleted_attachments"].push(this.form.attachments[index]);
      }
      this.form.attachments.splice(index, 1);
    },

    handleFile(event) {
      Array.from(event.target.files).forEach((file) => {
        this.form.attachments.push(file);
      });
    },

    handleFileInternal(event) {
      const formData = new FormData();
      formData.append("attachment", event.target.files[0]);
      axios
        .post(
          "/api/instructions/" +
            this.$route.params.id +
            "/internal/attachments",
          formData,
          {
            params: {
              _method: "post",
            },
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          response;
          this.getDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleRemoveInternal(index) {
      axios
        .post(
          "/api/instructions/" +
            this.$route.params.id +
            "/internal/attachments",
          { deleted_attachment: this.internal.attachments[index] },
          {
            params: {
              _method: "delete",
            },
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.getDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleTerminate(form) {
      const formData = new FormData();

      for (const [key, value] of Object.entries(form)) {
        if (Array.isArray(value)) {
          value.forEach((element, index) => {
            formData.append(`${key}[${index}]`, element);
          });
        } else {
          formData.append(key, value);
        }
      }

      axios
        .post(
          "/api/instructions/" + this.$route.params.id + "/terminate",
          formData,
          {
            params: {
              _method: "patch",
            },
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          this.getDetails();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.getUser();
    this.getDetails();
  },
};
</script>

<style>
.bg-dark-gray {
  background-color: #57595b;
}
</style>