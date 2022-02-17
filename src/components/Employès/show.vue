<template>
    <v-row justify="space-around">
        <create-plan
            v-if="dialog2" 
            :dialog="dialog2" 
            @close="closeDialog"
            :data="create_data"
        ></create-plan>
        <v-col cols="3">
            <div style="text-align:center;">
                <v-img
                    class="mx-auto"
                    max-height="260"
                    max-width="260"
                    :src="data.image"
                ></v-img> 

                <h2>{{data.full_name}}</h2>
                <p>{{data.email}}</p>

                <v-btn
                    @click="editInfo"
                    rounded
                    elevation="3"
                    color="white"
                    dark
                    class="grey--text mx-auto"
                >
                    <v-icon left>mdi-pencil</v-icon> Edit
                </v-btn>
                <v-btn
                    @click="deleteEmp"
                    rounded
                    elevation="3"
                    color="error"
                    dark
                >
                    <v-icon left>mdi-delete</v-icon> Delete
                </v-btn>
            </div>
            <div class="personal-info" v-if="!edit">
                <v-row>
                    <v-col cols="12">
                        <p v-if="data.address">
                            <v-icon>mdi-office-building</v-icon>
                            {{data.address}}
                        </p>
                        <p v-else>
                            <v-icon>mdi-office-building</v-icon>
                            NON DEFINI
                        </p>
                    </v-col>
                    <v-col cols="12">
                        <p v-if="data.city">
                            <v-icon>mdi-office-building</v-icon>
                            {{data.city}}
                        </p>
                        <p v-else>
                            <v-icon>mdi-office-building</v-icon>
                            NON DEFINI
                        </p>
                    </v-col>
                    <v-col cols="12">
                        <p v-if="data.zip_code">
                            <v-icon>mdi-email-outline</v-icon>
                            {{data.zip_code}}
                        </p>
                        <p v-else>
                            <v-icon>mdi-email-outline</v-icon>
                            NON DEFINI
                        </p>
                    </v-col>
                    <v-col cols="12">
                        <p v-if="data.mobile">
                            <v-icon>mdi-card-account-phone-outline</v-icon>
                            {{data.mobile}}
                        </p>
                        <p v-else>
                            <v-icon>mdi-card-account-phone-outline</v-icon>
                            NON DEFINI
                        </p>
                    </v-col>
                    <v-col cols="12">
                        <p v-if="data.consumable_holidays">
                            <v-icon>mdi-flag-variant</v-icon>
                            {{data.consumable_holidays}}
                        </p>
                        <p v-else>
                            <v-icon>mdi-flag-variant</v-icon>
                            NON
                        </p>
                    </v-col>
                </v-row>
            </div>
            <div v-if="edit">
                <edit-view :data="data" @update="update" @edit="editInfo"></edit-view>
            </div>
            <div style="text-align:center;">
                <v-divider></v-divider>
                <v-btn
                    text
                    @click="addWork(data, data.centers)"
                >
                    <v-icon>mdi-plus</v-icon>Ajouter Planification 
                </v-btn>
                <v-divider></v-divider>
            </div>
            <div>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12" class="d-flex justify-space-between">
                                <p style="font-size: 18px;font-weight:bold">Activer</p>
                                <p><v-switch hide-details="true" color="primary"></v-switch></p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
            <div v-if="data.rtts.length > 0">
                <v-row>
                    <v-col cols="10">
                        <p style="font-size: 18px;font-weight:bold;margin-bottom:0!important;margin-top:15px;">RTT converti en especes</p>
                    </v-col>
                    <v-col cols="2">
                        <v-btn-toggle
                            rounded
                            borderless
                        >
                        <v-btn
                            text
                            class="mx-2"
                            fab
                            large
                        >
                            <v-icon style="font-size:30px;">mdi-swap-horizontal</v-icon>
                        </v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
            <div v-if="data.rtts.length > 0" style="text-align:center;">
                <v-row>
                    <v-col cols="6">
                        <p style="font-size: 18px;font-weight:bold">RTT non payante</p>
                        <p v-if="data.paid_status.remaining_amount" style="font-size: 30px;">{{data.paid_status.remaining_amount}}</p>
                        <p v-else style="font-size: 30px;">0.00</p>
                    </v-col>
                    <v-col cols="6">
                        <p style="font-size: 18px;font-weight:bold">RTT payee</p>
                        <p v-if="data.paid_status.amount_converted" style="font-size: 30px;">{{data.paid_status.amount_converted}}</p>
                        <p v-else style="font-size: 30px;">0.00</p>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
            <div>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12" class="d-flex justify-space-between">
                                <p style="font-size: 18px;font-weight:bold">Role:</p>
                                <p style="font-size: 18px;"><v-icon style="font-size: 30px;font-weight:bold">mdi-tools</v-icon> {{data.role.name}}</p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
            <v-divider></v-divider>
            <div class="center-card" v-if="data.centers.length > 0">
                <v-row justify="space-around">
                    <v-card 
                        class="mx-auto my-5" 
                        color="#f5f5f5"
                        elevation="0"
                    >
                        <v-card-title>
                            Centre assigne :
                        </v-card-title>
                        <div v-for="(center, index) in data.centers" :key="index" class="center-card-div">
                            <v-img
                                height="300px"
                                class="align-end"
                                :src="center.image"
                            >
                                <v-card-title 
                                    v-text="center.name" 
                                    class="white--text mt-8"
                                >
                                </v-card-title>
                                <v-card-subtitle
                                    class="sub-text"
                                >
                                    <v-icon>mdi-phone-outline</v-icon> {{center.mobile}}
                                </v-card-subtitle>
                            </v-img>
                            <v-card-subtitle v-if="center.manager" class="center-card-end">
                                Superviseur :
                                <p class="center-card-end-val">{{center.manager}}</p>
                            </v-card-subtitle>
                            <v-card-subtitle v-else class="center-card-end">
                                Superviseur :
                                <p class="center-card-end-val">NON DEFINI</p>
                            </v-card-subtitle>
                        </div>
                    </v-card>
                </v-row>
            </div>
        </v-col>

        <v-col cols="9">
            <div class="emp-tab-container">
                <v-tabs
                    v-model="tab"
                    style="background-color:blue"
                    grow
                >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab active-class="active" class="emp-tab">
                        Congés
                    </v-tab>

                    <v-tab active-class="active"  class="emp-tab">
                        RTT
                    </v-tab>

                    <v-tab active-class="active" class="emp-tab">
                        Absence
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" style="height: 100%!important">
                    <v-tab-item>
                        <div style="margin: 20px 0">
                            <leave-table></leave-table>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div style="margin: 20px 0">
                            <rtt-table :rtt="data.rtts"></rtt-table>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div style="margin: 20px 0">
                            <absence-table :data="data.attendances"></absence-table>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import LeaveTable from "@/components/Employès/includes/leave.vue"
