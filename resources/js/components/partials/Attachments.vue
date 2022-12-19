<template>
    <div :class="outerSpacing">
        <div class="d-flex w-75 border-bottom border-secondary mb-4" v-if="attachments.length != 0" v-for="(value, index) in attachments">
            <font-awesome-icon
                icon="fa-solid fa-paperclip"
                :class="'text-info mb-2 pe-2 align-self-end ' + fontSize"
            />
            <div :class="'text-break me-auto mt-0 ' + gutter">
                <p :class="'my-0 text-info fw-bold ' + fontSize" v-if="!!value.name">{{ value.name }}</p>
                <p :class="'my-0 text-info fw-bold ' + fontSize" v-else>{{ value.split('/').pop() }}</p>
            </div>
            <div v-if="withDelete" class="align-self-end">
                <button type="button" class="btn btn-link p-0" @click="$emit('handleRemove', index)">
                    <font-awesome-icon
                        icon="fa-solid fa-trash"
                        :class="'text-danger ' + fontSize"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        attachments: {type: Array},
        fontSize: {
            type: String,
            default: 'fs-4'
        },
        gutter: {
            type: String,
            default: 'ms-3'
        },
        withDelete: {
            type: Boolean,
            default: true
        },
        outerSpacing: {
            type: String,
            default: "mb-3 pb-3"
        }
    },
}
</script>
