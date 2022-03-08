<template>
    <v-row justify="space-around">
        <create-plan
            v-if="dialog2"
            :dialog2="dialog2" 
            @close="closeDialog"
            :data="create_data"
        ></create-plan>
        <v-col cols="3">
            <div class="text-center">
                <v-img
                    class="mx-auto"
                    max-height="260"
                    max-width="260"
                    :src="data.image"
                ></v-img> 
                <h2>{{data.full_name}}</h2>
                <p>{{data.email}}</p>
                <v-btn
                    v-if="!edit"
                    @click="editInfo"
                    rounded
                    elevation="3"
                    color="white"
                    dark
                    class="grey--text mx-auto px-7 mr-8"
                >
                    <v-icon left>mdi-pencil</v-icon> Edit
                </v-btn>
                <v-btn
                    v-if="!edit"
                    @click="deleteEmp"
                    rounded
                    elevation="3"
                    color="error"
                    dark
                    class="px-7"
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
            <div class="text-center">
                <v-divider></v-divider>
                <v-btn
                    width="100%"
                    text
                    @click="addWork()"
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
                                <p class="font-weight-bold my-auto employee_show-size">Activer</p>
                                <p class="my-auto"><v-switch v-model="data.isActive" @click="updateStatus()" hide-details="true" color="primary"></v-switch></p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
            <div v-if="data.rtts.length > 0">
                <v-row>
                    <v-col cols="12" class="d-flex justify-space-between">
                        <p class="employee_show-size font-weight-bold my-auto">RTT converti en especes</p>
                        <p class="my-auto">
                            <v-btn-toggle
                                rounded
                                borderless
                            >
                                <v-btn
                                    text
                                    class="mx-2 my-auto"
                                    large
                                    @click="convert = !convert"
                                    icon
                                >
                                    <v-icon size="30px">mdi-swap-horizontal</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </p>
                    </v-col>
                    <v-col cols="12" v-if="convert">
                        <v-text-field v-model="convertable" placeholder="0.00" @keydown.enter="convertBalance">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
            <div v-if="data.rtts.length > 0" class="text-center">
                <v-row>
                    <v-col cols="6">
                        <p class="employee_show-size font-weight-bold">RTT non payante</p>
                        <h2>{{data.paid_status.remaining_amount ? data.paid_status.remaining_amount : '0.00'}}</h2>
                    </v-col>
                    <v-col cols="6">
                        <p class="employee_show-size font-weight-bold">RTT payee</p>
                        <h2 >{{data.paid_status.amount_converted ? data.paid_status.amount_converted : '0.00'}}</h2>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
            <div>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12" class="d-flex justify-space-between">
                                <p class="employee_show-size font-weight-bold my-auto">Role:</p>
                                <p class="employee_show-size my-auto"><v-icon size="30px" class="font-weight-bold">mdi-tools</v-icon> {{data.role.name}}</p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
            <v-divider></v-divider>
            <div class="center-card" v-if="data.centers.length > 0">
                <v-row justify="space-around">
                    <v-card 
                        class="mx-auto my-3" 
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
                <v-tabs-items v-model="tab" style="height:100%!important">
                    <v-tab-item>
                        <div class="my-5 mx-0">
                            <leave-table></leave-table>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="my-5 mx-0">
                            <rtt-table :rtt="data.rtts"></rtt-table>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="my-5 mx-0">
                            <absence-table :data="data.attendances" @initialize="initialize"></absence-table>
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
import CreatePlan from "@/components/Employès/includes/createPlan.vue"
import moment from 'moment'
import { 
    UpdateEmployee,
    GetEmployeeInfo,
    DeleteEmployee,
    changeStatus,
    useBalance
    } from "@/repositories/employee.api";
export default {
    data(){
        return{
            data:{},
            tab:null,
            edit: false,
            isActive: false,
            dialog2: false,
            convert: false,
            convertable: "",
            month: moment().format('MMM YYYY'),
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
                    this.initialize()
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
        updateStatus(){
            if(this.data.isActive == false){
                this.data.isActive = 0
            }else{
                this.data.isActive = 1
            }
            // console.log(this.data)
            changeStatus(this.data).then((data) =>{
                if(data){
                    this.$toast.success("Status Updated Successfully")
                }
            })
            
        },
        convertBalance(){
            let datas = {
                user_id: this.data.id,
                amount: this.convertable
            }
            if(this.convertable != ""){
                useBalance(datas).then((data) => {
                    // console.log(data)
                    if(data.status == 200){
                        this.$toast.success(data.data.message)
                        this.initialize()
                        this.convertable = ""
                        this.convert = false
                    }
                }).catch((response) =>{
                    console.log(response)
                    let code = response.message.split(' ')
                    let lastNum = parseInt(code.length - 1)
                    if(code[lastNum]== "422"){
                        this.$toast.error("Limite dépassée")
                        this.convertable = ""
                    }
                    else if(code[lastNum]== "404"){
                        this.$toast.error("Échec de mise à jour, Utilisateur non trouvé")
                        this.convertable = ""
                    }
                })
            }
            else{
                this.$toast.error("Aucune valeur")
            }
        },
        addWork(){
            var monthDate = moment(moment(this.year+'-'+this.month_digit), 'YYYY-MM'); 
            var daysInMonth = monthDate.daysInMonth() ;
            var current = moment(this.month).date(daysInMonth)
            var date = current.format('YYYY-MM-DD')
            this.create_data = {
                center:this.data.centers[0],
                employee:this.data,
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