<template>
    <v-dialog v-model="dialog" width="700" @click:outside="close" class="card-radius">
        <Plan @close="close" :data="data" :dialog="dialog" @success="$emit('success')"></Plan>
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
        },
        data:{
            required: true,
            type: Object,
        }
    },
    methods: {
        close(){
            this.$emit('close')
        }
    }
}
</script>