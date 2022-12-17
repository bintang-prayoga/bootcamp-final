<template>
    <div class="modal" :id="id" tabindex="-1" :aria-labelledby="`label-${id}`" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div v-if="Object.keys(header).length != 0" class="modal-header align-self-center border-bottom-0">
                    <p :id="`label-${id}`" :class="`modal-header fs-3 fw-bolder m-0 border-bottom-0`">{{ header.title.value }}</p>
                </div>
                <div class="modal-body">
                    <div v-for="(item, index) in body">
                        <label :for="`modal-body-${item.field}`" class="text-dark-50">{{ item.label }}</label>
                        <input
                            v-if="item.type === 'input-text'"
                            class="form-control"
                            type="text"
                            v-model="form[item.field]"
                            :placeholder="item.placeholder"
                            :id="`modal-body-${item.field}`"
                        >
                        <h5 v-else-if="item.type === 'text'">
                            {{ item.value }}
                        </h5>
                        <textarea
                            v-else-if="item.type === 'text-area'"
                            class="form-control"
                            v-model="form[item.field]"
                            :id="`modal-body-${item.field}`"
                            rows="5"
                            style="resize: none"
                        ></textarea>
                        <Attachments
                            v-else-if="item.type === 'file'"
                            :attachments="form.attachments"
                        />
                    </div>
                </div>
                <div class="modal-footer border-top-0">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-info" @click="$emit('handleSave', form)" data-bs-dismiss="modal">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: {type: String},
            header: {type: Object},
            body: {type: Array},
        },
        data() {
            return {
                form: {}
            }
        },
        beforeMount() {
            const attachments = this.body.find((value) => {value.type === 'file'})
            if(!!attachments){
                if(attachments.value ?? false) {
                    this.form.attachments = attachments.value;
                } else {
                    this.form.attachments = [];
                }
            }
        },
        methods: {
            removeFile(index) {
                this.form.attachments.splice(index, 1);
            },
        }
    }
</script>

<style>

</style>
