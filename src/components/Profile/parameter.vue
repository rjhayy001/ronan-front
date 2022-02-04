<template>
    <div class="dialogProfile" >
        <header-dialog @close="close"/>
        <content-parameter style="z-index:10"/>
    </div>
</template>

<script>
import headerDialog from './include/headerdialog.vue';
import contentParameter from './include/contentParameter.vue';
export default {
    components:{
        headerDialog,
        contentParameter
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