import RttTable from "@/components/Employès/includes/rtt.vue"
import AbsenceTable from "@/components/Employès/includes/absence.vue"
import EditView from "@/components/Employès/edit.vue"
import CreatePlan from "@/components/Planification/includes/createPlan.vue"
import { UpdateEmployee,GetEmployeeInfo,DeleteEmployee } from "@/repositories/employee.api";
export default {
    data(){
        return{
            data:{},
            tab:null,
            edit: false,
            isActive: false,
            dialog2: false,
            create_data:{}
        }
    },
    created(){
        this.initialize();
    },
    methods:{
        initialize(){
            GetEmployeeInfo(this.$route.params.id).then(({data}) => {
                console.log(data)
                this.data = data
            })
        },
        editInfo(){
            if(this.edit){
                this.edit = false;
            }
            else{
                this.edit = true;
            }
        },
        update(){
            let img = this.data.image.split('/')
            if(img[4] == "shield.png"){
                this.data.image = ""
            }
            UpdateEmployee(this.data.id, this.data).then((data) => {
                if(data){
                    this.$toast.success("Updated Successfully")
                    this.edit = false
                    location.reload()
                }
            })
        },
        deleteEmp(){
            DeleteEmployee(this.data.id).then((data) =>{
                if(data){
                    this.$toast.success("Deleted Successfully")
                    this.$router.push({name:"Employès"})
                }
            })
        },
        addWork(employee, center){
            var creatDate = new Date();
            var date = creatDate.getFullYear() + "-" + (creatDate.getUTCMonth() + 1) + "-" + creatDate.getDate()
            this.create_data = {
            center:center,
            employee:employee,
            date:date
            }
            this.$nextTick(function () {
            this.dialog2 = true
            })
        },
        closeDialog(){
            this.dialog2 = false
        },
    },
    components:{
        LeaveTable,
        RttTable,
        EditView,
        CreatePlan,
        AbsenceTable
    }
}
</script>