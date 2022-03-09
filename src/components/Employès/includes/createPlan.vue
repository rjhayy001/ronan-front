<template>
<v-dialog v-model="dialog2" width="700" persistent>
    <v-card rounded>
        <v-toolbar dense flat class="py-4">
            <v-toolbar-title>Créer une planification</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="$emit('close')">mdi-close</v-icon>
        </v-toolbar>
        <v-container>
            <v-row class="row">
                <v-col
                    md="5"
                    xs="12"
                >
                    <div class="text-center employee_createplan">
                        <div>
                            <v-avatar size="100">
                                <img
                                    :src="employee.image"
                                    alt="John"
                                >
                            </v-avatar>
                        </div>
                        <span class="employee_createplan-emp-name mt-2">{{employee.full_name}}</span>
                        <span class="employee_createplan-emp-email">{{employee.email}}</span>
                        <v-list dense class="text-left mt-4">
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon class="employee_createplan_icon">
                                    mdi-bank
                                </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                <v-list-employee_createplan-item-title class="employee_createplan-item-title">{{center.name}}</v-list-employee_createplan-item-title>
                                <v-list-employee_createplan-item-subtitle class="employee_createplan-item-sub">{{center.region.name}}</v-list-employee_createplan-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-col>
                <v-col
                    md="7"
                    xs="12"
                >
                <v-form ref="addForm">
                    <div>
                        <p class="employee_createplan-text-label">date de début</p>
                        <v-menu
                            ref="start_date"
                            v-model="start_menu"
                            :close-on-content-click="false"
                            :return-value.sync="payload.start_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="payload.start_date"
                                dense
                                solo
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="payload.start_date"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="start_menu = false"
                            >
                                Annuler
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.start_date.save(payload.start_date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div>
                        <p class="employee_createplan-text-label">taper</p>
                        <v-select
                            dense
                            :items="items"
                            label="Solo field"
                            solo
                             v-model="payload.start_date_Type"
                            item-text="text"
                            item-value="value"
                            class="text-capitalize"
                        ></v-select>
                    </div>
                     <div>
                        <p class="employee_createplan-text-label">Date de fin</p>
                        <v-menu
                            ref="end_date"
                            v-model="end_menu"
                            :close-on-content-click="false"
                            :return-value.sync="payload.end_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="payload.end_date"
                                dense
                                solo
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="payload.end_date"
                            no-title
                            scrollable
                            :min="payload.start_date"
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="end_menu = false"
                            >
                                Annuler
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.end_date.save(payload.end_date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div>
                        <p class="employee_createplan-text-label">taper</p>
                        <v-select
                            dense
                            :items="items"
                            label="Roles"
                            solo
                            v-model="payload.end_Date_Type"
                            item-text="text"
                            item-value="value"
                            class="text-capitalize"
                        ></v-select>
                    </div>
                    <div>
                        <v-btn 
                            class="float-right mt-4" 
                            small color="primary" 
                            dark 
                            @click="save"
                        >
                            valider
                        </v-btn>
                    </div>
                </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</v-dialog>
</template>
<script>
import { Insert } from "@/repositories/planning.api";
export default {
    props:{
        data:{
            required: true,
            type: Object,
        },
        dialog2:{
            type: Boolean
        }
    },
   
    created(){
        this.initialize()
    },
    data(){
        return {
            start_menu:false,
            end_menu:false,
            employee:{},
            center:{},
            payload:{
                start_date:'',
                end_date:'',
                start_date_Type:1,
                end_Date_Type:1,
                center_id:'',
                user_id: '',

            },
            items: [
                {value: 1, text:'Toute la journée'},
                {value: 2, text:'Demi-journée-Matin'},
                {value: 3, text:'Demi-journée-Après-midi'},
            ],
        }
    },
    methods:{
        initialize(){
            // console.log(this.data)
            this.payload.start_date = this.data.date
            this.payload.end_date = this.data.date
            this.employee = this.data.employee
            this.center = this.data.center
            this.payload.center_id = this.data.center.id
            this.payload.user_id = this.data.employee.id
        },
        save(){
            if(!this.checkForm()){
                Insert(this.payload).then(({data}) =>{
                    // this.$arrayupdater(data.data, this.employee.planning)
                    this.$toast.success(data.message)
                    this.$emit('close')
                    console.log(data.data)
                })
            }
        },
        checkForm(){
            if (this.payload.start_date == '' || this.payload.end_date == '' ){
                this.$toast.error('all fields are required')
                return true
            }
            return false
        }
    }
}
</script>