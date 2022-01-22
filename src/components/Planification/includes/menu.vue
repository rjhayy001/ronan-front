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
        <pending-application :dialog="pending_dialog"/>
    </div>
</template>

<script>
import pendingApplication from './dialogs/pendingApplication.vue';
export default {
    components:{
        pendingApplication
    },
      data() {
        return {
            pending_dialog:false,
            dialog: false,
            button: false,
            view_list: false,
      };
    },
    methods: {
        click(){
            if(this.button==false){
                this.button=true;
            }else{
                this.button=false
            }
        },
        pendingApplication(){
            this.pending_dialog=true
      },
    },
  };
   
</script>