<template>
    <v-dialog
        transition="dialog-left-transition"
        :value="dialog"
        persistent
        fullscreen
        class="menu_tab"
    >
        <v-card>
            <v-card-title>
                <v-btn
                    class="mx-2"
                    large
                    icon
                    small
                >
                    <v-icon
                        flat
                        solo
                        style="padding:10px; color:#005075"
                        @click="close()"
                    >
                        mdi-arrow-left
                    </v-icon>
                </v-btn>    
                <h2 style="font-weight: 400; color: rgb(0, 80, 117); font-size: 25px;">
                    {{$canAccess() ? 'TOUTES LES DEMANDES EN ATTENTE' : 'MES DEMANDES'}}
                </h2>
            </v-card-title>
            <v-tabs
                v-model="tab"
                style="background-color:blue"
                dark
                icons-and-text
            >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#congés" class="pb-1" style="width: 25em; text-transform: none;">
                    Congés
                    <v-icon>mdi-umbrella</v-icon>
                </v-tab>

                <v-tab href="#rtt" class="pb-1" style="width: 25em; text-transform: none;">
                    RTT
                    <v-icon>mdi-timer-sand</v-icon>
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" style="height: 100%!important">
                <v-tab-item :key="1" value="congés">
                    <div style="margin: 20px 0">
                        <table-leave @success="$emit('success')"></table-leave>
                    </div>
                </v-tab-item>
                <v-tab-item :key="2" value="rtt">
                    <div style="margin: 20px 0">
                        <table-rtt @success="$emit('success')"></table-rtt>
                    </div>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-dialog>
</template>
<script>
import tableLeave from '../tableLeave.vue';
import tableRtt from '../tableRTT.vue';

export default {
    components:{
        tableLeave,
        tableRtt
    },
    props:{
        dialog:{
            type:Boolean,
            required:true,
        },
        hint:{
            type:String,
        },
    },
    watch:{
        'tab':function(value){
            console.log(value, 'asdasdasdsa')
        },
    },
    created(){
        if(this.hint != null) {
            this.tab = this.hint
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
        close(){
            this.$emit('close')
        }
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
