<template>
    <v-row>
        <v-sheet v-if="add" width="100%">
            <v-row>
                <v-col cols="11">
                    <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                solo
                                flat
                                label="Choose a date"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="picked"
                            scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="modal = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-col>
                <v-col cols="1" v-if="pickedHasValue" justify-end>
                    <v-btn
                        class="mx-2 white"
                        fab
                        dark
                        small
                        icon
                        @click="addAttendance"
                    >
                        <v-icon color="success" class="float-end employee_absence-icon">mdi-check</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-sheet>
        <v-sheet elevation="0" width="100%" v-for="(attendance, index) in data" :key="index">
            <v-row>
                <v-col cols="10">
                    <h3 class="employee_absence-h3">{{$DateWithMonthTextfr(attendance.date)}}</h3>
                    <p>{{attendance.status_text || capitalize}}</p>
                </v-col>
                <v-col cols="2">
                    <v-icon @click="approve(attendance.id,attendance.status,attendance.date)" v-if="attendance.status == 0" color="success" class="float-end employee_absence-icon_action">mdi-check</v-icon>
                    <v-icon @click="deleteAttendance(attendance.id)" v-else color="error" class="float-end employee_absence-icon_action">mdi-delete</v-icon>
                </v-col>
            </v-row>
        </v-sheet>
        <menu-button @add="addNew" @cancel="cancel" :menu="addDone"></menu-button>
    </v-row>
</template>
<script>
import { 
    AddEmployeeAttendance,
    UpdateEmployeeAttendance,
    DeleteEmployeeAttendance
    } from '@/repositories/employee.api'
import menuButton from "./menu.vue"
export default {
    data(){
        return{
            date: "",
            picked:"",
            dateToSave:"",
            pickedHasValue: false,
            modal: false,
            add: false,
            key: 0,
            addDone: false
        }
    },
    methods:{
        addAttendance(){
            let datas = {
                date: this.dateToSave,
                user_id: this.$route.params.id,
                status: 0
            }
            AddEmployeeAttendance(datas).then((data) =>{
                this.$toast.success(data.data.message)
                this.add = false
                this.addDone = true
                this.$emit("initialize")
            })
        },
        approve(id,status, date){
            let datas = {
                status: !status,
                date: date
            }
            UpdateEmployeeAttendance(id,datas).then((data) =>{
                this.$toast.success(data.data.message)
                this.$emit("initialize")
            })
        },
        deleteAttendance(id){
            DeleteEmployeeAttendance(id).then((data) =>{
                this.$toast.success(data.data.message)
                this.$emit("initialize")
            })
        },
        addNew(){
            this.add = true
        },
        cancel(){
            this.date = ""
            this.add = false
        }
    },
    components:{
        menuButton
    },
    props:{
        data:{
            type: Array
        }
    },
    watch:{
        "picked"(val){
            if(val){
                this.date = this.$DateWithMonthTextfr(val)
                this.dateToSave = val
            }
        },
        "date"(val){
            if(val){
                this.pickedHasValue = true
            }
            else{
                this.pickedHasValue = false
            }
        },
    }
}
</script>