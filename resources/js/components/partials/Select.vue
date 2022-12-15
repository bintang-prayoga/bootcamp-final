<template>
    <div :class="column">
        <label :for="id" class="form-control-label">{{ label }}</label>
        <button type="button" class="btn btn-default shadow-none w-100 text-start rounded select-picker text-capitalize fs-4" data-bs-toggle="dropdown" aria-expanded="false">
          <span v-if="!!$store.state.form[field]">
              {{ $store.state.form[field] }}
          </span>
          <span class="text-black-50" v-else>
            {{ placeholder }}
          </span>
        </button>
        <input type="text" class="input-hidden" :name="field" :value="$store.state.form[field]" :required="isRequired">
        <ul class="dropdown-menu" :id="id">
          <li v-for="(item, index) in items">
            <a v-if="!!dataKey"
              class="dropdown-item"
              :data="item[dataKey]"
              :data-index="index"
              @click="(event) => $emit('handleSelect', event, field)"
            >
              {{ item[dataKey] }}
            </a>
            <a v-else
              class="dropdown-item"
              :data="item"
              :data-index="index"
              @click="(event) => $emit('handleSelect', event, field)"
            >
              {{ item }}
            </a>
          </li>
        </ul>
    </div>
  </template>

  <script>
import { placeholder } from '@babel/types';

export default {
  props: {
    column: {type: String},
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
  .input-hidden{
    height:0;
    width:0;
    opacity: 0;
    padding:0;
    margin:0;
    float:left;
  }
</style>
