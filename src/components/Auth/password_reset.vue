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
                        <h2>
                            Réinitialisation du mot de passe
                        </h2>
                        <h5>
                            Entrez code de validation qui vous a été envoyé et
                            fournissez un mot de passe correspondant
                        </h5>
                    </div>
                </div>
                <div class="form_textfield mt-8">
                    <div class="login_field">
                        <v-text-field
                            :rules="loginRules.code"  
                            autocomplete="off"    
                            class="my-2"
                            outlined
                            v-model="token"
                            prepend-inner-icon="mdi-folder-eye-outline"
                            solo
                            placeholder="Entrer le code de validation"
                        ></v-text-field>
                        <v-text-field
                            :rules="loginRules.password"
                            
                            :append-icon="set_new_password ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="set_new_password = !set_new_password"
                            :type="set_new_password ? 'text' : 'password'"    
                            class="my-2"
                            outlined
                            prepend-inner-icon="mdi-lock-outline"
                            v-model="new_password"
                            solo
                            placeholder="Enter new Password"
                        ></v-text-field>
                        <v-text-field
                            :rules="loginRules.confirm_password"
                            :append-icon="confirm_set_new_password ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="confirm_set_new_password = !confirm_set_new_password"
                            :type="confirm_set_new_password ? 'text' : 'password'"    
                            class="my-2"
                            outlined
                            v-model="confirm_password"
                            prepend-inner-icon="mdi-lock-check-outline"
                            solo
                            placeholder="Confirm Password"
                        ></v-text-field>
                    </div>
                </div>
                <div class="action_login">
                    <div class="mt-5 text-center">
                        <v-btn class="action_log-btn" @click="resetPassword" width="100%" rounded color="primary" dark x-large>
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
import { ResetPassword } from "@/repositories/auth.api";
export default {
  data() {
    return {
        set_new_password: false,
        confirm_set_new_password: false,
        token: '',
        new_password: '',
        confirm_password: '',
    };
  },
  methods: {
    resetPassword(){
        this.$refs.form.validate()
        if(this.$refs.form.validate() == true) {

            let payload = {
                email: localStorage.getItem('email_to_reset'),
                token: this.token,
                password: this.new_password
            }

            ResetPassword(payload).then(({data}) =>{
                this.$toast.success(data.message)
                this.$router.push({ name: "login"})
            }).catch((response) =>{
                console.log(response,'sad')
                this.$toast.error('Invalid Token') 
            })
        }else{
            this.$toast.error('Do not leave empty field')
        }
    },
    forgotpassword(){
        this.$router.push({ name: "forgotpassword"})
    },
  },
};
</script>
