<template>
    <div class="component_container">
        <div class="title_head">
            <h2 class="text_fw pad_header">
                Paramètres du compte général
            </h2>
        </div>
        <div>
            <div class="container">
                <div class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Nom
                        </h4>
                    </div>
                        <div 
                            v-if="name" 
                            class="if_true"
                            ref="form"
                        >
                            <div>
                                <h4 class="text">
                                    Votre nom sera modifié lorse de l'enregistrement.
                                </h4>
                            </div>
                            <div class="vertical_center">
                                <h4 class="label">
                                    Prénom
                                </h4>
                                <v-text-field 
                                    :rules="generalRules.firstName"
                                    class="text_field_margin" 
                                    outlined 
                                    dense 
                                    v-model="updated_user.first_name"
                                    height="20px"
                                ></v-text-field>
                            </div>
                            <div class="vertical_center">
                                <h4 class="label">
                                    Nom de famille
                                </h4>
                                <v-text-field 
                                    :rules="generalRules.lastName"
                                    class="text_field_margin" 
                                    outlined 
                                    dense 
                                    v-model="updated_user.last_name"
                                    height="20px"
                                ></v-text-field>
                            </div>
                            <div class="note">
                                <h4 class="text_note">
                                    <strong>
                                        Veuillez noter:
                                    </strong>  
                                    Lors de l'enregistrement, vous ne pouvez pas annuler 
                                    l'action et récupérer les informations passées.
                                </h4>
                            </div>
                            <div class="button">
                                <v-btn 
                                    @click="name=false" 
                                    :ripple="false" 
                                    outlined 
                                    color="#bdbdbd"
                                >
                                    <h5 class="txt">
                                        Annuler
                                    </h5>
                                </v-btn>
                                <v-btn 
                                    @click="updateUser();name=false"
                                    class="btn" 
                                    color="white!important"
                                >
                                    <h5 class="txt">
                                        Sauvegarder les modifications
                                    </h5>
                                </v-btn>
                            </div>
                        </div>

                        <div 
                            v-if="!name"
                            class="if_false"
                        >
                            <div>
                                <h4 class="text_fw title_field">
                                    {{user.full_name}}
                                </h4>
                            </div>
                            <v-spacer></v-spacer>
                            <div class="container_action"> 
                                <v-btn 
                                    @click="name=true" 
                                    block 
                                    :ripple="false" 
                                    id="no-background-hover" 
                                    text 
                                    solo 
                                    type="button" 
                                    class="edit_button"
                                >
                                    <h4 class="text">Editer</h4>
                                </v-btn>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div>
            <div class="container">
                <div class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Contact
                        </h4>
                    </div>
                    <div 
                        v-if="contact" 
                        class="if_true"
                    >
                        <div>
                            <h4 class="text title_color">
                                Numéro de contact actuel
                            </h4>
                        </div>
                        <div class="vertical_center">
                            <h4 class="label label_padding">
                                <strong>
                                    {{user.mobile}}
                                </strong>
                            </h4>
                        </div>
                        <div class="vertical_center">
                            <h4 class="label">
                                Nouveau numéro
                            </h4>
                            <v-text-field 
                                class="text_field_margin" 
                                outlined  
                                dense 
                                type="number"
                                v-model="updated_user.mobile"
                                height="20px"
                            ></v-text-field>
                        </div>
                        <div class="button">
                            <v-btn 
                                @click="contact=false" 
                                :ripple="false" 
                                outlined 
                                color="#bdbdbd"
                            >
                                <h5 class="txt">
                                    Annuler
                                </h5>
                            </v-btn>
                            <v-btn 
                                color="white!important" 
                                class="btn"
                                @click="updateUser();contact=false"
                            >
                                <h5 class="txt">
                                    Sauvegarder les modifications
                                </h5>
                            </v-btn>
                        </div>
                    </div>
                    <div 
                        v-else 
                        class="if_false"
                    >
                        <div>
                            <h4 class="text_fw title_field">
                                {{user.mobile}}
                            </h4>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="container_action"> 
                            <v-btn 
                                @click="contact=true" 
                                block 
                                :ripple="false" 
                                id="no-background-hover" 
                                text 
                                solo 
                                type="button" 
                                class="edit_button"
                            >
                                <h4 class="text">Editer</h4>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="container">
                <div class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Adresse postale
                        </h4>
                    </div>
                    <div 
                        v-if="address" 
                        class="if_true"
                    >
                        <div>
                            <h4 class="text title_color">
                                Adresse postale actuelle
                            </h4>
                        </div>
                        <div class="vertical_center">
                            <h4 class="padding_top label_padding">
                                {{user.address}}
                            </h4>
                        </div>
                        <div class="vertical_center">
                            <h4 class="label">
                                Nom de rue
                            </h4>
                            <v-text-field 
                                class="text_field_margin"
                                outlined 
                                dense 
                                v-model="updated_user.address"
                                height="20px"
                            ></v-text-field>
                        </div>
                        <div class="vertical_center">
                            <h4 class="label">
                                Code de postal
                            </h4>
                            <v-text-field 
                                class="text_field_margin" 
                                outlined 
                                dense 
                                v-model="updated_user.zip_code"
                                height="20px"
                            ></v-text-field>
                        </div>
                        <div class="vertical_center">
                            <h4 class="label">
                                Ville
                            </h4>
                            <v-text-field 
                                class="text_field_margin" 
                                outlined 
                                dense 
                                v-model="updated_user.city"
                                height="20px"
                            ></v-text-field>
                        </div>
                        <div class="note">
                            <h4 class="text_note">
                                <strong>
                                    Veuillez noter:
                                </strong>  
                                Lors de l'enregistrement, vous ne pouvez pas annuler 
                                l'action et récupérer les informations passées.
                            </h4>
                        </div>
                        <div class="button">
                            <v-btn 
                                @click="address=false" 
                                :ripple="false" 
                                outlined 
                                color="#bdbdbd"
                            >
                                <h5 class="txt">
                                    Annuler
                                </h5>
                            </v-btn>
                            <v-btn 
                                color="white!important" 
                                class="btn"
                            >
                                <h5 class="txt">
                                    Sauvegarder les modifications
                                </h5>
                            </v-btn>
                        </div>
                    </div>
                    <div 
                        v-else 
                        class="if_false"
                    >
                        <div>
                            <h4 class="text_fw title_field">
                               {{user.address}}
                            </h4>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="container_action"> 
                            <v-btn 
                                @click="address=true" 
                                block 
                                :ripple="false" 
                                id="no-background-hover" 
                                text 
                                solo 
                                type="button" 
                                class="edit_button"
                            >
                                <h4 class="text">Editer</h4>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="container">
                <div class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Date de naissance
                        </h4>
                    </div>
                    <div 
                        v-if="birthday" 
                        class="if_true"
                    >
                        <div>
                            <h4 class="text">
                                {{$DateWithMonthTextfr(user.birth_date)}}
                            </h4>
                        </div>
                        <div class="vertical_center date_width">
                            <v-menu
                                ref="start_date"
                                v-model="start_menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        solo 
                                        text 
                                        v-on="on" 
                                        v-bind="attrs" 
                                        width="100%" 
                                        class="calendar_btn"
                                    >
                                        <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                        <span class="text">
                                            {{date ? date : 'Choissisez la date'}}
                                        </span>
                                    </v-btn>
                                </template>
                                <v-date-picker
                                    v-model="user.birth_date"
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
                                        @click="$refs.start_date.save(user.birth_date)"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </div>
                        <div class="button">
                            <v-btn 
                                @click="birthday=false" 
                                :ripple="false" 
                                outlined 
                                color="#bdbdbd"
                            >
                                <h5 class="txt">
                                    Annuler
                                </h5>
                            </v-btn>
                            <v-btn 
                                color="white!important" 
                                class="btn"
                            >
                                <h5 class="txt">
                                    Sauvegarder les modifications
                                </h5>
                            </v-btn>
                        </div>
                    </div>
                    <div 
                        v-else 
                        class="if_false"
                    >
                        <div>
                            <h4 class="text_fw title_field">
                                {{$DateWithMonthTextfr(user.birth_date)}}
                            </h4>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="container_action"> 
                            <v-btn 
                                @click="birthday=true" 
                                block 
                                :ripple="false" 
                                id="no-background-hover" 
                                text 
                                solo 
                                type="button" 
                                class="edit_button"
                            >
                                <h4 class="text">Editer</h4>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="container">
                <div class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Notification
                        </h4>
                    </div>
                    <div class="vertical_center">
                        <div>
                            <h4 class="text_fw">
                                <strong>
                                    Paramètres de notification push
                                </strong>
                            </h4>
                            <div class="notification">
                                <h4 class="current_status">
                                    Statut actuel :
                                </h4>
                                <h4 class="assets">
                                    Actif {{updated_user.isSilent_onPush}}
                                </h4>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div> 
                             <v-switch
                                v-model="updated_user.isSilent_onPush"
                            ></v-switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { UpdateInfo } from '@/repositories/employee.api'
export default {
    data(){
        return{
            switch1: true,
            start_menu:false,
            name: false,
            contact:false,
            address: false,
            birthday: false,
            notification: false,
            date: "",
            updated_user:{}
        }
    },
    computed: {
        user() {
            return this.$store.getters['user']
        },
    },
    methods: {
        initialize(){
            this.updated_user = JSON.parse(JSON.stringify(this.$store.getters['user']))
            this.updated_user.isSilent_onPush = this.updated_user.isSilent_onPush == 1 ? true : false
        },
        updateUser(){
            console.log(this.updated_user, 'test')
            UpdateInfo(this.updated_user.id, this.updated_user).then(({data}) =>{
                this.$store.state.user= this.updated_user
                console.log(data)
                this.initialize()
                this.$toast.success('Updated Succesfullly')

            })
        }
    },
    created(){
        this.initialize()
        console.log("user", this.updated_user)
    }
}
</script>