<template>
    <v-dialog v-model="dialog" width="700" persistent>
        <edit-form @close="close" @success="$emit('success')"></edit-form>
    </v-dialog>
</template>
<script>
import editForm from './includes/formEdit.vue'
export default {
    components: {
        editForm
    },
    props:{
        dialog: {
            type: Boolean,
            required: true,
        }
    },
    methods: {
        close(){
            this.$emit('close')
        }
    }
}
</script>