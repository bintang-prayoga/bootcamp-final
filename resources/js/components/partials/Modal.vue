<template>
  <div
    class="modal"
    :id="id"
    tabindex="-1"
    :aria-labelledby="`label-${id}`"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div
          v-if="Object.keys(header).length != 0"
          class="modal-header align-self-center border-bottom-0"
        >
          <p
            :id="`label-${id}`"
            :class="`modal-header fs-3 fw-bolder m-0 border-bottom-0`"
          >
            {{ header.title.value }}
          </p>
        </div>
        <div class="modal-body">
          <div v-for="(item, index) in body" :key="index">
            <label :for="`modal-body-${item.field}`" class="text-dark-50">{{
              item.label
            }}</label>
            <input
              v-if="item.type === 'input-text'"
              class="form-control"
              type="text"
              v-model="form[item.field]"
              :placeholder="item.placeholder"
              :id="`modal-body-${item.field}`"
            />
            <p class="mt-0 fw-semibold fs-3" v-else-if="item.type === 'text'">
              {{ item.value }}
            </p>
            <textarea
              v-else-if="item.type === 'text-area'"
              class="form-control mb-4"
              v-model="form[item.field]"
              :id="`modal-body-${item.field}`"
              rows="5"
              style="resize: none"
            ></textarea>
            <div class="mt-2" v-else-if="item.type === 'file'">
              <Attachments
                :attachments="form.attachments"
                @handleRemove="removeFile"
              />
              <label class="btn btn-info">
                <i class="fa fa-plus" aria-hidden="true"></i>
                Add Attachment
                <input type="file" hidden multiple @change="handleFile" />
              </label>
            </div>
            <!-- <Attachments
              v-else-if="item.type === 'file'"
              :attachments="form.attachments"
            /> -->
          </div>
        </div>
        <div class="modal-footer border-top-0">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-info"
            @click="$emit('handleSave', form)"
            data-bs-dismiss="modal"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String },
    header: { type: Object },
    body: { type: Array },
  },
  data() {
    return {
      form: {
        attachments: [],
      },
    };
  },
  beforeMount() {
    const attachments = this.body.find((value) => {
      return value.type === "file";
    });

    if (!!attachments) {
      if (attachments.value ?? false) {
        this.form["attachments"] = attachments.value;
      } else {
        this.form["attachments"] = [];
      }
    }
  },
  methods: {
    handleFile(event) {
      console.log(event.target.files);
      Array.from(event.target.files).forEach((file) => {
        console.log(file);
        this.form.attachments.push(file);
      });
    },

    removeFile(index) {
      if (typeof this.form.attachments[index] === "string") {
        this.form["deleted_attachments"].push(this.form.attachments[index]);
      }
      this.form.attachments.splice(index, 1);
    },
  },
};
</script>

<style>
</style>
