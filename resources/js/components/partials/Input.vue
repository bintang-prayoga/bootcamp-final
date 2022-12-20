<template>
  <div :class="column">
    <label :for="id" class="form-control-label">{{ label }}</label>
    <input
      :id="id"
      type="text"
      class="form-control"
      :placeholder="placeholder"
      required
      v-model="$store.state.form[field]"
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
    id: {
      type: String,
    },
    field: {
      type: String,
    }
  },
};
</script>

<style>
</style>
