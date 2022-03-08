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
            <template v-if="loading">
                <table-loader></table-loader>
            </template>
            <v-form v-else ref="form" class="login-form login-relative">
                <div class="form_head">
                    <div class="head_avatar">
                        <v-avatar max-width="none" height="150px" width="150px">
                            <img src="@/assets/images/logo-securauto-150.png" alt="">
                        </v-avatar>
                    </div>
                    <div class="head_text">
                        <h2>
                            Mot de passe oublié
                        </h2>
                        <h5>
                            Nous essaierons de recuperer votre compte perdu
                        </h5>
                    </div>
                </div>
                <div class="form_textfield mt-8">
                    <div class="login_field login-relative">
                        <v-text-field
                            :rules="loginRules.email"      
                            class="my-2"
                            outlined
                            v-model="email"
                            prepend-inner-icon="mdi-email-outline"
                            solo
                            placeholder="Enter votre Email"
                        ></v-text-field>
                    </div>
                    <div class="resetpassword">
                        <v-btn class="btn-reset" @click="toPasswordreset()" height="100%!important" text>
                            <span>
                                Vous avez déjà le code ?
                            </span>
                        </v-btn>
                    </div>
                </div>
                <div class="action_login login-btn-valider">
                    <div class="mt-5 text-center">
                        <v-btn class="val-btn" @click="sendToken" width="100%" rounded color="primary" dark x-large>
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
import { SendEmailToken } from "@/repositories/auth.api";
export default {
    data() {
        return {
            email:'',
            loading:false
        };
    },
  methods: {
    sendToken(){
        this.$refs.form.validate()
        if(this.$refs.form.validate() == true) {
            this.loading = true
            let payload = {
                email: this.email
            }
            SendEmailToken(payload).then(({data}) =>{
                console.log(data, 'sad')
                localStorage.setItem('email_to_reset', this.email)
                this.$toast.success(data.message)
                this.$router.push({ name: "password-reset"})
                this.loading = false
            })
        }else{
            this.$toast.error('Do not leave empty field')
        }
    },
    toLogin(){
        this.$router.push({ name: "login"})
    },
    toPasswordreset(){
        this.$router.push({ name: "password-reset"})
    },
  },
};
</script>
