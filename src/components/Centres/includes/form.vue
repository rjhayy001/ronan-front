<template>
    <div>
        <v-card>
            <v-form>
                <v-container>
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
                                dense
                                v-model="center.name"
                                solo
                                prepend-inner-icon="mdi-rename-box"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Rue"
                                placeholder="Rue"
                                dense
                                v-model="center.address"
                                solo
                                prepend-inner-icon="mdi-google-street-view"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Ville"
                                placeholder="Ville"
                                v-model="center.city"
                                dense
                                solo
                                prepend-inner-icon="mdi-city"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                label="Code postal"
                                v-model="center.zip_code"
                                placeholder="Code postal"
                                solo
                                dense
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
                                v-model="center.mobile"
                                label="Numéro de contact"
                                placeholder="Numéro de contact"
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
                mobile:''
            }
        }
    },
    created(){
        this.initialize()
    },
    methods:{
       
        initialize(){
            GetRawRegions().then(({data})=> {
                this.regions = data
                this.center.region_id = data[0].id
            })
        },
        create(){
            CreateCenter(this.center).then(() => {
                this.$toast.success('successfully created center')
                this.$emit('success')
                this.$emit('close')
            })
        }
    }
}
</script>
<style scoped>
.sub_title {
    margin: auto 0; 
    font-size: 20px; 
    font-weight: bold;
}

.row {
    padding: 15px;
}

.dialog-header {
    display:flex;
    flex-direction: column;
    padding:0 12px; 
    width:100%;
}

.dialog-title {
     padding:0 12px;
     width: 100%;
}

.underline-bottom {
    border-bottom: solid 1px gray; 
    margin-bottom: 5px;
}

.underline-top {
    border-top: solid 1px gray; 
    margin-bottom: 5px;
}

.btn-dialog {
    margin-left: 12px!important;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.theme--light.v-btn.v-btn--has-bg {
    background-color: white!important;
}

.col-12 {
    padding: 0 12px;
}

.subheader{
    margin-top: 16px;
}

table>thead.v-data-table-header>tr>th,
thead .v-data-table__checkbox>.v-icon {
    background-color: #FF5722 !important;
    color: #fff !important;
    text-transform: capitalize !important;
}
</style>