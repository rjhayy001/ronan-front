<template>
    <div>
        <v-subheader class="subheader">
            <p class="sub_title">Centres</p>
            <v-spacer></v-spacer>
            <v-btn depressed>
                <v-icon
                    color="black"
                >
                    mdi-magnify
                </v-icon>          
            </v-btn>
            <v-btn depressed @click="table()">
                <v-icon
                
                    color="black"
                >
                    {{`mdi-${iconText}`}}
                </v-icon>          
            </v-btn>
            <v-btn depressed  @click="disapproved()">
                <v-icon
                    color="black"
                >
                    mdi-plus
                </v-icon>          
            </v-btn>
        </v-subheader>
        <v-data-table
            v-if="view_list"
            class="elevation-1"
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
        ></v-data-table>

        <ViewTable
            v-if="!view_list"
        />
        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-form>
                    <v-container>
                        <v-row class="row">
                            <div class="dialog-header">
                                <div class="dialog-title">
                                    <h3>Créer une centre</h3>
                                    <p>L'action ne peut pas être annulée</p>
                                </div>
                                <div class="underline-bottom">
                                    <h3>Obligatoire</h3>
                                </div>
                            </div>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    label="Nom"
                                    placeholder="Nom"
                                    outlined
                                    dense
                                    prepend-inner-icon="mdi-rename-box"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    label="Rue"
                                    placeholder="Rue"
                                    outlined
                                    dense
                                    prepend-inner-icon="mdi-google-street-view"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    label="Ville"
                                    placeholder="Ville"
                                    outlined
                                    dense
                                    prepend-inner-icon="mdi-city"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    label="Code postal"
                                    placeholder="Code postal"
                                    outlined
                                    dense
                                    prepend-inner-icon="mdi-email-outline"
                                ></v-text-field>
                            </v-col>
                            <div class="dialog-title">
                                <div class="underline-bottom">
                                    <h3>Optionnel</h3>
                                </div>
                            </div>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    label="Numéro de contact"
                                    placeholder="Numéro de contact"
                                    outlined
                                    dense
                                    prepend-inner-icon="mdi-phone-outline"
                                ></v-text-field>
                            </v-col>
                            <div class="dialog-title">
                                <div class="underline-top">
                                    <h3>Choisissez la région</h3>
                                </div>
                            </div>
                            <v-col
                                cols="12"
                            >
                                <v-select
                                :items="items"
                                value="Secteur Nord"
                                filled
                                dense
                                ></v-select>
                            </v-col>
                            <v-btn 
                                @click="annuler()" 
                                height="50px" 
                                depressed 
                                color="rgb(238 238 238)"
                                width="46%" 
                                class="mx-2 btn-dialog"
                            >
                                ANNULER
                            </v-btn>
                            <v-btn
                                width="46%"
                                depressed
                                white
                                height="50px"
                                color="#005075!important"
                                class="btn-dialog"
                            >
                                VALIDER
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import ViewTable from './includes/viewTable.vue'
export default {
    components: {
        ViewTable,
    },
    data(){
        return{
            headers: [
                { text: 'Nom', value: 'nom', width: '20%'},
                { text: 'Addresse', value: 'addresse', width: '40%'},
                { text: 'Numèro', value: 'numèro', width: '20%'},
                { text: 'Email', value: 'email', width: '30%'},
            ],
            desserts: [
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
                {
                    nom: "ACK",
                    addresse: "Za de Keriven, 29600, ST MARTIN DES CHAMPS",
                    numèro: "0298881943",
                    email: "NON DEFINI",
                },
            ],
            dialog:false,
            view_list: 1,
            iconText: 'format-list-bulleted',
            items: ['Secteur Nord','Secteur Sud', 'Autonome', 'Normandie'],
        }
    },
    methods:{
        disapproved(){
            this.dialog = true
        },
        annuler() {
            this.dialog= false;
        },
        table(){
            if(this.iconText=="format-list-bulleted"){
                this.iconText= "view-compact";
                this.view_list=0;
            }
            else{
                    this.iconText= "format-list-bulleted";
                    this.view_list=1;
            }
        }
    },
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