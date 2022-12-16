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
            <div class="input-group d-flex mb-2">
                <span class="input-group-text border-end-0 bg-white" style="height: 34px" :id="'search-'+id">
                    <font-awesome-icon
                        icon="fa-solid fa-search"
                        class="text-info fs-4"
                    />
                </span>
                <input class="form-control border-start-0 fs-4" style="height: 34px" type="text" placeholder="Search" aria-label="Search" @input="handleSearch" :aria-describedby="'search-'+id">
            </div>
            <ul class="list-group dropdown-items overflow-auto p-0 m-0">
                <li v-for="(item, index) in items">
                  <a v-if="!!dataKey"
                    class="dropdown-item text-decoration-none"
                    :data="item[dataKey]"
                    :data-index="index"
                    @click="(event) => $emit('handleSelect', event, field)"
                  >
                    {{ item[dataKey] }}
                  </a>
                  <a v-else
                    class="dropdown-item text-decoration-none"
                    :data="item"
                    :data-index="index"
                    @click="(event) => $emit('handleSelect', event, field)"
                  >
                    {{ item }}
                  </a>
                </li>
            </ul>
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
    isRequired: {type: Boolean, default: true},
  },
  data: function() {
    return {
        search: ''
    }
  },
  methods: {
    handleSearch(event) {
        if(typeof window.TIME !== 'undefined') {
            clearTimeout(window.TIME);
        }

        window.TIME = setTimeout(() => {
            this.$emit('handleSearch', event);
        }, 1000);
    }
  }
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
  .dropdown-items{
    list-style: none;
    max-height: 150px;
  }
</style>
