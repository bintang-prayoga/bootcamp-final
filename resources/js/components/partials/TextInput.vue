<template>
  <div :class="column">
    <label :for="idName" class="form-control-label">{{ label }}</label>
    <input
      :id="idName"
      type="text"
      class="form-control"
      :placeholder="placeholder"
      required
      v-model="model"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    column: {
      type: String,
    },
    idName: {
      type: String,
    },
    field: {
      type: String,
    }
  },
  data() {
    return {
      model: ''
    }
  },
  watch: {
    model: function(value) {
        this.$store.state.form[this.field] = value;
    }
  }
};
</script>

<style>
</style>
