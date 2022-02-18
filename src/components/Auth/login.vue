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
                            Compte de connexion
                        </h1>
                        <h3>
                            Entrez information d'identification et assurez-vous
                            qu'elles sont valides avant de pouvoir continuer utiliser
                            notre application
                        </h3>
                    </div>
                </div>
                <div class="form_textfield mt-8">
                    <div class="login_field">
                        <label>Email</label>
                        <v-text-field
                            :rules="loginRules.email"      
                            class="my-2"
                            v-model="email"
                            outlined
                            prepend-inner-icon="mdi-email-outline"
                            solo
                            placeholder="Enter votre Email"
                        ></v-text-field>
                        <label>Mot de passe</label>
                        <v-text-field
                            :rules="loginRules.password"
                            :append-icon="old_password ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="old_password = !old_password"
                            :type="old_password ? 'text' : 'password'"
                            class="my-2"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            solo
                            v-model="password"
                            placeholder="Enter votre Email"
                        ></v-text-field>
                    </div>
                </div>
                <div class="action_login">
                    <div class="d-flex action_container">
                        <v-checkbox
                            class="checkbox"
                            v-model="checkbox"
                            label="Se souvenir de moi"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                        <v-btn class="btn-forpass" @click="toForget" height="100%!important" flat text>
                            <span>
                                Mot de passe oublié ?
                            </span>
                        </v-btn>
                    </div>
                </div>
                <div>
                    <div class="mt-10 text-center">
                        <v-btn @click="login" width="100%" rounded color="primary" dark x-large>
                            S'IDENTIFIER
                        </v-btn>
                    </div>
                </div>
            </v-form>
        </v-card>
    </div>
</template>
<script>
import { login } from "@/repositories/auth.api";
export default {
  name: "Login",
  data() {
    return {
        old_password: false,
        new_password: false,
        confirm_new_password: false,
        checkbox: true,
        email: "ronan@admin.com",
        password: "password",
    };
  },
  methods: {
      toForget(){
          this.$router.push({ name: "forgotpassword"})
      },
    login() {
        const login_data = {
            email: this.email,
            password: this.password
        }
        this.$refs.form.validate()
        if(this.$refs.form.validate() == true) {
            login(login_data).then(({data}) => {
                console.log(data, 'login')
                this.$store.commit('login', data)
                localStorage.setItem('token', data.access_token)
                this.$router.push({ name: "Planification"})
            }).catch(({ response }) => { 
                this.$toast.error(response.data.message) 
            })
        }else{
            this.$toast.error('All Field are Required')
        }
    },
  },
};
</script>
