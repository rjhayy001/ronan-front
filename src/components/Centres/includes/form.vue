<template>
    <div >
        <v-card>
            <v-form ref="form">
                <v-container class="center_form">
                    <v-row class="row">
                        <div class="dialog-header mb-2">
                            <div class="dialog-title">
                                <h3>Créer une centre</h3>
                                <p>L'action ne peut pas être annulée</p>
                            </div>
                            <div class="underline-bottom mb-2">
                                <h3>Obligatoire</h3>
                            </div>
                        </div>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                placeholder="Nom"
                                label="Nom"
                                :rules="centre.name"
                                dense
                                v-model="center.name"
                                prepend-inner-icon="mdi-rename-box"
                                solo
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Rue"
                                placeholder="Rue"
                                :rules="centre.address"
                                dense
                                v-model="center.address"
                                prepend-inner-icon="mdi-google-street-view"
                                solo
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Ville"
                                placeholder="Ville"
                                :rules="centre.citys"
                                v-model="center.city"
                                dense
                                prepend-inner-icon="mdi-city"
                                solo
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Code postal"
                                placeholder="Code postal"
                                :rules="centre.code_postal"
                                v-model="center.zip_code"
                                dense
                                solo
                                prepend-inner-icon="mdi-email-outline"
                            ></v-text-field>
                        </v-col>
                        <div class="dialog-title my-2">
                            <div class="underline-bottom mb-2">
                                <h3>Optionnel</h3>
                            </div>
                        </div>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Numéro de contact"
                                placeholder="Numéro de contact"
                                :rules="centre.number"
                                v-model="center.mobile"
                                solo
                                dense
                                prepend-inner-icon="mdi-phone-outline"
                            ></v-text-field>
                        </v-col>
                        <div class="dialog-title my-2">
                            <div class="underline-bottom mt-2">
                                <h3>Choisissez la région</h3>
                            </div>
                        </div>
                        <v-col
                            cols="12"
                        >
                            <v-select
                                :items="regions"
                                value="Secteur Nord"
                                solo
                                item-text="name"
                                item-value="id"
                                v-model="center.region_id"
                                dense
                            ></v-select>
                        </v-col>
                        <v-btn 
                            @click="close" 
                            height="50px" 
                            depressed 
                            color="rgb(238 238 238)"
                            width="46%" 
                            class="ma-2 btn-dialog"
                        >
                            ANNULER
                        </v-btn>
                        <v-btn
                            width="46%"
                            depressed
                            dark
                            height="50px"
                            color="#005075!important"
                            @click="create"
                            class="btn-dialog ma-2"
                        >
                            VALIDER
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </div>
</template>
<script>
import { GetRawRegions } from "@/repositories/region.api"
import { CreateCenter } from "@/repositories/center.api"
export default {
    data(){
        return {
            regions: [],
            center:{
                name:'',
                region_id: '',
                city:'',
                zip_code: '',
                address:'',
                mobile:'',
                street:''
            }
        }
    },
    created(){
        this.initialize()
    },
    methods:{
        close(){
            this.$refs.form.resetValidation();
            this.center.name=''
            this.center.address=''
            this.center.city=''
            this.center.zip_code=''
            this.center.mobile=''
            this.center.street=''
            this.center.region_id=this.regions[0].id
            this.$emit('close')
        },
        initialize(){
            GetRawRegions().then(({data})=> {
                this.regions = data
                this.center.region_id = data[0].id
            })
        },
        create(){
            this.$refs.form.validate()
            if(this.$refs.form.validate() == true) {
                CreateCenter(this.center).then(() => {
                    this.$toast.success('Centre créé avec succès')
                    this.$emit('success')
                    this.$emit('close')
                })
            }
            // }else{
            //     this.$toast.error('Do not leave empty field')
            // }
        }
    }
}
</script>