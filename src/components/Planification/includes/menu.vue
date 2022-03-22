<template>
    <div>
        <template v-if="checkuser">
            <div style="position: fixed; z-index: 2; bottom: 10px; right: 10px;">
                <v-btn class="mx-2" 
                    fab
                    dark
                    color="#005075"
                    @click="view_list=!view_list"
                    @click.prevent="click()"
                >
                    <v-icon>
                        {{view_list ? 'mdi-window-close' : 'mdi-menu'}}
                    </v-icon>
                </v-btn>
                <div v-if="button" style="position: fixed;">
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" 
                                v-bind="attrs"
                                v-on="on"
                                fab
                                dark
                                small
                                color="#005075"
                                style="z-index: 7; bottom: 50px; right: 100px;"
                                @click.prevent="pendingApplication()"
                            >
                                <v-icon>
                                    mdi-file-document
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Voir mes demandes</span>
                    </v-tooltip>
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" 
                                v-bind="attrs"
                                v-on="on"
                                fab
                                dark
                                small
                                color="#005075"
                                style="z-index: 7; bottom: 170px; right: 70px;"
                                @click.prevent="requestHoliday()"
                            >
                                <v-icon>
                                    mdi-umbrella
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Ajouter de nouvelles congés</span>
                    </v-tooltip>
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" 
                                v-bind="attrs"
                                v-on="on"
                                fab
                                dark
                                small
                                @click.prevent="requestRTT()"
                                color="#005075"
                                style="z-index: 7; bottom: 250px; right: -5px;"
                            >
                                <v-icon>
                                    mdi-timer-sand
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Ajouter de nouvelles RTT</span>
                    </v-tooltip>
                </div>
            </div>
        </template>
        <template v-else>
            <div style="position: fixed; z-index: 2; bottom: 10px; right: 10px;">
                <v-btn class="mx-2" 
                    fab
                    dark
                    color="#005075"
                    @click="view_list=!view_list"
                    @click.prevent="click()"
                >
                    <v-icon>
                        {{view_list ? 'mdi-window-close' : 'mdi-menu'}}
                    </v-icon>
                </v-btn>
                <div v-if="button" style="position: fixed;">
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" 
                                v-bind="attrs"
                                v-on="on"
                                fab
                                dark
                                small
                                color="#005075"
                                style="z-index: 7; bottom: 40px; right: 90px;"
                                @click.prevent="pendingApplication()"
                            >
                                <v-icon>
                                    mdi-file-document
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Voir toutes les demandes attente</span>
                    </v-tooltip>
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" 
                                v-bind="attrs"
                                v-on="on"
                                fab
                                dark
                                small
                                color="#005075"
                                style="z-index: 7; bottom: 134px; right: 75px;"
                                @click.prevent="managerRequest()"
                            >
                                <v-icon>
                                    mdi-text-box-outline
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Voir mes demandes</span>
                    </v-tooltip>
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" 
                                v-bind="attrs"
                                v-on="on"
                                fab
                                dark
                                small
                                color="#005075"
                                style="z-index: 7; bottom: 210px; right: 35px;"
                                @click.prevent="requestHoliday()"
                            >
                                <v-icon>
                                    mdi-umbrella
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Ajouter de nouvelles congés</span>
                    </v-tooltip>
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" 
                                v-bind="attrs"
                                v-on="on"
                                fab
                                dark
                                small
                                @click.prevent="requestRTT()"
                                color="#005075"
                                style="z-index: 7; bottom: 265px; right: -15px;"
                            >
                                <v-icon>
                                    mdi-timer-sand
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Ajouter de nouvelles RTT</span>
                    </v-tooltip>
                </div>
            </div>
        </template>
        <pending-application 
            v-if="pending_dialog" 
            :dialog="pending_dialog" 
            @close="pending_dialog=false"
            @success="$emit('success')"
        />
        <add-holiday
            v-if="holiday_dialog"
            :dialog="holiday_dialog"
            @close="holiday_dialog=false"
            @success="$emit('success')"
        />
        <add-rtt
            v-if="rtt_dialog"
            :dialog="rtt_dialog"
            @close="rtt_dialog=false"
            @success="$emit('success')"
        />
        <manager-request
            v-if="manager_dialog" 
            :dialog="manager_dialog" 
            @close="manager_dialog=false"
            @success="$emit('success')"
        />
    </div>
</template>

<script>
import pendingApplication from './dialogs/pendingApplication.vue';
import managerRequest from './dialogs/managerRequest.vue';
import addHoliday from './holiday/addHoliday.vue'
import addRtt from './rtt/addRtt.vue'
export default {
    components:{
        pendingApplication,
        addHoliday,
        addRtt,
        managerRequest
    },
      data() {
        return {
            rtt_dialog: false,
            holiday_dialog: false,
            pending_dialog:false,
            manager_dialog:false,
            requestRtt_dialog:false,
            dialog: false,
            button: false,
            view_list: false,
            checkuser:false,
      };
    },
    methods: {
        reset(){
            this.button=false;
            this.view_list=false
        },
        click(){
            if(this.button==false){
                this.button=true;
            }else{
                this.button=false
            }
        },
        pendingApplication(){
            this.pending_dialog=true
            this.reset()
        },
        managerRequest(){
            this.manager_dialog=true
            this.reset()
        },
        requestHoliday(){
            this.holiday_dialog=true
            this.reset()
        },
        requestRTT(){
            this.rtt_dialog=true
            this.reset()
        },
        requestRTTclose(){
            console.log("clopse")
            this.requestRtt_dialog=false
        },
    },
};
   
</script>