<template>
    <div>
        <label :for="idName" class="form-control-label">{{ label }}</label>
        <select
            class="form-control"
            :id="idName"
            data-live-search="true"
            :required="!!isRequired"
            v-model="model"
        >
            <option disabled hidden value="">{{ placeholder }}</option>
            <option
            v-if="dataKey !== ''"
            v-for="(item, index) in items"
            :key="index"
            :value="item[dataKey]"
            >
            {{ item[dataKey] }}
            </option>
            <option
            v-if="dataKey === ''"
            v-for="(item, index) in items"
            :key="index"
            :value="item"
            >
            {{ item }}
            </option>
        </select>
    </div>
  </template>

  <script>
import { placeholder } from '@babel/types';

export default {
  props: {
    idName: {type: String},
    label: {type: String},
    placeholder: {type: String},
    items: {type: Array},
    field: {type: String},
    dataKey: {
      type: String,
      default: '',
    },
    isRequired: {
      type: Boolean,
      default: true,
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
