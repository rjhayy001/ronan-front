<template>
<div class="romel">


    <v-tabs class="main_tabs" style="position:relative">
        <div class="tabs_img">
            <v-avatar class="logo_img">
                <img src="@/assets/images/logo-securauto-150.png" alt="">
            </v-avatar>
        </div>
        <div class="tabs">
            <v-tab class="subtabs" to="/">Planification</v-tab>
            <v-tab class="subtabs" to="/centres">Centres</v-tab>
            <v-tab v-if="$canAccess()" class="subtabs" to="/employees">Employés</v-tab>
        </div>
        <v-spacer></v-spacer>
       
        <div style="margin: auto 0;height: 100%; position:relative; display:flex; align-items:center">
            <div>
                <notification/>
            </div>
            <v-menu
                bottom
                left
                offset-y
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-avatar 
                        v-bind="attrs"
                        v-on="on"
                        max-width="none" 
                        height="42px" 
                        width="42px" 
                        class="pointer elevation-2 class
                        mr-2">
                    <img :src="user ? user.image : '@/assets/images/logo-securauto-150.png'" alt="">
                    </v-avatar>
                </template>
                <v-list
                    dense
                    class="clicker"
                >
                    <v-list-item
                        dense
                        class="text-capitalize"
                        style="gap:10px"
                        link
                        @click.prevent="profile"
                    >
                        <v-icon>
                            mdi-account
                        </v-icon> 
                        Profil
                    </v-list-item>
                    <v-list-item
                        dense
                        class="text-capitalize"
                        style="gap:10px"
                        link
                        to="/parameter/general"
                    >
                        <v-icon>
                            mdi-cog
                        </v-icon> 
                        Les Paramètres
                    </v-list-item>
                    <v-list-item
                        dense
                        class="text-capitalize"
                        style="gap:10px; color:red"
                        link
                        @click="logout()"
                    >
                        <v-icon color="red">
                            mdi-logout-variant
                        </v-icon> 
                        Déconnecter
                    </v-list-item>
                </v-list>
            </v-menu>
            <profileDialog
                :dialog="Profile"
                @close="Profile=false"
            ></profileDialog>
        </div>
    </v-tabs>
    </div>
</template>

<script>
import profileDialog from '@/components/Profile/profile.vue'
import notification from './notification.vue'
export default {
    components : {
        profileDialog,
        notification
    },

    data(){
        return{
            notify:false,
            Profile:false,
        }
    },
    computed: {
        user() {
            return this.$store.getters['user']
        },
    },
    methods: {
        profile(){
            this.Profile = true
        },
        logout(){
            localStorage.setItem('token', '')
            this.$router.push({ name: "login"})
        },
    }
}
</script>

<style scoped>
.main_tabs {
    flex:0
}

.main_tabs .tabs_img {
    padding: 0 5px; 
    justify-content:center; 
    margin:auto 0; 
    text-align:center;
}

.main_tabs .tabs_img .logo_img {
     size:60px;
}

.main_tabs .tabs {
    display:flex; 
    padding: 0 5px;
    transition: 0;
    font-family: 'Rubik', sans-serif !important;
}

.subtabs.v-tab.v-tab--active{
    color: orange !important;
}

.tabs .subtabs{
    width: 280px;
    font-size: 18px;
    text-transform:capitalize;
}
</style>