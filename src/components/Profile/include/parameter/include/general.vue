<template>
    <div class="component_container">
        <div class="title_head">
            <h2 class="text_fw pad_header">
                Paramètres du compte général
            </h2>
        </div>
        <div>
            <div class="container">
                <v-card flat class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Nom
                        </h4>
                    </div>
                        <v-form 
                            v-if="name" 
                            class="if_true parameter_field"
                            ref="form"
                        >
                            <div>
                                <h4 class="text">
                                    Votre nom sera modifié lors de l'enregistrement.
                                </h4>
                            </div>
                            <div class="vertical_center">
                                <h4 class="label">
                                    Prénom
                                </h4>
                                <v-text-field 
                                    :rules="general.general_name.firstName"
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
                                    :rules="general.general_name.lastName"
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
                                    @click="updateUser('name')"
                                    class="btn" 
                                    color="white!important"
                                >
                                    <h5 class="txt">
                                        Sauvegarder les modifications
                                    </h5>
                                </v-btn>
                            </div>
                        </v-form>

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
                </v-card>
            </div>
        </div>
        <div>
            <div class="container">
                <v-card flat class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Contact
                        </h4>
                    </div>
                    <v-form 
                        v-if="contact" 
                        class="if_true  parameter_field"
                        ref="form"
                    >
                        <div>
                            <h4 class="text title_color">
                                Numéro de contact actuel
                            </h4>
                        </div>
                        <div class="vertical_center" style="height: 4vh!important;">
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
                                :rules="general.general_contact.contact"
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
                                @click="updateUser('contact')"
                            >
                                <h5 class="txt">
                                    Sauvegarder les modifications
                                </h5>
                            </v-btn>
                        </div>
                    </v-form>
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
                </v-card>
            </div>
        </div>
        <div>
            <div class="container">
                <v-card flat class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Adresse postale
                        </h4>
                    </div>
                    <v-form 
                        v-if="address" 
                        class="if_true  parameter_field"
                        ref="form"
                    >
                        <div>
                            <h4 class="text title_color">
                                Adresse postale actuelle
                            </h4>
                        </div>
                        <div class="vertical_center" style="height: 4vh!important;">
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
                                :rules="general.general_mailing_address.address"
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
                                :rules="general.general_mailing_address.code_postal"
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
                                :rules="general.general_mailing_address.citys"
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
                                @click="updateUser('address')"
                            >
                                <h5 class="txt">
                                    Sauvegarder les modifications
                                </h5>
                            </v-btn>
                        </div>
                    </v-form>
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
                </v-card>
            </div>
        </div>
        <div>
            <div class="container">
                <v-card flat class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Date de naissance
                        </h4>
                    </div>
                    <v-form 
                        v-if="birthday" 
                        class="if_true parameter_field"
                        ref="form"
                    >
                        <div>
                            <h4 class="text">
                                {{$DateWithMonthTextfr(user.birth_date)}}
                            </h4>
                        </div>
                        <div class="vertical_center date_width" style="height: 4vh!important;">
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
                                @click="updateUser('birthday')"
                            >
                                <h5 class="txt">
                                    Sauvegarder les modifications
                                </h5>
                            </v-btn>
                        </div>
                    </v-form>
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
                </v-card>
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
                                <h4 class="text-capitalize">
                                    <span :style="{ color: updated_user.isSilent_onPush ? 'green' : 'red' }" >
                                         {{updated_user.isSilent_onPush ? 'Actif' : 'Inactif'}}    
                                    </span>  
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
            updated_user:{
                
            },
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
            this.updated_user['image'] = ''
            this.updated_user['isSilent_onPush'] = this.updated_user.isSilent_onPush == 1 ? true : false
        },
        updateUser(hint = 'name'){
            this.$refs.form.validate()
            if(this.$refs.form.validate() == true) {
                UpdateInfo(this.updated_user.id, this.updated_user).then(({data}) =>{
                    this.$store.state.user= this.updated_user
                    console.log(data, 'info')
                    this.$toast.success('Updated Succesfullly')
                    this.$nextTick(function () {
                        this.initialize()
                        this.$forceUpdate();
                    })
                    this[hint] =false
                })
            }else{
                this.$toast.error('Do not leave empty field')
            }
        }
    },
    created(){
        this.initialize()
    }
}
</script>