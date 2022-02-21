<template>
  <div>
        <template v-if="!loading">
            <v-subheader class="">
                <p class="sub_title">Employees</p>
                <v-spacer></v-spacer>
                 <v-text-field
                    class="my-2 mr-2 shrink"
                    small
                    width="100px"
                    dense
                    :hide-details="true"
                    label="Search Employee"
                    solo
                  
                    append-icon="mdi-magnify"
                    single-line 
                    v-model="search"
                ></v-text-field>
                <v-btn depressed @click="view_list=!view_list">
                    <v-icon
                    
                        color="black"
                    >
                    {{view_list ? 'mdi-format-list-bulleted' : 'mdi-view-compact'}}
                    </v-icon>          
                </v-btn>
                <v-btn depressed  @click="dialog = true">
                    <v-icon
                        color="black"
                    >
                        mdi-plus
                    </v-icon>          
                </v-btn>
            </v-subheader>
            <v-data-table
                v-if="view_list"
                class="elevation-1 mx-4 index-table"
                :headers="headers"
                :items="employees"
                :items-per-page="50"
                :loading="loading"
                @click:row="view($event)"
                :search="search"
            >
                <template v-slot:item.logo="{ item }">
                    <v-avatar class="logo_img">
                        <img :src="item.image" alt="">
                    </v-avatar>
                </template>
                <template v-slot:item.is_active="{ item }">
                    <v-icon :color="item.isActive == 1 ? 'success' : 'error'">
                        mdi-moon-full
                    </v-icon>
                </template>
            </v-data-table>
            <v-dialog
            v-model="dialog"
            width="1000"
          
            >
            <v-card
            >
            <v-card>
                <v-card-title>                   
                   <span class="mdi mdi-account-plus size" style="font-size: 30px;">Créer un Nouvel Employé</span>

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
                    @click="dialog = false"
                    width="477px"
                    padding-left="2em"
                    >
                        Annuler
                    </v-btn>
                    <v-btn
                   style="background-color: #005075!important"
                    @click="addEmployee"
                    width="477px"
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
        </template>
        <table-loader v-else></table-loader>
  </div>
</template>
<script>
import { GetAllEmployees, addEmployee} from "@/repositories/employee.api";
// import axios from "axios";
export default {
    data(){
        return {
            search:'',
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu:false,
            loading:false,
            view_list: true,
            headers: [
                { text: '', value: 'logo', width: '10%', align: 'center' },
                { text: 'Prenom', value: 'first_name', width: '15%'},
                { text: 'Nom', value: 'last_name', width: '15%'},
                { text: 'Numèro de contact', value: 'mobile', width: '15%'},
                { text: 'Addresse', value: 'address', width: '20%'},
                { text: 'Email', value: 'email', width: '15%'},
                { text: 'actif', value: 'is_active', width: '10%'},
            ],
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
            employees:[],
            dialog: false,
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
            form:{
                search: '',
            }
        }
    },
    created(){
        this.initialize()
    },
    watch: {
       "form.search": {
        handler(val) {
          this.searchEmployee(val)
        },
        deep: true,
      },
    },
    methods: {
        initialize(){
            this.loading = true
            GetAllEmployees().then(({data}) => {
                console.log(data)
                this.employees = data
                this.loading = false
            })
        },
        view(item){
            this.$router.push({name: 'view_employee', params: { id: item.id },})
        },
        addEmployee(){
            addEmployee(this.employee).then(res=>{
                console.log(res)
                this.dialog = false
            })
        },
    //     searchEmployee(key){
    //       if (this.timer) {
    //       clearTimeout(this.timer);
    //       this.timer = null;
    //     }
    //         this.timer = setTimeout(() => {
    //         getEmployee({name:key}).then((response) => {
    //             this.users = response.data 
    //             this.loading = false
    //         }).catch((errors) => {
    //             console.log(errors)
    //         });
    //         },800);
    //   },
    }
}
</script>
<style scoped>
.theme--light.v-btn.v-btn--has-bg {
    background-color: white!important;
}
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
.scroll {
   overflow-y: scroll
}





</style>
