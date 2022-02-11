<template>
    <v-dialog fullscreen v-model="dialog" class="dialogProfile" >
        <div class="content" style="display:flex; padding: 10px;">
            <v-btn @click="close" large icon>
                <v-avatar class="logo_img">
                    <img src="@/assets/images/logo-securauto-150.png" alt="">
                </v-avatar>
            </v-btn>
            <div class="header_title" style="margin: auto 0;padding-left: 10px;">
                <h2 style="font-weight: 400">
                    Mes Profil
                </h2>
            </div>
        </div>
        <content-profile style="z-index:10"/>
    </v-dialog>
</template>

<script>
// import headerDialog from './include/parameter/include/headerParameter.vue';
import contentProfile from './include/contentProfile.vue';
export default {
    components:{
        // headerDialog,
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
