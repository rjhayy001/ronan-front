<template>
    <v-card rounded>
        <v-toolbar dense flat class="py-4">
            <v-toolbar-title>Créer Planification</v-toolbar-title>
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
                                <v-list-item-title class="item-title">{{center.name}}</v-list-item-title>
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
                        <p class="text-label">Date de début</p>
                        <v-menu
                            ref="start_date"
                            v-model="start_menu"
                            :close-on-content-click="false"
                            :return-value.sync="payload.start_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="payload.start_date"
                                dense
                                solo
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :hide-details="true"
                                class="mb-2"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="payload.start_date"
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
                                @click="$refs.start_date.save(payload.start_date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div>
                        <p class="text-label">taper</p>
                        <v-select
                            dense
                            :items="items"
                            label="Solo field"
                            solo
                             v-model="payload.start_date_Type"
                            item-text="text"
                            item-value="value"
                            :hide-details="true"
                            class="text-capitalize mb-2"
                        ></v-select>
                    </div>
                     <div>
                        <p class="text-label">Date de fin</p>
                        <v-menu
                            ref="end_date"
                            v-model="end_menu"
                            :close-on-content-click="false"
                            :return-value.sync="payload.end_date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="payload.end_date"
                                dense
                                solo
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                :hide-details="true"
                                class="mb-2"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="payload.end_date"
                            no-title
                            scrollable
                            :min="payload.start_date"
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="end_menu = false"
                            >
                                ANNULER
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.end_date.save(payload.end_date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div>
                        <p class="text-label">taper</p>
                        <v-select
                            dense
                            :items="items"
                            label="Roles"
                            :hide-details="true"
                            solo
                            v-model="payload.end_Date_Type"
                            item-text="text"
                            item-value="value"
                            class="text-capitalize"
                        ></v-select>
                    </div>
                    <div>
                        <v-btn 
                            class="float-right mt-4" 
                            small color="primary" 
                            dark 
                            @click="save"
                        >
                            valider
                        </v-btn>
                    </div>
                </v-form>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script>
import { Insert } from "@/repositories/planning.api";
export default {
    props:{
        data:{
            required: true,
            type: Object,
        },
    },
   
    created(){
        this.initialize()
    },
    data(){
        return {
            start_menu:false,
            end_menu:false,
            employee:{},
            center:{},
            payload:{
                start_date:'',
                end_date:'',
                start_date_Type:1,
                end_Date_Type:1,
                center_id:'',
                user_id: '',

            },
            items: [
                {value: 1, text:'Toute la journée'},
                {value: 2, text:'Demi-journée-matin'},
                {value: 3, text:'Demi-journée-après-midi'},
            ],
        }
    },
    methods:{
        initialize(){
            console.log(this.data)
            this.payload.start_date = this.data.date
            this.payload.end_date = this.data.date
            this.employee = this.data.employee
            this.center = this.data.center
            this.payload.center_id = this.center.id
            this.payload.user_id = this.employee.id
        },
        save(){
            if(!this.checkForm()){
                Insert(this.payload).then(({data}) =>{
                    // this.$arrayupdater(data.data, this.employee.planning)
                    // this.$toast.success(data.message)
                    this.$emit('success')
                    this.$emit('close')
                    // console.log(data.data)
                    console.log(data, 'plss work')
                })
            }
        },
        checkForm(){
            if (this.payload.start_date == '' || this.payload.end_date == '' ){
                this.$toast.error('all fields are required')
                return true
            }
            return false
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