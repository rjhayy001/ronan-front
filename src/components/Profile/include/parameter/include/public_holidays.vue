<template>
    <div class="component_container" >
        <div class="title_head">
            <h2 class="text_fw pad_header">
                Jours fériés
            </h2>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-4" 
                @click="addHolidays=true" 
                solo 
                text 
                icon
            >
                <v-icon size="30px">
                    mdi-plus
                </v-icon>
            </v-btn>
        </div>
        <div class="content_padding">
            <div v-for="(holiday, index) in holidays" :key="index" style="display: flex; ">
                <div class="parameter_data">
                    <div class="icon">
                        <h4 class="text_normal">
                            {{holiday.name}}
                        </h4>
                        <h4 class="text_normal text_g">
                            {{$DateWithMonthTextfr(holiday.date)}}
                        </h4>
                    </div>
                </div>
                <v-spacer></v-spacer>
                <v-btn 
                    class="mr-5"
                    @click="removeHolidays(holiday)" 
                    solo 
                    text 
                    icon
                >
                    <v-icon color="red">
                        mdi-delete-outline
                    </v-icon>
                </v-btn>
            </div>
        </div>
        <v-dialog
            v-model="addHolidays"
            width="800"
            class="menu_"
            @click:outside="addHolidays=false || clear()"
        >
            <v-card>
                <v-form
                    ref="form"
                    lazy-validation
                >
                    <v-container class="">
                        <v-row class="dialog_content">
                            <div class="head_content">
                                <div>
                                    <v-icon class="icon" color="#005075">
                                        mdi-plus
                                    </v-icon>
                                </div>
                                <div class="ml-3 title_head">
                                    <h3 class="text">
                                        <p>
                                            AJOUTER UN NOUVEAU JOURS FÉRIÉS
                                        </p>
                                    </h3>
                                </div>
                            </div>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    :rules="nameRules"
                                    v-model="payload.name"
                                    label="Nom"
                                    placeholder="Nouveau jour férié nom"
                                    prepend-inner-icon="mdi-note-edit-outline"
                                    dense
                                    clearable
                                ></v-text-field>
                            </v-col>
                            <v-col class="pb-1" cols="12">
                                <v-menu
                                    ref="start_date"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :rules="dateRules"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn large v-on="on" v-bind="attrs" width="100%" class="calendar_field mb-2">
                                            <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                            {{payload.date ? $DateWithMonthTextfr(payload.date): 'choose start date'}}
                                        </v-btn>
                                    </template>
                                    <v-date-picker
                                        v-model="payload.date"
                                        :rules="dateRules"
                                        no-title
                                        scrollable
                                        locale="fr"
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.start_date.save(payload.date)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col class="d-flex" cols="12">
                                <v-btn 
                                    @click.prevent="addHolidays=false" 
                                    @click="clear()"
                                    height="50px" 
                                    color="rgb(238 238 238)"
                                    width="49%" 
                                    class=""
                                >
                                    ANNULER
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="saveHolidays()"
                                    width="49%"
                                    dark
                                    height="50px"
                                    color="#005075!important"
                                >
                                    VALIDER
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { GetAllHolidays, CreateHolidays, RemoveHolidays } from "@/repositories/holidays.api"
export default {
    data(){
        return{
            menu: false,
            date: "",
            holidays:[],
            addHolidays: false,
            payload: {
                name: '',
                date: '',
            },
        }
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            GetAllHolidays().then(({data}) =>{
                this.holidays = data
                console.log(data,"holidays")
            })
        },
        saveHolidays() {
            this.$refs.form.validate()
            if(this.$refs.form.validate() == true && this.payload.date!='' || null) {
                CreateHolidays(this.payload).then(({data}) => {
                    this.$arrayupdater(data, this.holidays)
                    this.addHolidays = false
                    this.$toast.success('added succesfullly')
                    this.clear()
                })
            }else{
                this.$toast.error('Do not leave Empty Field')
            }
        },
        clear() {
            this.$refs.form.resetValidation();
            this.payload.name=""
            this.payload.date=""
        },
        removeHolidays(holiday) {
            let message = `Are you sure you want to DELETE HOLIDAY ${holiday.name} ?`
            this.$root.$confirm(message,'#ff5252')
                .then(result => {
                    if(result)(
                        RemoveHolidays(holiday.id).then(() =>{
                            this.$arraysplicer(holiday,this.holidays)
                            this.$toast.success("Successfully removed!");
                        })
                    )
                })
            
        }
    }
}
</script>