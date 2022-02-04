<template>
    <v-dialog v-model="dialog" width="700" @click:outside="close" class="card-radius">
        <Plan @close="close" :data="data" :dialog="dialog"></Plan>
    </v-dialog>
</template>
<script>
import Plan from './includes/editPlan.vue'
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