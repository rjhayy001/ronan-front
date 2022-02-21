<template>
    <div class="login-main">
        <div class="image-container">
            <div class="image-content">
                <div class="content-top">
                    <h2>
                        SECUR AUTO
                    </h2>
                    <h4>
                        Planning & Gestion d'équipe
                    </h4>
                </div>
                <div class="content-mid">
                    <h2>
                        C'est un plaisir de vous revoir
                    </h2>
                    <h1>
                        CONTENT DE TE REVOIR
                    </h1>
                </div>
            </div>
        </div>
        <v-card class="login-container">
            <v-form ref="form" class="login-form">
                <div class="form_head">
                    <div class="head_avatar">
                        <v-avatar max-width="none" height="150px" width="150px">
                            <img src="@/assets/images/logo-securauto-150.png" alt="">
                        </v-avatar>
                    </div>
                    <div class="head_text">
                        <h1>
                            Mot de passe oublié
                        </h1>
                        <h3>
                            Nous essaierons de recuperer votre compte perdu
                        </h3>
                    </div>
                </div>
                <div class="form_textfield mt-8">
                    <div class="login_field">
                        <v-text-field
                            :rules="loginRules.email"      
                            class="my-2"
                            outlined
                            prepend-inner-icon="mdi-email-outline"
                            solo
                            placeholder="Enter votre Email"
                        ></v-text-field>
                    </div>
                    <div class="resetpassword">
                        <v-btn class="btn-reset" @click="toPasswordreset()" height="100%!important" flat text>
                            <span>
                                Vous avez déjà le code ?
                            </span>
                        </v-btn>
                    </div>
                </div>
                <div class="action_login">
                    <div class="mt-5 text-center">
                        <v-btn class="val-btn" width="100%" rounded color="primary" dark x-large>
                            Valider
                        </v-btn>
                    </div>
                    <div class="mt-5 text-center">
                        <v-btn class="tour-btn" @click="toLogin" outlined width="100%" rounded color="primary" dark x-large>
                            retour
                        </v-btn>
                    </div>
                </div>
            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {

    };
  },
  methods: {
    toLogin(){
        this.$router.push({ name: "login"})
    },
    toPasswordreset(){
        this.$router.push({ name: "password-reset"})
    },
  },
};
</script>
