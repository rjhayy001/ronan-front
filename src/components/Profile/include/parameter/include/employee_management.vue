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
            <v-btn large style="background-color:#005075">
                valider
            </v-btn>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
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