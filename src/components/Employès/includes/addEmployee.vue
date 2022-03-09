<template>
    <v-dialog
        v-model="dialog"
        width="900"
        persistent
    >
        <v-card>
            <v-form ref="form">
                <v-container class="employee_form">
                    <v-row class="row">
                        <div class="dialog-header mb-2 d-flex flex-row">
                            <div class="d-flex employee_create-icon">
                                <v-icon size="35px" color="primary">
                                    mdi-account-plus-outline
                                </v-icon>
                            </div>
                            <div>
                                <div class="dialog-title">
                                    <h3>Créer un nouvel employé</h3>
                                    <p class="ma-0">L'action ne peut pas être annulé</p>
                                </div>
                            </div>
                        </div>
                        <div class="createEmployee">
                            <v-col cols="12">
                                <v-text-field
                                    :rules="employee.first_names"
                                    solo
                                    dense
                                    v-model="employee.first_name"
                                    label="Prenom"
                                    placeholder="Prenom"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :rules="employee.last_names"
                                    solo
                                    dense
                                    v-model="employee.last_name"
                                    label="Nom"
                                    placeholder="Nom"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :rules="employee.emails"
                                    solo
                                    dense
                                    v-model="employee.email"
                                    label="Email*"
                                    placeholder="Email*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :rules="employee.passwords"
                                    solo
                                    dense
                                    v-model="employee.password"
                                    label="Mot de passe"
                                    placeholder="Mot de passe"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :rules="employee.addresse"
                                    solo
                                    dense
                                    v-model="employee.address"
                                    label="Adresse"
                                    placeholder="Adresse"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :rules="employee.citys"
                                    solo
                                    dense
                                    v-model="employee.city"
                                    label="Ville"
                                    placeholder="Ville"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :rules="employee.code_postal"
                                    solo
                                    dense
                                    v-model="employee.zip_code"
                                    label="Code Postal"
                                    placeholder="Code Postal"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :rules="employee.number"
                                    solo
                                    dense
                                    v-model="employee.mobile"
                                    label="Numéro de portable"
                                    placeholder="Numéro de portable"
                                    required
                                >
                                    <template #prepend-inner>
                                        <div class="employee_create-mobile-icon">
                                            <img src="@/assets/images/Flag_of_France.png" alt="">
                                        </div>
                                        <span class="employee_create-mobile-text">
                                            +33
                                        </span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-menu
                                    ref="start_date"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="auto"
                                    min-width="0"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            solo 
                                            text 
                                            v-on="on" 
                                            v-bind="attrs" 
                                            width="100%" 
                                            class="calendar_btn"
                                        >
                                            <span class="text employee_create-text-birthday">
                                                {{employee.birth_date ? employee.birth_date : 'Choisir la date de naissance'}}
                                            </span>
                                            <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-date-picker
                                        v-model="employee.birth_date"
                                        no-title
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                        >
                                            Annuler
                                        </v-btn>
                                        <v-btn
                                            @click="$refs.start_date.save(employee.birth_date)"
                                            text
                                            color="primary"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12">
                                <div>
                                    <h5 class="pt-5">
                                        Role
                                    </h5>
                                </div>
                                <v-select
                                     
                                    solo
                                    v-model="employee.role_id"
                                    :items="role"
                                    item-value="id"
                                    item-text="name"
                                    label="Item"
                                    placeholder="Item"
                                    required
                                ></v-select>
                            </v-col>
                        </div>
                        <v-btn
                            large
                            @click="close"
                            depressed 
                            height="50px"
                            color="rgb(238 238 238)"
                            width="46%" 
                            class="ma-2 btn-dialog"
                        >
                            Annuler
                        </v-btn>
                        <v-btn
                            large
                            height="50px"
                            width="46%"
                            depressed
                            dark
                            color="#005075!important"
                            class="btn-dialog ma-2"
                            @click="addEmployee"
                        >
                            Valider
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
import { addEmployee } from "@/repositories/employee.api";
export default {
    props:['dialog'],
    data(){
        return{
        calendar: "",
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
                birth_date: ''  ,
                role_id: {
                    id:3,
                    name:'3 - Admin'
                },
            },
             role: [
                {
                    id:1,
                    name:'1 - Admin'
                },
                {
                    id:2,
                    name:'2 - Accountant'
                },
                {
                    id:3,
                    name:'3 - Employee'
                }
              
            ],
        }
    },

    methods: {
       addEmployee(){
           this.$refs.form.validate()
           if(this.$refs.form.validate() == true && this.employee.birth_date != ''){
                addEmployee(this.employee).then(res=>{
                    console.log(res)
                    this.$emit('close')
                })
            }
            else{
                this.$toast.error('Do not leave Empty Field')
            }
        },
        close(){
            this.$emit('close')
        }
    }
}
</script>
