<template>
    <tbody>
        <tr v-for="(item, index) in $store.state.details.costs" :key="index">
            <td>
                <p>{{ item.description }}</p>
            </td>
            <td>
                <p>{{ item.qty }}</p>
            </td>
            <td>
                <p>{{ item.uom }}</p>
            </td>
            <td>
                <p>{{ item.unit_price }}</p>
            </td>
            <td>
                <p>{{ item.discount }}%</p>
            </td>
            <td>{{ item.vat }}%</td>
            <td>
                <p>AED (Total)</p>
            </td>
            <td>
                <p class="text-end">
                    {{ (item.vat_ammount).toFixed(2) }}
                </p>
            </td>
            <td>
                <p class="text-end">
                    {{ (item.sub_total).toFixed(2) }}
                </p>
            </td>
            <td>
                <p class="text-end">
                    {{ (item.total).toFixed(2) }}
                </p>
            </td>
            <td>
                <p>
                    {{ item.charge_to }}
                </p>
            </td>
        </tr>
    </tbody>
</template>

<script>
    export default {};
</script>

<style>

</style>

