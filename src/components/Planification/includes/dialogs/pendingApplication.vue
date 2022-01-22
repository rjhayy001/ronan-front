<template>
    <v-dialog
        transition="dialog-left-transition"
        v-model="dialog"
        fullscreen
        class="menu_tab"
    >
        <v-card>
            <v-card-title>
                <v-btn
                    class="mx-2"
                    fab
                    large
                    small
                    style="box-shadow: none;background-color:transparent"
                >
                    <v-icon
                        flat
                        solo
                        style="padding:10px; color:#005075"
                        medium
                    >
                        mdi-arrow-left
                    </v-icon>
                </v-btn>    
                <h2 style="font-weight: 400; color: rgb(0, 80, 117); font-size: 25px;">
                    TOUTES LES DEMANDES EN ATTENTE
                </h2>
            </v-card-title>
            <v-tabs
                v-model="tab"
                style="background-color:blue"
                dark
                icons-and-text
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#congés" style="width: 25em; text-transform: none;">
                    Congés
                    <v-icon>mdi-umbrella</v-icon>
                </v-tab>

                <v-tab href="#rtt" style="width: 25em; text-transform: none;">
                    RTT
                    <v-icon>mdi-timer-sand</v-icon>
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item :key="1" value="congés">
                    <v-card>
                        <v-card-text>
                            <div>
                                <span>
                                    sad
                                </span>
                                <br>
                                <span>
                                    sad
                                </span>
                                <br>
                                <span>
                                    sad
                                </span>
                                <span>
                                    sad
                                </span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item :key="2" value="rtt">
                    <v-card>
                        <v-card-text>rtt</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props:{
        dialog:{
            type:Boolean,
            required:true
        }
    },
    data() {
        return {
             model: 'tab-2',
        items: [
          'Congés', 'RTT'
        ],
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      };
    },
    methods: {
        
        },
  };
   
</script>

<style scoped>
/* Helper classes */
.basil {
  background-color: red !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
