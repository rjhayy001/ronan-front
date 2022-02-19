<template>
    <v-dialog
        transition="dialog-left-transition"
        v-model="dialog"
        class="menu_"
        width="800px"
        @click:outside="$emit('close')"
    >
        <v-card 
        >
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
                                 style="letter-spacing:2px; color:#058cd1;">NOUVELLE DEMANDE DE CONGE</h3>
                                <p style="font-weight:200;">Veullez remplir tous les champs ci-dessous et cliquez sur soumettre. Merci!</p>
                            </div>
                        </div>
                        <v-col
                            cols="12"
                            class="mb-2"
                        >
                            <v-text-field
                                placeholder="Nom de la demande"
                                dense
                                v-model="holiday.request_name"
                                solo
                                :hide-details="true"
                                class="mb-1"
                                prepend-inner-icon="mdi-pencil-outline"
                            ></v-text-field>
                        </v-col>
                       <v-col
                            cols="12"
                        >
                            <v-textarea
                                placeholder="Raison"
                                solo
                                rows="1"
                                auto-grow
                                v-model="holiday.reason"
                                row-height="100"
                                prepend-inner-icon="mdi-note-edit-outline"
                                :hide-details="true"
                                class="mb-1"
                            ></v-textarea>
                        </v-col>
                        <v-col cols="8" class="py-2">
                            <v-menu
                                ref="start_date"
                                v-model="start_menu"
                                :close-on-content-click="false"
                                :return-value.sync="holiday.start_date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                   <v-btn v-on="on" v-bind="attrs" width="100%" style="color:#909090; justify-content: initial;">
                                       <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                       {{holiday.start_date ? holiday.start_date : 'choose start date'}}
                                   </v-btn>
                                </template>
                                <v-date-picker
                                    v-model="holiday.start_date"
                                    no-title
                                    scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="start_menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.start_date.save(holiday.start_date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="4" class="py-2">
                            <v-select
                                dense
                                :items="items"
                                solo
                                :hide-details="true"
                                v-model="holiday.startDate_isHalf_day"
                                item-text="text"
                                item-value="value"
                                class="text-capitalize"
                            ></v-select>
                        </v-col>
                          <v-col cols="8" class="py-0">
                            <v-menu
                                ref="end_date"
                                v-model="end_menu"
                                :close-on-content-click="false"
                                :return-value.sync="holiday.end_date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                   <v-btn v-on="on" v-bind="attrs" width="100%" style="color:#909090; justify-content: initial;">
                                       <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                       {{holiday.end_date ? holiday.end_date : 'choose end date'}}
                                   </v-btn>
                                </template>
                                <v-date-picker
                                    v-model="holiday.end_date"
                                    no-title
                                    :min="holiday.start_date"
                                    scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="end_menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.end_date.save(holiday.end_date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="4" class="py-0">
                            <v-select
                                dense
                                :items="items"
                                solo
                                v-model="holiday.endDate_isHalf_day"
                                item-text="text"
                                item-value="value"
                                :hide-details="true"
                                class="text-capitalize"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" class="mt-2">
                            <v-autocomplete
                                dense
                                :items="employees"
                                solo
                                v-model="holiday.user_id"
                                item-text="full_name"
                                item-value="id"
                                class="text-capitalize "
                                :hide-details="true"
                            ></v-autocomplete>
                        </v-col>
                        <v-col v-if="error" style="position: absolute; bottom: 4em;     width: 20em;">
                            <v-icon color="red">
                                mdi-alert-circle
                            </v-icon>
                            <span style="color:red;">
                                Please dont leave empty fields.
                            </span>
                        </v-col>
                        <v-col style="position:absolute; bottom:0;width: 750px">
                            <v-btn 
                                @click="closeDialog" 
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
                                @click="save"
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
import { GetAllEmployees } from "@/repositories/employee.api";
import { createHoliday } from "@/repositories/planning.api";
export default {
    props:{
        dialog:{
            type:Boolean,
            required:true
        }
    },
    data() {
        return {
            error:false,
            is_loading:true,
            start_menu:false,
            end_menu:false,
            holiday:{
                startDate_isHalf_day:0,
                start_date: this.$datePickerDate(moment()),
                end_date: this.$datePickerDate(moment()),
                endDate_isHalf_day:0,
            },
            items: [
                {value: 0, text:'whole day'},
                {value: 1, text:'half day morning'},
                {value: 2, text:'half day afternoon'},
            ],
            employees:[],
        };
    },

    created(){
        this.initialize();
    },
    methods: {
        closeDialog() {
            this.$emit('close');
        },
        initialize() {
            this.error=false
            GetAllEmployees().then(({data}) => {
                console.log(data)
                this.employees = data
                this.holiday.user_id = this.employees[0].id
            })
        },
        save(){
            console.log(this.holiday)
            createHoliday(this.holiday).then(() => {
                this.$toast.success('successfully added holiday') 
                this.$emit('success')
                this.$emit('close')
            }).catch(({ response }) => { 
                this.$toast.error(response.data.message) 
            })
        }
    }
}
</script>
