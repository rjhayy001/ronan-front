<template>
    <div style="position: fixed; z-index: 7; bottom: 10px; right: 10px;">
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
            <v-btn class="mx-2" 
                fab
                dark
                small
                color="#005075"
                style="z-index: 7; bottom: 50px; right: 100px;"
                @click.prevent="pendingApplication()"
            >
                <v-icon>
                    mdi-file-table-outline
                </v-icon>
            </v-btn>
            <v-btn class="mx-2" 
                fab
                dark
                small
                color="#005075"
                style="z-index: 7; bottom: 170px; right: 70px;"
                @click.prevent="requestRTT()"
            >
                <v-icon>
                    mdi-umbrella
                </v-icon>
            </v-btn>
            <v-btn class="mx-2" 
                fab
                dark
                small
                color="#005075"
                style="z-index: 7; bottom: 250px; right: -5px;"
            >
                <v-icon>
                    mdi-timer-sand
                </v-icon>
            </v-btn>
        </div>
        <pending-application :dialog="pending_dialog" @close="pending_dialog=false"/>
        <request-rtt :dialog="requestRtt_dialog" @close="requestRTTclose()"/>
    </div>
</template>

<script>
import pendingApplication from './dialogs/pendingApplication.vue';
import requestRtt from './dialogs/requestRTT.vue';
export default {
    components:{
        pendingApplication,
        requestRtt,
    },
      data() {
        return {
            pending_dialog:false,
            requestRtt_dialog:false,
            dialog: false,
            button: false,
            view_list: false,
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
        requestRTT(){
            this.requestRtt_dialog=true
            this.reset()
        },
        requestRTTclose(){
            console.log("clopse")
            this.requestRtt_dialog=false
        },
    },
};
   
</script>