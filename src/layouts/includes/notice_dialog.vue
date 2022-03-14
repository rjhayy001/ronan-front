<template>
    <v-dialog v-model="dialog" width="700" @click:outside="$emit('close')">
        <v-card class="pa-5">
            <div style="display:flex">
                <div>
                    <v-icon style="font-size: 50px; margin:auto;" :color="$notifColor(data).color">
                        mdi-alert-circle
                    </v-icon>
                </div>
                <div class="ml-3">
                    <h3
                        style="letter-spacing:2px;" class="text-capitalize">{{data.title}}</h3>
                    <p style="font-weight:600; font-size: 12px; color:#7e7e7e">{{data.message}}</p>
                </div>
            </div>
            <div class="text-capitalize ml-3 mb-5 mt-5">
                {{data.data.message}}
            </div>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
    }
}
</script>