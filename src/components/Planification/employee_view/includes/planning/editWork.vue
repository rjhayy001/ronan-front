<template>
    <v-dialog v-model="dialog" width="700" @click:outside="$emit('close')" class="card-radius">
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
                            <div class="mt-4">
                                <v-select
                                    dense
                                    :items="centers"
                                    solo
                                    item-text="name"
                                    item-value="id"
                                    :hide-details="true"
                                    v-model="planning.center_id"
                                    class="text-capitalize mb-2"
                                ></v-select>
                                <p class="center_hint">le centre ne peut pas etre vide</p>
                            </div>
                        </div>
                    </v-col>
                    <v-col
                        md="7"
                        xs="12"
                    >
                    <v-form ref="addForm">
                        <div>
                            <p class="text-label">start date</p>
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
                                    Cancel
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
                            <p class="text-label">end date</p>
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
                                    Cancel
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
                        <div class="mt-8">
                            <v-btn 
                                class="float-right mt-4" 
                                @click="destroy"
                                icon
                            >
                                <v-icon>mdi-delete-outline</v-icon>
                            </v-btn>
                            <v-btn 
                                class="float-right mt-4 mr-2" 
                                v-if="!editing"
                                @click="editing=true"
                                icon
                            >
                                <v-icon>mdi-pencil-outline</v-icon>
                            </v-btn>
                            <v-btn 
                                class="float-right mt-4 mr-2" 
                                color="success"
                                v-else
                                @click="save"
                                icon
                            >
                                <v-icon>mdi-download-outline</v-icon>
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
import { Delete, Update } from "@/repositories/planning.api";
export default {
    props:{
        data:{
            required: true,
            type: Object,
        },
        dialog:{
            required: true,
            type: Boolean,
        }
    },
    data(){
        return {
            editing:false,
            start_menu:false,
            end_menu:false,
            employee:{},
            planning:{},
            centers:[]
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
            this.centers = this.data.employee.centers

            this.planning.start_date = this.$datePickerDate(this.planning.start_date)
            this.planning.end_date = this.$datePickerDate(this.planning.end_date)
        },
        save(){
            Update(this.planning).then(({data}) => {
                this.$arraysplicer(this.data.planning, this.employee.planning)
                this.$arrayupdater(this.planning, this.employee.planning)
                this.$toast.success(data.message)
                this.$emit('close')
            })
        },
        destroy(){
            Delete(this.planning.id).then(({data}) =>{
                this.$arraysplicer(this.planning, this.employee.planning)
                this.$toast.success(data.message)
                this.$emit('close')
            })
        }
    }
}
</script>
<style scoped>
.text-label{
    margin-bottom: 3px;
    text-transform: capitalize;
    letter-spacing:1.2px;
    font-size: 15px;
}
.item-title{
  font-size:17px !important;
  text-transform: uppercase;
  letter-spacing:1px;
  width: 160px !important;

}
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