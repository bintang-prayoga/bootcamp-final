<template>
    <div :class="column">
        <label :for="id" class="form-control-label">{{ label }}</label>
        <div class="btn-group shadow-none">
            <button type="button" class="btn btn-default shadow-none w-100 text-start rounded select-picker text-capitalize fs-4" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="text-black text-opacity-75" v-if="!!$store.state.form[field]">
                  {{ $store.state.form[field] }}
              </span>
              <span class="text-black-50" v-else>
                {{ placeholder }}
              </span>
            </button>
            <ul class="dropdown-menu select p-0" :id="id">
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
                    <li v-if="searching">
                        <p class="text-center m-2 items-none">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </p>
                    </li>
                    <li v-else-if="!searching && (items == null || !items.length)">
                        <p class="text-center m-2 items-none">No Data</p>
                    </li>
                    <li v-else v-for="(item, index) in items">
                      <a v-if="!!dataKey"
                        class="dropdown-item text-decoration-none"
                        :data="item[dataKey]"
                        :data-id="item.id"
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
                <div class="m-2" v-if="!!createPlaceholder">
                    <button type="button" class="btn btn-outline-info w-100 border border-2 border-info border-opacity-50" data-bs-toggle="modal" :data-bs-target="`#modal-${id}`">
                        <span class="fs-4 text-capitalize">
                            <font-awesome-icon
                                icon="fa-solid fa-plus"
                                class="text-info fs-3 me-3"
                            />
                            {{ createPlaceholder }}
                        </span>
                    </button>
                </div>
                <div v-if="!!footer && !(!!createPlaceholder)" class="dropdown-footer">
                    <p class="ms-3 text-start items-none">{{ footer }}</p>
                </div>
            </ul>
        </div>
        <input type="text" class="input-hidden" :name="field" :value="$store.state.form[field]" :required="isRequired">
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
    items: {type: Array|Object},
    field: {type: String},
    dataKey: {type: String},
    isRequired: {type: Boolean, default: true},
    footer: {type: String},
    createPlaceholder: {type: String}
  },
  data: function() {
    return {
        search: '',
        searching: 1
    }
  },
  methods: {
    handleSearch(event) {
        if(typeof window.TIME !== 'undefined') {
            clearTimeout(window.TIME);
        }

        this.searching = 1

        window.TIME = setTimeout(() => {
            this.$emit('handleSearch', event);
        }, 1000);
    },
  },
  watch: {
    items: {
        deep: true,
        handler() {
            this.searching = 0;
        }
    }
  }
};
</script>

<style>
  .btn-group{
    width: 100%;
  }
  .dropdown-menu .select{
    min-width: 100%;
  }
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
  .items-none{
    color: #808080b0;
  }
</style>
