<template>
    <table class="table fs-4">
        <thead>
            <tr class="bg-secondary text-white fw-bolder fs-5">
                <th class="align-middle" scope="col">Description</th>
                <th class="align-middle" style="width: 85px" scope="col">Qty</th>
                <th class="align-middle" scope="col">UOM</th>
                <th class="align-middle" style="width: 100px" scope="col">Unit Price</th>
                <th class="align-middle" scope="col">Discount(%)</th>
                <th class="align-middle" scope="col">GSC/VAT(%)</th>
                <th class="align-middle" style="width:120px" scope="col">Currency</th>
                <th class="align-middle text-end" style="width: 120px" scope="col">VAT Ammount</th>
                <th class="align-middle text-end" style="width: 100px" scope="col">Sub Total</th>
                <th class="align-middle text-end" style="width: 80px" scope="col">Total</th>
                <th class="align-middle" scope="col">Charge To</th>
                <th class="align-middle" scope="col"></th>
            </tr>
        </thead>
        <TableForm v-if="asForm"></TableForm>
        <Table v-else></Table>
        <tfoot>
            <tr>
                <td colspan="6"></td>
                <td class="align-middle">USD (Total)</td>
                <td class="text-end align-middle" id="total-of-vat">{{ total.vat }}</td>
                <td class="text-end align-middle" id="total-of-subtotal">{{ total.sub }}</td>
                <td class="text-end align-middle" id="total-of-total">{{ total.total }}</td>
                <td v-if="asForm" colspan="2">
                    <div id="button" class="float-end">
                        <div id="button_container_1">
                            <button type="button" class="btn btn-info" @click="addCost()">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
    import TableCostBodyFormVue from './TableCostBodyForm.vue';
    import TableCostBodyVue from './TableCostBody.vue';

    export default {
        components: {
            'TableForm': TableCostBodyFormVue,
            'Table': TableCostBodyVue
        },
        props: {
            asForm: {
                type: Boolean,
                default: false,
            },
            total: {type: Object}
        },
        methods: {
            addCost(){
                this.$store.state.form.costs.push({
                    vat_ammount: 0,
                    sub_total: 0,
                    total: 0
                });
            },
        }
    };
</script>


