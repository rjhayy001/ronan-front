<template>
    <div class="component_container">
        <div class="title_head">
            <h2 class="text_fw pad_header">
                Sécurité et connexion
            </h2>
        </div>
        <div>
            <div class="container">
                <div class="content">
                    <div class="title_name">
                        <h4 class="text_fw pad_subs">
                            Changer l'e-mail
                        </h4>
                    </div>
                    <div 
                        v-if="email" 
                        class="if_true"
                    >
                        <v-card flat>
                            <v-form  
                                ref="form"
                                lazy-validation
                                style="background:#eeeeee"
                            >
                                <div class="security_connection">
                                    <v-icon color="yellow" class="icon-alert">
                                        mdi-alert
                                    </v-icon>
                                    <div>
                                        <h4 class="text">
                                            Vous allez maintenant changer votre email.
                                        </h4>
                                        <h4 class="text text_color">
                                            Vous ne perdrez aucune donnée lors de 
                                            la modification de votre e-mail. 
                                            L'action ne peut pas être annulée
                                        </h4>
                                    </div>
                                </div>
                                <div v-if="code">
                                    <div class="vertical_center">
                                        <h4 class="label">
                                            Code de confirmation
                                        </h4>
                                        <v-text-field 
                                            :rules="security_connection.change_email.code_confirmation"
                                            label="Code de confirmation"
                                            placeholder="Code de confirmation"
                                            outlined
                                            class="text_field_margin" 
                                            dense 
                                            height="20px!important"
                                        ></v-text-field>
                                    </div>
                                    <div class="button button-code">
                                        <v-btn 
                                            @click="email=false"
                                            :ripple="false" 
                                            outlined 
                                            color="#bdbdbd"
                                        >
                                            <h5 class="txt">
                                                Annuler
                                            </h5>
                                        </v-btn>
                                        <v-btn 
                                            class="btn" 
                                            color="white!important"
                                        >
                                            <h5 class="txt">
                                                Sauvegarder les modifications
                                            </h5>
                                        </v-btn>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="vertical_center">
                                        <h4 class="label">
                                            Nouveau Courriel
                                        </h4>
                                        <v-text-field
                                            :rules="security_connection.change_email.new_email"
                                            label="Nouveau Courriel"
                                            placeholder="Nouveau Courriel"
                                            outlined
                                            class="text_field_margin" 
                                            dense 
                                            height="20px!important"
                                        ></v-text-field>
                                    </div>
                                    <div class="button_container">
                                        <v-btn class="btn-btn" style="position:absolute; top:0px" outlined text solo @click="clickCode()">
                                            <h5 class="txt text-text">
                                                Vous avez déjà le code ?
                                            </h5>
                                        </v-btn>
                                    </div>
                                    <div class="button button-code">
                                        <v-btn 
                                            @click="email=false" 
                                            :ripple="false" 
                                            outlined 
                                            color="#bdbdbd"
                                        >
                                            <h5 class="txt">
                                                Annuler
                                            </h5>
                                        </v-btn>
                                        <v-btn 
                                            class="btn" 
                                            color="white!important"
                                        >
                                            <h5 class="txt">
                                                Sauvegarder les modifications
                                            </h5>
                                        </v-btn>
                                    </div>
                                </div>
                            </v-form>
                        </v-card>
                    </div>
                    <div 
                        v-else
                        class="if_false"
                    >
                        <div>
                            <h4 class="text_fw title_field">
                                ronan@admin.com
                            </h4>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="container_action"> 
                            <v-btn 
                                @click="email=true" 
                                block 
                                id="no-background-hover" 
                                text 
                                solo 
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
                            Changer le mot de passe
                        </h4>
                    </div>
                    <div 
                        v-if="change" 
                        class="if_true"
                    >
                        <div class="security_connection">
                            <v-icon color="yellow" class="icon-alert">
                                mdi-alert
                            </v-icon>
                            <div>
                                <h4 class="text">
                                    Vous allez modifier votre mot de passe.
                                </h4>
                                <h4 class="text text_color">
                                    Lors de la soumission, le système mettra à jour les informations 
                                    d'identification enregistrées dans votre appreil. 
                                    L'action ne peut pas être annulée
                                </h4>
                            </div>
                        </div>
                        <div class="vertical_center vertical-margin">
                            <h4 class="label">
                                Ancien mot de passe
                            </h4>
                            <v-text-field 
                                :rules="security_connection.old_password"
                                :append-icon="old_password ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="old_password = !old_password"
                                :type="old_password ? 'text' : 'password'"
                                label="Ancien mot de passe"
                                placeholder="Ancien mot de passe"
                                class="text_field_margin" 
                                outlined  
                                dense 
                                height="20px"
                            ></v-text-field>
                        </div>
                        <div class="vertical_center vertical-margin">
                            <h4 class="label">
                                Nouveau mot de passe
                            </h4>
                            <v-text-field
                                :rules="security_connection.new_password"
                                :append-icon="new_password ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="new_password = !new_password"
                                :type="new_password ? 'text' : 'password'"
                                label="Nouveau mot de passe"
                                placeholder="Nouveau mot de passe"
                                class="text_field_margin" 
                                outlined  
                                dense 
                                height="20px"
                            ></v-text-field>
                        </div>
                        <div class="vertical_center vertical-margin">
                            <h4 class="label label-spacing">
                                Confirmation du nouveau mot de passe
                            </h4>
                            <v-text-field
                                :rules="security_connection.confirm_password"
                                :append-icon="confirm_new_password ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="confirm_new_password = !confirm_new_password"
                                :type="confirm_new_password ? 'text' : 'password'" 
                                label="Confirmation du nouveau mot de passe"
                                placeholder="Confirmation du nouveau mot de passe"
                                class="text_field_margin" 
                                outlined  
                                dense 
                                height="20px"
                            ></v-text-field>
                        </div>
                        <div class="button button-pad">
                            <v-btn 
                                @click="change=false" 
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
                            <v-text-field disabled readonly flat solo class="text_fw title_field pass_text" type="password" :value="password" ></v-text-field>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="container_action"> 
                            <v-btn 
                                @click="change=true" 
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
                            Clé de validation administrateur
                        </h4>
                    </div>
                    <div 
                        class="if_true"
                    >
                        <div class="security_connection">
                            <v-icon color="green" class="icon-shield">
                                mdi-shield-half-full
                            </v-icon>
                            <div class="label-spacing">
                                <h4 class="text">
                                    Clé administrateur
                                </h4>
                                <h4 class="text text_color text-2">
                                    Attention : Cette clé permet de réinitialiser les congés de l'utilisateur
                                </h4>
                            </div>
                            <div 
                                v-if="!validation_key"
                                class="if_false"
                            >
                                <v-spacer></v-spacer>
                                <div class="container_action"> 
                                    <v-btn 
                                        @click="validation_key=true" 
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
                        <div v-if="validation_key">
                            <div class="vertical_center vertical-margin">
                                <h4 class="label">
                                    Ancienne clé d'administrateur
                                </h4>
                                <v-text-field 
                                    :rules="security_connection.old_administrator_key"
                                    label="Ancienne clé d'administrateur"
                                    placeholder="Ancienne clé d'administrateur"
                                    class="text_field_margin"
                                    outlined 
                                    dense 
                                    height="20px"
                                ></v-text-field>
                            </div>
                            <div class="vertical_center vertical-margin">
                                <h4 class="label">
                                    Nouvelle clé administrateur
                                </h4>
                                <v-text-field
                                    :rules="security_connection.new_administrator_key"
                                    label="Nouvelle clé administrateur"
                                    placeholder="Nouvelle clé administrateur"
                                    class="text_field_margin" 
                                    outlined 
                                    dense 
                                    height="20px"
                                ></v-text-field>
                            </div>
                            <div class="button button-pad">
                                <v-btn 
                                    @click="validation_key=false" 
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            old_password: false,
            new_password: false,
            confirm_new_password: false,
            password: 'password',
            email: false,
            code: false,
            change:false,
            validation_key: false,
            data: ["Secteur Nord","Secteur Sud","Autonome","Normandie"],
        }
    },
    methods: {
        clickCode() {
            this.$refs.form.reset()
            this.code = true;
        },
        clickResetPassword() {
            alert('sad')
        }
    }
}
</script>