<template>
    <v-dialog v-model="dialog" width="600" @click:outside="close" class="card-radius">
        <v-card rounded :loading="loading" :disabled="loading">
            <template slot="progress">
                <v-progress-linear color="orange" indeterminate></v-progress-linear>
            </template>
            <v-toolbar dense flat class="py-4">
                <v-toolbar-title>Mettre à jour les vacances</v-toolbar-title>
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
                                        :src="data.employee.image"
                                        alt="John"
                                    >
                                </v-avatar>
                            </div>
                            <span class="emp-name mt-10">{{data.employee.full_name}}</span>
                            <span class="emp-email">{{data.employee.email}}</span>
                        </div>
                    </v-col>
                    <v-col
                        md="6"
                        xs="12"
                    >
                        <div>
                        <p class="text-label">Date de début</p>
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
                            <v-text-field
                                v-model="holiday.start_date"
                                dense
                                solo
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                :disabled="!editing"
                                v-on="on"
                                :hide-details="true"
                                class="mb-2"
                            ></v-text-field>
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
                                Annuler
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
                        </div>
                        <div>
                            <p class="text-label">Date de fin</p>
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
                                <v-text-field
                                    v-model="holiday.end_date"
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
                                v-model="holiday.end_date"
                                no-title
                                scrollable
                                :min="holiday.start_date"
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
                                    @click="$refs.end_date.save(holiday.end_date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div class="mt-2">
                            <v-btn 
                                class="float-right mt-4" 
                                icon
                                @click="destroy"
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
import { DeleteHoliday, Updateholiday } from '@/repositories/holidays.api'
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
        return {
            loading:false,
            editing:false,
            start_menu:false,
            end_menu:false,
            holiday:{},
            employee:{},
        }
    },
    created(){
        this.initialize()
    },
    methods: {
        initialize(){
            console.log(this.data,'test')
            this.holiday = JSON.parse(JSON.stringify(this.data.holiday))
            this.employee = this.data.employee
            console.log(this.holiday)
        },
        close(){
            this.$emit('close')
        },
        destroy(){
            this.loading = true
            DeleteHoliday(this.holiday.id).then(({data}) =>  {
                this.$arraysplicer(this.holiday, this.employee.holidays)
                this.loading = false
                this.close()
                this.$toast.success(data.message)
            })
        },
        save(){
            Updateholiday(this.holiday.id, this.holiday).then(({data}) =>{
                this.$toast.info(data.message)
                this.close()
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