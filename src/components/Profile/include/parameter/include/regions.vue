<template>
    <div class="component_container">
        <div class="title_head" style="border-bottom:none!important">
            <h2 class="text_fw pad_header">
                Régions
            </h2>
            <v-spacer></v-spacer>
            <v-btn @click="addRegions=true" solo text icon style="margin:0 5px">
                <v-icon size="30px">
                    mdi-plus
                </v-icon>
            </v-btn>
        </div>
        <div v-for="(region, index) in regions" :key="index">
            <div style="display: flex; min-height: 50px; align-items: center; width: 100%">
                <v-icon style="padding: 0 30px">
                    mdi-bank
                </v-icon>
                <div class="">
                    <h4>
                        {{region.name}}
                    </h4>
                </div>
                <v-spacer></v-spacer>
                <v-btn solo text icon style="margin:0 5px">
                    <v-icon color="red" style="padding:0 10px">
                        mdi-delete
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <v-dialog v-model="addRegions" width="650">
            <div style="display:flex; padding: 30px 0" >
                <v-icon style="padding: 0 30px">
                    mdi-plus
                </v-icon>
                <h4>
                    AJOUTER UN NOUVEAU RÉGION
                </h4>
            </div>
            <div style="padding: 20px">
                <v-text-field
                    label="Nom"
                    v-model="payload.name"
                    placeholder="Nouveau région nom"
                    prepend-inner-icon="mdi-note-edit-outline"
                    clearable
                ></v-text-field>
            </div>
           <div style="width:95%; margin: 20px auto!important;">
               <div style="display:flex; justify-content: space-between">
                    <v-btn width="48%"
                    >
                        <h5 class="txt">
                            Annuler
                        </h5>
                    </v-btn>
                    <v-btn width="48%"
                        class="btn"
                        @click="saveRegion" 
                        style="background-color:#005075!important; color:white!important;"
                    >
                        <h5 class="txt">
                            VALIDER
                        </h5>
                    </v-btn>
               </div>
            </div>
        </v-dialog>
    </div>
</template>
<script>
import { GetRawRegions, CreateRegions } from "@/repositories/region.api"
export default {
    data(){
        return{
            regions:[],
            addRegions: false,
            payload: {
                name:''
            }
        }
    },
    created(){
        this.initialize()
    },
    methods: {
        initialize(){
            GetRawRegions().then(({data})=> {
                this.regions = data
                console.log(this.regions)
            })
        },
        saveRegion() {

            CreateRegions(this.payload).then(({data})=> {
                console.log(data)
                this.$arrayupdater(data, this.regions)
            })
        }
    }
}
</script>