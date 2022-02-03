<template>
    <v-container style="margin:0; padding:0; max-width:100%; justify-content:center">
        <div style="width: 100%; margin:auto; text-align: left; display:flex;">
            <div style="width: 20%; margin-right:20px">
                <div style="background-color:#eeeeee;height: 94.5vh">
                    <div>
                        <v-btn :ripple="false" depressed flat solo width="100%" style="border-radius:0!important; justify-content:normal!important;padding: 30px 20px; background-color:#eeeeee!important; color:#155d7f">
                            <v-icon>
                                mdi-cog
                            </v-icon>
                            <h3 style="text-transform:none; margin-left: 10px; font-weight: 400">
                                Général
                            </h3>
                        </v-btn>
                    </div>
                    <div>
                        <v-btn :ripple="false" depressed flat solo width="100%" style="border-radius:0!important; justify-content:normal!important;padding: 30px 20px; background-color:#eeeeee!important; color:#155d7f">
                            <v-icon>
                                mdi-shield-half-full
                            </v-icon>
                            <h3 style="text-transform:none; margin-left: 10px; font-weight: 400">
                                Sécurité et connéxion
                            </h3>
                        </v-btn>
                    </div>
                    <div style="width:100%; border-bottom: 2px solid #b8b8b8;background-color:black; margin: 5px 0"></div>
                    <div>
                        <v-btn :ripple="false" depressed flat solo width="100%" style="border-radius:0!important; justify-content:normal!important;padding: 30px 20px; background-color:#eeeeee!important; color:#155d7f">
                            <v-icon>
                                mdi-briefcase
                            </v-icon>
                            <h3 style="text-transform:none; margin-left: 10px; font-weight: 400">
                                Gestion des employés
                            </h3>
                        </v-btn>
                    </div>
                    <div>
                        <v-btn :ripple="false" depressed flat solo width="100%" style="border-radius:0!important; justify-content:normal!important;padding: 30px 20px; background-color:#eeeeee!important; color:#155d7f">
                            <v-icon>
                                mdi-message-alert-outline 
                            </v-icon>
                            <h3 style="text-transform:none; margin-left: 10px; font-weight: 400">
                                Annonce
                            </h3>
                        </v-btn>
                    </div>
                    <div>
                        <v-btn :ripple="false" depressed flat solo width="100%" style="border-radius:0!important; justify-content:normal!important;padding: 30px 20px; background-color:#eeeeee!important; color:#155d7f">
                            <v-icon>
                                mdi-calendar-blank
                            </v-icon>
                            <h3 style="text-transform:none; margin-left: 10px; font-weight: 400">
                                Jours fériés
                            </h3>
                        </v-btn>
                    </div>
                    <div>
                        <v-btn :ripple="false" depressed flat solo width="100%" style="border-radius:0!important; justify-content:normal!important;padding: 30px 20px; background-color:#eeeeee!important; color:#155d7f">
                            <v-icon>
                                mdi-file-marker
                            </v-icon>
                            <h3 style="text-transform:none; margin-left: 10px; font-weight: 400">
                                Régions
                            </h3>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>
<script>
// import tableAbout from './about.vue';
// import tableRtt from './all_RTT.vue';
// import tableLeave from './all_Leave.vue';
export default {
    components: {
        // tableAbout,
        // tableRtt,
        // tableLeave
    },
    data(){
        return{
            general:true,
            security_connection:false,
            employee_management :false,
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.v-btn__content {
    justify-content: normal!important;
}
</style>