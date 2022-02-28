<template>
    <div class="component_container">
        <div class="title_head">
            <h2 class="text_fw pad_header">
                Régions
            </h2>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-4" 
                @click="addRegions=true" 
                solo 
                text 
                icon
            >
                <v-icon size="30px">
                    mdi-plus
                </v-icon>
            </v-btn>
        </div>
        <div 
            v-for="(region, index) in regions" 
            :key="index"
        >
            <div class="parameter_data">
                <v-icon class="icon">
                    mdi-bank
                </v-icon>
                <div>
                    <h4>
                        {{region.name}}
                    </h4>
                </div>
                <v-spacer></v-spacer>
                <v-btn 
                    class="parameter_btn" 
                    @click="removeRegions(region)" 
                    solo 
                    text 
                    icon
                >
                    <v-icon color="red" class=" add_padding">
                        mdi-delete-outline
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <v-dialog
            v-model="addRegions"
            width="800"
            class="menu_"
            @click:outside="addRegions=false || clear()"
        >
            <v-card>
                <v-form  
                    ref="form"
                    lazy-validation
                >
                    <v-container class="parameter_dialog_container">
                        <v-row class="dialog_content">
                            <div class="head_content">
                                <div>
                                    <v-icon class="icon" color="#005075">
                                        mdi-plus
                                    </v-icon>
                                </div>
                                <div class="ml-3 title_head">
                                    <h3 class="text">
                                        <p>
                                            AJOUTER UN NOUVEAU RÉGION
                                        </p>
                                    </h3>
                                </div>
                            </div>
                            <v-col
                                cols="12"
                                class="mb-2"
                            >
                                <v-text-field
                                    label="Nom"
                                    :rules="nameRules"
                                    v-model="payload.name"
                                    placeholder="Nouveau région nom"
                                    prepend-inner-icon="mdi-note-edit-outline"
                                    dense
                                    clearable
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col class="action_btn">
                                <v-btn 
                                @click.prevent="addRegions=false"
                                    @click="clear()"
                                    height="50px" 
                                    color="rgb(238 238 238)"
                                    width="47%" 
                                    class="ma-2 btn-dialog"
                                >
                                    ANNULER
                                </v-btn>
                                <v-btn
                                    @click="saveRegion" 
                                    width="47%"
                                    dark
                                    height="50px"
                                    color="#005075!important"
                                    class="btn-dialog ma-2"
                                >
                                    VALIDER
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { GetRawRegions, CreateRegions, RemoveRegions } from "@/repositories/region.api"
export default {
    data(){
        return{
            regions:[],
            addRegions: false,
            payload: {
                name:''
            },
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
            this.$refs.form.validate()
            if(this.$refs.form.validate() == true) {
                CreateRegions(this.payload).then(({data})=> {
                    this.$arrayupdater(data, this.regions)
                    this.addRegions = false
                    this.$toast.success('Successfully added')
                    this.clear()
                })
            }else{
                this.$toast.error('Do not leave empty field')
            }
        },
        clear() {
            this.$refs.form.resetValidation();
            this.payload.name=""
        },
        removeRegions(region) {
            RemoveRegions(region.id).then(({data}) =>{
                console.log(data)
                this.$arraysplicer(region,this.regions)
                this.$toast.success("Successfully removed!");
            })
        }
    }
}
</script>