<template>
    <v-dialog
        transition="dialog-left-transition"
        v-model="dialog"
        class="menu_"
        width="800px"
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
                                 style="letter-spacing:2px; color:#058cd1;">NOUVELLE DEMANDE DE RTT</h3>
                                <p style="font-weight:600; font-size: 12px; color:#7e7e7e">Veuillez remplir tous les champs ci-dessous et cliquez sur soumettre. Merci!</p>
                            </div>
                        </div>
                        <v-col
                            cols="12"
                        >
                            <v-textarea
                                placeholder="Raison"
                                solo
                                rows="1"
                                auto-grow
                                class="mb-1"
                                :hide-details="true"
                                v-model="rtt.comment"
                                row-height="100"
                                prepend-inner-icon="mdi-note-edit-outline"
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="pb-1 pt-2">
                            <v-menu
                                ref="date"
                                v-model="date"
                                :close-on-content-click="false"
                                :return-value.sync="rtt.date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-on="on" 
                                        v-bind="attrs" 
                                        width="100%" 
                                        large
                                        style="color:#909090; justify-content: initial;"
                                    >
                                       <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                       {{rtt.date ? rtt.date : 'Choisissez la date'}}
                                   </v-btn>
                                </template>
                                <v-date-picker
                                    v-model="rtt.date"
                                    no-title
                                    scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="date = false"
                                >
                                    ANNULER
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.date.save(rtt.date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" class="pb-1 pt-2">
                            <v-menu
                                ref="start_time"
                                v-model="start_time_menu"
                                :close-on-content-click="false"
                                :return-value.sync="rtt.start_time"
                                transition="scale-transition"
                                offset-y
                                :nudge-right="40"
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-on="on" 
                                        v-bind="attrs" 
                                        width="100%" 
                                        large
                                        style="color:#909090; justify-content: initial;"
                                    >
                                       <v-icon class="mr-2">mdi-clock-outline</v-icon>
                                       {{rtt.start_time ? rtt.start_time : "Choisissez l'heure de début"}}
                                   </v-btn>
                                </template>
                                <v-time-picker
                                    format="24hr"
                                    :landscape="$vuetify.breakpoint.mdAndUp"
                                    v-model="rtt.start_time"
                                    @click:minute="$refs.start_time.save(rtt.start_time)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" class="pb-1 pt-2">
                            <v-menu
                                ref="end_time"
                                v-model="end_time_menu"
                                :close-on-content-click="false"
                                :return-value.sync="rtt.end_time"
                                transition="scale-transition"
                                offset-y
                                :nudge-right="40"
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-on="on" 
                                        v-bind="attrs" 
                                        width="100%" 
                                        large
                                        style="color:#909090; justify-content: initial;"
                                    >
                                       <v-icon class="mr-2">mdi-clock-outline</v-icon>
                                       {{rtt.end_time ? rtt.end_time : "Choisissez l'heure de fin"}}
                                   </v-btn>
                                </template>
                                <v-time-picker
                                    format="24hr"
                                    :landscape="$vuetify.breakpoint.mdAndUp"
                                    v-model="rtt.end_time"
                                    @click:minute="$refs.end_time.save(rtt.end_time)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" class="pt-2">
                            <v-autocomplete
                                dense
                                :items="employees"
                                solo
                                large
                                v-model="rtt.user_id"
                                item-text="full_name"
                                item-value="id"
                                :hide-details="true"
                                class="text-capitalize mb-4"
                            ></v-autocomplete>
                        </v-col>
                        <v-col v-if="error" style="position:absolute; bottom:60px;width: 750px">
                            <v-icon class="ma-2" color="red">
                                mdi-alert-circle
                            </v-icon>
                            <span style="color: red; font-weight: 100">
                                Veuillez ne pas laisser de champs vides
                            </span>
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
                                @click="saveRtt"
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
import { GetAllEmployees } from "@/repositories/employee.api";
import { CreateRtt } from "@/repositories/rtt.api";
export default {
    data(){
        return {
            error:false,
            start_time_menu:false,
            end_time_menu:false,
            date:false,
            rtt:{
                date:'',
                start_time:'',
                end_time:'',
                user_id:'',
                comment:''
            },
            employees:[],
        }
    },
    props:{
        dialog:{
            type:Boolean,
            required:true
        }
    },
    created(){
        this.initialize();
    },
    methods: {
        initialize() {
            this.error=false
            GetAllEmployees().then(({data}) => {
                console.log(data)
                this.employees = data
                this.rtt.user_id = this.employees[0].id
            })
        },
        saveRtt(){
            this.validate()
            if(this.error == false){
                CreateRtt(this.rtt).then(({data}) => {
                    console.log(data, 'test')
                    this.$emit('success')
                    this.$emit('close')
                    this.$toast.success(data.message)
                    this.$store.commit('toggleForceReload')
                }).catch(({response}) => { 
                    this.$toast.error(response.data.message) 
                })
            }
        },
        validate() {
            var comment = this.rtt.comment;
            var date = this.rtt.date;
            var start = this.rtt.start_time;
            var end = this.rtt.end_time;
            var id = this.rtt.user_id;
            if(comment == '' || comment == null || date == '' || date == null || start == '' || start == null || end == '' || end == null || id == '' || id == null) {
                this.error=true
            }else{
                this.error=false
            }
        }
    }
}
</script>