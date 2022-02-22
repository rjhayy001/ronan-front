<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="1000"
            persistent
          
            >
            <v-card
            >
            <v-card>
                <v-card-title>                   
                   <span class="mdi mdi-account-plus size" style="font-size: 30px;"> Créer un Nouvel Employé</span>

                </v-card-title>
            </v-card>
            <v-card
            max-height="500"
            class="scroll"
            >
                <v-col cols="12">
                    <v-text-field
                    outlined
                    v-model="employee.first_name"
                    label="Prenom"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    outlined
                    v-model="employee.last_name"
                    label="Nom"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    outlined
                    v-model="employee.email"
                    label="Email*"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    outlined
                    v-model="employee.password"
                    label="Mot de passe"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    outlined
                    v-model="employee.address"
                    label="Adresse"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    outlined
                    v-model="employee.city"
                    label="Ville"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    v-model="employee.zip_code"
                    label="Code Postal"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                    outlined
                    v-model="employee.mobile"
                    label="Numéro de portable"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="employee.birth_date"
                                label="Choisir la date de nuissance"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            @input="menu = false"
                            ></v-date-picker>
                        </v-menu>
                    <!-- <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="data.birth_date"
                            label="Choisir la date de naissance"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        @input="menu = false"
                        ></v-date-picker>
                    </v-menu> -->
                </v-col>
                <v-col cols="12">
                    Role
                    <v-select
                        v-model="employee.role_id"
                        :items="role"
                        item-value="id"
                        item-text="name"
                        :outlined="false"
                        label="Item"
                        required
                    ></v-select>

                </v-col>
              
            </v-card>
            <v-card>
                  <v-spacer></v-spacer>
                <v-card-actions>
                    <v-btn
                    @click="AddEmployee"
                    width="477px"
                    padding-left="2em"
                    >
                        Annuler
                    </v-btn>
                    <v-btn
                    style="background-color: #005075!important;color:white!important;"
                    width="477px"
                    @click="addEmployee"
                    >
                        Valider
                    </v-btn>
                     <!-- <v-btn
      depressed
      color="primary"
    >
      Primary
    </v-btn> -->
                </v-card-actions> 
                  <v-spacer></v-spacer>        
            </v-card>
            </v-card>

            </v-dialog>
    </div>
</template>

<script>
import { addEmployee } from "@/repositories/employee.api";
export default {
    props:['dialog'],
    data(){
        return{
        menu:false,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
           
        employee:{
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                address: '',
                city: '',
                zip_code: '',
                mobile: '',
                birth_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                role_id: '',
            },
             role: [
                {
                    id:1,
                    name:'Admin'
                },
                {
                    id:2,
                    name:'Accountant'
                },
                {
                    id:3,
                    name:'Employee'
                }
              
            ],
        }
    },

    methods: {
       addEmployee(){
            addEmployee(this.employee).then(res=>{
                console.log(res)
                this.$emit('close')
            })
        },
        AddEmployee(){
            
            this.$emit('close')
        }
    }
}
</script>
<style scoped>
.scroll {
   overflow-y: scroll
}
</style>