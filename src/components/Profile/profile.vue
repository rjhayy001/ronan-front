<template>
    <v-dialog v-model="dialog" class="dialog" style="height: 100vh!important" persistent >
        romel
        <v-text-field>

        </v-text-field>
    </v-dialog>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: {
        'dialog':{
            default: false,
            type: Boolean
        },
    },
}
</script>

<style scoped>
v-dialog{
    width: 100%;
    height: 100vh!important;
}
</style>