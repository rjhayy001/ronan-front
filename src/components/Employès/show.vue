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
            <div class="personal-info">
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
                            <v-col cols="11">
                                <p style="font-size: 18px;font-weight:bold">Activer</p>
                            </v-col>
                            <v-col cols="1">
                                <v-switch color="primary"></v-switch>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
            <div>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="9">
                                <p style="font-size: 18px;font-weight:bold">Role:</p>
                            </v-col>
                            <v-col cols="2">
                                <p style="font-size: 18px">{{data.role.name}}</p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-col>
        <v-col cols="9">
            <v-tabs
                v-model="tab"
                fixed-tabs
            >
                <v-tab>
                    Option
                </v-tab>
                <v-tab>
                    Another Selection
                </v-tab>
                <v-tab>
                    Items
                </v-tab>
                <v-tab>
                    Another Screen
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card>
                        <leave-table></leave-table>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-col>
    </v-row>
</template>
<script>
import LeaveTable from "@/components/Employès/includes/leave.vue"
import { GetEmployeeInfo } from "@/repositories/employee.api";
export default {
    data(){
        return{
            data:{},
            tab:null
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
        }
    },
    components:{
        LeaveTable
    }
}
</script>