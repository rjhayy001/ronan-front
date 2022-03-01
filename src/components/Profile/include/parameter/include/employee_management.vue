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
                            <h5 style="font-weight: 400">
                                ( {{type.subtitle}} )
                            </h5>
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
                    <v-container class="dialog_gestion">
                        <div class="d-flex">
                            <div class="mr-5">
                                <v-avatar max-width="none" height="65px" width="65px">
                                    <img src="@/assets/images/verification_1.png" alt=""/>
                                </v-avatar>
                            </div>
                            <div style="line-height: 1.2; margin: auto 0;">
                                <h3 style=" font-weight: 400">
                                    Vérification de l'administrateur
                                </h3>
                                <h3 style=" font-weight: 400; color: gray; font-size: 12px">
                                    Pour authentifier votre  identité, veuillez saisir la clé administrateur.
                                </h3>
                            </div>
                        </div>
                        <div>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                style="width: 100%"
                                    outlined
                                    label="Clé"
                                    placeholder="Clé"
                                    prepend-inner-icon="mdi-key-outline"
                                    v-model="password"
                                ></v-text-field>
                            </v-col>
                        </div>
                    </v-container>
                </v-form>
                <v-card-actions>
                    <v-btn @click="verification=false" large style="width: 48%">
                        ANNULER
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn large @click="save" style="width: 48%;background-color: #005075!important; color: white">
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
            password:'',
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
                { id:1, name: 'Tout' },
                { id:2, name: 'Tout les Séniors' },
                { id:3, name: 'Tout les Non-séniors' },
            ],
            types: [
                {
                    id: 1,
                    name: "Standard",
                    value: 2.08,
                    subtitle: "Ajouter 2,08 jours/employé"
                },
                {
                    id: 2,
                    name: "Spécial",
                    value: 2.5,
                    subtitle: "Ajouter 2,5 jours/employé"
                },
                {
                    id: 3,
                    name: "Valeur spécifique",
                    value: null,
                    subtitle: "Spécifiez le nombre de jours à ajouter"
                },
            ]
            
        }
    },
    methods: {
        validate(){
            alert('sad')
        },
        save(){
            if(this.password != localStorage.getItem('password')){
                this.$toast.error('incorrect password')
            }else{
                if(this.payload.to_add == null){
                    this.payload.to_add = JSON.parse(JSON.stringify(this.specific_value))
                }
                AddEmployeeConsumableHolidays(this.payload).then(({data}) =>{
                    console.log(data, 'sad, verification')
                    this.$toast.success(data.message)
                })
                this.verification = false
            }

        }
    }
}
</script>
<style scoped>
.v-text-field{
      width: 400px;
}
</style>