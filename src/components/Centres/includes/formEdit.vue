<template>
    <div >
        <v-card>
            <v-form ref="form">
                <v-container>
                    <v-row class="row">
                        <div class="dialog-header mb-2" style="display:flex; flex-direction:row">
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
                                :rules="centre.email"
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
                            <v-text-field
                                :rules="centre.number"
                                v-model="data.number"
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
                            <v-text-field
                                :rules="centre.address"
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
                            <v-text-field
                                :rules="centre.city"
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
                            <v-text-field
                                :rules="centre.code_postal"
                                v-model="data.code_postal"
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
                            @click="submit"
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

export default {
    data(){
        return {
            data: {
                name: '',
                email: '',
                number: '',
                address: '',
                city: '',
                code_postal: '',
            }
        }
    },
    created(){
        this.initialize()
    },
    methods:{
        close(){
            this.$refs.form.resetValidation();
            this.$emit('close')
        },

        submit() {
            this.$refs.form.validate()
            if(this.$refs.form.validate() == true) {
                if(this.data.name != '' && this.data.email != '' && 
                this.data.number !='' && this.data.address !='' && this.data.city !='' 
                && this.data.code_postal !='') {
                    this.reset()
                    alert('success')
                }else{
                    this.$toast.error('Do not leave Empty Field')
                }
            }else{
                this.$toast.error('Do not leave Empty Field and field-up correctly ')
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
        // initialize(){
        //     GetRawRegions().then(({data})=> {
        //         this.regions = data
        //         this.center.region_id = data[0].id
        //     })
        // },

    }
}
</script>