<template>
    <div>
        <label :for="id" class="form-control-label">{{ label }}</label>
        <select
            class="form-control"
            :id="id"
            data-live-search="true"
            :required="!!isRequired"
            v-model="$store.state.form[field]"
        >
            <option disabled hidden value="">{{ placeholder }}</option>
            <option
            v-if="!!dataKey"
            v-for="(item, index) in items"
            :key="index"
            :value="item[dataKey]"
            >
            {{ item[dataKey] }}
            </option>
            <option
            v-if="!(!!dataKey)"
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
    id: {type: String},
    label: {type: String},
    placeholder: {type: String},
    items: {type: Array},
    field: {type: String},
    dataKey: {type: String},
    isRequired: {type: Boolean, default: true}
  },
};
</script>

<style>
</style>
