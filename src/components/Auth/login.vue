<template>
    <!-- <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                    <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <form ref="form" @submit.prevent="login()">
                        <v-text-field
                            v-model="email"
                            name="email"
                            label="email"
                            type="text"
                            placeholder="email"
                            required
                        ></v-text-field>
                        
                        <v-text-field
                            v-model="password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="password"
                            required
                        ></v-text-field>
                        <v-btn type="submit" class="mt-4" color="primary" dark value="log in">Login</v-btn>
                    </form>
                    </v-card-text>
                </v-card>
            
            </v-flex>
        </v-layout>
    </v-container> -->
    <div class="login-main">
        <div class="image-container">
            <div style="width: 100%; height: 100%">
                <div class="image-content" style="position:relative">
                    <div style="padding: 30px 20px; color: white">
                        <h2 style="font-weight: 500">
                            SECUR AUTO
                        </h2>
                        <h4 style="font-weight: 400">
                            Planning & Team Management
                        </h4>
                    </div>
                    <div style="position: absolute; right: 0; left: 0; bottom: 40vh; display:flex; flex-direction: column; align-items: center; color:white">
                        <h3 style="font-weight: 400">
                            It's up pleasure to see you again
                        </h3>
                        <h1 style="font-weight: 500">
                            NICE TO SEE YOU AGAIN
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-container">
            <div style="width: 65%; height: 100vh;">
                <div style="   display:flex; justify-content:center; flex-direction:column; margin:auto; align-items:center">
                    <div style="padding: 3em;   display:flex; justify-content:center">
                        <v-avatar max-width="none" height="150px" width="150px">
                            <img src="@/assets/images/logo-securauto-150.png" alt="">
                        </v-avatar>
                    </div>
                    <div style="  display:flex; justify-content:center; flex-direction: column; align-items:center; width: 95%">
                        <h1 style="color: #0090d1">
                            Compte de connexion
                        </h1>
                        <h3 style="font-weight:400; line-height:1.2; text-align:center; color: #c4c4c4">
                            Entrez information d'identification et assurez-vous
                            qu'elles sont valides avant de pouvoir continuer utiliser
                            notre application
                        </h3>
                    </div>
                </div>
                <div class=" my-8">
                    <div>
                        <label style="color: #0090d1">Email</label>
                        <v-text-field
                            class="my-2"
                            v-model="email"
                            outlined
                            prepend-inner-icon="mdi-email-outline"
                            solo
                            placeholder="Enter votre Email"
                        ></v-text-field>
                        <label style="color: #0090d1">Mot de passe</label>
                        <v-text-field
                            class="my-2"
                            prepend-inner-icon="mdi-lock"
                            outlined
                            type="password"
                            solo
                            v-model="password"
                            placeholder="Enter votre Email"
                        ></v-text-field>
                    </div>
                </div>
                <div>
                    <div class="d-flex" style="justify-content:center; align-items:center">
                        <v-checkbox
                            class="checkbox"
                            style="margin-left: 0!important; color: #0090d1!important"
                            v-model="checkbox"
                            label="Se souvenir de moi"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                        <v-btn height="100%!important" flat text>
                            <span style="text-decoration:underline; text-transform:initial; color: #757575">
                                Mot de passe oublie ?
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
            </div>
        </div>
    </div>
</template>
<script>
import { login } from "@/repositories/auth.api";
export default {
  name: "Login",
  data() {
    return {
        checkbox: true,
        email: "ronan@admin.com",
        password: "password",
    };
  },
  methods: {
    login() {
        const login_data = {
            email: this.email,
            password: this.password
        }
        login(login_data).then(({data}) => {
            console.log(data, 'login')
             this.$store.commit('login', data)
            localStorage.setItem('token', data.access_token)
            this.$router.push({ name: "Planification"})
        })
    },
  },
};
</script>
