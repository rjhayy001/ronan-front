<template>
    <v-container style="margin: 70px auto auto auto; padding:0; max-width:99%; justify-content:center">
        <div style="width: 100%; margin:auto; text-align: center;">
            <div>
                <v-avatar max-width="none" height="200px" width="200px" @click="handleFileImport" class="pointer">
                    <img v-if="!editing_profile" :src="user ? user.image : '@/assets/images/logo-securauto-150.png'" alt="">
                    <img v-else :src="new_image" alt="">
                </v-avatar>
                <div v-if="editing_profile" class="mt-5">
                    <v-btn dark color="primary" @click="changeProfile" class="mr-2">save</v-btn>
                    <v-btn dark color="error" @click="cancel">cancel</v-btn>
                </div>
                <input 
                    ref="uploader" 
                    class="d-none" 
                    type="file" 
                    accept="image/png, image/gif, image/jpeg"
                    @change="onFileChanged"
                >
            </div>
            <div style="padding-top: 60px; line-height: 1.2">
                <div>
                    <h1 style="font-size: 35px; font-weight: 400; color: #424242">
                        {{user.full_name}}
                    </h1>
                </div>
                <div >
                    <h3 style="font-weight:400; color:#787878">
                        {{user.email}}
                    </h3>
                </div>
            </div>
            <div> 
                <v-btn to="parameter/general" :ripple="false" id="no-background-hover" text solo type="button" style="color: #005075; box-shadow: none;">
                    <h4 style="font-weight: 400; text-transform:initial">Editer</h4>
                </v-btn>
            </div>
        </div>
        <div style="width: 100%; margin:auto; text-align: center;">
            <div style=" margin:auto; text-align: center; border-top: solid 2px gray; border-bottom: solid 2px gray; width: 99%;">
                <div style="display:flex; margin:auto; justify-content: space-between; width: 60%">
                    <div style="margin: 10px 0">
                        <h3 style="font-weight: 500">
                            JOURS DE TRAVAIL
                        </h3>
                        <h1 style="color:#005075">
                            {{user.work_days}}
                        </h1>
                    </div>
                    <div style="margin: 10px 0">
                        <h3 style="font-weight: 500">
                            CONSUMABLE CONGÉS
                        </h3>
                        <h1 style="color:#005075">
                            {{user.consumable_holidays ? user.consumable_holidays : 0}}
                        </h1>
                    </div>
                    <div style="margin: 10px 0">
                        <h3 style="font-weight: 500">
                            SOLDE RTT
                        </h3>
                        <h1 style="color:#005075">
                            {{user.rtt_remaining_balance}}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <v-tabs
                v-model="tab"
                style="background-color:blue; width: 99%!important;
    margin: auto;"
                dark
                icons-and-text
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#about" style="width: 25em; text-transform: none;">
                    Á propos de
                </v-tab>

                <v-tab href="#rtt" style="width: 25em; text-transform: none;">
                    Tous les RTT
                </v-tab>

                <v-tab href="#conges" style="width: 25em; text-transform: none;">
                    Tous les Congés
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" style="height: 100%!important">
                <v-tab-item :key="1" value="about">
                    <div style="margin: 20px 0">
                        <table-about></table-about>
                    </div>
                </v-tab-item>
                <v-tab-item :key="2" value="rtt">
                    <div>
                        <table-rtt></table-rtt>
                    </div>
                </v-tab-item>
                <v-tab-item :key="3" value="conges">
                    <div>
                        <table-leave></table-leave>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </v-container>
</template>
<script>
import tableAbout from './about.vue';
import tableRtt from './all_RTT.vue';
import tableLeave from './all_Leave.vue';
import { changeProfile } from '@/repositories/employee.api'
export default {
    components: {
        tableAbout,
        tableRtt,
        tableLeave
    },
    data(){
        return{
            dialog:true,
            tab: null,
            editing_profile:false,
            new_image:''
        }
    },
    computed: {
        user() {
            return this.$store.getters['user']
        },
    },
    created(){
        console.log(this.user, 'user')
    },
    methods: {
        handleFileImport(){
            this.$refs.uploader.click();
        },
        onFileChanged(e) {
            let file = e.target.files[0];

            // Do whatever you need with the file, liek reading it with FileReader
            this.createBase64Image(file);
        },
        cancel(){
            this.new_image = ''
            this.editing_profile = false
        },
        createBase64Image(fileObject) {
            const reader = new FileReader();

            let rawImg;
            reader.onloadend = () => {
                rawImg = reader.result;
                this.new_image = rawImg;
            }
            reader.readAsDataURL(fileObject);
            this.editing_profile = true
        },
        changeProfile(){
            let payload = {
                image: this.new_image
            }
            changeProfile(payload).then(({data}) => {
                this.$store.state.user.image = data.data
                this.editing_profile = false
            })
        }
    }
}
</script>

<style scoped>
#no-background-hover::before {
   background-color: transparent !important; 
}
.v-text-field{
    width: 500px !important;
}
</style>