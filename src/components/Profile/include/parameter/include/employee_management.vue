<template>
    <div class="component_container">
        <div class="title_head">
            <h2 class="text_fw pad_header">
                Gestion des employés
            </h2>
        </div>
        <div style="width: 96%; display:flex; justify-content: center; margin: auto">
            <div  class="title_head" style="width: 100%">
                <h3 class="pl-3">
                    Congés consommables des employés
                </h3>
            </div>
        </div>
        <div style="width: 96%; justify-content: center;  margin: auto">
            <div  class="title_head" style="width: 100%; border-bottom:none">
                <h3>
                    Choose users to reset
                </h3>
            </div>
            <div  class="title_head" style="width: 100%; border-bottom:none">
                <v-select
                    class="select-data"
                    v-model="employe_management"
                    :items="selects"
                    menu-props="auto"
                    solo
                    flat
                    height="47px"
                  ></v-select>
            </div>
        </div>
        <div class="radio-btn" style="width: 96%; justify-content: center;  margin: auto">
            <v-radio-group v-model="radios">
                <v-radio value="1" color="#005075">
                    <template v-slot:label style="display:flex;">
                        <div>
                            <h3 style="font-weight: 400; color:black">
                                Standard
                            </h3>
                        </div>
                        <div>
                            <h4>
                                ( Ajourter 2,08 jours/employé )
                            </h4>
                        </div>
                    </template>
                </v-radio>
                <v-radio value="2" color="#005075">
                    <template v-slot:label style="display:flex;">
                        <div>
                            <h3 style="font-weight: 400; color:black">
                                Spécial
                            </h3>
                        </div>
                        <div>
                            <h4>
                                ( Ajourter 2,5 jours/employé )
                            </h4>
                        </div>
                    </template>
                </v-radio>
                <v-radio value="3" color="#005075">
                    <template v-slot:label style="display:flex;">
                        <div>
                            <h3 style="font-weight: 400; color:black">
                                Valeur spécifique
                            </h3>
                        </div>
                        <div>
                            <h4>
                                ( Spécifiez le nombre de jours à ajouter )
                            </h4>
                        </div>
                    </template>
                </v-radio>
            </v-radio-group>
        </div>
        <div class="action_btn_btn" style="width: 96%; display:flex; justify-content: flex-end;  margin: auto">
            <v-btn @click="verification=true" large style="background-color:#005075">
                valider
            </v-btn>
        </div>
        <v-dialog
            v-model="verification"
            width="800"
            @click:outside="verification=false"
        >
            <v-card class="pa-5">
                <v-form 
                    ref="form"
                    lazy-validation
                >
                    <v-container>
                        <div class="d-flex">
                            <div class="mr-5">
                                <v-avatar max-width="none" height="65px" width="65px">
                                    <img src="@/assets/images/logo-securauto-150.png" alt="">
                                </v-avatar>
                            </div>
                            <div style="line-height: 1.2; margin: auto 0;">
                                <h3 style=" font-weight: 400">
                                    Vérification de l'administrateur
                                </h3>
                                <h3 style=" font-weight: 400; color: gray">
                                    Pour authentifier votre  identifié, veuillez saisir la clé administrateur.
                                </h3>
                            </div>
                        </div>
                        <div>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                outlined
                                    label="Clé"
                                    placeholder="Clé"
                                    prepend-inner-icon="mdi-key-outline"
                                ></v-text-field>
                            </v-col>
                        </div>
                    </v-container>
                </v-form>
                <v-card-actions  class="d-flex" style="padding:10px 10px 20px 10px;margin: auto;width: 90%">
                    <v-btn @click="verification=false" large style="width: 48%">
                        ANNULER
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn large style="width: 48%;background-color: #005075!important; color: white">
                         VALIDER
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            verification: false,
            radios: '1',
            employe_management : 'Tout',
            selects : [
                'Tout', 'Tous les Séniors', 'Tous les Non-séniors'
            ]
            
        }
    },

    methods: {
    }
}
</script>