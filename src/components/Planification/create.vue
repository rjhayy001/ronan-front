<template>
    <v-dialog v-model="dialog" width="600" @click:outside="close">
        <Plan @close="close"></Plan>
    </v-dialog>
</template>
<script>
import Plan from './includes/createPlan.vue'
export default {
    components: {
        Plan
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