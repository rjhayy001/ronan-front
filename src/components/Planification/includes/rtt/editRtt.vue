<template>
    <v-dialog v-model="dialog" width="600" @click:outside="close" class="card-radius">
        <v-card rounded>
            <v-toolbar dense flat class="py-4">
                <v-toolbar-title>Mettre à jour RTT</v-toolbar-title>
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
                            <p class="planning_text-label">Date de mise à jour</p>
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
                                    <v-text-field
                                        v-model="rtt.date"
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
                                v-model="rtt.date"
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
                                    @click="$refs.date.save(rtt.date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div>
                            <p class="planning_text-label">Heure de début</p>
                            <v-menu
                                ref="start_time"
                                v-model="start_time"
                                :close-on-content-click="false"
                                :return-value.sync="rtt.start_time"
                                transition="scale-transition"
                                offset-y
                                :nudge-right="40"
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="rtt.start_time"
                                        dense
                                        solo
                                        prepend-inner-icon="mdi-clock-outline"
                                        readonly
                                        :disabled="!editing"
                                        v-bind="attrs"
                                        v-on="on"
                                        :hide-details="true"
                                        class="mb-2"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="start_time"
                                    format="24hr"
                                    :landscape="$vuetify.breakpoint.mdAndUp"
                                    v-model="rtt.start_time"
                                    @click:minute="$refs.start_time.save(rtt.start_time)"
                                ></v-time-picker>
                            </v-menu>
                        </div>
                        <div>
                            <p class="planning_text-label">Heure de fin</p>
                            <v-menu
                                ref="end_time"
                                v-model="end_time"
                                :close-on-content-click="false"
                                :return-value.sync="rtt.end_time"
                                transition="scale-transition"
                                offset-y
                                :nudge-right="40"
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="rtt.end_time"
                                        dense
                                        solo
                                        prepend-inner-icon="mdi-clock-outline"
                                        readonly
                                        :disabled="!editing"
                                        v-bind="attrs"
                                        v-on="on"
                                        :hide-details="true"
                                        class="mb-2"
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="end_time"
                                    format="24hr"
                                    :landscape="$vuetify.breakpoint.mdAndUp"
                                    v-model="rtt.end_time"
                                    @click:minute="$refs.end_time.save(rtt.end_time)"
                                ></v-time-picker>
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
import { UpdateRtt, DeleteRtt } from '@/repositories/rtt.api'
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
            editing:false,
            date:false,
            start_time:false,
            end_time:false,
            rtt:{},
            employee:{},
        }
    },
    created(){
        this.initialize()
    },
    methods: {
        initialize(){
            this.rtt = JSON.parse(JSON.stringify(this.data.rtt))
            this.employee = this.data.employee
            console.log(this.rtt)
        },
        close(){
            this.$emit('close')
        },
        destroy(){
            DeleteRtt(this.rtt.id).then(() =>{
                this.$store.commit('UPDATE_NEW',true)
                this.$toast.success("Successfully removed!");
                this.$emit('success')
                this.close()
            })
        },
        save(){
            UpdateRtt(this.rtt.id, this.rtt).then(({data}) => {
                console.log(data, 'rtts')
                this.$emit('success')
                this.close()
                this.$toast.success('successfully updated')
                this.$store.commit('UPDATE_NEW',true)
            })
        }
    }
}
</script>
<style scoped>

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