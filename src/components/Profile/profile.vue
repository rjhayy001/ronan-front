<template>
    <v-dialog fullscreen v-model="dialog" class="dialogProfile" >
        <header-dialog @close="close"/>
        <content-profile style="z-index:10"/>
    </v-dialog>
</template>

<script>
import headerDialog from './include/parameter/include/headerParameter.vue';
import contentProfile from './include/contentProfile.vue';
export default {
    components:{
        headerDialog,
        contentProfile
    },
    data(){
        return  {

        }
    },
    props: {
        dialog: { 
            type: Boolean, 
            default: false 
        }
    },
    methods:{
        close(){
            this.$emit('close')
        }
    } 
}
</script>

<style scoped>
v-dialog{
    width: 100%;
    height: 100vh!important;
}
</style>