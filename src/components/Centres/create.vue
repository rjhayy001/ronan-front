<template>
    <v-dialog v-model="dialog" width="700" persistent>
        <center-form @close="close" @success="$emit('success')"></center-form>
    </v-dialog>
</template>
<script>
import centerForm from './includes/form.vue'
export default {
    components: {
        centerForm
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