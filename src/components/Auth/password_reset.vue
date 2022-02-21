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
                            Réinitialisation du mot de passe
                        </h1>
                        <h3>
                            Entrez code de validation qui vous a été envoyé et
                            fournissez un mot de passe correspondant
                        </h3>
                    </div>
                </div>
                <div class="form_textfield mt-8">
                    <div class="login_field">
                        <v-text-field
                            :rules="loginRules.code"      
                            class="my-2"
                            outlined
                            prepend-inner-icon="mdi-email-outline"
                            solo
                            placeholder="Entrer le code de validation"
                        ></v-text-field>
                    </div>
                </div>
                <div class="action_login">
                    <div class="mt-5 text-center">
                        <v-btn class="action_log-btn" width="100%" rounded color="primary" dark x-large>
                            Valider
                        </v-btn>
                    </div>
                    <div class="mt-5 text-center">
                        <v-btn class="back_btn" @click="forgotpassword()" outlined width="100%" rounded color="primary" dark x-large>
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
    forgotpassword(){
        this.$router.push({ name: "forgotpassword"})
    },
  },
};
</script>
