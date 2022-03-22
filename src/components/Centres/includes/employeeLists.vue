<template>
    <div class="px-4" style="min-height:90vh" >
        <add-employee 
            :dialog="add_employee_dialog" 
            :employee="selected_employee"
            :center="center"
            @close="add_employee_dialog=false"
        />
        <!-- style="position: sticky; top:0; z-index: 2; padding-right: 2px;" -->
        <div>
            <v-toolbar dense flat>
                <v-toolbar-title class="center-employeelist-title">Liste des employés affectés</v-toolbar-title>
            </v-toolbar>

            <v-data-table
                class="ml-2 no-stripe scroll-bar-min"
                :headers="headers"
                :items="center.users"
                :items-per-page="50"
                :hide-default-footer="true"
            >
                <template v-slot:item.action="{ item }">
                    <v-icon 
                        v-if="$canAccess()"
                        color="error"
                        @click="removeEmployee(item)"
                    >
                        mdi-close
                    </v-icon>
                </template>
            </v-data-table>
        </div>
        <v-toolbar v-if="$canAccess()" dense flat>
            <v-toolbar-title class="center-employeelist-title">Liste de tous les employés</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                class="my-2 mr-2 shrink employeelist-field"
                small
                width="100px"
                dense
                :hide-details="true"
                label="Rechercher un employé"
                solo
                v-model="search"
                append-icon="mdi-magnify"
                single-line 
            ></v-text-field>
        </v-toolbar>

        <v-data-table
            v-if="$canAccess()"
            :search="search"
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
import { GetFilteredEmployee } from "@/repositories/employee.api";
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
            search:'',
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
            GetFilteredEmployee().then(({data}) => {
                console.log(data)
                this.employees = data
                this.loading_employees = false
            })
        },
        removeEmployee(item){
            let payload = {
                user_id: item.id
            }
            let message = `Êtes-vous sûr de vouloir SUPPRIMER ${item.first_name}, ${item.last_name} vers le centre ?`
            this.$root
            .$confirm(message,'#008dd1')
            .then(result => {
                if(result)(
                    RemoveEmployee(this.center.id, payload).then(() => {
                        this.$arraysplicer(item,this.center.users)
                        this.$toast.success("Enlevé avec succès !");
                    })
                )
            })
        },
        addEmployee(item){
            console.log(item, "itemselect")
            this.selected_employee = item
            console.log(this.selected_employee.id, "dataselect")
            this.$nextTick(function () {
                this.add_employee_dialog = true
            })
        }
    }
}
</script>

<style scoped>
/* .scroll-bar {
    overflow-y:scroll; 
    height: 50vh;
}
 */
 /* .scroll-bar-min {
    overflow:scroll; 
    max-height: 30vh;
} */

/* hide scrollbar but allow scrolling */
.scroll-bar-min {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll; 
    max-height: 30vh;

}

.scroll-bar-min::-webkit-scrollbar {
    width: 10px;
}
</style>