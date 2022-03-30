<template>
    <div class="sidebar_profile" style="">
        <div class="sidebar_container">
            <div>
                <v-btn 
                    class="sidebar_button"
                    to="/parameter/general" 
                    :ripple="false" 
                    depressed 
                    text 
                    solo
                >
                    <v-icon>
                        mdi-cog
                    </v-icon>
                    <h3 class="title">
                        Général
                    </h3>
                </v-btn>
            </div>
            <div>
                <v-btn 
                    class="sidebar_button"
                    to="/parameter/security" 
                    :ripple="false" 
                    depressed 
                    text 
                    solo 
                >
                    <v-icon>
                        mdi-shield-half-full
                    </v-icon>
                    <h3 class="title">
                        Sécurité et connéxion
                    </h3>
                </v-btn>
            </div>
            <div class="sidebar_border-bottom"></div>
            <div v-if="$isAdmin()">
                <v-btn 
                    class="sidebar_button"
                    to="/parameter/management" 
                    :ripple="false" 
                    depressed 
                    text 
                    solo 
                >
                    <v-icon>
                        mdi-briefcase
                    </v-icon>
                    <h3 class="title">
                        Gestion des employés
                    </h3>
                </v-btn>
            </div>
            <div v-if="$canAccess()">
                <v-btn 
                    class="sidebar_button"
                    to="/parameter/advertise" 
                    :ripple="false" 
                    depressed 
                    text 
                    solo 
                >
                    <v-icon>
                        mdi-message-alert-outline 
                    </v-icon>
                    <h3 class="title">
                        Annonce
                    </h3>
                </v-btn>
            </div>
            <div v-if="$isAdmin()">
                <v-btn 
                    class="sidebar_button"
                    to="/parameter/holidays" 
                    :ripple="false" 
                    depressed 
                    text 
                    solo 
                >
                    <v-icon>
                        mdi-calendar-blank
                    </v-icon>
                    <h3 class="title">
                        Jours fériés
                    </h3>
                </v-btn>
            </div>
            <div v-if="$isAdmin()">
                <v-btn 
                    class="sidebar_button"
                    to="/parameter/Regions" 
                    :ripple="false" 
                    depressed 
                    text 
                    solo 
                >
                    <v-icon>
                        mdi-bank
                    </v-icon>
                    <h3 class="title">
                        Régions
                    </h3>
                </v-btn>
            </div>
        </div>
    </div>
</template>