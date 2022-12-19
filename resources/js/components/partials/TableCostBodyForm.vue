<template>
    <tbody>
        <tr class="anti-hover" v-for="(value, index) in $store.state.form.costs">
            <th>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Description"
                    v-model="$store.state.form.costs[index].description"
                    required
                />
            </th>
            <td>
                <input
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="Enter QTY"
                    v-model="$store.state.form.costs[index].qty"
                    required
                />
            </td>
            <td>
                <select class="form-select fs-5" v-model="$store.state.form.costs[index].uom" required>
                    <option value="SHP">SHP</option>
                    <option value="BILL">BILL</option>
                    <option value="HRS">HRS</option>
                    <option value="MEN">MEN</option>
                    <option value="PCS">PCS</option>
                    <option value="TRIP">TRIP</option>
                    <option value="MT">MT</option>
                </select>
            </td>
            <td>
                <input
                    type="number"
                    min="0"
                    step=".001"
                    class="form-control"
                    placeholder="Enter Unit Price"
                    v-model="$store.state.form.costs[index].unit_price"
                    required
                />
            </td>
            <td>
                <input
                    type="number"
                    class="form-control"
                    min="0"
                    max="100"
                    v-model="$store.state.form.costs[index].discount"
                    required
                />
            </td>
            <td>
                <input
                    type="number"
                    class="form-control"
                    min="0"
                    max="100"
                    v-model="$store.state.form.costs[index].vat"
                    required
                />
            </td>
            <td>
                <input
                    type="text"
                    value="USD"
                    class="form-control"
                    disabled
                    required
                />
            </td>
            <td class="align-middle text-end">
                <input
                    type="hidden"
                    class="form-control"
                    disabled
                    v-model="$store.state.form.costs[index].vat_ammount"
                    required
                />
                {{ (value.vat_ammount).toFixed(2) }}
            </td>
            <td class="align-middle text-end">
                <input
                    type="hidden"
                    class="form-control"
                    disabled
                    v-model="$store.state.form.costs[index].sub_total"
                    required
                />
                {{ (value.sub_total).toFixed(2) }}
            </td>
            <td class="align-middle text-end">
                <input
                    type="hidden"
                    class="form-control"
                    disabled
                    v-model="$store.state.form.costs[index].total"
                    required
                />
                {{ (value.total).toFixed(2) }}
            </td>
            <td>
                <select class="form-select fs-5" v-model="$store.state.form.costs[index].charge_to" required>
                <option value="Customer">Customer</option>
                <option value="Inosoft">Inosoft</option>
                </select>
            </td>
            <td>
                <button type="button" class="btn btn-secondary" @click="removeCost(index)">
                <i class="fa fa-minus" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    </tbody>
</template>

<script>
    export default {
        methods: {
            removeCost(index){
                if(this.$store.state.form.costs.length > 1){
                    this.$store.state.form.costs.splice(index, 1);
                }
            },
        },
        computed: {
            costs: function() {
              if(this.$store.state.form.costs ?? false){
                return JSON.stringify(this.$store.state.form.costs);
              } else {
                return JSON.stringify([]);
              }
            },
        },
        watch: {
            costs: {
                deep:true,
                handler(newValueSerialize, oldValueSerialize) {
                    if(newValueSerialize != '[]' && oldValueSerialize != '[]') {
                        let newValue = JSON.parse(newValueSerialize);
                        let oldValue = JSON.parse(oldValueSerialize);

                        for(let i = 0; i < newValue.length; i++) {
                        if(!!newValue[i].qty && !!newValue[i].unit_price) {
                            if(newValue[i].qty != oldValue[i].qty || newValue[i].unit_price != oldValue[i].unit_price || newValue[i].discount != oldValue[i].discount){
                            let subTotal = newValue[i].qty * newValue[i].unit_price
                            if(!!newValue[i].discount){
                                subTotal -= subTotal * (newValue[i].discount/100);
                            }
                            newValue[i]['sub_total'] = subTotal;
                            }
                        }

                        if(!!newValue[i].sub_total){
                            if(newValue[i].vat != oldValue[i].vat){
                                let vatAmmount = (newValue[i].vat/100) * newValue[i].sub_total;
                                newValue[i]['vat_ammount'] = vatAmmount;
                            }
                        }

                        if((!!newValue[i].sub_total && !!newValue[i].vat_ammount) && (newValue[i].sub_total != oldValue[i].sub_total || newValue[i].vat_ammount != oldValue[i].vat_ammount)) {
                            let total = newValue[i].sub_total + newValue[i].vat_ammount;
                            newValue[i]['total'] = total;
                        }
                        }

                        if(JSON.stringify(this.$store.state.form.costs) != JSON.stringify(newValue)){
                            this.$store.state.form.costs = newValue;
                        }
                    }
                }
            },
        }
    }
</script>

<style>
    .form-select {
        height: 34px;
        width: auto;
    }
</style>
