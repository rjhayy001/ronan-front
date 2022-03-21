<template>
   <v-dialog v-model="dialog" width="600" @click:outside="$emit('close')" class="card-radius">
        <v-card rounded>
            <v-toolbar dense flat class="py-4">
                <v-toolbar-title>Mise à jour Absence</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="$emit('close')">mdi-close</v-icon>
            </v-toolbar>
            <v-container>
                <v-row class="row">
                    <v-col
                        md="6"
                        xs="12"
                    >
                        <div style="display:grid; background:#ededed; padding:20px;" class="text-center">
                             <div>
                                <v-avatar size="100">
                                    <img
                                        :src="employee.image"
                                        alt="John"
                                    >
                                </v-avatar>
                            </div>
                            <span class="emp-name mt-10">{{employee.full_name}}</span>
                            <span class="emp-email">{{employee.email}}</span>
                        </div>
                    </v-col>
                    <v-col
                        md="6"
                        xs="12"
                    >
                        <div>
                            <p class="planning_text-label">Date De Mise À Jour</p>
                            <v-menu
                                ref="date"
                                v-model="delete_menu"
                                :close-on-content-click="false"
                                :return-value.sync="absence.date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="absence.date"
                                        dense
                                        solo
                                        prepend-inner-icon="mdi-calendar-outline"
                                        readonly
                                        :disabled="!editing"
                                        v-bind="attrs"
                                        :hide-details="true"
                                        class="mb-2"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="absence.date"
                                    no-title
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="delete_menu = false"
                                    >
                                        Annuler
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.date.save(absence.date)"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div class="mt-2">
                            <v-btn 
                                class="float-right" 
                                style="margin-top: 10vh"
                                icon
                                @click="destroy"
                                :disabled="!$canAccess()"
                            >
                                <v-icon>mdi-delete-outline</v-icon>
                            </v-btn>
                            <v-btn 
                                class="float-right mr-2" 
                                style="margin-top: 10vh"
                                v-if="!editing"
                                @click="editing=true"
                                icon
                                :disabled="!$canAccess()"
                            >
                                <v-icon>mdi-pencil-outline</v-icon>
                            </v-btn>
                            <v-btn 
                                class="float-right mr-2" 
                                style="margin-top: 10vh"
                                color="success"
                                v-else
                                @click="save"
                                icon
                            >
                                <v-icon>mdi-download-outline</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import { DeleteEmployeeAttendance, UpdateEmployeeAttendance } from "@/repositories/employee.api";
export default {
        props:{
        dialog: {
            type: Boolean,
            required: true,
        },
        data:{
            required: true,
            type: Object,
        }
    },
    data(){
        return{
            loading:false,
            editing:false,
            delete_menu:false,
            employees:{},
            absence:{}
        }
    },
    created(){
        this.initialize();
    },
    methods:{
        initialize() {
            this.absence = JSON.parse(JSON.stringify(this.data.absent))
            this.employee = this.data.employee
        },
        destroy() {
            this.loading = true
            DeleteEmployeeAttendance(this.absence.id).then(({data}) =>  {
                this.loading = false
                this.$store.commit('UPDATE_NEW',true)
                this.$emit('close')
                this.$toast.success(data.message)
            })
        },
        save(){
            UpdateEmployeeAttendance(this.absence.id, this.absence).then(({data}) =>{
                this.$store.commit('UPDATE_NEW',true)
                this.$toast.info(data.message)
                this.$emit('close')
            })
        }
    },
}
</script>