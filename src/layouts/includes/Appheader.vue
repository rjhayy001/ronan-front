<template>
    <v-tabs class="main_tabs">
        <div class="tabs_img">
            <v-avatar class="logo_img">
                <img src="@/assets/images/logo-securauto-150.png" alt="">
            </v-avatar>
        </div>
        <div class="tabs">
            <v-tab class="subtabs" to="/">Planification</v-tab>
            <v-tab class="subtabs" to="/centres">Centres</v-tab>
            <v-tab class="subtabs" to="/employees">Employees</v-tab>
        </div>
        <v-spacer></v-spacer>
        <div style="margin: auto 0">
            <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
            >
                <v-icon
                    color="white"
                >
                    mdi-bell
                </v-icon>          
            </v-btn>
            <!-- <v-btn                 
                class="mx-2"
                fab
                dark
                small
                color="primary"
            >
                <v-icon
                    color="white"
                >
                    mdi-account
                </v-icon>          
            </v-btn> -->
            <v-menu
                bottom
                left
                offset-y
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn                 
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon
                            color="white"
                        >
                            mdi-account
                        </v-icon>          
                    </v-btn>
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
                        Profile
                    </v-list-item>
                    <v-list-item
                        dense
                        class="text-capitalize"
                        style="gap:10px"
                        link
                        to="/parameter/general"
                    >
                        <v-icon>
                            mdi-settings
                        </v-icon> 
                        Les paramètres
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
                        Désconnecter
                    </v-list-item>
                </v-list>
            </v-menu>
        <profileDialog
            :dialog="Profile"
            @close="Profile=false"
        ></profileDialog>
        <!-- <parameterDialog
            :dialog="Parameter"
            @close="Parameter=false"
        ></parameterDialog> -->
        </div>
    </v-tabs>
</template>

<script>
import profileDialog from '@/components/Profile/profile.vue'
export default {
    components : {
        profileDialog,
    },

    data(){
        return{
            Profile:false,
        }
    },
    methods: {
        profile(){
            this.Profile = true
        },
        logout(){
            localStorage.setItem('token', '')
            this.$router.push({ name: "login"})
        }
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