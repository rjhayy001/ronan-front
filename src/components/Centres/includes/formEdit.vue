<template>
    <div>
        <v-card>
            <v-form ref="form" lazy-validation>
                <v-container class="center_form">
                    <v-row class="row">
                        <div class="dialog-header mb-2 flex-row">
                            <div>
                                <v-icon size="50px" color="primary">
                                    mdi-alert-circle
                                </v-icon>
                            </div>
                            <div>
                                <div class="dialog-title">
                                    <h3>Vous êtes en train de mettre à jour un centre</h3>
                                    <p>Cette action ne peut pas être annulé</p>
                                </div>
                            </div>
                        </div>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                :rules="centre.name"
                                v-model="data.name"
                                placeholder="Entrez nouveau nom"
                                dense
                                prepend-inner-icon="mdi-rename-box"
                                outlined
                                clearable
                                
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                v-model="data.email"
                                placeholder="Entrez nouvel email"
                                dense
                                prepend-inner-icon="mdi-email"
                                outlined
                                clearable
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                                <!-- :rules="centre.number" -->
                            <v-text-field
                                v-model="data.mobile"
                                placeholder="Entrez nouveau numéro"
                                dense
                                prepend-inner-icon="mdi-phone"
                                outlined
                                clearable
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                                <!-- :rules="centre.address" -->
                            <v-text-field
                                v-model="data.address"
                                placeholder="Entrez nouvelle addresse"
                                dense
                                prepend-inner-icon="mdi-map-marker-outline"
                                outlined
                                clearable
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                                <!-- :rules="centre.citys" -->
                            <v-text-field
                                v-model="data.city"
                                placeholder="Entrez nouvelle ville"
                                dense
                                prepend-inner-icon="mdi-city"
                                outlined
                                clearable
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                                <!-- :rules="centre.code_postal" -->
                            <v-text-field
                                v-model="data.zip_code"
                                placeholder="Entrez nouveau code postal"
                                dense
                                prepend-inner-icon="mdi-email"
                                outlined
                                clearable
                            ></v-text-field>
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
                            class="btn-dialog ma-2"
                            @click="submit"
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
import { UpdateCenter } from "@/repositories/center.api"
export default {
    props: {
        center:{
            required:true,
            type:Object,
        },
        dialog:{
            required:true,
            type:Boolean,
        },
    },
    watch:{
        'dialog': function(value) {
            if(value){
                this.data = JSON.parse(JSON.stringify(this.center))
                this.data['image'] = ''
            }
        }
    },
    data(){
        return {
            data:{
            }
        }
    },
    created(){
        this.data = JSON.parse(JSON.stringify(this.center))
        this.data['image'] = ''
    },
    methods:{
        close(){
            this.$refs.form.resetValidation();
            this.$emit('close')
        },
        submit() {
            this.$refs.form.validate()
            if(this.$refs.form.validate() == true) {
                UpdateCenter(this.data.id, this.data).then(() => {
                    this.$emit('close') 
                    this.$toast.success('successful center update')
                    this.$emit('success')
                })
            }else{
                this.$toast.error('Do not leave empty field')
            }
        },
        reset() {
            this.$refs.form.resetValidation();
            this.data.name='';
            this.data.email='';
            this.data.number='';
            this.data.address='';
            this.data.city='';
            this.data.code_postal='';
        }
    }
}
</script>