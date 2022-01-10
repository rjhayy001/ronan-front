<template>
    <div>
        <v-subheader style="margin-top: 20px;">
            <p>Centres</p>
            <v-spacer></v-spacer>
            <v-btn depressed>
                <v-icon
                    large
                    color="black"
                    style="font-size: 25px"
                >
                    mdi-magnify
                </v-icon>          
            </v-btn>
            <v-btn depressed>
                <v-icon
                    large
                    color="black"
                    style="font-size: 25px"
                >
                    mdi-format-list-bulleted
                </v-icon>          
            </v-btn>
            <v-btn depressed>
                <v-icon
                    large
                    color="black"
                    style="font-size: 25px"
                    @click="disapproved()"
                >
                    mdi-plus
                </v-icon>          
            </v-btn>
        </v-subheader>
        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-form>
                    <v-container>
                        <v-row style="padding: 15px">
                            <div style="display:flex;flex-direction: column;padding:0 12px">
                                <div style="padding:0 12px">
                                    <h3>Créer une centre</h3>
                                    <p>L'action ne peut pas être annulée</p>
                                </div>
                                <div>
                                    <h3>Obligatoire</h3>
                                </div>
                                </div>
                            <v-col
                                cols="12"
                                style="padding:0 12!important"
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
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dialog:false,
        }
    },
    methods:{
        disapproved(){
            this.dialog = true
        },
    },
}
</script>

<style scoped>
.theme--light.v-btn.v-btn--has-bg {
    background-color: white!important;
}
</style>