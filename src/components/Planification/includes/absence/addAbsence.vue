<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-left-transition"
        class="menu_"
        width="850px"
        @click:outside="$emit('close')"
    >
       <v-card>
            <v-form>
                <v-container style="height: 60vh">
                    <v-row style="padding: 30px">
                        <div style="display:flex">
                            <div>
                                <v-icon style="font-size: 50px; margin:auto;" color="primary">
                                    mdi-alert-circle
                                </v-icon>
                            </div>
                            <div class="ml-3">
                                <h3
                                 style="letter-spacing:2px; color:#058cd1;">NOUVELLE DEMANDE D'ABSENCE</h3>
                                <p style="font-weight:600; font-size: 12px; color:#7e7e7e">Veuillez remplir tous les champs ci-dessous et cliquez sur soumettre. Merci!</p>
                            </div>
                        </div>
                        <v-col cols="7" class="py-2">
                            <v-menu
                                ref="start_date"
                                v-model="start_menu"
                                :close-on-content-click="false"
                                :return-value.sync="absence.start_date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                   <v-btn v-on="on" v-bind="attrs" width="100%" style="color:#909090; justify-content: initial;">
                                       <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                       {{absence.start_date ? absence.start_date : 'Date de début'}}
                                   </v-btn>
                                </template>
                                <v-date-picker
                                    v-model="absence.start_date"
                                    no-title
                                    scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="start_menu = false"
                                >
                                    ANNULER
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.start_date.save(absence.start_date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" class="mt-2">
                            <v-autocomplete
                                dense
                                :items="employees"
                                solo
                                v-model="absence.user_id"
                                item-text="full_name"
                                item-value="id"
                                class="text-capitalize "
                                :hide-details="true"
                            ></v-autocomplete>
                        </v-col>
                        <v-col style="position:absolute; bottom:0;width: 750px">
                            <v-btn 
                                @click="$emit('close')"
                                height="50px" 
                                color="rgb(238 238 238)"
                                width="47%" 
                                class="ma-2 btn-dialog"
                            >
                                ANNULER
                            </v-btn>
                            <v-btn
                                width="47%"
                                dark
                                height="50px"
                                color="#005075!important"
                                class="btn-dialog ma-2"
                                @click="addAttendance"
                            >
                                VALIDER
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>
<script>
import moment from 'moment'
import { GetAllEmployees, AddEmployeeAttendance } from "@/repositories/employee.api";
export default {
    data(){
        return{
            employees:[],
            start_menu:false,
            absence: {
                start_date: this.$datePickerDate(moment()),
                user_id:null
            }
        }
    },
    created(){
        this.initialize();
    },
    methods:{
        initialize() {
            this.error=false
            GetAllEmployees().then(({data}) => {
                console.log(data)
                this.employees = data
                if(!this.data){
                    this.absence.user_id = this.employees[0].id
                }
            })
        },
        addAttendance(){
            let datas = {
                date: this.absence.start_date,
                user_id: this.absence.user_id,
                center_id: this.data.center.center_id,
                status: 0
            }
            AddEmployeeAttendance(datas).then((data) =>{
                this.$toast.success(data.data.message)
                this.$emit('close')
            })
        },
    },
    props:{
        data:{
            type: Object
        },        
        dialog:{
            type:Boolean,
            required:true
        },
    },
    watch:{
        "data.showMenu": {
            handler(val) {
                if(!val){
                    this.absence.user_id = this.data.user.id
                    this.absence.start_date = this.data.date
                    console.log(this.data)
                }
            },
            deep: true,
        }
    }
}
</script>