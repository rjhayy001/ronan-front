<template>
  <div>
        <template v-if="!loading">
            <v-subheader class="">
                <p class="sub_title">Employees</p>
                <v-spacer></v-spacer>
                <v-btn depressed>
                    <v-icon
                        color="black"
                    >
                        mdi-magnify
                    </v-icon>          
                </v-btn>
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
        </template>
        <table-loader v-else></table-loader>
  </div>
</template>
<script>
import { GetAllEmployees } from "@/repositories/employee.api";
export default {
    data(){
        return {
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
        }
    },
    created(){
        this.initialize()
    },
    methods: {
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
        }
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


</style>
