<template>
    <div>
      <navbar></navbar>
      <div class="container-fluid mt-5">
        <h2>3rd Party Instruction</h2>
        <p>
          Vendor Management
          <span class="text-success">> 3rd Party Instruction</span>
        </p>
        <Form @handleSubmit="save" @handleDraft="saveAsDraft" :disable-type="true"/>
      </div>
    </div>
</template>

<script>
import Form from "../partials/Form.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: { Form },
    computed: {
        ...mapGetters({
            details: "getDetails",
        }),

        instruction: function() {
            return Object.assign({}, this.details);
        },
    },
    methods: {
        ...mapActions([
            "fetchDetails"
        ]),

        save() {
            this.$store.dispatch("updateInstruction", {form: this.$store.state.form, id: this.$route.params.id});
        },

        saveAsDraft() {
            this.$store.state.form.status = 'Draft';
            this.$store.dispatch("updateInstruction", {form: this.$store.state.form, id: this.$route.params.id});
        }
    },
    beforeMount() {
      this.$store.dispatch("fetchDetails", this.$route.params.id);
    },
    watch: {
        instruction: {
            deep: true,
            handler(newValue, oldValue) {
                if((JSON.stringify(newValue) != JSON.stringify(oldValue))){
                    this.$store.dispatch('setFormInstruction', newValue);
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
