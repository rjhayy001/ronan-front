<template>
    <v-row justify="space-around">
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
                <edit-view></edit-view>
            </div>
            <div style="text-align:center;">
                <v-divider></v-divider>
                <v-btn
                    text
                >
                    <v-icon>mdi-plus</v-icon>Ajouter Planification 
                </v-btn>
                <v-divider></v-divider>
            </div>
            <div>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="11" style="height:50px">
                                <p style="font-size: 18px;font-weight:bold">Activer</p>
                            </v-col>
                            <v-col cols="1" style="height:50px">
                                <v-switch hide-details="true" color="primary"></v-switch>
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
            <div style="text-align:center;">
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
                            <v-col cols="8" style="height:50px">
                                <p style="font-size: 18px;font-weight:bold">Role:</p>
                            </v-col>
                            <v-col cols="4" style="height:50px">
                                <p style="font-size: 18px;"><v-icon style="font-size: 30px;font-weight:bold">mdi-tools</v-icon> {{data.role.name}}</p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="9">
            <v-tabs
                class="emp-tab"
                v-model="tab"
                grow
            >
                <v-tab>
                    Conges
                </v-tab>
                <v-tab>
                    RTT
                </v-tab>
                <v-tab>
                    Absence
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card>
                        <leave-table></leave-table>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card>
                        <rtt-table></rtt-table>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-col>
    </v-row>
</template>
<script>
import LeaveTable from "@/components/Employès/includes/leave.vue"
import RttTable from "@/components/Employès/includes/rtt.vue"
import EditView from "@/components/Employès/edit.vue"
import { GetEmployeeInfo } from "@/repositories/employee.api";
export default {
    data(){
        return{
            data:{},
            tab:null,
            edit: false
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
        }
    },
    components:{
        LeaveTable,
        RttTable,
        EditView
    }
}
</script>