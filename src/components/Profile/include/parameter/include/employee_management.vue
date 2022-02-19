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
                    v-model="payload.type"
                    :items="users_to_reset"
                    item-text="name"
                    item-value="id"
                    menu-props="auto"
                    solo
                    height="47px"
                  ></v-select>
            </div>
        </div>
        <div class="radio-btn" style="width: 96%; justify-content: center;  margin: auto">
            <v-radio-group v-model="payload.to_add">
                <v-radio  v-for="(type, index) in types" :key="index" :value="type.value" color="#005075">
                    <template v-slot:label style="display:flex;">
                        <div>
                            <h3 style="font-weight: 400; color:black">
                                {{type.name}}
                            </h3>
                        </div>
                        <div>
                            <h4>
                                ( {{type.subtitle}} )
                            </h4>
                        </div>
                    </template>
                </v-radio>
            </v-radio-group>
            <v-text-field
                solo
                v-if="is_specific_value"
                width="100px"
                type="number"
                v-model="specific_value"
            />
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
import { AddEmployeeConsumableHolidays } from '@/repositories/employee.api'
export default {
    watch:{
        'payload.to_add': function(value) {
            this.specific_value = null
            if (value != null){
                this.is_specific_value = false
                return
            }
            this.is_specific_value = true
        }
    },
    data(){
        return{
            verification: false,
            radios: '1',
            is_specific_value:false,
            specific_value:null,
            employe_management : 'Tout',
            payload: {
                type:1,
                to_add: 2.08
            },
            users_to_reset: [
                { id:1, name: 'All' },
                { id:2, name: 'All seniors' },
                { id:3, name: 'All Non-Seniors' },
            ],
            types: [
                {
                    id: 1,
                    name: "Standard",
                    value: 2.08,
                    subtitle: "Ajouter 2,08 jours/employee"
                },
                {
                    id: 2,
                    name: "Special",
                    value: 2.5,
                    subtitle: "Ajouter 2,5 jours/employee"
                },
                {
                    id: 3,
                    name: "Valuer specific",
                    value: null,
                    subtitle: "Specifiez le nombre de jours a ajouter"
                },
            ]
            
        }
    },

    methods: {
        validate(){
            alert('sad')
        },
        save(){
            if(this.payload.to_add == null){
                this.payload.to_add = JSON.parse(JSON.stringify(this.specific_value))
            }
            AddEmployeeConsumableHolidays(this.payload).then(({data}) =>{
                console.log(data, 'sad')
            })
        }
    }
}
</script>
<style scoped>
.v-text-field{
      width: 400px;
}
</style>