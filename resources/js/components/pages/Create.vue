<template>
    <div>
      <navbar></navbar>
      <div class="container-fluid mt-5">
        <h2>3rd Party Instruction</h2>
        <p>
          Vendor Management
          <span class="text-success">> 3rd Party Instruction</span>
        </p>
        <Form @handleSubmit="save" @handleDraft="saveAsDraft"/>
      </div>
    </div>
</template>

<script>
import Form from "../partials/Form.vue";
import { mapActions } from "vuex";

export default {
    components: { Form },
    methods: {
      ...mapActions([
        "setFormInstruction",
        "postInstruction"
      ]),

      save() {
        this.$store.dispatch("postInstruction", this.$store.state.form);
      },

      saveAsDraft() {
          this.$store.state.form.status = 'Draft';
          this.$store.dispatch("postInstruction", this.$store.state.form);
      }
    },
    beforeMount() {
        const type = this.$route.params.type === 'SI' ? 'SI' : 'LI';
        this.$store.dispatch("setFormInstruction", {type: type});
    }
};
</script>
