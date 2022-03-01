<template>
    <v-dialog
        transition="dialog-left-transition"
        v-model="dialog"
        class="menu_"
        width="800px"
        @click:outside="$emit('close')"
    >
        <v-card >
            <v-form>
                <v-container>
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
                                <p style="font-weight:200; font-size:">Veullez remplir tous les champs ci-dessous et cliquez sur soumettre. Merci!</p>
                            </div>
                        </div>
                        <v-col
                            cols="12"
                            class="mb-2"
                        >
                            <v-text-field
                                placeholder="Nom de la demande"
                                dense
                                solo
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
                                row-height="100"
                                prepend-inner-icon="mdi-note-edit-outline"
                            ></v-textarea>
                        </v-col>
                        <v-col cols="8" class="pb-1">
                            <v-menu
                                ref="start_date"
                                v-model="start_menu"
                                :close-on-content-click="false"
                                :return-value.sync="rtt.start_date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                   <v-btn v-on="on" v-bind="attrs" width="100%" style="color:#909090; justify-content: initial;">
                                       <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                       {{rtt.start_date ? rtt.start_date : 'choose start date'}}
                                   </v-btn>
                                </template>
                                <v-date-picker
                                    v-model="rtt.start_date"
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
                                    @click="$refs.start_date.save(rtt.start_date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="4" class="pb-1">
                            <v-select
                                dense
                                :items="items"
                                solo
                                v-model="rtt.start_date_type"
                                item-text="text"
                                item-value="value"
                                class="text-capitalize"
                            ></v-select>
                        </v-col>
                          <v-col cols="8" class="pt-0">
                            <v-menu
                                ref="end_date"
                                v-model="end_menu"
                                :close-on-content-click="false"
                                :return-value.sync="rtt.end_date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                   <v-btn v-on="on" v-bind="attrs" width="100%" style="color:#909090; justify-content: initial;">
                                       <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                       {{rtt.end_date ? rtt.end_date : 'choose end date'}}
                                   </v-btn>
                                </template>
                                <v-date-picker
                                    v-model="rtt.end_date"
                                    no-title
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
                                    @click="$refs.end_date.save(rtt.end_date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="4" class="pt-0">
                            <v-select
                                dense
                                :items="items"
                                solo
                                v-model="rtt.end_date_type"
                                item-text="text"
                                item-value="value"
                                class="text-capitalize"
                            ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                                dense
                                :items="employees"
                                solo
                                v-model="rtt.user_id"
                                item-text="full_name"
                                item-value="id"
                                class="text-capitalize"
                            ></v-select>
                        </v-col>
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
                        >
                            VALIDER
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
// import moment from 'moment'
import { GetAllEmployees } from "@/repositories/employee.api";
export default {
    props:{
        dialog:{
            type:Boolean,
            required:true
        }
    },
    data() {
        return {
            start_menu:false,
            end_menu:false,
            rtt:{
                start_date_type:1,
                end_date_type:1,
            },
            items: [
                {value: 1, text:'whole day'},
                {value: 2, text:'half day morning'},
                {value: 3, text:'half day afternoon'},
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
            GetAllEmployees().then(({data}) => {
                console.log(data)
                this.employees = data
            })
        }
    }
}
</script>
