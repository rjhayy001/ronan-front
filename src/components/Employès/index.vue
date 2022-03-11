<template>
    <div>
        <template v-if="!loading">
            <v-subheader class="my-2">
                <p class="sub_title">Liste de tous les employés</p>
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
                <v-btn depressed  @click="addEmployee=true">
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
            <ViewTable
                v-if="!view_list"
                :employees="employees"
                :search="search"
            />
        </template>
        <table-loader v-else></table-loader>
        <add-employee
            v-if="addEmployee"
            :dialog="addEmployee"
            @close="addEmployee=false"
        ></add-employee>
    </div>
</template>
<script>
import { GetAllEmployees} from "@/repositories/employee.api";
// import addEmploDialog from "@/components/"
import ViewTable from './includes/viewTable.vue'
import  addEmployee from "./includes/addEmployee.vue"
// import axios from "axios";
export default {
     components : {
         ViewTable,
       addEmployee,
    },
    data(){
        return {
            addEmployee:false,
            search:'',
            
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
            
            employees:[],
           
          
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
        addData(){
            this.addEmployee = true
        },
        initialize(){
            this.loading = true
            GetAllEmployees().then(({data}) => {
                // console.log(data)
                this.employees = data
                this.loading = false
            })
        },
        view(item){
            this.$router.push({name: 'view_employee', params: { id: item.id },})
        },
         close(){
            this.$emit('close')
        }
    }
}
</script>
