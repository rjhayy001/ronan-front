<template>
    <div class="dialogProfile" >
        <header-parameter @close="close"/>
        <content-parameter style="z-index:10"/>
    </div>
</template>

<script>
import headerParameter from './include/parameter/include/headerParameter.vue';
import contentParameter from './include/parameter/contentParameter.vue';
export default {
    components:{
        headerParameter,
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