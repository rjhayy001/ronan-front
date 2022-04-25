<template>
    <v-card rounded>
        <v-toolbar dense flat class="py-4">
            <v-toolbar-title>{{planning.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="$emit('close')">mdi-close</v-icon>
        </v-toolbar>
        <v-container>
            <v-row class="row">
                <v-col
                    md="5"
                    xs="12"
                >
                    <div style="display:grid " class="text-center">
                        <div>
                            <v-avatar size="100">
                                <img
                                    :src="employee.image"
                                    alt="John"
                                >
                            </v-avatar>
                        </div>
                        <span class="emp-name mt-2">{{employee.full_name}}</span>
                        <span class="emp-email">{{employee.email}}</span>
                        <v-list dense class="text-left mt-4">
                            <v-list-item>
                                <v-list-item-icon>
                                <v-icon style="opacity:0.5;">
                                    mdi-bank
                                </v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                <v-list-item-title class="planning_item-title">{{center.name}}</v-list-item-title>
                                <v-list-item-subtitle class="item-sub">{{center.region.name}}</v-list-item-subtitle>
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
                        <p class="planning_text-label">Date de début</p>
                        <v-menu
                            ref="start_date"
                            v-model="start_menu"
                            :close-on-content-click="false"
                            :return-value.sync="planning.start_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="start_date"
                                dense
                                solo
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                :hide-details="true"
                                class="mb-2"
                                :disabled="!editing"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="planning.start_date"
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
                                @click="$refs.start_date.save(planning.start_date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                     <div>
                        <p class="planning_text-label">Date de fin</p>
                        <v-menu
                            ref="end_date"
                            v-model="end_menu"
                            :close-on-content-click="false"
                            :return-value.sync="planning.end_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="end_date"
                                dense
                                solo
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                :disabled="!editing"
                                v-bind="attrs"
                                v-on="on"
                                :hide-details="true"
                                class="mb-2"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="planning.end_date"
                            no-title
                            scrollable
                            :min="planning.start_date"
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
                                @click="$refs.end_date.save(planning.end_date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                      <div>
                        <p class="planning_text-label">taper date</p>
                        <v-select
                            dense
                            :items="items"
                            label="Solo field"
                            solo
                             :disabled="!editing"
                            v-model="planning.start_Date_Type"
                            item-text="text"
                            item-value="value"
                            :hide-details="true"
                            class="text-capitalize mb-2"
                        ></v-select>
                    </div>
                    <div class="mt-8">
                        <v-btn 
                            class="float-right mt-4" 
                            @click="destroy"
                            icon
                            :disabled="!$canAccess()"
                        >
                            <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                        <v-btn 
                            class="float-right mt-4 mr-2" 
                            v-if="!editing"
                            @click="editing=true"
                            icon
                            :disabled="!$canAccess()"
                        >
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                         <v-btn 
                            class="float-right mt-4 mr-2" 
                            color="success"
                            v-else
                            @click="save"
                            icon
                            :disabled="!$canAccess()"
                        >
                            <v-icon>mdi-download-outline</v-icon>
                        </v-btn>
                    </div>
                </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
import { Delete, Update } from "@/repositories/planning.api";
export default {
    props:{
        data:{
            required: true,
            type: Object,
        },
    },
    data(){
        return {
            editing:false,
            start_menu:false,
            end_menu:false,
            employee:{},
            planning:{},
            center:{},
            items: [
                {value: 1, text:'Toute la journée'},
                {value: 2, text:'Demi-journée-matin'},
                {value: 3, text:'Demi-journée-après-midi'},
            ],
        }
    },
    computed: {
        start_date() {
            return this.$datePickerDate(this.planning.start_date)
        },
        end_date() {
            return this.$datePickerDate(this.planning.end_date)
        }
    },
    created(){
        console.log(this.data,'data')
        this.initialize()
    },
    methods: {
        initialize(){
            this.planning = JSON.parse(JSON.stringify(this.data.planning))
            this.employee = this.data.employee
            this.center = this.data.center

            this.planning.start_date = this.$datePickerDate(this.planning.start_date)
            this.planning.end_date = this.$datePickerDate(this.planning.end_date)
        },
        save(){
            Update(this.planning).then(({data}) => {
                this.$arraysplicer(this.data.planning, this.employee.planning)
                this.$arrayupdater(this.planning, this.employee.planning)
                this.$toast.success(data.message)
                this.$emit('close')
                this.$emit('success')
            })
        },
        destroy(){
            Delete(this.planning.id).then(({data}) =>{
                this.$toast.success(data.message)
                this.$emit('success')
                this.$emit('close')
            })
        }
    }
}
</script>
<style scoped>
.item-sub{
    letter-spacing:1px;
  font-size:12px !important;
    text-transform: capitalize;
}
.emp-email{
    opacity:0.5;
}
.emp-name{
    letter-spacing:1px;
}
</style>