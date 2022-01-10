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
            <v-tab class="subtabs" to="/employès">Employès</v-tab>
        </div>
        <v-spacer></v-spacer>
        <div style="display:flex; gap:10px; padding-right: 10px">
            <v-btn style="padding: 0; background-color:#038bdd; border-radius: 50%; min-width: 50px!important; text-align: center; margin:auto; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                <v-icon
                    large
                    color="white"
                    style="font-size: 25px"
                >
                    mdi-bell
                </v-icon>          
            </v-btn>
            <v-btn style="padding: 0; background-color:#038bdd; border-radius: 50%; min-width: 50px!important; text-align: center; margin:auto; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                <v-icon
                    large
                    color="white"
                    style="font-size: 25px"
                >
                    mdi-account
                </v-icon>          
            </v-btn>
        </div>
    </v-tabs>
</template>
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

.tabs .subtabs:active {
    color: red !important;
    /* background-color: #ffff !important; */
    }
</style>