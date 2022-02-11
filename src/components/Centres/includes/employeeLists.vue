<template>
    <div class="px-4">
        <add-employee 
            :dialog="add_employee_dialog" 
            :employee="selected_employee"
            :center="center"
            @close="add_employee_dialog=false"
        />
        <v-toolbar dense flat>
            <v-toolbar-title class="title">List of employees affected</v-toolbar-title>
        </v-toolbar>

        <v-data-table
            class="ml-2 no-stripe"
            :headers="headers"
            :items="center.users"
            :items-per-page="50"
            :hide-default-footer="true"
        >
            <template v-slot:item.action="{ item }">
                <v-icon 
                    color="error"
                    @click="removeEmployee(item)"
                >
                    mdi-close
                </v-icon>
            </template>
        </v-data-table>

        <v-toolbar dense flat>
            <v-toolbar-title class="title">List of employees</v-toolbar-title>
        </v-toolbar>

        <v-data-table
            class="ml-2 invi-head-table no-stripe"
            :headers="headers"
            :items="employees"
            :items-per-page="50"
            :loading="loading_employees"
            @click:row="addEmployee($event)"
        ></v-data-table>

    </div>
</template>
<script>
import { GetAllEmployees } from "@/repositories/employee.api";
import { RemoveEmployee } from "@/repositories/center.api";
import addEmployee from './dialogs/addToCenterDialog.vue'
export default {
    components: 
    {
        addEmployee
    },
    props: {
        center: {
            required:true,
            type:Object
        }
    },
    data(){
        return {
            employees:[],
            loading_employees:false,
            add_employee_dialog:false,
            selected_employee:{},
            headers: [
                { text: 'ID', value: 'id', width: '10%'},
                { text: 'Prenom', value: 'first_name', width: '20%'},
                { text: 'Nom', value: 'last_name', width: '20%'},
                { text: 'Addresse', value: 'address', width: '30%'},
                { text: 'Numèro', value: 'mobile', width: '10%'},
                { text: 'Action', value: 'action', width: '10%'},
            ],
        }
    },
    created(){
        this.initialize()
    },
    methods: {
        initialize(){
            this.loading_employees = true
            GetAllEmployees().then(({data}) => {
                console.log(data)
                this.employees = data
                this.loading_employees = false
            })
        },
        removeEmployee(item){
            let payload = {
                user_id: item.id
            }
            let message = `Are you sure you want to REMOVE ${item.first_name}, ${item.last_name} to the center ?`
            this.$root
            .$confirm(message,'#008dd1')
            .then(result => {
                if(result)(
                    RemoveEmployee(this.center.id, payload).then(() => {
                        this.$arraysplicer(item,this.center.users)
                        this.$toast.success("Successfully removed!");
                    })
                )
            })
           
        },
        addEmployee(item){
            this.selected_employee = item
            this.$nextTick(function () {
                this.add_employee_dialog = true
            })
        }
    }
}
</script>
<style scoped>
.title{
    color: #0486c2 !important;
    font-size: 19px !important;
    font-weight: 300;
}
.test .v-data-table__wrapper{
    border-top-left-radius: 25px !important;
    border-top-right-radius: 25px !important;
}
</style>